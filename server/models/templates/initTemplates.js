const {DataTypes} = require("sequelize");



class InitTemplates
{
   static id()
    {
        return {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false, unique: true}
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

    /**
     * need writing in a second object of init sequelize function
     * @returns {{timestamps: boolean}}
     */
    static deleteCreatedAndUpdatedAt()
    {
        return {timestamps:false}
    }
}



module.exports = InitTemplates;