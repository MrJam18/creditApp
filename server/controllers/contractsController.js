const { Op } = require("sequelize");
const ApiError = require("../error/apiError");
const { Contracts, Debtors, Payments, Organizations, Statuses, ExecutiveDocs, Courts, ExecutiveDocTypes, Bailiffs, Actions } = require("../models/models");
const paymentsService = require("../services/paymentsService");
const changeAllNumFormates = require("../utils/changeAllNumFormates");
const countAllWithPayments = require("../utils/countMoney/countAllWithPayments");
const countSumWithFee = require("../utils/countMoney/countSumWithFee");
const countOffset = require("../utils/countOffset");
const addYears = require("../utils/dates/addYears");
const { changeDateToISO, changeDateFormat } = require("../utils/dates/changeDateFormat");
const compareDatesBool = require("../utils/dates/compareDatesBool");
const getISODate = require("../utils/dates/getISODate");
const numFormatHandler = require("../utils/numFormatHandler");
const paymentsController = require("./paymentsController");

class ContractsController {
    async getContract(req, res, next) {
        try{
           const { id }= req.query;
           const groupId = req.user.groupId;
           const contractRes = await Contracts.findOne({ include: [{model: Debtors, attributes: ['name', 'surname', 'patronymic']}, {model: Organizations, attributes: ['name', 'short']}, {model: Statuses, attributes: ['name']}, {model: ExecutiveDocs, include: {model: ExecutiveDocTypes, attributes: ['name']}}, {model: Courts, attributes: ['name']}, {model: Bailiffs}], where: {groupId, id}});
           const contract = contractRes.get({plain: true});
           if(!contract.court) contract.court = 'Не установлено';
           else contract.court = contract.court.name;
           if(!contract.executiveDoc) contract.executiveDocName = 'Не установлено';
           else contract.executiveDocName = `${contract.executiveDoc.executiveDocType.name} № ${contract.executiveDoc.number} от ${changeDateFormat(contract.executiveDoc.dateIssue)} г.`;
           if(!contract.bailiff) contract.bailiff = 'Не установлено';
           else contract.bailiff = contract.bailiff.name;
           let payments = await paymentsController.getPaymentsInner(id);
           const ISONow = new Date().toISOString().substring(0, 10);
           const result = countAllWithPayments(contract.percent, contract.penalty, contract.sum_issue, contract.date_issue, ISONow, payments.rows, contract.due_date);
           const penaltyToday = result.penalties;
           const percentToday = result.percents;
           const mainToday = result.main;
           let executiveDoc;
           if(contract.executiveDoc){
            executiveDoc = {...contract.executiveDoc};
            delete contract.executiveDoc;
           }
           payments = {
               total: payments.count,
               list: result.payments
           }
           res.json({
               payments,
               contract: {
               ...contract,
               percentToday,
               penaltyToday,
               mainToday
               }, 
               executiveDoc
           });
        }
    catch(e) {
        console.log(e);
        next(ApiError.internal(e));
    }
    }
    async changeContract(req, res, next) {
        try{
           const body = req.body;
           const changingField = body.changingField;
           const response = await Contracts.update(changingField, {
               where: {
                   id: body.contractId
               }
           })
           if (changingField === 'sum_issue' || changingField === 'date_issue' || changingField === 'due_date' || changingField === 'percent' || changingField === 'penalty') {
           const contract = await Contracts.findByPk(body.contractId);
           const payments = await Payments.findAll({
               where: {
                   contractId: body.contractId
               }
           })
           if (payments.length != 0) await paymentsService.countPaymentsInDB(payments, contract)
        }
           res.json(response);
        }
    catch(e) {
        console.log(e);
        next(ApiError.internal(e.message));
    }
    }
    async getLimitations( req, res, next ) {
        try{ 
            const { limit, page, order } = req.query;
            let orderArray = order.split(',');
            if (orderArray[0] === 'debtor'){
                orderArray.unshift(Debtors);
                orderArray[1] = 'surname';
            }
            else if(orderArray[0] === 'creditor') {
                orderArray.unshift(Organizations);
                orderArray[1] = 'name';
            }
            else if(orderArray[0] === 'limitation') {
                orderArray[0] = 'due_date'
            }
            const offset = countOffset(limit,page);
            const now = getISODate();
            const deadLine = now.replace(/\d{4}/, (year)=> year - 2);
            const contracts = await Contracts.findAndCountAll({
                offset, page, order: [orderArray], attributes: ['due_date', 'date_issue'], where: {
                    due_date: {
                        [Op.lte]: deadLine
                    }
                }, include: [{model: Organizations, attributes: ['name', 'short']}, {model: Debtors, attributes: ['name', 'surname', 'patronymic']}]
            })
            const limitations = contracts.rows.map((el)=> {
                const debtor = `${el.debtor.surname} ${el.debtor.name.slice(0,1)[0].toUpperCase()}. ${el.debtor.patronymic.slice(0,1)[0].toUpperCase()}.`
                const creditor = el.organization.short ? el.organization.short : el.organization.name;
                const limitation = addYears(el.due_date, 3);
                return {
                    debtor, creditor, limitation, date_issue: el.date_issue
                } 
            })
            res.json({rows: limitations, count: contracts.count})
        }
        catch(e) {
            console.log(e);
            next(ApiError.internal(e.message));
        }
    }
    async createOne(req, res, next) {
        try{
            const data = req.body;
            const contract = {...data.contract};
            const groupId = req.user.groupId;
            if (contract.cessionId === 'none') contract.cessionId = null;
            contract.sum_issue = numFormatHandler(contract.sum_issue);
            contract.percent = numFormatHandler(contract.percent);
            contract.penalty = numFormatHandler(contract.penalty);
            const contractRes =  await Contracts.create( {
                ...contract, debtorId: data.debtorId, groupId
            })
            let payments = data.payments.map((el)=> {
               const sum = numFormatHandler(el.sum);
               const date = changeDateToISO(el.date)
                return {
                    sum, date, contractId: contractRes.id
                }
            });
            payments = payments.sort((a, b)=> {
                if(compareDatesBool(a.date, b.date)) return 1;
                else return -1;
            })
            if(payments.length != 0) {
            console.log(12345);
            ({payments} = countAllWithPayments(contract.percent, contract.penalty, contract.sum_issue, contract.date_issue, payments[payments.length - 1].date, payments, contract.due_date));
            console.log(payments);
            await Payments.bulkCreate(payments);
            }
            return res.json(contractRes);
        }
        catch(e) {
            console.log(e);
            next(ApiError.internal(e.message));
        }
    }
    async setExecutiveDoc(req, res, next) {
        try{
            req.body = changeAllNumFormates(req.body);
            const body = req.body;
            const groupId = req.user.groupId;
            if(body.resolutionDate == '') body.resolutionDate = null;
            if(body.resolutionNumber == '') body.resolutionNumber = null;
            body.sum = countSumWithFee(body);
            const executiveDoc = await ExecutiveDocs.findOne({
                where: {
                    contractId: body.contractId
                }
            })
            const contract = await Contracts.findOne({
                where: {
                    id: body.contractId,
                    groupId
                },
                attributes: ['id']
            })
            if(!contract){
               return next(ApiError.UnauthorizedError());
            }
            else{
                if(executiveDoc) await executiveDoc.update(body);
                else await ExecutiveDocs.create(body);
            }
            res.json({
                status: 'ok'
            })
        }
        catch(e) {
            console.log(e);
            next(ApiError.internal(e.message));
        }
    }
    async deleteOne(req, res, next) {
        try{
        const id = req.body.id;
        const groupId = req.user.groupId;
        const contract = await Contracts.findOne({
            where: {
                id, groupId
            },
        })
        if(!contract) return next(ApiError.UnauthorizedError());
        else{
            await Actions.destroy({
                where: {
                    contractId: id
                }
            });
            await ExecutiveDocs.destroy({
                where: {
                    contractId: id
                }
            })
            await Payments.destroy({
                where: {
                    contractId: id
                }
            })
            await Contracts.destroy({
                where: {
                    id, groupId
                }, cascade: true
            }, )
            res.json({
                status: 'ok'
            })

        }

    }
    catch(e) {
        console.log(e);
        next(ApiError.internal(e.message));
    }
    }
}

module.exports = new ContractsController;