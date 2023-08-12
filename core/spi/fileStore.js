class FileStoreData {
    constructor() {
        this.key = "";
        this.name = "";
        this.body = "";
        this.bodyStream = null;
    }
}

class FileStoreResponse {
    constructor() {
        this.status = 0;
        this.key = "";
        this.body = "";
        this.bodyStream = null;
        this.meta = null;
    }
}

class FileStore {
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

export default {
    FileStoreData,
    FileStoreResponse,
    FileStore
};
