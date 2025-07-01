import Redis from "ioredis";
import config from "./config";

const redisUrl = config.redis;

if (!redisUrl) {
  throw new Error("REDIS_URL is not set in .env");
}

// const redis = new Redis(redisUrl);
// Linh chinh lai de chay tren may hay chinh lai neu khong chay
const redis = new Redis("redis://127.0.0.1:6379");

export default redis;
