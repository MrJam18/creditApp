const sequelize = require(process.env.ROOT + '/db');
const {DataTypes} = require('sequelize');
const InitTemplates = require(process.env.ROOT + "/models/templates/initTemplates");
const uncapitalizeFirst = require(process.env.ROOT + '/utils/text/uncapitalizeFirst');
const DocumentModel = require("../base/DocumentModel");

class Cessions extends DocumentModel
{

}

Cessions.init({
    id: InitTemplates.id(),
    name: InitTemplates.name(),
    cessionsAmount: {type: DataTypes.INTEGER, allowNull: false},
    lastTransferDate: {type: DataTypes.DATEONLY, allowNull: false}
}, { sequelize, modelName: uncapitalizeFirst('Cessions') });

module.exports = Cessions;
    