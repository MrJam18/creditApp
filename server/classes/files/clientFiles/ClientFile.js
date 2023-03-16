const File = require('../File');
const {Actions} = require("../../../models/connections");
const Contracts = require("../../../models/documents/Contracts");
const uncapitalizeFirst = require('../../../utils/text/uncapitalizeFirst')


module.exports = class ClientFile extends File
{
    file;
    contractId;
    fileName;
    constructor(buffer, contractId) {
        super(`contracts/${contractId}/files`, buffer, 'pdf');
        this.contractId = contractId;
        let fileName = this.constructor.name;
        const regExp = /^IP/;
        if(!regExp.test(fileName)) fileName = uncapitalizeFirst(fileName);
        this.fileName = fileName;

    }
    async createAction(userId)
    {
        let actionTypeId;
        let actionName;
        if(this.exists) {
            actionTypeId =  4;
            actionName = 'Изменен';
        }
        else {
            actionTypeId = 1;
            actionName = 'Добавлен';
        }
        const result = `${actionName} файл - ${this.name}.`
        await Actions.create({
            actionTypeId, actionObjectId: 14, result, userId, contractId: this.contractId
        })
    }
    async changeStatus(groupId, userId)
    {
        await Contracts.changeStatus(this.contractId, groupId, this.changedStatus, userId, true)
    }

    
}