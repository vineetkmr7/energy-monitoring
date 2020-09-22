const Constants = require('../constants/constants');

function get() {
    let obj = {
        "message": this.message,
        "code": this.code
    };
    return obj;
}

function stringify() {
    return JSON.stringify(this.get());
}

let objFunc = {
    get: get,
    stringify: stringify
};

module.exports = {
    NAME_REQUIRED : {
        "message": Constants.NAME_REQUIRED,
        "code": 400,
        ...objFunc
    },
    INVALID_DEVICE_STATUS : {
        "message": Constants.INVALID_DEVICE_STATUS,
        "code": 400,
        ...objFunc
    },
    USER_NOT_EXIST : {
        "message": Constants.USER_NOT_EXIST,
        "code": 422,
        ...objFunc
    },
    INVALID_CREDENTIALS: {
        "message": Constants.INVALID_CREDENTIALS,
        "code": 400,
        ...objFunc
    },
    // INVALID_EMAIL_REGISTER: {
    //     "message": Constants.INVALID_EMAIL_REGISTER,
    //     "code": 400,
    //     ...objFunc
    // },
    // INVALID_PASSWORD_REGISTER: {
    //     "message": Constants.INVALID_PASSWORD_REGISTER,
    //     "code": 400,
    //     ...objFunc
    // },
    // INVALID_PASSWORD_LOGIN: {
    //     "message": Constants.INVALID_PASSWORD_LOGIN,
    //     "code": 400,
    //     ...objFunc
    // },
    // INVALID_EMAIL_LOGIN: {
    //     "message": Constants.INVALID_EMAIL_LOGIN,
    //     "code": 400,
    //     ...objFunc
    // },
    USER_EXIST: {
        "message": Constants.USER_EXIST,
        "code": 400,
        ...objFunc
    },
    INVALID_USER_ID: {
        "message": Constants.INVALID_USER_ID,
        "code": 400,
        ...objFunc
    },
    UNAUTHORIZED_ACCESS: {
        "message": Constants.UNAUTHORIZED_ACCESS,
        "code": 401,
        ...objFunc
    },
    INTERNAL_SERVER_ERROR: {
        "message": Constants.INTERNAL_SERVER_ERROR,
        "code": 500,
        ...objFunc
    }
}