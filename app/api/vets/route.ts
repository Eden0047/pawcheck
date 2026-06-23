import { NextRequest, NextResponse } from "next/server";
import { haversineMiles } from "@/lib/distance";

interface GooglePlace {
  displayName?: { text: string };
  formattedAddress?: string;
  location: { latitude: number; longitude: number };
  rating?: number;
  userRatingCount?: number;
  nationalPhoneNumber?: string;
  currentOpeningHours?: { openNow?: boolean };
}

interface VetResult {
  name: string;
  address: string;
  distanceMiles: number;
  rating: number | null;
  userRatingsTotal: number | null;
  phone: string | null;
  openNow: boolean | null;
}

interface CacheEntry {
  results: VetResult[];
  expires: number;
}

const CACHE_TTL_MS = 24 * 60 * 60 * 1000;
const cache = new Map<string, CacheEntry>();
const MAX_RESULTS = 4;

function normalizePostcode(postcode: string): string {
  return postcode.trim().toUpperCase().replace(/\s+/g, "");
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const rawPostcode = typeof body.postcode === "string" ? body.postcode : "";
  const postcode = rawPostcode.trim();

  if (!postcode) {
    return NextResponse.json({ error: "Postcode is required" }, { status: 400 });
  }

  const key = normalizePostcode(postcode);
  const cached = cache.get(key);
  if (cached && Date.now() < cached.expires) {
    return NextResponse.json({ results: cached.results, cached: true });
  }

  const apiKey = process.env.GOOGLE_MAPS_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "Vet finder is not configured" }, { status: 500 });
  }

  try {
    const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
      `${postcode}, UK`
    )}&key=${apiKey}`;
    const geocodeRes = await fetch(geocodeUrl);
    const geocodeData = await geocodeRes.json();

    if (geocodeData.status !== "OK" || !geocodeData.results?.length) {
      return NextResponse.json({ error: "Couldn't find that postcode. Please check and try again." }, { status: 404 });
    }

    const { lat, lng } = geocodeData.results[0].geometry.location;

    const nearbyRes = await fetch("https://places.googleapis.com/v1/places:searchNearby", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": apiKey,
        "X-Goog-FieldMask":
          "places.displayName,places.formattedAddress,places.location,places.rating,places.userRatingCount,places.nationalPhoneNumber,places.currentOpeningHours.openNow",
      },
      body: JSON.stringify({
        includedTypes: ["veterinary_care"],
        maxResultCount: 10,
        locationRestriction: { circle: { center: { latitude: lat, longitude: lng }, radius: 8000 } },
      }),
    });
    const nearbyData = await nearbyRes.json();
    const places: GooglePlace[] = nearbyData.places || [];

    if (!places.length) {
      return NextResponse.json({ results: [] satisfies VetResult[] });
    }

    const results: VetResult[] = places
      .map((place) => ({
        name: place.displayName?.text || "Unnamed vet",
        address: place.formattedAddress || "",
        distanceMiles:
          Math.round(haversineMiles(lat, lng, place.location.latitude, place.location.longitude) * 10) / 10,
        rating: place.rating ?? null,
        userRatingsTotal: place.userRatingCount ?? null,
        phone: place.nationalPhoneNumber ?? null,
        openNow: place.currentOpeningHours?.openNow ?? null,
      }))
      .sort((a, b) => a.distanceMiles - b.distanceMiles)
      .slice(0, MAX_RESULTS);

    cache.set(key, { results, expires: Date.now() + CACHE_TTL_MS });

    return NextResponse.json({ results, cached: false });
  } catch (err) {
    console.error("Vet finder error", err);
    return NextResponse.json({ error: "Something went wrong finding vets near you." }, { status: 500 });
  }
}
