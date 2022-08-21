const ApiError = require("../error/apiError");
const { Bailiffs } = require("../models/subjects/Bailiffs");
const { Op } = require("sequelize");
// const { getOrCreateAddressIdsFromDB } = require('./adressController');
const Address = require("../classes/Address");

class BailiffsController{

async searchBailiffs (req, res, next) {
        try {
        const searchString = req.query.searchString;
        let bailiffs = await Bailiffs.findAll({limit: 5, attributes: ['id', 'name'], where: {
            name: {
                [Op.iLike]: `%${searchString}%`
            }
        }})
        res.json(bailiffs);
        }
        catch(e) {
            console.log(e);
            next(ApiError.badRequest(e));
        }
    }
async createOne(req, res, next) {
    try{
        const body = req.body;
        const address = await Address.getIds(body.address);
        await Bailiffs.create({...address, name: body.name});
        res.json({status: 'ok'});
    }
    catch(e) {
        console.log(e);
        next(ApiError.badRequest(e));
    }
}
}


module.exports = new BailiffsController();