const ApiError = require('../error/apiError');
const Debtors = require('../models/subjects/Debtor');
const Contracts = require('../models/documents/Contracts')
const Passports = require('../models/documents/Passport')
const provider = require('../providers/DebtorsProvider');
const {PassportTypes} = require("../models/PassportType");
const errorHandler = require('../error/errorHandler');
const Address = require("../classes/Address");

class DebtorsController {
    async createDebtor(req, res, next) {
        try{
        const data = req.body;
        const groupId = req.user.groupId;
        const addressIds = await Address.getIds(data.address);
        const debtor = await Debtors.create({...addressIds, ...data.debtor, groupId});
        if(data.passport !== 'noPassport') await Passports.create({...data.passport, debtorId: debtor.id, groupId, typeId: 1});
        return res.json(debtor);
        }
        catch(e) {
            errorHandler(e, next)
        }
    }
    
    async getDebtor(req, res, next)
    {
        try {
            const {id, groupId} = provider.getIds(req);
           const debtor = await Debtors.getAllById(id, groupId);
            const {count} = await Contracts.findAndCountAll({
                where: { id, groupId }
            });
            debtor.countContracts = count;
                res.json(debtor);
        }
        catch(e) {
            console.log(e);
            next(ApiError.internal(e.message));
        }
    }
    async setDebtor(req, res, next)
    {
        try {
            const data = req.body;
            const ids = provider.getIds(req);
            if(data.address) await Debtors.setAddressByIds(data.address, ids);
            else await Debtors.updateByIdAndGroupId(ids.id, ids.groupId, data.changingField);
            provider.sendOk(res);
        }
        catch(e) {
            errorHandler(e);
        }
    }
    async setPassport(req, res, next)
    {
        try{
            const data = req.body;
            const ids = provider.getIds(req);
            await Passports.updateByIdAndGroupId(ids.id, ids.groupId, data.changingField);
            provider.sendOk(res);
        }
        catch(e){
            errorHandler(e)
        }

    }
    async getPassportTypes(req, res, next)
    {
        try {
           const passportTypes = await PassportTypes.findAll();
           return res.json(passportTypes);
        }
        catch(e) {
            console.log(e);
            next(ApiError.internal(e.message));
        }
    }
    async deleteOne(req, res, next)
    {
        try{
            const {id, groupId} = provider.getIds(req);
            await Debtors.deleteByIdAndGroupId(id, groupId);
            provider.sendOk(res);
        }
        catch(e){
            errorHandler(e, next)
        }
    }
    async definePassport(req, res,next)
    {
        try{
            const body = req.body;
            const groupId = req.user.groupId;
            if(body === 'noPassport') return next(ApiError.badRequest('Заданы теже параметры!'))
            await Passports.create({...body, groupId});
            provider.sendOk(res);
        }
        catch(e){
            errorHandler(e, next)
        }
    }
}

module.exports = new DebtorsController();