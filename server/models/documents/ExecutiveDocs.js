const DocumentModel = require("../base/DocumentModel");
const {DataTypes} = require("sequelize");
const InitTemplates = require("../templates/initTemplates");
const sequelize = require('../../db');
const Money = require("../../classes/Money");


class ExecutiveDocs extends DocumentModel
{
    static async createOne(data, groupId, contractId)
    {
        data.main = Money.getDBFormat(data.main);
        data.percents = Money.getDBFormat(data.percents);
        data.penalties = Money.getDBFormat(data.penalties);
        data.fee = Money.getDBFormat(data.fee);
        data.groupId = groupId;
        data.contractId = contractId;
        data.sum = Money.getSum(data);
        await this.create(data);
    }


}

ExecutiveDocs.init({
    id: InitTemplates.id(),
    number: {type: DataTypes.STRING, allowNull: false},
    dateIssue: {type: DataTypes.DATEONLY, allowNull: false, get(){
            const val = this.getDataValue('dateIssue')
            if(val) return val.toLocaleString('ru-RU').substring(0, 10)
            return val;
        }},
    resolutionNumber: {type: DataTypes.STRING},
    resolutionDate: {type: DataTypes.DATEONLY, get(){
            const val = this.getDataValue('resolutionDate');
            if(val) return val.toLocaleString('ru-RU').substring(0, 10)
            return val;
        }},
    main: InitTemplates.money(),
    percents: InitTemplates.money(),
    penalties: InitTemplates.money(),
    fee: InitTemplates.money(),
    sum: {type: DataTypes.DECIMAL(5,2), allowNull: false},
}, {
    sequelize,
    modelName: 'executiveDocs'
});




module.exports = ExecutiveDocs;
