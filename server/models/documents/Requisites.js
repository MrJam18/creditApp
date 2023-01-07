const sequelize = require(process.env.ROOT + '/db');
const {DataTypes} = require('sequelize');
const uncapitalizeFirst = require(process.env.ROOT + '/utils/text/uncapitalizeFirst');
const DocumentModel = require("../base/DocumentModel");
const InitTemplates = require("../templates/initTemplates");
const BankRequisites = require("./BankRequisites");

class Requisites extends DocumentModel
{
    static async getAllById(requisitesId)
    {
        const data =  await this.findByPk(requisitesId, {attributes: ['checkingAccount', 'correspondentAccount'],
            include: {model: BankRequisites, attributes: ['name', 'BIK']}});
        return [
            {name: 'Расчетный счет', data: data.checkingAccount},
            {name: 'БИК банка', data: data.bankRequisite.BIK},
            {name: 'Наименование банка', data: data.bankRequisite.name},
            {name: 'Корресп. счет', data: data.correspondentAccount}
        ];
    }
}

Requisites.init({
    id: InitTemplates.id(),
    checkingAccount: DataTypes.CHAR(20),
    correspondentAccount: DataTypes.CHAR(20)
}, {sequelize, modelName: uncapitalizeFirst('Requisites')});

module.exports = Requisites;
    