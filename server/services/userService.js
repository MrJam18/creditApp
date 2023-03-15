const ApiError = require("../error/apiError");
const { Users, Groups } = require("../models/models");
const bcrypt = require('bcrypt');
const tokenService = require('../services/tokenService');
const UserDTO = require('../services/user-dto');

class UserService {
    async registration(email, password, role, name, surname, position, groupId) {
            if(password.length < 8 || !/\d/.test(password) || !/[a-zA-Z]/.test(password)) {
                return console.log('пароль не соответствует требованиям безопасности!')
            }
            const candidate = await Users.findOne({
                where: {
                    email
                }
            });
            if (candidate) {
                throw ApiError.badRequest(`Пользователь с email ${email} уже существует!`);
            }
            if(!groupId) {
                const group = await Groups.create({name: `${name} ${surname}`});
                groupId = group.id;
            } 
            const hashPassword = await bcrypt.hash(String(password), 3);
            const user = await Users.create({role, name, surname, position, email, password: hashPassword, groupId});
            const userDto = new UserDTO(user);
            const tokens = tokenService.generateTokens(({...userDto}));
            await tokenService.saveToken(user.id, tokens.refreshToken);
            return {
                ...tokens, user: userDto
            }
    }
    async login(email, password) {
        const user = await Users.findOne({ where: {
            email
        }})
        if( !user ) {
            throw new Error('Пользователь с таким email не зарегистрирован!');
        }
        const isPassEquals = await bcrypt.compare(password, user.password);
        if(!isPassEquals) {
            throw new Error('Неверный пароль');
        }
        const userDto = new UserDTO(user);
        const tokens = tokenService.generateTokens(({...userDto}));
            await tokenService.saveToken(user.id, tokens.refreshToken);
            return {
                ...tokens, user: userDto
            }
    }
    async logout(refreshToken) {
        const token = await tokenService.removeToken(refreshToken)
        return token;
    }
    async refresh(refreshToken) {
        if(!refreshToken) throw ApiError.UnauthorizedError();
        const userData = tokenService.validateRefreshToken(refreshToken);
        const tokenFromDB = await tokenService.findToken(refreshToken);
        if( !userData || !tokenFromDB ) throw ApiError.UnauthorizedError();
        const user = await Users.findByPk(userData.id);
        const userDto = new UserDTO(user);
        const tokens = tokenService.generateTokens(({...userDto}));
            await tokenService.saveToken(user.id, tokens.refreshToken);
            return {
                ...tokens, user: userDto
            }

    }
}

module.exports = new UserService();