const sequelize = require('../../db');
const {DataTypes} = require('sequelize');
const DocumentModel = require("../base/DocumentModel");

class Passports extends DocumentModel
{
    static async getAllById(id)
    {
       const passport = await this.findByPk(id);
       passport.setTimeStamps();
       return passport;
    }
}

Passports.init({
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false},
    series: {type: DataTypes.STRING(5), allowNull: false},
    number: {type: DataTypes.STRING(20), allowNull: false},
    issued_by: {type: DataTypes.STRING, allowNull: false},
    issued_date: {type: DataTypes.DATEONLY, allowNull: false},
    gov_unit_code: {type: DataTypes.STRING, allowNull: false}
}, {sequelize, modelName: 'passports'}
);



module.exports = Passports;