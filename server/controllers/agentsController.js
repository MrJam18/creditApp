const { Op } = require("sequelize");
const ApiError = require('../error/apiError');
const Agents = require('../models/subjects/Agents');
const changeAddressOnFullinArray = require('../utils/adress/changeAddressOnFullinArray');
const countOffset = require('../utils/countOffset');
const getArrayFromString = require('../utils/getArrayFromString');
const setFalseDefaultsInGroup = require('../utils/setFalseDefaultsInGroup');
const getFullName = require('../utils/getFullName');
const getWherePropertyWhenSearchFIO = require("../utils/getWherePropertyWhenSearchFIO");
const getAgentByGroupOrUser = require("../utils/getAgentByGroupOrUser");
const changeFIOOnFullName = require("../utils/changeFIOOnFullName");
const AddressBuilder = require("../Builders/AddressBuilder");



class AgentsController {
   async getList(req,res, next) {
        try {
            const { page, limit, order } = req.query;
            const groupId = req.user.groupId;
            const userId = req.user.id;
            const orderArray = getArrayFromString(order);
            const offset = countOffset(limit, page);
            const where = getAgentByGroupOrUser(groupId, userId)
            const agents = await Agents.findAndCountAll({limit, offset, order: [orderArray], where})
            const rows = await changeAddressOnFullinArray(agents.rows);
            res.json({rows, count: agents.count});
        }
        catch(e) {
            next(e);
        }
    }
    async addOne(req, res, next) {
        try{
            const body = req.body;
            const groupId = req.user.groupId;
            const userId = req.user.id;
            const agent = req.body.agent;
            const address = await AddressBuilder.build(body.address);
            if(agent.isDefault){
               await setFalseDefaultsInGroup(groupId, userId)
            }
            if(agent.noShowGroup) {
                await Agents.create({...address,  ...agent, groupId: null, userId});
            }
            else {
                await Agents.create({...address,  ...agent, groupId, userId: null});
            }
            res.json({status: 'ok'});
        }
        catch(e) {
            console.log(e);
            next(ApiError.internal(e));
        }

    }
    async changeOne(req, res, next) {
        try{
        const body = req.body;
        const groupId = req.user.groupId;
        const userId = req.user.id;
        const agent = req.body.agent;
        const where = getAgentByGroupOrUser(groupId, userId);
        where.id = agent.id;
        if(agent.isDefault){
            setFalseDefaultsInGroup(groupId, userId)
        }
        if(body.address) {
           const address = await Address.getIds(body.address);
           if(agent.noShowGroup) {
            await Agents.update({...address,  ...agent, groupId: null, userId}, {where});
           }
           else {
            await Agents.update({...address,  ...agent, groupId, userId: null}, {where});
           }
        
        }
        else {
            if(agent.noShowGroup) {
                await Agents.update({...agent, groupId: null, userId}, {where});
            }
            else {
                await Agents.update({...agent, groupId, userId: null}, {where});
            }
        }
        res.json({status: 'ok'});
        }
        catch(e) {
            next(e);
        }   

    }
    async deleteOne(req, res, next) {
        try {
            const id = req.body.id;
            const groupId = req.user.groupId;
            const userId = req.user.id;
            const where = {
                ...getAgentByGroupOrUser(groupId, userId),
                id
            } 
            await Agents.destroy({
                where
            });
            res.json({status: 'ok'});
        }
        catch(e) {
            console.log(e);
            next(ApiError.internal(e));
        }   
    }
    async getSearchList(req, res, next) {
        try{
            const value = req.query.value;
            const groupId = req.user.groupId;
            const userId = req.user.id;
            const searchArray = value.split(' ', 3);
            const where = {
                [Op.and]: [{...getWherePropertyWhenSearchFIO(searchArray)}, {...getAgentByGroupOrUser(groupId, userId)} ]
                
            }
            let agents = await Agents.findAll({
                limit: 5, where, attributes: ['name', 'surname', 'patronymic', 'id']
            });
            agents = agents.map((el)=> {
                const element = {};
                element.name = getFullName(el);
                element.id = el.id;
                return element;
            });
            res.json(agents);
        }
        catch(e) {
            next(e);
        }   
    }
    async getDefaultAgent(req, res, next) {
        try{
        const groupId = req.user.groupId;
        const userId = req.user.id;
        const where = {
            ...getAgentByGroupOrUser(groupId, userId),
            isDefault: true
        }
        let agent = await Agents.findOne({where, attributes: ['name', 'surname', 'patronymic', 'id']});
        agent = changeFIOOnFullName(agent);
        res.json(agent);
    }
    catch(e) {
        console.log(e);
        next(ApiError.internal(e));
    } 
    }    
}

module.exports = new AgentsController();