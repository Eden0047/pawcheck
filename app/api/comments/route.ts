import { NextRequest, NextResponse } from "next/server";
import { redis, COMMENTS_KEY, MAX_COMMENTS } from "@/lib/redis";
import { Comment, INITIAL_COMMENTS } from "@/lib/petData";

async function ensureSeeded() {
  const len = await redis.llen(COMMENTS_KEY);
  if (len === 0) {
    const seeded = [...INITIAL_COMMENTS].reverse();
    for (const c of seeded) {
      await redis.lpush(COMMENTS_KEY, JSON.stringify(c));
    }
  }
}

export async function GET() {
  await ensureSeeded();
  const raw = await redis.lrange<string>(COMMENTS_KEY, 0, MAX_COMMENTS - 1);
  const comments: Comment[] = raw.map((r) => (typeof r === "string" ? JSON.parse(r) : r));
  return NextResponse.json({ comments });
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const text = typeof body.text === "string" ? body.text.trim() : "";
  const pet = typeof body.pet === "string" ? body.pet : "🐶 Dog";

  if (!text) {
    return NextResponse.json({ error: "Comment text is required" }, { status: 400 });
  }
  if (text.length > 500) {
    return NextResponse.json({ error: "Comment is too long" }, { status: 400 });
  }

  await ensureSeeded();

  const comment: Comment = {
    id: crypto.randomUUID(),
    avatar: pet.split(" ")[0] || "🐾",
    user: "@you",
    pet,
    text,
    likes: 0,
    createdAt: Date.now(),
  };

  await redis.lpush(COMMENTS_KEY, JSON.stringify(comment));
  await redis.ltrim(COMMENTS_KEY, 0, MAX_COMMENTS - 1);

  return NextResponse.json({ comment });
}
