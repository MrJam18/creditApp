const BaseModel = require("./base/BaseModel");
const sequelize = require('../db');
const InitTemplates = require("./templates/initTemplates");


class PassportTypes extends BaseModel
{

}
PassportTypes.init({
    id: InitTemplates.id(),
    name: InitTemplates.name()
},
    {
    sequelize, modelName: 'type', tableName: 'passportTypes',
    timestamps: false
})



module.exports = {PassportTypes};