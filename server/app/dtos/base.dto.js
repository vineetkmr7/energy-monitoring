class BaseDTO {

    status;
    code;
    message;
    response;

    // set status(status) {
    //     this._status = status;
    // }

    // get status(){
    //     return this._status;
    // }

    // set code(code){
    //     this._code = code;
    // }

    // get code(){
    //     return this._code;
    // }

    // set message(message){
    //     this._message = message;
    // }

    // get message(){
    //     return this._message;
    // }

    // set response(response){
    //     this._response = response;
    // }

    // get response(){
    //     return this._response;
    // }

    setResponseData(status, message, response, code = 500) {
        this.status = status;
        this.message = message;
        this.response = response;
        if (!this.code)
            this.code = code;
    }
}

module.exports = BaseDTO;