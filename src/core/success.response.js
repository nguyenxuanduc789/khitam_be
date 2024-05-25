'use strict'

const StatusCode = {
    OK: 200,
    CREATED: 201
}
const ReasonStatusCode = {
    CREATED: 'Created',
    OK: "Success"
}
class SuccessResponse {
    constructor({ message, statusCode = StatusCode.OK, reasonStatusCode = ReasonStatusCode.OK, data = {} }) {
        this.message = !message ? reasonStatusCode : message;
        this.status  = statusCode;
        this.data = data;
    }
    send(res, headers = {}) {
        return res.status(this.status).json( this )
    }
}

class OK extends SuccessResponse {
    constructor(message, data) {
        super({ message, data });

    }

}
class CREATED extends SuccessResponse {
    constructor({ options = {}, message, statusCode = StatusCode.CREATED, reasonStatusCode = ReasonStatusCode.CREATED, data }) {
        super({ message, statusCode, reasonStatusCode, data });
        this.options = options;
    }
}
module.exports = {
    OK, CREATED,
    SuccessResponse
}