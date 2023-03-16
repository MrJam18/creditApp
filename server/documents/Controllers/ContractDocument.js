const {Text} = require('../../services/documentsService/docxClasses');
const {Actions} = require("../../models/connections");
const countDays = require("../../utils/dates/countDays");
const Enclosures = require("../../classes/docx/Enclosures");
const getISODate = require("../../utils/dates/getISODate");
const Contracts = require("../../models/documents/Contracts");
const {incline} = require("lvovich");
const {changeDateFormat} = require("../../utils/dates/changeDateFormat");


class ContractDocument
{

    contract
    document;
    actionObjectId;
    enclosures = new Enclosures();
    path;

   getDocuments(documents)
    {
      return documents.map((el)=> new Text(el))
    }
    async createAction(userId, fullPath, currentSt)
    {
        await Actions.create({contractId: this.contract.id, actionTypeId: 1, actionObjectId: this.actionObjectId, userId, result: fullPath});

    }

    async changeStatus(statusId, userId, statusName)
    {
        if(this.contract.statusId !== statusId){
            const now = getISODate();
            await Contracts.update({
                statusId, statusChanged: now
            }, {where: {
                    id: this.contract.id
                }})
            await Actions.create({contractId: this.contract.id, userId, actionTypeId: 4, actionObjectId: 12, result: `статус автоматически изменен на "${statusName}".`});
        }
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
    _setPath(contractId, dirName)
    {
        this.path = `/${contractId}/documents/${dirName}`;
    }
    _getGenitive(name, surname = null, patronymic= null)
    {
        if(!surname && !patronymic)
        {
            const namesArray = name.split(' ', 3);
            if(namesArray?.length >= 2) {
                const genitive = incline({first: namesArray[1], last: namesArray[0], middle: namesArray[2] || null}, 'genitive');
                return `${genitive.last} ${genitive.first} ${genitive.middle}`;
            }
            else throw new Error(`name ${name} can't be inclined`);
        }
        else {
            const genitive = incline({first: name, last: surname, middle: patronymic}, 'genitive');
            return `${genitive.last} ${genitive.first} ${genitive.middle}`;
        }
    }
    _changeDateOnRus(date)
    {
        return changeDateFormat(date);
    }



}

module.exports = ContractDocument;