const { Actions, ActionTypes, ActionObjects, Users } = require('../models/connections');
const Contracts = require('../models/documents/Contracts');
const Debtors = require('../models/subjects/Debtors');
const ApiError = require('../error/apiError');
const countOffset = require('../utils/countOffset');
const getSurnameAndInititals = require('../utils/getSurnameAndInititals');
const sequelize = require('sequelize');



class ActionsController {
   async getContractActions(req,res, next) {
        try {
            const { contractId, limit, page, orderField, orderType } = req.query;
            let order;
            if(orderField === 'actionType') {
                order = [ActionTypes, 'name', orderType]
            }
            else if(orderField === 'actionObject') {
                order = [ActionObjects, 'name', orderType]
            }
            else if(orderField === 'user') {
                order = [Users, 'surname', orderType]
            }
            else {
                order = [orderField, orderType]
            }
            const offset = page * limit - limit;
            const actions = await Actions.findAndCountAll({
                offset, limit, where: {
                    contractId
                },
                order: [order], include: [{model: ActionTypes, attributes: ['name']}, {model: ActionObjects, attributes: ['name']}, {model: Users, attributes: ['name', 'surname']}]
            })
            res.json(actions);
        }
        catch(e) {
            console.log(e);
            next(ApiError.internal(e));
        }
    }
    async getLastActionsList(req, res, next) {
        try{
            const { userId, page } = req.query;
            const limit = 8;
            const offset = countOffset(limit, page);
            const actions = await Actions.findAndCountAll({
                offset, limit,
                order: [['createdAt', 'DESC']], attributes: [[sequelize.fn('to_char', sequelize.col('actions.createdAt'), 'DD.MM.YYYY'), 'createdAt'], 'id', 'result', 'contractId'], include: [{model: ActionTypes, attributes: ['name']}, {model: ActionObjects, attributes: ['name']}, {model: Contracts, attributes: ['id'], include: [{model: Debtors, attributes: ['surname', 'name', 'patronymic']}]}], where: {
                    userId
                }});
            const rows = actions.rows.map((el)=> {
                const debtor = getSurnameAndInititals(el.contract.debtor);
                return {
                    createdAt: el.createdAt + ' г.',
                    id: el.id,
                    result: el.result,
                    actionType: el.actionType.name,
                    actionObject: el.actionObject.name,
                    contractId: el.contractId,
                    debtor
                }
            })
            res.json({count: actions.count, rows});
        }
        catch(e) {
            console.log(e);
            next(ApiError.internal(e));
        }
    }
    
}


module.exports = new ActionsController();