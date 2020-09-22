
class Response {

    constructor(resObject, status, data) {
        this.res = resObject;
        this.status = status;
        this.data = data;
    }

    send() {
        this.res.status(this.status).send(this.data);
    }

}

module.exports = Response;