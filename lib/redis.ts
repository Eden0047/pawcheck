import { Redis } from "@upstash/redis";

let client: Redis | null = null;

function getClient(): Redis {
  if (!client) {
    client = new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL!,
      token: process.env.UPSTASH_REDIS_REST_TOKEN!,
    });
  }
  return client;
}

export const redis = {
  llen: (key: string) => getClient().llen(key),
  lpush: (key: string, value: string) => getClient().lpush(key, value),
  lrange: <T>(key: string, start: number, end: number) => getClient().lrange<T>(key, start, end),
  ltrim: (key: string, start: number, end: number) => getClient().ltrim(key, start, end),
  get: <T>(key: string) => getClient().get<T>(key),
  set: (key: string, value: unknown) => getClient().set(key, value),
  incr: (key: string) => getClient().incr(key),
  incrby: (key: string, value: number) => getClient().incrby(key, value),
};

export const COMMENTS_KEY = "pawcheck:comments";
export const RATING_SUM_KEY = "pawcheck:rating:sum";
export const RATING_COUNT_KEY = "pawcheck:rating:count";
export const MAX_COMMENTS = 100;
