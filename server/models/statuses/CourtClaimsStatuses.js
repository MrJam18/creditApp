const sequelize = require(process.env.ROOT + '/db');
const uncapitalizeFirst = require(process.env.ROOT + '/utils/text/uncapitalizeFirst');
const InitTemplates = require("../templates/initTemplates");
const AbstractStatuses = require("./AbstractStatuses");

class CourtClaimsStatuses extends AbstractStatuses
{
    
}

CourtClaimsStatuses.init({
    id: InitTemplates.id(),
    name: InitTemplates.name()
}, { sequelize, modelName: uncapitalizeFirst('CourtClaimsStatuses'), ...InitTemplates.deleteCreatedAndUpdatedAt() });

module.exports = CourtClaimsStatuses;
    