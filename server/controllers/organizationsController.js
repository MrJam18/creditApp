const ApiError = require("../error/apiError");
const { Organizations } = require("../models/models");
const { Op } = require("sequelize");
const getArrayFromString = require("../utils/getArrayFromString");
const countOffset = require("../utils/countOffset");
const { getOrCreateAddressIdsFromDB } = require("./adressController");
const getFullAddressWithoutInclude = require("../utils/adress/getFullAddressWithoutInclude");

class OrganizationsController {
    async getNameList(req, res, next) {
        const { value } = req.query;
        const groupId = req.user.groupId;
        try{
           const data = await Organizations.findAll({limit: 5, where:{
            [Op.or]: [{
                name:{
                    [Op.iLike]: `%${value}%`   
                   },
                },
                {
                short: {
                  [Op.iLike]: `%${value}%` 
                }
               },
              ],
            groupId
           }, attributes: ['id', 'name', 'short', 'INN'] });
           const nameList = data.reduce((acc, el)=> {
            let name;
            if (el.short) name = el.short + ", ИНН: " +  el.INN;
            else name = el.name;
            acc.push({name, id: el.id, INN: el.INN});
            return acc;
           },[])
           res.json(nameList);
        }
    catch(e) {
        console.log(e);
        next(ApiError.internal(e.message));
    }
    }
    async getList(req, res, next) {
        try{
        const {order, limit, page} = req.query;
        const groupId = req.user.groupId;
        const orderArray = getArrayFromString(order);
        const offset = countOffset(limit, page);
        const organizations = await Organizations.findAndCountAll({limit, offset, order: [orderArray], where: {
            groupId
        }})
        let rows = [];
        for(const el of organizations.rows) {
            let element = el.get({plain: true});
            const fullAddress = await getFullAddressWithoutInclude(el);
            element = {
               name: element.name,
               short: element.short,
               INN: element.INN,
               KPP: element.KPP,
               fullAddress,
               requisits: element.requisits,
               createdAt: element.createdAt,
               id: element.id
            }
            rows.push(element);
        }
        res.json({rows, count: organizations.count });
    }
    catch(e) {
        console.log(e);
        next(ApiError.internal(e.message));
    }
    }
    async addOne(req, res, next) {
        try{
            const body = req.body;
            const organization = req.body.organization;
            if(organization.short == '') {
                organization.short = null;
            }
            if(organization.KPP == '') {
                organization.KPP = null;
            }
            if(organization.requisits == '') {
                organization.requisits = null;
            }
            const groupId = req.user.groupId;
            const address = await getOrCreateAddressIdsFromDB(body.address);
            await Organizations.create({
                ...address, ...body.organization, groupId
            })
            res.json({status: 'ok'});
        }
        catch(e) {
            console.log(e);
            next(ApiError.internal(e.message));
        }
    }
    async changeOne(req,res,next) {
        try{
        const body = req.body;
        const organization = body.organization;
        const userId = req.user.id;
            if(organization.short == '') {
                organization.short = null;
            }
            if(organization.KPP == '') {
                organization.KPP = null;
            }
            if(organization.requisits == '') {
                organization.requisits = null;
            }
            
            if(body.address) {
                const address = await getOrCreateAddressIdsFromDB(body.address);
                await Organizations.update({
                    ...address, ...body.organization, userId
                },{where: {
                    id: body.id
                }});
            }
            else {
                await Organizations.update({
                    ...body.organization, userId
                },{where: {
                    id: body.id
                }});
            }
            res.json({status: 'ok'});
        }
        catch(e) {
            console.log(e);
            next(ApiError.internal(e.message));
        }
    }
    async deleteOne(req, res, next) {
        try{
            const id = req.body.id;
            const userId = req.user.id;
            await Organizations.destroy({
                where: {
                    id, userId
                }
            })
            res.json({status: 'ok'});
        }
        catch(e) {
            console.log(e);
            next(ApiError.internal(e.message));
        }
    }
}

module.exports = new OrganizationsController;