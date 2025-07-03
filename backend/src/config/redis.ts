import Redis from "ioredis";
import config from "./config";

const redisUrl = config.redis;

if (!redisUrl) {
  throw new Error("REDIS_URL is not set in .env");
}

const redis = new Redis(redisUrl);

export default redis;
