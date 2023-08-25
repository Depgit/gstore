import Zerolog from 'logger/zerologger.js';

class MyLogger {
    constructor() {
        this.Logger = new Zerolog();
    }
    
    async initLogger() {
        try {
            console.log("configuring logger");
            const logLevel = process.env.LOG_LEVEL;
            if(!logLevel){
                throw "LOG_LEVEL is null in .env file"
            }
            this.Logger.LogLevel = logLevel;
            this.Logger.ConsoleEnabled = true;
            this.Logger.FileEnabled = process.env.FileEnable==='true';
            this.Logger.LogFilename = process.env.LogFilename;
            this.Logger.LogFormat = '';
            this.Logger.LogDirectory = process.env.LogDirectory;
            this.Logger.MaxBackup = 5;
            this.Logger.FileMaxSize = 10*1024*1024;
            this.Logger.MaxAge = 3600;
            await this.Logger.Init();

            console.log("logger file set");
        } catch (err) {
            throw err;
        }
    }
    
    info(...args) {
        const context = args.shift(); 
        const message = args.shift(); 

        this.Logger.info({
            context: context,
            message: message,
            additionalFields: args  
        });
    }

    debug(...args) {
        const context = args.shift(); 
        const message = args.shift(); 

        this.Logger.debug({
            context: context,
            message: message,
            additionalFields: args  
        });
    }

    error(...args) {
        const context = args.shift(); 
        const message = args.shift(); 

        this.Logger.error({
            context: context,
            message: message,
            additionalFields: args  
        });
    }

    warn(...args) {
        const context = args.shift(); 
        const message = args.shift(); 

        this.Logger.warn({
            context: context,
            message: message,
            additionalFields: args  
        });
    }

    trace(...args) {
        const context = args.shift(); 
        const message = args.shift(); 

        this.Logger.trace({
            context: context,
            message: message,
            additionalFields: args  
        });
    }
}

let log = new MyLogger();

await log.initLogger();

export default log;
