const Payments = require('../models/documents/Payments');
const errorHandler = require('../error/errorHandler');
const LoanCounter = require("../classes/counters/LoanCounter");
const Contracts = require("../models/documents/Contracts");
const {numbersHelper} = require("../helpers/numbersHelper");

const limit = 25; 
const offset = 0;

class PaymentsController {
    async deletePayment(req,res, next) {
        try{
            const {id, contractId} = req.query;
            await Payments.destroy({
                where: {
                    id
                }
            });
            await LoanCounter.updatePayments(contractId);
                return res.json({status: 'ok'});
        }
        catch(e) {
            next(e);
        }
        }

        async createPayment(req, res, next) {
            try{
            let {payment, contractId} = req.body;
            payment.sum = numbersHelper.getDBFormat(payment.sum);
            await Contracts.checkGroupId(contractId, req.user.groupId);
            payment.contractId = contractId;
            await LoanCounter.updatePayments(contractId, payment);
            return res.json({status: 'ok'});
        }
        catch(e) {
            next(e);
        }
        }

        async changePayment(req, res, next)
        {
            try{
                const {payment, contractId} = req.body;
                await Payments.destroy({where: {id: payment.id}});
                delete payment.id;
                payment.contractId = contractId;
                await LoanCounter.updatePayments(contractId, payment);
                return res.json({status: 'ok'});
            }
            catch (e) {
                next(e);
            }
        }


    async getPayments(req,res, next) {
        try{
            const {page, limit, contractId, orderField, orderType} = req.query;
            const offset = page * limit - limit;
            const payments = await Payments.findAndCountAll({limit, offset, order: [[orderField, orderType]], where: {
                contractId
            }});
            return res.json({total: payments.count, list: payments.rows});
        }
        catch(e) {
            errorHandler(e, next);
        }
    }
    async getPaymentsInner(contractId) {
        try{
        const response = await Payments.findAndCountAll({limit, offset, order: [['date', 'ASC']], where: {
            contractId
        }})
        return response;
    }
    catch(e){
        errorHandler(e, next);
    }
    }
    async sortPayments(req,res,next) {
        try{
            const {field, contractId, type} = req.query;
            const payments = await Payments.findAndCountAll({limit, offset, order: [[field, type]], where: {
                contractId
            }})
            console.log(payments)
            res.json({total: payments.count, list: payments.rows});
            
        }
        catch(e){
            errorHandler(e, next);
        }
    }

    
}


module.exports = new PaymentsController();