const jwt = require('jsonwebtoken');
const { Tokens } = require('../models/models');
const { accessSecret, refreshSecret } = require('../utils/accessSecret');

class TokenService {
    generateTokens(payload) {
        const accessToken = jwt.sign(payload, accessSecret, {expiresIn: '30m'});
        const refreshToken = jwt.sign(payload, refreshSecret, {expiresIn: '10d'});
        return { accessToken, refreshToken }
    }
    async saveToken(userId, refreshToken) {
        const tokenData = await Tokens.findOne({
            where: { userId }
        })
        if (tokenData) {
            tokenData.token = refreshToken;
           return await tokenData.save();
        }
        const token = await Tokens.create({userId, token: refreshToken});
        return token;
    }
    async removeToken(refreshToken) {
        const token = await Tokens.destroy({
            where: {
                token: refreshToken
            }
        })
        return token;
    }
    validateAccessToken(token) {
        try{
            const userData = jwt.verify(token, accessSecret);
            return userData;
        }
        catch{
            return null;
        }
    }
    validateRefreshToken(token) {
        try{
            const userData = jwt.verify(token, refreshSecret);
            return userData;
        }
        catch{
            return null;
        }
    }
    async findToken(refreshToken) {
        const token = await Tokens.findOne({
            where: {
                token: refreshToken
            }
        })
        return token;
    }

}

module.exports = new TokenService();