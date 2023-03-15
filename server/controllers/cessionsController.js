const {chandeDateFormat} = require("../utils/dates/changeDateFormat");
const ApiError = require("../error/apiError");
const { Cessions, Organizations } = require("../models/models");
const { Op } = require("sequelize");

class CessionsController {
    async getNameList(req, res, next) {
        const {value} = req.query;
        try{
           const data = await Cessions.findAll({limit: 5, attributes: ['id', 'name', 'number', 'transferDate'], where: {
            name:{
                [Op.iLike]: `%${value}%`   
               }
           }, include: [{model: Organizations, as: 'assignor' , attributes: ['name', 'short']}, {model: Organizations, as: 'assignee', attributes: ['name', 'short']}], });
           const nameList = data.reduce((acc, el)=> {
            let name;
            if (el.name) name = el.name;
            else if (el.assignor.short && el.assignee.short) name = `дог. № ${el.number} от ${chandeDateFormat(el.transferDate)} г. ${el.assignor.short} - ${el.assignee.short}`;
            else if(el.assignor.short) name = `дог. № ${el.number} от ${chandeDateFormat(el.transferDate)} г. ${el.assignor.short} - ${el.assignee.name}`;
            else if(el.assignee.short) name = `дог. № ${el.number} от ${chandeDateFormat(el.transferDate)} г. ${el.assignor.name} - ${el.assignee.short}`;
            else name = `дог. № ${el.number} от ${chandeDateFormat(el.transferDate)} г. ${el.assignor.name} - ${el.assignee.name}`;
            acc.push({name, id: el.id});
            return acc;
           },[])
           res.json(nameList);
        }
    catch(e) {
        console.log(e);
        next(ApiError.internal(e.message));
    }
    }
}

module.exports = new CessionsController;