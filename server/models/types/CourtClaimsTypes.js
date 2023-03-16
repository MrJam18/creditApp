const sequelize = require(process.env.ROOT + '/db');
const uncapitalizeFirst = require(process.env.ROOT + '/utils/text/uncapitalizeFirst');
const InitTemplates = require("../templates/initTemplates");
const AbstractTypes = require("./AbstractTypes");

class CourtClaimsTypes extends AbstractTypes
{
    
}

CourtClaimsTypes.init({
    id: InitTemplates.id(),
    name: InitTemplates.name(),
}, { sequelize, modelName: uncapitalizeFirst('CourtClaimsTypes'), ...InitTemplates.deleteCreatedAndUpdatedAt()});

module.exports = CourtClaimsTypes;
    