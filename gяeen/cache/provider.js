import RedisProvider from './redis.js'; 
import cacheStore    from 'core/spi/index.js'; 
import Config from '../config/config.js'; 



class Provider {
  constructor(){
    this.Client = new RedisProvider();
  }
  async Init() {
    this.Client.Host = Config.Config.Cache.Redis.Host;
    this.Client.Port = Config.Config.Cache.Redis.Port;
    this.Client.Db = Config.Config.Cache.Redis.Db;
    
    try {
      await this.Client.Init();
      return null;
    } catch (err) {
      return err;
    }
  }

  CacheProvider() {
    if (!this.Client) {
      throw new Error('Cache not initialized');
    }
    return new cacheStore();
  }
}

const cacheProvider = new Provider();

export default cacheProvider;
