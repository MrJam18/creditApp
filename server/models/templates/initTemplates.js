const {DataTypes} = require("sequelize");



class InitTemplates
{
   static id()
    {
        return {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false}
    }
    static money()
    {
        return {type: DataTypes.DECIMAL(10, 2), allowNull: false}
    }
    static name()
    {
        return {type: DataTypes.STRING, unique: true, allowNull: false}
    }
    static notNullForeignKey()
    {
      return {foreignKey: {allowNull: false}}
    }
    static percent()
    {
       return {type: DataTypes.DECIMAL(5,2), allowNull: false}
    }
    static enclosure()
    {
        return {type: DataTypes.STRING(80)}
    }
}

// const getInitTemplates = () => ({
//     id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false},
//     money: {type: DataTypes.DECIMAL(10, 2), allowNull: false},
//     name: {type: DataTypes.STRING, unique: true, allowNull: false},
//     notNullForeignKey: {foreignKey: {allowNull: false}},
//     percent: {type: DataTypes.DECIMAL(5,2), allowNull: false},
// })



module.exports = InitTemplates;