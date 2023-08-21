import Redis from "ioredis";
import Config from "../config/config.js";

let redisInstance = null;

function getRedisInstance() {
  if (!redisInstance) {
    console.log("initialising redis"); 
    redisInstance = new Redis({
      host: Config.Config.cache.redis.host,
      port: Config.Config.cache.redis.port,
      password: Config.Config.cache.redis.password,
    });

    redisInstance.on("connect", () => {
      console.log("Connected to Redis");
    });

    redisInstance.on("error", (error) => {
      console.error("Error connecting to Redis:", error);
    });
  }

  return redisInstance;
}

let reddis = await getRedisInstance();

export default reddis;
