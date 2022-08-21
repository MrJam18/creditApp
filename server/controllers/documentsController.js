
const fs = require('fs')
const { Packer, } = require('docx');
const { Payments, Actions } = require("../models/models");
const Cessions = require('../models/documents/Cessions');
const Organizations = require('../models/subjects/Organizations');
const Courts = require('../models/subjects/Courts');
const Contracts = require('../models/documents/Contracts');
const Debtors = require('../models/subjects/Debtor');
const ExecutiveDocs = require('../models/documents/ExecutiveDocs');
const ApiError = require("../error/apiError");
const  {docsFoler}  = require("../utils/adresses");
const { v4: uuidv4 } = require('uuid');
const createClaimDoc = require("../services/documentsService/createClaimDoc");
const courtReqforIdDoc = require("../services/documentsService/courtReqforIdDoc");
const getISODate = require('../utils/dates/getISODate');
const createIPInitDoc = require('../services/documentsService/createIPInitDoc');
const changeAllNumFormates = require('../utils/changeAllNumFormates');
const DocumentsProvider = require('../providers/documents/DocumentsProvider');

const provider = new DocumentsProvider();

class DocumentsController {
    async createCourtClaim(req, res, next) {
        try {
            const {contractId, courtId, countDate, ignorePayments, agentId, type} = req.body;
            const userId = req.user.id;
            const groupId = req.user.groupId;
            let ignorePaymentsBool;
            ignorePaymentsBool = ignorePayments === 'true';
            const path = await provider.createCourtClaim(contractId, courtId, agentId, groupId, userId, countDate, type, ignorePaymentsBool  )
            res.download(path);
        }
        catch(e) {
            next(e);
        }
    }
    async createClaim(req, res, next) {
        try{
        const { contractId, courtId, date, contractJur, ignorePayments, agentId } = req.query;
        const userId = req.user.id;
        let isContractJur;
        let ignorePaymentsBool;
        isContractJur = contractJur === 'true';
        ignorePaymentsBool = ignorePayments === 'true';
        const contract = await Contracts.findByPk(contractId, {
            include: [{model: Payments}, {model: Debtors, include: {
                all: true
            }}, {model: Organizations, include: {
                all: true
            }}, {model: Cessions, include: [{model: Organizations, as: 'assignee', attributes: ['name']}, {model: Organizations, as: 'assignor', attributes: ['name']}, ]}]
        });
        contract.courtId = courtId;
        await contract.save();
        const doc = await createClaimDoc(courtId, contract, date, isContractJur, ignorePaymentsBool, agentId);
        const path = `${docsFoler}contract${contract.id}/orders/${uuidv4()}.docx`;
        const buffer = await Packer.toBuffer(doc);
        if(!fs.existsSync(docsFoler + `contract${contract.id}`)) fs.mkdirSync(docsFoler + `contract${contract.id}`);
        if(!fs.existsSync(docsFoler + `contract${contract.id}/orders`)) fs.mkdirSync(docsFoler + `contract${contract.id}/orders`);
        fs.writeFileSync(path, buffer);
        await Actions.create({contractId, actionTypeId: 1, actionObjectId: 11, userId, result: path});            
        if (contract.statusId === 3) {
            const now = getISODate();
            await contract.update({
                statusId: 4, statusChanged: now
            })
            await Actions.create({contractId, userId, actionTypeId: 4, actionObjectId: 12, result: 'изменен с "Отмена СП" на "Ожидает отправки иска".'})
        }
        res.download(path);
    }
    catch(e) {
        console.log(e);
        next(ApiError.badRequest(e));
    }

    }
    async createCourtRequestforID (req, res, next) {
        try{
        const { contractId } = req.query;
        const userId = req.user.id;
        const contract = await Contracts.findByPk(contractId, {
            include: [{model: Payments}, {model: Debtors, include: {
                all: true
            }}, {model: Organizations, include: {
                all: true
            }}, {model: Courts, include: {all: true}}]
        });
        const doc =  await courtReqforIdDoc(contract);
        const path = `${docsFoler}contract${contract.id}/others/${uuidv4()}.docx`;
        const buffer = await Packer.toBuffer(doc);
        if(!fs.existsSync(docsFoler + `contract${contract.id}`)) fs.mkdirSync(docsFoler + `contract${contract.id}`);
        if(!fs.existsSync(docsFoler + `contract${contract.id}/others`)) fs.mkdirSync(docsFoler + `contract${contract.id}/others`);
        fs.writeFileSync(path, buffer);
        await Actions.create({contractId, actionTypeId: 1, actionObjectId: 13, userId, result: path});            
        res.download(path);
        }
        catch(e) {
            console.log(e);
            next(ApiError.badRequest(e));
        }
    }
    async getDocument(req, res, next) {
        try {
            const {path} = req.query;
            res.download(path);
        }
        catch(e) {
            console.log(e);
            next(ApiError.badRequest(e));
        }
    }
    async createIPInit(req, res, next) {
        try{
        const body = req.body;
        const userId = req.user.id;
        const groupId = req.user.groupId;
        const contract = await Contracts.findOne({where: {
            groupId, id: body.contractId
        }, plain: true});
        body.executiveDoc = changeAllNumFormates(body.executiveDoc);
        const executiveDoc = body.executiveDoc;
        provider.getNullsFromString(executiveDoc);
        // if(executiveDoc.resolutionDate == '') executiveDoc.resolutionDate = null;
        // if(executiveDoc.resolutionNumber == '') executiveDoc.resolutionNumber = null;
        executiveDoc.sum = Number(executiveDoc.main) + Number(executiveDoc.percents) + Number(executiveDoc.penalties) + Number(executiveDoc.fee);
        executiveDoc.contractId = body.contractId;
        const executiveDocInDB = await ExecutiveDocs.findOne({
            where: {
                contractId: body.contractId
            }
        })
        if(!executiveDocInDB) ExecutiveDocs.create(executiveDoc);
        else {
          executiveDocInDB.update(executiveDoc)
        }
        contract.bailiffId = body.bailiffId;
        const doc = await createIPInitDoc(contract, body.bailiffId, body.agentId, body.executiveDoc);
        const path = `${docsFoler}contract${contract.id}/IPInit/${uuidv4()}.docx`;
        const buffer = await Packer.toBuffer(doc);
        if(!fs.existsSync(docsFoler + `contract${contract.id}`)) fs.mkdirSync(docsFoler + `contract${contract.id}`);
        if(!fs.existsSync(docsFoler + `contract${contract.id}/IPInit`)) fs.mkdirSync(docsFoler + `contract${contract.id}/IPInit`);
        fs.writeFileSync(path, buffer);
        await Actions.create({contractId: body.contractId, actionTypeId: 1, actionObjectId: 13, userId, result: path});
        if(contract.statusId === 8 || contract.statusId === 12){
            contract.statusId = 13
        }
        await contract.save();             
        res.download(path);
        }
        catch(e) {
            console.log(e);
            next(ApiError.badRequest(e));
        }

    }
}

module.exports = new DocumentsController();