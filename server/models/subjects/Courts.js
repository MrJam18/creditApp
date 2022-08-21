const sequelize = require(process.env.ROOT + '/db');
const {DataTypes} = require('sequelize');
const uncapitalizeFirst = require(process.env.ROOT + '/utils/text/uncapitalizeFirst');
const Subject = require("../base/Subject");
const addressTemplate = require("../templates/addressTemplate");

class Courts extends Subject
{
    
}

Courts.init({
        id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false},
        name: {type: DataTypes.STRING, allowNull:false, unique: true},
        ...addressTemplate
}, { sequelize, modelName: uncapitalizeFirst('Courts') });


module.exports = Courts;