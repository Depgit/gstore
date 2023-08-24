class CacheOtp {
    constructor() {
        this.UserId = null;
        this.Otp = null;
    }

    fromString(s) {
        try {
            const parsedData = JSON.parse(s);
            if (parsedData.user_id !== undefined) {
                this.UserId = parsedData.user_id;
            }
            if (parsedData.otp !== undefined) {
                this.Otp = parsedData.otp;
            }
        } catch (error) {
            return error;
        }
        return null;
    }

    toString() {
        try {
            const val = JSON.stringify({
                user_id: this.UserId,
                otp: this.Otp
            });
            return val;
        } catch (error) {
            return error;
        }
    }
}

export default CacheOtp;
