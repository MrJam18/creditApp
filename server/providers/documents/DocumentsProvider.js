const Provider = require("../base/Provider");
const Contracts = require("../../models/documents/Contracts");
const { Actions } = require("../../models/models");
const getISODate = require("../../utils/dates/getISODate");
const CourtOrder = require("../../classes/documents/CourtOrder");
const Claim = require('../../classes/documents/Claim');
const Docx = require("../../classes/files/Docx");

module.exports = class DocumentsProvider extends Provider
{
    constructor()
    {
        super(Contracts)
    }
   async createCourtClaim(contractId, courtId, agentId, groupId, userId, countDate, type, ignorePayments)
    {
        let instance;
        if(type === 'courtOrder') instance = await CourtOrder.init(contractId, agentId, courtId, countDate, groupId, ignorePayments, type);
        else instance = await Claim.init(contractId, agentId, courtId, countDate, groupId, ignorePayments, type);
        const file = new Docx(instance.getPath(), instance.document);
        await file.getBuffer();
        const path = file.createFile();
        await instance.createAction(userId, path);
        if(instance.contract.statusId !== 2){
            const now = getISODate();
            await Contracts.update({
                statusId: 2, statusChanged: now
            }, {where: {
                id: contractId
                }})
            await Actions.create({contractId, userId, actionTypeId: 4, actionObjectId: 12, result: 'статус автоматически изменен на "Ожидает отправки СП".'})
        }
        return path;
    }
}