const crypto = require('crypto');

const otpBytes = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];

function generateOtp(max) {
    const buffer = crypto.randomBytes(max);
    const otp = Buffer.alloc(max);

    for (let i = 0; i < max; i++) {
        otp[i] = otpBytes[buffer[i] % otpBytes.length].charCodeAt(0);
    }

    return otp.toString();
}

module.exports = {
    generateOtp
};
