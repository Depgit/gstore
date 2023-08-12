class Error {
    constructor(code, msg) {
        this.code = code;
        this.msg = msg;
    }
}

class CommonError {
    constructor(errors) {
        this.errors = errors;
    }
}

class Response {
    constructor(status, response, errors) {
        this.status = status;
        this.response = response;
        this.errors = errors;
    }
}

class HTTPResponse {
    constructor(status, body) {
        this.status = status;
        this.body = body;
    }
}

class ServiceResponse {
    constructor(status, data, errorMsg) {
        this.status = status;
        this.data = data;
        this.errorMsg = errorMsg;
    }
}

class GetFileResponse {
    constructor(status, response, mimeType, errors) {
        this.status = status;
        this.response = response;
        this.mime_type = mimeType;
        this.errors = errors;
    }
}

function createError(code, msg) {
    return [new Error(code, msg)];
}

function jsonResponseTemplate(status, response, errors) {
    return new Response(status, response, errors);
}

export default {
    Error,
    CommonError,
    Response,
    HTTPResponse,
    ServiceResponse,
    GetFileResponse,
    createError,
    jsonResponseTemplate
};
