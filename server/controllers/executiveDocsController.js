const ExecutiveDocs = require("../models/documents/ExecutiveDocs");
const Contracts = require("../models/documents/Contracts");
const changeAllNumFormates = require("../utils/changeAllNumFormates");
const countSumWithFee = require("../utils/countMoney/countSumWithFee");
const errorHandler = require("../error/errorHandler");
const {getExecutiveDocName} = require("../utils/getExecutiveDocName");

class ExecutiveDocsController
{
    async getExecutiveDoc(req, res, next)
    {
        try {
            const contractId = req.query.contractId;
            await Contracts.checkGroupId(contractId, req.user.groupId);
            const executiveDoc = await ExecutiveDocs.findByContractId(contractId);
            return res.json(executiveDoc);
        } catch(e) {
            next(e);
        }
    }
    async setExecutiveDoc(req, res, next) {
        try{
            let executiveDoc = req.body;
            executiveDoc = changeAllNumFormates(executiveDoc);
            const groupId = req.user.groupId;
            if(executiveDoc.resolutionDate === '') executiveDoc.resolutionDate = null;
            if(executiveDoc.resolutionNumber === '') executiveDoc.resolutionNumber = null;
            executiveDoc.sum = countSumWithFee(executiveDoc);
            await Contracts.checkGroupId(executiveDoc.contractId, groupId);
            let id;
            if(executiveDoc.id) {
                await ExecutiveDocs.update(executiveDoc,
                    {where: {id: executiveDoc.id}});
                id = executiveDoc.id;
            }
            else {
                const executiveDocFromDB = await ExecutiveDocs.create(executiveDoc);
                id = executiveDocFromDB.id;
            }
            console.log(executiveDoc)
            const executiveDocName = getExecutiveDocName(executiveDoc.typeId, executiveDoc.number, executiveDoc.dateIssue);
            res.json({id, executiveDocName});
        }
        catch(e) {
            errorHandler(e, next)
        }
    }
}

module.exports = new ExecutiveDocsController;