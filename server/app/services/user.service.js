const { User } = require('../models');
const Constants = require('../constants/constants');
const Http = require('../http');
const DTOs = require('../dtos');

class UserService {
    static async registerUser(userData) {
        const userExist = await User.countDocuments({ email: userData.email });
        if (userExist) {
            throw new Error(Constants.USER_EXIST);
        }

        const user = new User(userData);

        return await user.save();
    }

    static async updateUser(id, userData) {
        const user = await User.findById({ _id: id });
        for (const prop in userData) {
            user[prop] = userData[prop];
        }
        return await user.save();
    }

    static async getAllUser() {
        return await User.find({});
    }

    static async getUser(id) {
        const user = await User.findOne({ _id: id });
        console.log("user => ", user);
        return user;
    }

    static async findUserByCredentials(email, password) {
        return await User.findByCredentials(email, password);
    }

    static async deleteUser(id) {
        return await User.findByIdAndDelete({ _id: id });
    }

    static async findUserWithToken(id, token) {
        return await User.findOne({ _id: id, 'tokens.token': token });
    }

    static async saveUser(user) {
        return await user.save();
    }

    static async removeUser(user) {
        return await user.remove();
    }
}
module.exports = UserService