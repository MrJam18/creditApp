const { Courts, CourtLevels, CourtTypes } = require("../models/models");
const { Op } = require("sequelize");
const adressController = require("./adressController");
const ApiError = require("../error/apiError");

class CourtsController{

async findByName (req, res, next) {
    try {
        const {find} = req.query;
        const regExp = `%${find}%`.toLowerCase();
        const courts = await Courts.findAll({limit: 5,
            where: {
            name:{
                [Op.iLike]: regExp
            } 
        }})
        return res.json(courts);
    }
    catch(e) {
        console.log(e);
        next(ApiError.badRequest(e));
    }
}
async getLevels(req,res,next) {
    try{
        const levels = await CourtLevels.findAll();
        return res.json(levels);
    }
    catch(e) {
        next(ApiError.badRequest(e));
    }
}
async getTypes(req,res,next) {
    try{
        const types = await CourtTypes.findAll();
        return res.json(types);
    }
    catch(e) {
        next(ApiError.badRequest(e));
    }
}
 async create(req, res, next) {
     try{
        const body = req.body;
        const address = await adressController.getOrCreateAddressIdsFromDB(body.address);
        const court = {
            ...body.court,
            ...address,
            address: undefined
        }
        const DBResponse = await Courts.create(court);
        res.json(DBResponse);
     }
     catch(e) {
        res.json(e)
        next(ApiError.badRequest(e));
    }

 }
}


module.exports = new CourtsController();