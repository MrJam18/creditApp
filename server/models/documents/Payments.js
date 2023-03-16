const sequelize = require(process.env.ROOT + '/db');
const {DataTypes} = require('sequelize');
const uncapitalizeFirst = require(process.env.ROOT + '/utils/text/uncapitalizeFirst');
const DocumentModel = require("../base/DocumentModel");

class Payments extends DocumentModel
{
    static async getByContractId(id)
    {
        return await Payments.findAndCountAll({order: [['date', 'ASC']], where: {
                contractId: id
            }});
    }
}

Payments.init({
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false},
    sum: {type: DataTypes.DECIMAL(10,2), allowNull: false },
    percents: {type: DataTypes.DECIMAL(10,2), },
    penalties: {type: DataTypes.DECIMAL(10,2), defaultValue: 0},
    main: {type: DataTypes.DECIMAL(10,2), defaultValue: 0},
    date: {type:DataTypes.DATEONLY, allowNull: false}
}, { sequelize, modelName: uncapitalizeFirst('Payments') });

module.exports = Payments;
    