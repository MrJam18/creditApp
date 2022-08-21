const ApiError = require('../error/apiError');
const {Users, OrgTypes} = require('../models/models');
const Organizations = require('../models/subjects/Organizations');
// const {Organizations} = require('../models/models');
const uuid = require('uuid');
const path = require('path');




class SettingsController {
    async createUser(req,res,next) {
        // try {
        //     // const {name, surname, position, email, phone_number} = req.body;
        //     const reqData = req.body;
        //     const imgData = req.files?.img;
        //     let img;   
        //     console.log(req.body);
        //     if (imgData) {
        //         img = uuid.v4() + '.jpg';
        //         imgData.mv(path.resolve(__dirname, '..', 'static/images', img));
        //     }
        //     const user = await Users.create({...reqData, img});
        //     return res.json(user);
        // }
        // catch(e) {
        //     next(ApiError.badRequest(e));
        // }
        console.log(req.body);
        

    }
    async createOrganization(req, res) {
        try {
            const reqData = req.body;
            const organization = await Organizations.create({...reqData}); //stop point. Need work with adress controller.
            return res.json(organization);
        }
        catch(e) {
            next(ApiError.badRequest(e));
        }
    }
    getAll(req,res) {
    }
    getStatus(req, res) {

    }

    async createOrgType (req, res, next) {
        try {
            const {name} = req.body;
            const orgType = await OrgTypes.create({name});
            return res.json(orgType);
        }
        catch(e) {
            next(ApiError.badRequest(e));
        }
    }
    
}


module.exports = new SettingsController();