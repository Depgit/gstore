import pino from 'pino';
import pinoRotatingFile from 'rotating-file-stream';
import path from 'path';
import fs from 'fs/promises';

class Zerolog {
    constructor() {
        this.Logger = null;
        this.LogLevel = null;
        this.ConsoleEnabled = false;
        this.FileEnabled = false;
        this.LogFilename = null;
        this.LogFormat = null;
        this.LogDirectory = null;
        this.MaxBackup = null;
        this.FileMaxSize = null;
        this.MaxAge = null;
    }

    async Init() {
    
        const logOptions = {
            level: this.LogLevel || 'info'
            // prettyPrint: this.ConsoleEnabled,
        };
    
        if (this.FileEnabled) {
            try {
                await fs.promises.mkdir(this.LogDirectory, { mode: 0o744, recursive: true });
            } catch (err) {
                console.error(`can't create log directory at ${this.LogDirectory}`, err);
                throw err;
            }
            logOptions.extreme = pinoRotatingFile({
                filename: path.join(this.LogDirectory, this.LogFilename),
                size: this.FileMaxSize,
                interval: this.MaxAge,
                path: this.LogDirectory,
                rotate: this.MaxBackup,
            });
            this.Logger = pino(logOptions);
        } else {
            this.Logger = pino(logOptions); 
        }
    }
    

    error(...args) {
        this.Logger.error(...args);
    }

    warn(...args) {
        this.Logger.warn(...args);
    }

    info(...args) {
        this.Logger.info(...args);
    }

    debug(...args) {
        this.Logger.debug(...args);
    }

    trace(...args) {
        this.Logger.trace(...args);
    }
}

export default Zerolog;
