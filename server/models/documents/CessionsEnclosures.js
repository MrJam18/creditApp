const sequelize = require(process.env.ROOT + '/db');
const {DataTypes} = require('sequelize');
const InitTemplates = require(process.env.ROOT + "/models/templates/initTemplates");
const uncapitalizeFirst = require(process.env.ROOT + '/utils/text/uncapitalizeFirst');
const DocumentModel = require('../base/DocumentModel');

class CessionsEnclosures extends DocumentModel
{

}

CessionsEnclosures.init({
    id: InitTemplates.id(),
    name: DataTypes.STRING(100)
}, { sequelize, modelName: uncapitalizeFirst('CessionsEnclosures'), timestamps: false });

module.exports = CessionsEnclosures;
    