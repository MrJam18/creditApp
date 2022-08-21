const { Op } = require("sequelize");
const ApiError = require("../error/apiError");
const { Payments, Statuses, ExecutiveDocTypes, Actions} = require("../models/models");
const Cessions = require('../models/documents/Cessions');
const Organizations = require('../models/subjects/Organizations');
const Contracts = require('../models/documents/Contracts');
const Debtors = require('../models/subjects/Debtor');
const ExecutiveDocs = require('../models/documents/ExecutiveDocs');
const paymentsService = require("../services/paymentsService");
const changeAllNumFormates = require("../utils/changeAllNumFormates");
const countSumWithFee = require("../utils/countMoney/countSumWithFee");
const countOffset = require("../utils/countOffset");
const addYears = require("../utils/dates/addYears");
const { changeDateFormat } = require("../utils/dates/changeDateFormat");
const getISODate = require("../utils/dates/getISODate");
const numFormatHandler = require("../utils/numFormatHandler");
const paymentsController = require("./paymentsController");
const getSurnameAndInitials = require('../utils/getSurnameAndInititals')
const errorHandler = require('../error/errorHandler')
const countDays = require('../utils/dates/countDays');
const nullCession = require('../constants/nullCession');
const {createContractsDirs} = require('../utils/files/createDirs');
const LoanCounter = require("../classes/counters/LoanCounter");

class ContractsController {
    async getContract(req, res, next) {
        try{
           const { id }= req.query;
           const groupId = req.user.groupId;
           const contractRes = await Contracts.findOne({ include: [{model: Debtors, attributes: ['name', 'surname', 'patronymic']}, {model: Cessions, attributes: ['name']}, {model: Organizations, attributes: ['name', 'short']}, {model: Statuses}, {model: ExecutiveDocs, attributes: ['number', 'dateIssue'], include: {model: ExecutiveDocTypes, attributes: ['name']}}], where: {groupId, id}});
           if(!contractRes) return next(ApiError.badRequest('Контракта с указанным id не существует!'));
           const contract = contractRes.get({plain: true});
           contract.debtorName = contractRes.debtor.getInitials();
           contract.status = {id: contract.status.id, value: contract.status.name};
           if(contract.cession) contract.cession = contract.cession.name;
           else contract.cession = nullCession.name;
           contract.creditor = contract.organization.name;
           if(!contract.executiveDoc) contract.executiveDocName = 'отсутствует';
           else contract.executiveDocName = `${contract.executiveDoc.executiveDocType.name} № ${contract.executiveDoc.number} от ${changeDateFormat(contract.executiveDoc.dateIssue)} г.`;
           let payments = await paymentsController.getPaymentsInner(id);
           contract.paymentsCount = payments.count;
           const ISONow = getISODate();
           const counted = new LoanCounter(contract.sum_issue, contract.percent, contract.penalty, contract.date_issue, ISONow, contract.due_date, payments.rows);
           contract.delayDays = countDays(contract.due_date, ISONow);
           res.json({
               // payments,
               contract: {
               ...contract,
               percentToday: counted.percents,
               penaltyToday: counted.penalties,
               mainToday: counted.main
               }
           });
        }
    catch(e) {
        errorHandler(e, next)
    }
    }
    async changeContract(req, res, next) {
        try{
           const body = req.body;
           const groupId = req.user.groupId;
           const changingField = body.changingField;
           await Contracts.updateByIdAndGroupId(body.contractId, groupId, changingField);
           if (changingField === 'sum_issue' || changingField === 'date_issue' || changingField === 'due_date' || changingField === 'percent' || changingField === 'penalty') {
           const contract = await Contracts.findByPk(body.contractId);
           const payments = await Payments.findAll({
               where: {
                   contractId: body.contractId
               }
           })
           if (payments.length !== 0) {
               const counted = new LoanCounter(contract.sum_issue, contract.percent, contract.penalty, contract.date_issue, payments[length - 1].date, contract.due_date, payments );
               await counted.updatePayments();
           }
        }
           res.json({status: 'ok'});
        }
    catch(e) {
        console.log(2);
        next(e);
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
                offset, page, order: [orderArray], attributes: ['due_date', 'date_issue', 'id'], where: {
                    due_date: {
                        [Op.lte]: deadLine
                    }
                }, include: [{model: Organizations, attributes: ['name', 'short']}, {model: Debtors, attributes: ['name', 'surname', 'patronymic']}]
            });
            const limitations = contracts.rows.map((el)=> {
                const debtor = getSurnameAndInitials(el.debtor);
                const creditor = el.organization.short ? el.organization.short : el.organization.name;
                const limitation = addYears(el.due_date, 3);
                return {
                    debtor, creditor, limitation, date_issue: el.date_issue, id: el.id
                } 
            })
            res.json({rows: limitations, count: contracts.count})
        }
        catch(e) {
           errorHandler(e, next)
        }
    }
    async createOne(req, res, next) {
        try{
            const data = req.body;
            const contract = data.contract;
            const groupId = req.user.groupId;
            contract.sum_issue = numFormatHandler(contract.sum_issue);
            contract.percent = numFormatHandler(contract.percent);
            contract.penalty = numFormatHandler(contract.penalty);
            const contractRes = await Contracts.create( {
                ...contract, debtorId: data.debtorId, groupId
            });
            if(data.executiveDoc){
                await ExecutiveDocs.createOne(data.executiveDoc, groupId, contractRes.id);
            }
            createContractsDirs(contractRes.id);
            return res.json(contractRes);

        }
        catch(e) {
            errorHandler(e, next)
        }
    }
    async setExecutiveDoc(req, res, next) {
        try{
            req.body = changeAllNumFormates(req.body);
            const body = req.body;
            const groupId = req.user.groupId;
            if(body.resolutionDate === '') body.resolutionDate = null;
            if(body.resolutionNumber === '') body.resolutionNumber = null;
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
            errorHandler(e, next)
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
        errorHandler(e, next)
    }
    }
    async getStatuses(req, res, next)
    {
        try{
            const statuses = await Statuses.findAll();
            return res.json(statuses);
        }
        catch(e)
        {
            errorHandler(e, next);
        }


    }
}

module.exports = new ContractsController;