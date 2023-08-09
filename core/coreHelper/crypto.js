const crypto = require('crypto');

function sha256(s) {
    const hash = crypto.createHash('sha256');
    hash.update(s);
    return hash.digest('hex');
}

module.exports = {
    sha256
};
