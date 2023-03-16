
const fs = require('fs');
const { Packer, } = require('docx');
const { Payments, Actions } = require("../models/connections");
const Cessions = require('../models/documents/Cessions');
const Creditors = require('../models/subjects/Creditors');
const Courts = require('../models/subjects/Courts');
const Contracts = require('../models/documents/Contracts');
const Debtors = require('../models/subjects/Debtors');
const ApiError = require("../error/apiError");
const  {docsFoler}  = require("../utils/adresses");
const { v4: uuidv4 } = require('uuid');
const createClaimDoc = require("../services/documentsService/createClaimDoc");
const courtReqforIdDoc = require("../services/documentsService/courtReqforIdDoc");
const getISODate = require('../utils/dates/getISODate');
const Docx = require("../classes/files/Docx");
const CourtClaim = require("../documents/Controllers/CourtClaim");
const IPInit = require("../documents/Controllers/IPInit");


class DocumentsController {
    async createCourtClaim(req, res, next) {
        try {
            const {contractId, courtId, countDate, ignorePayments, contractJur, agentId, type} = req.body;
            const userId = req.user.id;
            const groupId = req.user.groupId;
            const options = {
                ignorePayments,
                contractJur
            }
            const data = await CourtClaim.init(contractId, agentId, courtId, countDate, groupId, options, type);
            const file = new Docx(data.path, data.document);
            await file.getBuffer();
            const path = file.createFile();
            await data.createAction(userId, path);
            if(data.contract.statusId !== 2){
                const now = getISODate();
                await Contracts.update({
                    statusId: 2, statusChanged: now
                }, {where: {
                        id: contractId
                    }})
                await Actions.create({contractId, userId, actionTypeId: 4, actionObjectId: 12, result: 'статус автоматически изменен на "Ожидает отправки СП".'})
            }
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
            }}, {model: Creditors, include: {
                all: true
            }}, {model: Cessions, include: [{model: Creditors, as: 'assignee', attributes: ['name']}, {model: Creditors, as: 'assignor', attributes: ['name']}, ]}]
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
            }}, {model: Creditors, include: {
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
        const groupId = req.user.groupId;
        const data = await IPInit.init(body, groupId);
        const file = new Docx(data.path, data.document);
        await file.getBuffer();
        const path = file.createFile();
        await data.createAction(req.user.id, path);
        await data.changeStatus(11, req.user.id, 'Исп. документ отправлен СПИ');
        res.download(path);
        }
        catch(e) {
            next(e);
        }

    }
}

module.exports = new DocumentsController();