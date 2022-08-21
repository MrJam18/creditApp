const ApiError = require("../error/apiError");
const { Payments } = require("../models/models");
const Contracts = require('../models/documents/Contracts')
const { changeDateToISO } = require("../utils/dates/changeDateFormat");
const countAllWithPayments = require("../utils/countMoney/countAllWithPayments");
const numFormatHandler = require("../utils/numFormatHandler");
const compareDatesBool = require("../utils/dates/compareDatesBool");

class CreateController {
    async createContract(req, res, next) {
        try{
            const data = req.body;
            const contract = {...data.contract};
            if (contract.cessionId === 'none') contract.cessionId = null;
            contract.sum_issue = numFormatHandler(contract.sum_issue);
            contract.percent = numFormatHandler(contract.percent);
            contract.penalty = numFormatHandler(contract.penalty);
            const contractRes =  await Contracts.create( {
                ...contract, debtorId: data.debtorId
            })
            let payments = data.payments.map((el)=> {
               const sum = numFormatHandler(el.sum);
               const date = changeDateToISO(el.date)
                return {
                    sum, date, contractId: contractRes.id
                }
            });
            payments = payments.sort((a, b)=> {
                if(compareDatesBool(a.date, b.date)) return -1;
                else return 1;
            })
            ({payments} = countAllWithPayments(contract.percent, contract.penalty, contract.sum_issue, contract.date_issue, payments[payments.length - 1].date, payments, contract.due_date));
            await Payments.bulkCreate(payments);
            return res.json(contractRes);
        }
        catch(e) {
            console.log(e);
            next(ApiError.internal(e.message));
        }
    }


}

module.exports = new CreateController()