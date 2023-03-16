const DocumentModel = require("../base/DocumentModel");
const {DataTypes} = require("sequelize");
const InitTemplates = require("../templates/initTemplates");
const sequelize = require('../../db');
const Money = require("../../classes/Money");
const {objectComparing} = require("../../utils/objects/objectComparing");
const executiveDocTypes = require("../../constants/dataBase/executiveDocTypes");
const {changeDateFormat} = require("../../utils/dates/changeDateFormat");


class ExecutiveDocs extends DocumentModel
{
    static async createOne(data)
    {
        const executiveDoc = this.build({
            main: Money.getDBFormat(data.main),
            percents: Money.getDBFormat(data.percents),
            penalties: Money.getDBFormat(data.penalties),
            fee: Money.getDBFormat(data.fee),
            contractId: data.contractId,
            bailiffId: data.bailiffId,
            number: data.number,
            dateIssue: data.dateIssue,
            resolutionDate: data.resolutionDate,
            resolutionNumber: data.resolutionNumber,
            typeId: data.typeId,
            agentId: data.agentId
        });
        executiveDoc.sum = Money.getSum(executiveDoc);
        await executiveDoc.save();
        return executiveDoc;
    }
    static async createOrUpdate(data)
    {
        if(data.id) await ExecutiveDocs.update(data, {where: {id: data.id}});
        else await ExecutiveDocs.create(data);
    }



    compare(comparedObject)
    {
     const plain = this.getPlain();
     return objectComparing(plain, comparedObject);
    }

    static async findByContractId(contractId)
    {
        return await ExecutiveDocs.findOne({where: {contractId}});
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
    sum: InitTemplates.money(),
}, {
    sequelize,
    modelName: 'executiveDocs',
    indexes: [
        {
            fields: ['contractId'],
            unique: true
        }
    ]
});




module.exports = ExecutiveDocs;
