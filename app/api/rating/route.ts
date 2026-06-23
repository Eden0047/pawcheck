import { NextRequest, NextResponse } from "next/server";
import { redis, RATING_SUM_KEY, RATING_COUNT_KEY } from "@/lib/redis";
import { SEED_RATING_AVERAGE, SEED_RATING_COUNT } from "@/lib/petData";

async function ensureSeeded() {
  const count = await redis.get<number>(RATING_COUNT_KEY);
  if (!count) {
    await redis.set(RATING_COUNT_KEY, SEED_RATING_COUNT);
    await redis.set(RATING_SUM_KEY, Math.round(SEED_RATING_AVERAGE * SEED_RATING_COUNT));
  }
}

async function getStats() {
  const [sum, count] = await Promise.all([
    redis.get<number>(RATING_SUM_KEY),
    redis.get<number>(RATING_COUNT_KEY),
  ]);
  const total = count || 0;
  const average = total > 0 ? (sum || 0) / total : 0;
  return { average: Math.round(average * 10) / 10, count: total };
}

export async function GET() {
  await ensureSeeded();
  const stats = await getStats();
  return NextResponse.json(stats);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const stars = Number(body.stars);

  if (!Number.isInteger(stars) || stars < 1 || stars > 5) {
    return NextResponse.json({ error: "stars must be an integer 1-5" }, { status: 400 });
  }

  await ensureSeeded();
  await redis.incrby(RATING_SUM_KEY, stars);
  await redis.incr(RATING_COUNT_KEY);

  const stats = await getStats();
  return NextResponse.json(stats);
}
