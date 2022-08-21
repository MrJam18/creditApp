const DocumentModel = require("../base/DocumentModel");
const {DataTypes} = require("sequelize");
const getISODate = require("../../utils/dates/getISODate");
const sequelize = require(process.env.ROOT + '/db');
const InitTemplates = require("../templates/initTemplates");

class Contracts extends DocumentModel
{
    static async changeStatus(id, groupId, statusId, userId, auto)
    {
        const {Statuses, Actions} = require('../models');
        const contract = await this.findByIdAndGroupId(id, groupId, ['statusId']);;
        const lastStatus = await Statuses.findByPk(contract.statusId);
        const status = await Statuses.findByPk(statusId);
        await contract.update({statusId});
        const result = `Статус был${auto ? ' Автоматически' : ''} изменен с "${lastStatus.name}" на "${status.name}".`
        await Actions.create({
            actionTypeId: '4', actionObjectId: '12', result, contractId: id, userId
        })

    }


}

Contracts.init({
    id: InitTemplates.id(),
    name: {type: DataTypes.STRING},
    number: {type: DataTypes.STRING},
    sum_issue: InitTemplates.money(),
    date_issue: {type: DataTypes.DATEONLY, allowNull: false},
    due_date: {type: DataTypes.DATEONLY},
    percent: InitTemplates.percent(),
    penalty: InitTemplates.percent(),
    statusChanged: {type: DataTypes.DATEONLY},
    isContractJur: {type: DataTypes.BOOLEAN, defaultValue: false, allowNull: false},
    statusId: {type: DataTypes.INTEGER, allowNull: false, set(val){
            const now = getISODate();
            this.setDataValue('statusChanged', now);
            this.setDataValue('statusId', val);
        }},
    createdAt: {type: DataTypes.DATEONLY, allowNull: false, get(){
            const val = this.getDataValue('createdAt')
            if(val) return val.toLocaleString('ru-RU').substring(0, 10)
            return val;
        }}
}, {
    sequelize,
    modelName: 'contracts'
})


module.exports = Contracts;