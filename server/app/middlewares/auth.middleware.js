const BaseDTO = require('../dtos/base.dto');
const Constants = require('../constants/constants');
const jwt = require('jsonwebtoken');
const { UserService } = require('../services');
const { User } = require('../models');
const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const decoded = jwt.verify(token, _config[_config.node_env].jwt_encryption);
        const user = await UserService.findUserWithToken(decoded._id, token);
        if (!user) {
            throw new Error(Constants.AUTHENTICATION_REQUIRED);
        }
        req.user = user;
        req.token = token;

        next();
    } catch (err) {
        const baseResponse = new BaseDTO();
        baseResponse.setResponseData(false, Constants.AUTHENTICATION_REQUIRED, err, 401);
        res.status(baseResponse.code).json(baseResponse);
    }
};
module.exports = auth;