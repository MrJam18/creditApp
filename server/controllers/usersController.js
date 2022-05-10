const ApiError = require("../error/apiError");
const userService = require('../services/userService');

class UsersController {
    async login(req, res, next) {
        try{
            const { email, password } = req.body;
            const userData = await userService.login(email, password);
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 864000000, httpOnly: true});
            return res.json(userData);
           
        }
    catch(e) {
        console.log(e);
        next(ApiError.UnauthorizedError());
    }
    }
    // async registration(req, res, next) {
    //     try{
    //         const user = {...req.body};
    //         if(user.password.length < 8 || !/\d/.test(user.password) || /[^a-zA-Z]/.test(user.password)) {
    //             next(ApiError.badRequest('пароль не соответствует требованиям безопасности!'));
    //         }
    //         const userData = await userService.registration(user);
    //         await res.cookie('refreshToken', userData.refreshToken, {maxAge: 864000000, httpOnly: true});
    //         return res.json(userData);
    //     }
    // catch(e) {
    //     console.log(e);
    //     next(ApiError.internal(e.message));
    // }
    // }
    async logout(req, res, next) {
        try{
            const {refreshToken} = req.cookies;
            const token = await userService.logout(refreshToken);
            res.clearCookie('refreshToken');
            return res.json({status: 200})
        }
        catch(e) {
            console.log(e);
            next(ApiError.internal(e.message));
        }
    }
    async refresh(req, res, next) {
        try{
            const {refreshToken} = req.cookies;
            const userData = await userService.refresh(refreshToken);
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 864000000, httpOnly: true});
            return res.json(userData);

        }
        catch(e) {
            console.log(e);
            next(ApiError.internal(e.message));
        }
    }

}

module.exports = new UsersController;