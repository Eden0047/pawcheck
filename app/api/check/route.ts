import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { buildContext, getVerifiedSources } from "@/lib/pawcheck-library/buildContext";

interface CheckRequest {
  pet: string;
  symptoms: string[];
  severity: number;
}

interface CheckResult {
  likelyCauses: string[];
  homeAdvice: string[];
  sources: string[];
  urgencyLevel: "low" | "medium" | "high";
  urgencyMessage: string;
  grounded?: boolean;
}

const BASE_SYSTEM_PROMPT = `You are PawCheck, a friendly and knowledgeable pet health assistant.
You provide clear, accurate, and compassionate advice to pet owners based
on their pet's symptoms. Always recommend seeing a vet for serious concerns.
Never use em dashes (—) in your writing; use commas, periods, or "and"/"so" instead.
Never give a definitive diagnosis or specific medication dosages.
Structure your response as JSON only, no markdown, exactly matching this schema:
{
  likelyCauses: string[],        // 2-3 plain English possible causes
  homeAdvice: string[],          // 3-4 actionable tips
  sources: string[],             // reference names actually used from the supplied reference material, if any
  urgencyLevel: 'low' | 'medium' | 'high',
  urgencyMessage: string         // one sentence, only shown if high
}`;

const CACHE_TTL_MS = 60 * 60 * 1000;
const cache = new Map<string, { value: CheckResult; expires: number }>();

function cacheKey(pet: string, symptoms: string[], severity: number): string {
  return `${pet}|${[...symptoms].sort().join(",")}|${severity}`;
}

function getCached(key: string): CheckResult | null {
  const entry = cache.get(key);
  if (!entry) return null;
  if (Date.now() > entry.expires) {
    cache.delete(key);
    return null;
  }
  return entry.value;
}

function setCached(key: string, value: CheckResult) {
  cache.set(key, { value, expires: Date.now() + CACHE_TTL_MS });
}

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

export async function POST(req: NextRequest) {
  const body = (await req.json()) as CheckRequest;
  const { pet, symptoms, severity } = body;

  if (!pet || !Array.isArray(symptoms) || symptoms.length === 0 || typeof severity !== "number") {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const key = cacheKey(pet, symptoms, severity);
  const cached = getCached(key);
  if (cached) {
    return NextResponse.json(cached);
  }

  const { context, matchedEntries, isEmergencyCategory, toxinDetected } = buildContext({ pet, symptoms, severity });
  const systemPrompt = context ? `${BASE_SYSTEM_PROMPT}\n\n${context}` : BASE_SYSTEM_PROMPT;

  try {
    const message = await anthropic.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 700,
      system: systemPrompt,
      messages: [
        {
          role: "user",
          content: `My ${pet} is showing these symptoms: ${symptoms.join(", ")}. Severity level: ${severity}/10. Please provide advice.`,
        },
      ],
    });

    const textBlock = message.content.find((block) => block.type === "text");
    if (!textBlock || textBlock.type !== "text") {
      throw new Error("No text response from model");
    }

    const cleaned = textBlock.text
      .trim()
      .replace(/^```(?:json)?\s*/i, "")
      .replace(/```\s*$/, "");

    const result = JSON.parse(cleaned) as CheckResult;

    if (matchedEntries.length > 0) {
      const verifiedSources = getVerifiedSources({ pet, symptoms });
      if (verifiedSources.length > 0) {
        result.sources = verifiedSources;
        result.grounded = true;
      }
    }

    if (severity > 7 || isEmergencyCategory || toxinDetected) {
      result.urgencyLevel = "high";
      if (!result.urgencyMessage) {
        result.urgencyMessage = toxinDetected
          ? "Possible poisoning: call the UK Animal Poison Line (01202 509000) or a vet immediately."
          : "Based on the severity, we recommend contacting a vet immediately.";
      }
    }

    setCached(key, result);
    return NextResponse.json(result);
  } catch (err) {
    console.error("PawCheck API error", err);
    return NextResponse.json(
      {
        likelyCauses: ["We couldn't generate advice right now."],
        homeAdvice: ["If your pet seems unwell, please contact a vet for guidance."],
        sources: [],
        urgencyLevel: severity > 7 || isEmergencyCategory || toxinDetected ? "high" : "medium",
        urgencyMessage: "We recommend contacting a vet to be safe.",
      } satisfies CheckResult,
      { status: 200 }
    );
  }
}
