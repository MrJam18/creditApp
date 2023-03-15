const ApiError = require('../error/apiError');
const { Payments, Contracts } = require('../models/models');
const paymentsService = require('../services/paymentsService');
const countAllWithPayments = require('../utils/countMoney/countAllWithPayments');
const compareDates = require('../utils/dates/compareDates');

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
            if(paymentsInDB.length != 0) paymentsService.countPaymentsInDB(paymentsInDB, contract)
                // const endDate = paymentsInDB[paymentsInDB.length - 1].date;
                // const { payments } = countAllWithPayments(contract.percent, contract.penalty, contract.sum_issue, contract.date_issue, endDate, paymentsInDB, contract.due_date);
                // for (let payment of payments){
                //     delete payment.createdAt;
                //     delete payment.updatedAt;
                //     Payments.update(payment, {
                //         where: {                        
                //             id: payment.id
                //         }
                //     })
                // }
                return res.json({status: 'ok'}); 

            
        }
        catch(e) {
            console.log(e);
            next(ApiError.internal(e.message));
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
            
            if(paymentsInDB != 0){
            const endDate = compareDates(paymentsInDB[paymentsInDB.length - 1].date, payment.date);
            paymentsInDB.push(payment);
            const { payments } = countAllWithPayments(contract.percent, contract.penalty, contract.sum_issue, contract.date_issue, endDate, paymentsInDB, contract.due_date);
            payment = payments.pop();
            for (let payment of payments){
                delete payment.createdAt;
                delete payment.updatedAt;
                Payments.update(payment, {
                    where: {
                        id: payment.id
                    }
                })
            }
            }
            else {
                const {payments} = countAllWithPayments(contract.percent, contract.penalty, contract.sum_issue, contract.date_issue, payment.date, [payment], contract.due_date);
                payment = payments[0];
            }
            payment.contractId = contractId;
            const response = await Payments.create(payment);
            return res.json(response);
        }
        catch(e) {
            console.log(e);
            next(ApiError.internal(e.message));
        }
    
        }

    async getPayments(req,res, next) {
        try{
            const {page, limit, contractId, orderField, orderType} = req.query;
            const offset = page * limit - limit;
            const contract = await Contracts.findByPk(contractId, {
                attributes: ['percent', 'penalty', 'date_issue', 'sum_issue', 'due_date']
            })
            let dataPayments = await Payments.findAndCountAll({limit, offset, order: [[orderField, orderType]], where: {
                contractId
            }})
            const total = dataPayments.count;
            // const { payments } = countAllWithPayments(contract.percent, contract.penalty, contract.sum_issue, contract.date_issue, getISODate(), dataPayments.rows, contract.due_date);
            res.json({total, list: dataPayments.rows});
        }
        catch(e) {
            next(ApiError.internal(e.message));
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
        console.log(e);
        next(ApiError.internal(e.message));
    }
    }
    async sortPayments(req,res,next) {
        try{
            const {field, contractId, type} = req.query;
            const contract = await Contracts.findByPk(contractId, {
                attributes: ['percent', 'penalty', 'date_issue', 'sum_issue', 'due_date']
            });
            const payments = await Payments.findAndCountAll({limit, offset, order: [[field, type]], where: {
                contractId
            }})
            // const total = dataPayments.count;
            // const {payments} = countAllWithPayments(contract.percent, contract.penalty, contract.sum_issue, contract.date_issue, getISODate(), dataPayments.rows, contract.due_date);
            res.json({total: payments.count, list: payments.rows});
            
        }
        catch(e){
            next(ApiError.internal(e.message));
        }
    }

    
}


module.exports = new PaymentsController();