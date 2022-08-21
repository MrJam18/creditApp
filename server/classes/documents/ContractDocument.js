const {Text} = require('../../services/documentsService/docxClasses');
const {Actions} = require("../../models/models");
const countDays = require("../../utils/dates/countDays");
const Enclosures = require("../docx/Enclosures");


class ContractDocument
{
    actionObjectId;
    contractId;
    document;
    enclosures = new Enclosures();
    constructor(actionObjectId, contractId) {
        this.actionObjectId = actionObjectId;
        this.contractId = contractId;
    }
   getDocuments(documents)
    {
      return documents.map((el)=> new Text(el))
    }
    async createAction(userId, fullPath)
    {
        await Actions.create({contractId: this.contractId, actionTypeId: 1, actionObjectId: this.actionObjectId, userId, result: fullPath});
    }
    getDaysCase(dateIssue, dueDate)
    {
        const days = countDays(dateIssue, dueDate);
        let daysCase;
        if(days > 31) daysCase = 'дня';
        else if(days === 31) daysCase = 'день';
        else daysCase = 'дней';
        return {days, daysCase};

    }



}

module.exports = ContractDocument;