const sequelize = require(process.env.ROOT + '/db');
const {DataTypes} = require('sequelize');
const uncapitalizeFirst = require(process.env.ROOT + '/utils/text/uncapitalizeFirst');
const DocumentModel = require("../base/DocumentModel");
const InitTemplates = require("../templates/initTemplates");

class CourtClaims extends DocumentModel
{
    static async getLastCourt(contractId) {
        const Courts = require("../../models/subjects/Courts");
        const data = await CourtClaims.findOne({attributes: ['id'], limit: 1, order: [['sendingDate', 'DESC']],
            where: {contractId},
            include: [{model: Courts, attributes: ['id', 'name']}]});
        if(data) return data.court;
        return null;
    }
}

CourtClaims.init({
    id: InitTemplates.id(),
    sum: InitTemplates.money(),
    main: InitTemplates.money(),
    percents: InitTemplates.money(),
    penalties: InitTemplates.money(),
    fee: InitTemplates.money(),
    sendingDate: {type: DataTypes.DATEONLY, allowNull: false},
    statusDate: {type: DataTypes.DATEONLY, allowNull: false}
}, { sequelize, modelName: uncapitalizeFirst('CourtClaims'), ...InitTemplates.deleteCreatedAndUpdatedAt(), indexes: [
        {
            unique: true, fields: ['contractId']
        }
    ]
}
);

module.exports = CourtClaims;
    