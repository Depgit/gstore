class Log {
    constructor() {
        this.type = 0;
        this.meta = null;
        this.msg = null;
    }
}

class Logger {
    async init() {
        throw new Error("init method not implemented");
    }

    debug(...args) {
        throw new Error("debug method not implemented");
    }

    info(...args) {
        throw new Error("info method not implemented");
    }

    warn(...args) {
        throw new Error("warn method not implemented");
    }

    error(...args) {
        throw new Error("error method not implemented");
    }

    fatal(...args) {
        throw new Error("fatal method not implemented");
    }

    panic(...args) {
        throw new Error("panic method not implemented");
    }
}

export default {
    Log,
    Logger
};
