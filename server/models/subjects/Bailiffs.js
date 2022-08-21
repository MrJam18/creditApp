const sequelize = require(process.env.ROOT + '/db');
const {DataTypes} = require('sequelize');
const InitTemplates = require(process.env.ROOT + "/models/templates/initTemplates");
const uncapitalizeFirst = require(process.env.ROOT + '/utils/text/uncapitalizeFirst');
const Subject = require("../base/Subject");
const addressTemplate = require("../templates/addressTemplate");

class Bailiffs extends Subject
{

}

Bailiffs.init({
    id: InitTemplates.id(),
    name:  {type: DataTypes.STRING, allowNull: false, unique: true},
    ...addressTemplate

}, { sequelize, modelName: uncapitalizeFirst('Bailiffs') })


module.exports = Bailiffs;