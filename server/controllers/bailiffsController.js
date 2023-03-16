const ApiError = require("../error/apiError");
const Bailiffs = require("../models/subjects/Bailiffs");
const { Op } = require("sequelize");
const AddressBuilder = require("../Builders/AddressBuilder");

class BailiffsController{

async searchBailiffs (req, res, next) {
        try {
        const searchString = req.query.value;
        let bailiffs = await Bailiffs.findAll({limit: 5, attributes: ['id', 'name'], where: {
            name: {
                [Op.iLike]: `%${searchString}%`
            }
        }})
        res.json(bailiffs);
        }
        catch(e) {
            next(e);
        }
    }
async createOne(req, res, next) {
    try{
        const body = req.body;
        const address = await  AddressBuilder.build(body.address);
        const bailiff = await Bailiffs.create({...address, name: body.name});
        res.json({id: bailiff.id, name: bailiff.name});
    }
    catch(e) {
        console.log(e);
        next(ApiError.badRequest(e));
    }
}
}


module.exports = new BailiffsController();