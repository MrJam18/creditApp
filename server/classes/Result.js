// const countAllWithPaymentsIgnorePayments = require("../utils/countMoney/countAllWithPaymentsIgnorePayments");
// const countAllWithPayments = require("../utils/countMoney/countAllWithPayments");
//
// class Result
// {
//     contract;
//     main;
//     percents;
//     penalties;
//     fee;
//     sum;
//     limitedText;
//     limitedPercents;
//     ignorePayments;
//
//     constructor(contract, ignorePayments = false, countDate)
//     {
//         this.contract = contract;
//         let result;
//         if(ignorePayments) {
//             result = countAllWithPaymentsIgnorePayments(contract.percent, contract.penalty, contract.sum_issue, contract.date_issue, countDate, contract.payments, contract.due_date);
//         }
//         else {
//             result = countAllWithPayments(contract.percent, contract.penalty, contract.sum_issue, contract.date_issue, countDate, contract.payments, contract.due_date);
//         }
//         this.main = result.main;
//         this.percents = result.percents;
//         this.penalties = result.penalties;
//         this.limitedText = result.limitedText ? result.limitedText : null;
//         this.limitedPercents = result.limitedPercents;
//         this.ignorePayments = ignorePayments;
//         this.breaks = result.breaks;
//     }
//
//     countFee(type)
//     {
//         let fee;
//         if(!this.sum) this.countSum();
//         if(this.sum <= 20000){
//             fee = this.sum / 100 * 4;
//             if(fee < 400) fee = 400;
//         }
//         else if((this.sum > 20000) && (this.sum <= 100000)){
//             fee = ((this.sum - 20000) / 100 * 3) + 800;
//         }
//         else if((this.sum > 100000) && (this.sum <= 200000)){
//             fee = ((this.sum - 100000) / 100 * 2) + 3200;
//         }
//         else if((this.sum > 200000) && (this.sum <= 1000000)){
//             fee = ((this.sum - 200000) / 100) + 5200;
//         }
//         else {
//             fee = ((this.sum - 1000000) / 100 * 0.5) + 13200;
//             if (fee > 60000) fee = 60000;
//         }
//         if(type === 'courtOrder') fee = fee / 2;
//         this.fee = fee.toFixed(2);
//         return this.fee;
//
//     }
//     countSum()
//     {
//         this.sum = Number((this.main + this.percents + this.penalties).toFixed(2));
//     }
//
// }
//
// module.exports = Result;