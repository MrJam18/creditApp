const sequelize = require(process.env.ROOT + '/db');
const {DataTypes} = require('sequelize');
const InitTemplates = require(process.env.ROOT + "/models/templates/initTemplates");
const uncapitalizeFirst = require(process.env.ROOT + '/utils/text/uncapitalizeFirst');
const addressTemplate = require("../templates/addressTemplate");
const Human = require("../base/Human");
const {Text} = require('../../services/documentsService/docxClasses')

class Agents extends Human
{
    
}

Agents.init({
    id: InitTemplates.id(),
        name: {type: DataTypes.STRING, allowNull: false},
    surname: {type: DataTypes.STRING, allowNull: false},
    patronymic: {type: DataTypes.STRING},
    enclosure: {type: DataTypes.STRING, allowNull: false},
...addressTemplate,
    isDefault: {type: DataTypes.BOOLEAN, allowNull: false},
    noShowGroup: {type: DataTypes.BOOLEAN, allowNull: false},
    groupId: {type: DataTypes.INTEGER, allowNull: false},
    // createdAt: {type: DataTypes.DATEONLY, allowNull: false, get(){
    //     const val = this.getDataValue('createdAt')
    //     if(val) return val.toLocaleString('ru-RU').substring(0, 10)
    //     return val;
    // }}
}, { sequelize, modelName: uncapitalizeFirst('Agents') });

module.exports = Agents;