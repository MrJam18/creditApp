const { Op } = require("sequelize");
const ApiError = require("../error/apiError");
const {Statuses, Actions} = require("../models/connections");
const Cessions = require('../models/documents/Cessions');
const Creditors = require('../models/subjects/Creditors');
const Contracts = require('../models/documents/Contracts');
const Debtors = require('../models/subjects/Debtors');
const ExecutiveDocs = require('../models/documents/ExecutiveDocs');
const countOffset = require("../utils/countOffset");
const addYears = require("../utils/dates/addYears");
const getISODate = require("../utils/dates/getISODate");
const numFormatHandler = require("../utils/numFormatHandler");
const getSurnameAndInitials = require('../utils/getSurnameAndInititals')
const errorHandler = require('../error/errorHandler')
const countDays = require('../utils/dates/countDays');
const nullCession = require('../constants/nullCession');
const {createContractsDirs} = require('../utils/files/createDirs');
const LoanCounter = require("../classes/counters/LoanCounter");
const FileConfig = require("../configs/FileConfig");
const Payments = require("../models/documents/Payments");
const Bailiffs = require('../models/subjects/Bailiffs');
const CourtClaims = require('../models/documents/CourtClaims');
const Courts = require('../models/subjects/Courts');
const {getExecutiveDocName} = require("../utils/getExecutiveDocName");

class ContractsController {
    async getContract(req, res, next) {
        try{
           const { id }= req.query;
           const groupId = req.user.groupId;
           const contractRes = await Contracts.findOne({ include: [{model: Debtors, attributes: ['name', 'surname', 'patronymic']}, {model: Cessions, attributes: ['name']}, {model: Creditors, attributes: ['name', 'short']}, {model: Statuses}, {model: ExecutiveDocs, attributes:
                       ['id', 'number', 'dateIssue', 'resolutionNumber', 'resolutionDate', 'main', 'percents', 'penalties', 'fee', 'typeId'], include: [
                        {model: Bailiffs, attributes: ['id', 'name']},
                       {model: Courts, attributes: ['id', 'name']}
                   ]}], where: {groupId, id}});
           if(!contractRes) return next(ApiError.badRequest('Контракта с указанным id не существует!'));
           let court;
           const executiveDoc = contractRes.executiveDoc;
           let executiveDocName;
           if(executiveDoc) {
               court = executiveDoc.court;
               executiveDocName = getExecutiveDocName(executiveDoc.typeId, executiveDoc.number, executiveDoc.dateIssue);
           }
           else {
               court = await CourtClaims.getLastCourt(id);
               executiveDocName = 'отсутствует';
           }
           const contract = contractRes.get({plain: true});
           contract.debtorName = contractRes.debtor.getInitials();
           contract.status = {id: contract.status.id, value: contract.status.name};
           if(contract.cession) contract.cession = contract.cession.name;
           else contract.cession = nullCession.name;
           contract.creditor = contract.creditor.name;
           contract.executiveDocName = executiveDocName;
           let payments = await Payments.getByContractId(id);
           contract.paymentsCount = payments.count;
           const ISONow = getISODate();
           const counted = new LoanCounter(contract, ISONow, payments.rows);
           contract.delayDays = countDays(contract.due_date, ISONow);
           res.json({
               contract: {
                   ...contract,
                   percentToday: counted.percents,
                   penaltyToday: counted.penalties,
                   mainToday: counted.main,
                   court
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
               const counted = new LoanCounter(contract, payments[length - 1].date, payments );
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
                orderArray.unshift(Creditors);
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
                }, include: [{model: Creditors, attributes: ['name', 'short']}, {model: Debtors, attributes: ['name', 'surname', 'patronymic']}]
            });
            const limitations = contracts.rows.map((el)=> {
                const debtor = getSurnameAndInitials(el.debtor);
                const creditor = el.creditor.short ? el.creditor.short : el.creditor.name;
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
            const contract = req.body;
            contract.groupId = req.user.groupId;
            contract.sum_issue = numFormatHandler(contract.sum_issue);
            contract.percent = numFormatHandler(contract.percent);
            contract.penalty = numFormatHandler(contract.penalty);
            const contractRes = await Contracts.create(contract);
            createContractsDirs(contractRes.id);
            return res.json({status: 'ok'});
        }
        catch(e) {
            next(e);
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
        });
        if(!contract) throw ApiError.UnauthorizedError();
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
            const config = new FileConfig(`contracts\\${id}`);
            await config.deleteFolder();
            res.json({
                status: 'ok'
            })


    }
    catch(e) {
        next(e);
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