class MemoryData {
    constructor() {
        this.key = "";
        this.name = "";
        this.body = "";
        this.bodyStream = null;
    }
}

class MemoryResponse {
    constructor() {
        this.key = "";
        this.body = "";
        this.bodyStream = null;
        this.meta = null;
    }
}

class MemoryStore {
    async init() {
        throw new Error("init method not implemented");
    }

    async add(s) {
        throw new Error("add method not implemented");
    }

    async delete(key) {
        throw new Error("delete method not implemented");
    }

    async get(key) {
        throw new Error("get method not implemented");
    }

    async getAll() {
        throw new Error("getAll method not implemented");
    }

    async listAll() {
        throw new Error("listAll method not implemented");
    }
}

module.exports = {
    MemoryData,
    MemoryResponse,
    MemoryStore
};
