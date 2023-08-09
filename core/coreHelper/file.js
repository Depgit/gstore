const fs = require('fs');
const FileType = require('file-type');

async function readFile(path) {
    try {
        const content = await fs.promises.readFile(path);
        return content;
    } catch (err) {
        throw err;
    }
}

async function getMime(d) {
    try {
        const fileType = await FileType.fromBuffer(d);
        if (!fileType) {
            return "application/octet-stream";
        }
        return fileType.mime;
    } catch (err) {
        return "application/octet-stream";
    }
}

module.exports = {
    readFile,
    getMime
};
