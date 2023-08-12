import { createHash } from 'crypto';

function sha256(s) {
    const hash = createHash('sha256');
    hash.update(s);
    return hash.digest('hex');
}

export default {
    sha256
};
