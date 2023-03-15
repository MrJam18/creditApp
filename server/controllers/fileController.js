const ApiError = require('../error/apiError');
const {Users, OrgTypes} = require('../models/models');
const {Organizations} = require('../models/models');
const uuid = require('uuid');
const path = require('path');




class SettingsController {
    async sendFileInner(path) {
        try{
            
        }
        catch(e)

    }
    
    async sendFile (req, res, next) {
        try {
            const 
        }
        catch(e) {
            next(ApiError.badRequest(e));
        }
    }
    
}


module.exports = new SettingsController();