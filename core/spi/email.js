class EmailData {
    constructor() {
        this.receivers = [];
        this.cc = [];
        this.reply_to = null;
        this.sender = new EmailDataInfo();
        this.content = new EmailDataContent();
        this.subject = "";
    }
}

class EmailDataContent {
    constructor() {
        this.type = "";
        this.value = "";
    }
}

class EmailDataInfo {
    constructor() {
        this.email = "";
        this.name = "";
    }
}

class EmailResponse {
    constructor() {
        this.error = null;
        this.id = "";
        this.meta = null;
    }
}

class EmailError {
    constructor() {
        this.msg = "";
    }
}

class EmailInterface {
    async send(d) {
        throw new Error("send method not implemented");
    }
}

export default {
    EmailData,
    EmailDataContent,
    EmailDataInfo,
    EmailResponse,
    EmailError,
    EmailInterface
};
