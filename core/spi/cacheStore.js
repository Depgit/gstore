class CacheStore {
    async init() {
        throw new Error("init method not implemented");
    }

    async get(key) {
        throw new Error("get method not implemented");
    }

    async set(key, value, ttl) {
        throw new Error("set method not implemented");
    }

    async delete(key) {
        throw new Error("delete method not implemented");
    }

    async scan(prefix) {
        throw new Error("scan method not implemented");
    }

    async incr(prefix) {
        throw new Error("incr method not implemented");
    }
}

module.exports = CacheStore;
