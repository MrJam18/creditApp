const sequelize = require(process.env.ROOT + '/db');
const {DataTypes} = require('sequelize');
const uncapitalizeFirst = require(process.env.ROOT + '/utils/text/uncapitalizeFirst');
const DocumentModel = require("../base/DocumentModel");
const InitTemplates = require("../templates/initTemplates");

class BankRequisites extends DocumentModel
{
    
}

BankRequisites.init({
    id: InitTemplates.id(),
    name: InitTemplates.name(),
    BIK: {type: DataTypes.CHAR(9), allowNull: false, unique: true}
}, { sequelize, modelName: uncapitalizeFirst('BankRequisites'), timestamps: false });

module.exports = BankRequisites;
    