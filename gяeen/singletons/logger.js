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
            this.Logger.FileEnabled = false;
            this.Logger.LogFilename = '';
            this.Logger.LogFormat = '';
            this.Logger.LogDirectory = '';
            this.Logger.MaxBackup = 0;
            this.Logger.FileMaxSize = 0;
            this.Logger.MaxAge = 0;
            await this.Logger.Init();

            console.log("logger file set");
        } catch (err) {
            throw err;
        }
    }
    
    info(...args) {
        const [context, ...logArgs] = args;
        this.Logger.info({context}, ...logArgs);
    }

    debug(...args) {
        const [context, ...logArgs] = args;
        this.Logger.debug({context}, ...logArgs);
    }

    error(...args) {
        const [context, ...logArgs] = args;
        this.Logger.error({context}, ...logArgs);
    }

    warn(...args) {
        const [context, ...logArgs] = args;
        this.Logger.warn({context}, ...logArgs);
    }
}

let log = new MyLogger();

await log.initLogger();

export default log;
