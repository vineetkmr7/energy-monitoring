const BaseDTO = require('./base.dto');

class UserDTO extends BaseDTO {

    set email(email) {
        this._email = email;
    }
    get email() {
        return this._email;
    }

    set token(token) {
        this._token = token;
    }

    get token() {
        return this._token;
    }
}

module.exports = UserDTO;