const {  CourtLevels, CourtTypes } = require("../models/connections");
const { Op } = require("sequelize");
const ApiError = require("../error/apiError");
const Courts = require('../models/subjects/Courts');
const AddressBuilder = require("../Builders/AddressBuilder");

class CourtsController{

async findByName (req, res, next) {
    try {
        const { value } = req.query;
        const regExp = `%${value}%`.toLowerCase();
        const courts = await Courts.findAll({limit: 5,
            where: {
            name:{
                [Op.iLike]: regExp
            }
        },
            attributes: ['id', 'name']
        })
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
        const address = await AddressBuilder.build(body.address);
        const court = {
            ...body.court,
            ...address,
            address: undefined
        }
        const DBResponse = await Courts.create(court);
        res.json(DBResponse);
     }
     catch(e) {
         console.log(e.name);
         if(e.name === 'SequelizeUniqueConstraintError') e.message = 'Суд с таким именем уже существует.';
        next(e);
    }

 }
}


module.exports = new CourtsController();