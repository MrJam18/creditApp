const sequelize = require(process.env.ROOT + '/db');
const {DataTypes} = require('sequelize');
const InitTemplates = require(process.env.ROOT + "/models/templates/initTemplates");
const uncapitalizeFirst = require(process.env.ROOT + '/utils/text/uncapitalizeFirst');
const DocumentModel = require("../base/DocumentModel");

class CessionsInfo extends DocumentModel
{
    static async findByCessionId(cessionId, groupId, attributes)
    {
        return await this.findAll({
            where: {cessionId, groupId}, attributes, order: [['transferDate']], plain: true
        });
    }
    static async getFirstCreditor(cessionId, groupId, attributes)
    {
        const Organizations = require('../subjects/Organizations');
        const cession = await this.findOne({
            where: {cessionId, groupId}, order: [['transferDate']], attributes: ['assigneeId']
        })
        return await Organizations.findByIdAndGroupId(cession.assigneeId, groupId, attributes);

    }
    async getEnclosures()
    {
        const CessionsEnclosures = require('../documents/CessionsEnclosures');
        let enclosures = await CessionsEnclosures.findAll({
            where: {cessionsInfoId: this.id}, attributes: ['name']
        })
        enclosures = enclosures.map((el)=> el.name);
        this.setDataValue('enclosures', enclosures);
        return enclosures;
    }
}

CessionsInfo.init({
    id: InitTemplates.id(),
    transferDate: {type: DataTypes.DATEONLY, allowNull: false},
    sum: {type: DataTypes.DECIMAL(20, 2)},
    number: {type: DataTypes.STRING},
    text: {type: DataTypes.TEXT},
    useDefaultText: {type: DataTypes.BOOLEAN, defaultValue: true, allowNull: false}
}, { sequelize, tableName: uncapitalizeFirst('CessionsInfo'), timestamps:false });

module.exports = CessionsInfo;
    