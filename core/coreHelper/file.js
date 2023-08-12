import { promises } from 'fs';
import * as fileTpe from 'file-type';

async function readFile(path) {
    try {
        const content = await promises.readFile(path);
        return content;
    } catch (err) {
        throw err;
    }
}

async function getMime(d) {
    try {
        const fileType = await fileTpe.detect(d);
        if (!fileType) {
            return "application/octet-stream";
        }
        return fileType.mime;
    } catch (err) {
        return "application/octet-stream";
    }
}

export default {
    getMime,
    readFile
}