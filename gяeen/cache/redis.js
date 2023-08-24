// import Redis from "ioredis";
// import Config from "../config/config.js";

// let redisInstance = null;

// function getRedisInstance() {
//   if (!redisInstance) {
//     console.log("initialising redis"); 
//     redisInstance = new Redis({
//       host: Config.Config.Cache.Redis.Host,
//       port: Config.Config.Cache.Redis.Port,
//       password: Config.Config.Cache.Redis.Db,
//     });

//     redisInstance.on("connect", () => {
//       console.log("Connected to Redis");
//     });

//     redisInstance.on("error", (error) => {
//       console.error("Error connecting to Redis:", error);
//     });
//   }

//   return redisInstance;
// }


import spi from 'core/spi';
import Redis from 'ioredis';
import config from '../config/config';

class RedisProvider {
  constructor() {
    console.log("initialising redis");
    this.Client = new spi.cacheStore();
    this.Host = null;
    this.Port = null;
    this.Db = null;
  }

  async Init() {
    // const validate = new validator();
    const props = {
      host: config.Config.Cache.Redis.Host,
      port: config.Config.Cache.Redis.Port,
      Db: config.Config.Cache.Redis.Db,
    };
    
    // try {
      //   await validate.validateAsync(props);
      // } catch (err) {
        //   return err;
        // }
        
        console.log("Connected to Redis");
        this.Client = new Redis({
          host: `${props.host}`,
          password: '',
          db: props.Db,
        });
        return null;
  }

  async get(key) {
    try {
      const res = await this.Client.get(key);
      return res ? res : null;
    } catch (err) {
      return err;
    }
  }

  async set(key, value, ttl) {
    try {
      await this.Client.set(key, value, 'EX', ttl);
      return null;
    } catch (err) {
      return err;
    }
  }

  async delete(key) {
    try {
      await this.Client.del(key);
      return null;
    } catch (err) {
      return err;
    }
  }

  async scan(prefix) {
    try {
      const keys = await this.Client.keys(prefix);
      return keys;
    } catch (err) {
      return err;
    }
  }

  async incr(prefix) {
    try {
      await this.Client.incr(prefix);
      return null;
    } catch (err) {
      return err;
    }
  }
}

// let Redis = new RedisProvider();
// Redis.Init();

export default RedisProvider;



// let reddis = await getRedisInstance();

// export default reddis;
