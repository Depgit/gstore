class SmsData {
    constructor() {
        this.send_to = "";
        this.msg = "";
        this.otp = "";
        this.dlt_template_id = "";
    }
}

class SmsResponse {
    constructor() {
        this.error = null;
        this.id = "";
        this.meta = null;
    }
}

class SmsError {
    constructor() {
        this.msg = "";
    }
}

class SmsInterface {
    async sendOtp(d) {
        throw new Error("sendOtp method not implemented");
    }

    async sendMsg(d) {
        throw new Error("sendMsg method not implemented");
    }
}

module.exports = {
    SmsData,
    SmsResponse,
    SmsError,
    SmsInterface
};
