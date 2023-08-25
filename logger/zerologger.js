import winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';
import path from 'path';
import fs from 'fs'
import CsvFormat from 'winston-csv-format';


class Zerolog {
    constructor() {
        this.Logger = null;
        this.LogLevel = null;
        this.ConsoleEnabled = false;
        this.FileEnabled = false;
        this.LogFilename = null;
        this.LogDirectory = null;
        this.MaxBackup = null;
        this.FileMaxSize = null;
        this.MaxAge = null;
    }

    async Init() {
        const logOptions = {
            level: this.LogLevel || 'info',
            format: winston.format.printf(({ timestamp, level, message ,context}) => {
                return `${timestamp}, ${level}, ${message},${context}`;
            })
        };

        if (this.FileEnabled) {
            try {
                await fs.promises.mkdir(this.LogDirectory, { mode: 0o744, recursive: true });
            } catch (err) {
                console.error(`can't create log directory at ${this.LogDirectory}`, err);
                throw err;
            }
            logOptions.transports = [
                new DailyRotateFile({
                    filename: path.join(this.LogDirectory, this.LogFilename),
                    maxSize: this.FileMaxSize,
                    maxFiles: this.MaxBackup,
                    datePattern: 'YYYY-MM-DD',
                    format: winston.format.combine(
                        winston.format.timestamp(),
                        winston.format.printf(({ timestamp, level, message ,context}) => {
                            return `${timestamp}, ${level}, ${message},${context}`;
                        })
                    ),
                }),
            ];
        }

        this.Logger = winston.createLogger(logOptions);
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
        this.Logger.verbose(...args);
    }
}

export default Zerolog;
