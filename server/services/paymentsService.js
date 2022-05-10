const { Payments } = require("../models/models");
const countAllWithPayments = require("../utils/countMoney/countAllWithPayments");

class PaymentsService {
   async countPaymentsInDB(paymentsInDB, contract){
       try{
        const endDate = paymentsInDB[paymentsInDB.length - 1].date;
        const { payments } = countAllWithPayments(contract.percent, contract.penalty, contract.sum_issue, contract.date_issue, endDate, paymentsInDB, contract.due_date);
        for (let payment of payments){
            delete payment.createdAt;
            delete payment.updatedAt;
            Payments.update(payment, {
                where: {                        
                    id: payment.id
                }
            })
        }
        return payments;
    }
    catch(e) {
        console.log(e);
        throw new Error(e.message);
    }
    }
}

module.exports = new PaymentsService();