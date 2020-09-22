const { UserService } = require('../services');
const Constants = require('../constants/constants');
const BaseDTO = require('../dtos/base.dto');
const Http = require('../http');

class UserController {
    static async registerUser(req, res, next) {

        const body = req.body;
        let baseResponse = new BaseDTO();
        try {
            const user = {};
            if (!body.email) {
                baseResponse.code = 400;
                throw new Error(Constants.EMAIL_REQUIRED);
            } else {
                user.email = body.email;
            }
            if (!body.password) {
                baseResponse.code = 400;
                throw new Error(Constants.PASSWORD_REQUIRED);
            } else {
                user.password = body.password;
            }
            if (body.name) {
                if (String(body.name).trim().length >= 2) {
                    user.name = body.name;
                } else {
                    baseResponse.code = 400;
                    throw new Error(Constants.INVALID_NAME_LENGTH);
                }
            }

            const result = await UserService.registerUser(user);
            const token = await result.generateAuthToken();
            baseResponse.setResponseData(true, Constants.USER_REGISTERED, { user: result, token }, 201);

        } catch (err) {
            baseResponse.setResponseData(false, err.message, err);
        } finally {
            res.status(baseResponse.code).json(baseResponse);
        }

    }

    // static async getAllUsers(req, res, next) {
    //     let baseResponse = new BaseDTO();
    //     try {
    //         const result = await UserService.getAllUser();
    //         baseResponse.setResponseData(true, Constants.USERS_FETCHED, result, 200);
    //     } catch (err) {
    //         baseResponse.setResponseData(false, err.message, err);
    //     } finally {
    //         res.status(baseResponse.code).json(baseResponse);
    //     }
    // }

    static async getUser(req, res, next) {
        let baseResponse = new BaseDTO();
        try {
            baseResponse.setResponseData(true, Constants.USERS_FETCHED, req.user, 200);
        } catch (err) {
            baseResponse.setResponseData(false, err.message, err);
        } finally {
            res.status(baseResponse.code).json(baseResponse);
        }
    }

    static async updateUser(req, res, next) {
        const body = req.body;

        let baseResponse = new BaseDTO();
        try {
            const user = {};
            if (body.email) {
                baseResponse.code = 400;
                throw new Error(Constants.EMAIL_CANNOT_BE_UPDATED);
            }
            if (body.password) {
                if (String(body.password).trim().length >= 6) {
                    user.password = body.password;
                } else {
                    baseResponse.code = 400;
                    throw new Error(Constants.PASSWORD_TOO_SHORT);
                }
            }
            if (body.name) {
                if (String(body.name).trim().length >= 2) {
                    user.name = body.name;
                } else {
                    baseResponse.code = 400;
                    throw new Error(Constants.INVALID_NAME_LENGTH);
                }
            }

            if (Object.keys(user).length === 0) {
                baseResponse.code = 400;
                throw new Error(Constants.NOTHING_TO_UPDATE);
            }
            for (const key in user) {
                req.user[key] = user[key];
            }

            const result = await UserService.saveUser(req.user);

            baseResponse.setResponseData(true, Constants.USER_UPDATED, result, 200);

        } catch (err) {
            baseResponse.setResponseData(false, err.message, err);
        } finally {
            res.status(baseResponse.code).json(baseResponse);
        }
    }

    static async login(req, res, next) {
        const body = req.body;

        let baseResponse = new BaseDTO();
        try {
            if (!body.email) {
                baseResponse.code = 400;
                throw new Error(Constants.EMAIL_REQUIRED);
            }
            if (!body.password) {
                baseResponse.code = 400;
                throw new Error(Constants.PASSWORD_REQUIRED);
            }

            const result = await UserService.findUserByCredentials(body.email, body.password);
            const token = await result.generateAuthToken();
            baseResponse.setResponseData(true, Constants.USER_LOGGED_IN, { user: result, token }, 200);

        } catch (err) {
            baseResponse.code = 400;
            baseResponse.setResponseData(false, err.message, err);
        } finally {
            res.status(baseResponse.code).json(baseResponse);
        }
    }

    static async deleteUser(req, res, next) {
        let baseResponse = new BaseDTO();
        try {

            const result = await UserService.removeUser(req.user);

            baseResponse.setResponseData(true, Constants.USER_DELETED, result, 200);

        } catch (err) {
            baseResponse.setResponseData(false, err.message, err);
        } finally {
            res.status(baseResponse.code).json(baseResponse);
        }
    }

    static async logout(req, res, next) {
        const baseResponse = new BaseDTO();
        try {
            req.user.tokens = req.user.tokens.filter((token) => {
                return token.token !== req.token;
            });
            const result = await UserService.saveUser(req.user);
            baseResponse.setResponseData(true, Constants.USER_LOGGED_OUT, result, 200);
        } catch (err) {
            baseResponse.setResponseData(false, err.message, err);
        } finally {
            res.status(baseResponse.code).json(baseResponse);
        }
    }

    static async logoutAll(req, res, next) {
        const baseResponse = new BaseDTO();
        try {
            req.user.tokens = [];
            const result = await UserService.saveUser(req.user);
            baseResponse.setResponseData(true, Constants.USER_LOGGED_OUT, result, 200);
        } catch (err) {
            baseResponse.setResponseData(false, err.message, err);
        } finally {
            res.status(baseResponse.code).json(baseResponse);
        }
    }
}

module.exports = UserController;