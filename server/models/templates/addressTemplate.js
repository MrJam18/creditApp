const {DataTypes} = require("sequelize");
const addressTemplate = {
    house: {type: DataTypes.STRING(30), allowNull: false},
    flat: {type: DataTypes.STRING(30)},
    block: {type: DataTypes.STRING(30)},
}
module.exports = addressTemplate;