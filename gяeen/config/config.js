import { join } from 'path';
import coreHelper from 'core/coreHelper';
import dotenv from 'dotenv';
dotenv.config()


class Core {
  constructor() {
    this.Secret = '';
    this.BearerToken = null;
    this.Otp = new Otp();
  }
}

class Otp {
  constructor() {
    this.Proxy = false;
    this.Otp = '';
    this.OtpExpiryDuration = 0;
    this.Attempts = 0;
  }
}

class Cookie {
  constructor() {
    this.Name = '';
    this.Expiry = 0;
    this.Secure = false;
    this.SameSite = ''
  }
}

class Cors {
  constructor() {
    this.AllowedOrigins = '';
  }
}

class Jobs {
  constructor() {
    this.PaymentCheckJob = false;
    this.PaymentCheckJobDuration = 0;
  }
}

class PaymentGateway {
  constructor() {
    this.DefaultGateway = '';
    this.DefaultCurrency = '';
    this.AutoCapture = false;
    this.Razorpay = new Razorpay();
  }
}

class Razorpay {
  constructor() {
    this.ApiKey = '';
    this.ApiSecret = '';
    this.BaseUrl = '';
  }
}

class Databases {
  constructor() {
    this.Main = new Database();
  }
}

class Database {
  constructor() {
    this.Host = '';
    this.Port = '';
    this.User = '';
    this.Pass = '';
    this.Name = '';
  }
}

class Cache {
  constructor() {
    this.Redis = new CacheProvider();
    this.ExpiryDuration = 0;
    this.LiveFeedExpiryDuration = 0;
  }
}

class CacheProvider {
  constructor() {
    this.Host = '';
    this.Port = '';
    this.Db = 0;
  }
}


class Sms {
  constructor() {
    this.Default = '';
    this.Msg91 = new SmsProviderInfo();
    this.TwoFactor = new SmsProviderInfo();
  }
}

class SmsProviderInfo {
  constructor() {
    this.Host = '';
    this.SenderId = '';
    this.OtpTemplateName = '';
  }
}

class Email {
  constructor() {
    this.DefaultSender = new EmailDefaultSender();
    this.SendInBlue = new EmailProviderInfo();
  }
}

class EmailProviderInfo {
  constructor() {
    this.Host = '';
    this.SecretKey = '';
  }
}

class EmailDefaultSender {
  constructor() {
    this.Name = '';
    this.Email = '';
  }
}

class Data {
  constructor() {
    this.DefaultResultsLimit = 0;
  }
}

class PushNotification {
  constructor() {
    this.CredentialsPath = '';
    this.NotificationImage = '';
  }
}

class FileStore {
  constructor() {
    this.S3 = new AwsS3();
  }
}

class AwsS3 {
  constructor() {
    this.Region = '';
    this.BucketPrivate = '';
    this.BucketPublic = '';
    this.ApiKey = '';
    this.SecretKey = '';
  }
}

class Version {
  constructor() {
    this.Version = '';
  }
}

class ApplicationConfig {
  constructor() {
    this.Env = '';
    this.Core = new Core();
    this.Cookie = new Cookie();
    this.Cors = new Cors();
    this.Jobs = new Jobs();
    this.PaymentGateway = new PaymentGateway();
    this.Databases = new Databases();
    this.Cache = new Cache();
    this.Sms = new Sms();
    this.Email = new Email();
    this.Data = new Data();
    this.PushNotification = new PushNotification();
    this.FileStore = new FileStore();
    this.Version = new Version();
  }
}

let Config = new ApplicationConfig();

async function Init(conf) {
  // const validate = new validator();
  if (!conf) {
    conf = '.';
  }
  let configFileName;
  switch (process.env.env) {
    case 'dev':
      configFileName = 'config-dev.json';
      break;
    case 'prod':
      configFileName = 'config-prod.json';
      break;
    default:
      configFileName = 'config.json';
  }
  console.log("Configuring ", configFileName);
  const configFilepath = join(conf, configFileName);
  const file = await coreHelper.file.readFile(configFilepath);

  const config = new ApplicationConfig();
  try {
    Object.assign(config, JSON.parse(file));
  } catch (err) {
    throw err;
  }

  

  // if (!validator.validate(config)) {
    //   throw new Error('Configuration validation failed');
    // }
    // Config = config;
    config.Env = process.env;
    config.PaymentGateway.Razorpay.ApiKey = process.env.razorpay_api_key;
    config.PaymentGateway.Razorpay.ApiSecret = process.env.razorpay_api_secret;

    /* AWS S3 */
    config.FileStore.S3.ApiKey = process.env.aws_s3_api_key;
    config.FileStore.S3.SecretKey = process.env.aws_s3_secret_key;
    config.FileStore.S3.BucketPrivate = 'kickstart-private';
    config.FileStore.S3.BucketPublic = 'kickstart-public';
    config.Version.Version = 'v1';

    /* Database */
    config.Databases.Main.Name = process.env.DATABASE_NAME
    config.Databases.Main.Host = process.env.MONGO_URI
    
    console.log("config set");
    return config
}

Config = await Init('.');


export default {
  Config
};

