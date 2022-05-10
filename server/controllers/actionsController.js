const { Actions, ActionTypes, ActionObjects, Users } = require('../models/models');
const ApiError = require('../error/apiError');
const { changeDateTimeFormat } = require('../utils/dates/changeDateFormat');
const countOffset = require('../utils/countOffset');



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
            const limit = 10;
            const offset = countOffset(limit, page);
            const actions = await Actions.findAndCountAll({
                offset, limit,
                order: [['createdAt', 'DESC']], attributes: ['createdAt', 'id', 'result'], include: [{model: ActionTypes, attributes: ['name']}, {model: ActionObjects, attributes: ['name']}], where: {
                    userId
                }});
            const rows = actions.rows.map((el)=> {
                return {
                    createdAt: el.createdAt,
                    id: el.id,
                    result: el.result,
                    actionType: el.actionType.name,
                    actionObject: el.actionObject.name
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