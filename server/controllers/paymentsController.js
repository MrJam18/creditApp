const { Payments } = require('../models/models');
const Contracts = require('../models/documents/Contracts');
const paymentsService = require('../services/paymentsService');
const compareDates = require('../utils/dates/compareDates');
const errorHandler = require('../error/errorHandler');
const LoanCounter = require("../classes/counters/LoanCounter");

const limit = 25; 
const offset = 0;

class PaymentsController {
    async deletePayment(req,res, next) {
        try{
            const {paymentId, contractId} = req.body;
            await Payments.destroy({
                where: {
                    id: paymentId
                }
            });
            const contract = await Contracts.findByPk(contractId, {
                attributes: ['percent', 'penalty', 'date_issue', 'sum_issue', 'due_date']
            });
            const paymentsInDB = await Payments.findAll({ order: [['date', 'ASC']],
                where: {
                    contractId
                }
            })
            if(paymentsInDB.length !== 0) await paymentsService.countPaymentsInDB(paymentsInDB, contract);
                return res.json({status: 'ok'}); 

            
        }
        catch(e) {
            errorHandler(e, next);
        }
        }
        async createPayment(req, res, next) {
            try{
            let {payment, contractId} = req.body;
            const contract = await Contracts.findByPk(contractId, {
                attributes: ['percent', 'penalty', 'date_issue', 'sum_issue', 'due_date']
            });
            const paymentsInDB = await Payments.findAll({ order: [['date', 'ASC']],
                where: {
                    contractId
                }
            })
                payment.contractId = contractId;
                const payments = paymentsInDB.map(el=> el.get({plain: true}));
                payments.push(payment);
            const endDate = paymentsInDB[paymentsInDB.length - 1] ? compareDates(paymentsInDB[paymentsInDB.length - 1].date, payment.date) : payment.date;
            const counted = new LoanCounter(contract.sum_issue, contract.percent, contract.penalty, contract.date_issue, endDate, contract.due_date, payments );
            for (let payment of counted.payments){
                delete payment.createdAt;
                delete payment.updatedAt;
                if(!payment.id) await Payments.create(payment);
                else await Payments.update(payment, {
                    where: {
                        id: payment.id
                    }
                })
            }
            return res.json({status: 'ok'});
        }
        catch(e) {
            next(e);
        }
    
        }

    async getPayments(req,res, next) {
        try{
            const {page, limit, contractId, orderField, orderType} = req.query;
            const offset = page * limit - limit;
            let dataPayments = await Payments.findAndCountAll({limit, offset, order: [[orderField, orderType]], where: {
                contractId
            }});
            res.json({total: dataPayments.count, list: dataPayments.rows});
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
            res.json({total: payments.count, list: payments.rows});
            
        }
        catch(e){
            errorHandler(e, next);
        }
    }

    
}


module.exports = new PaymentsController();