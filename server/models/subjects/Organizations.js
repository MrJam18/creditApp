const sequelize = require(process.env.ROOT + '/db');
const {DataTypes} = require('sequelize');
const Subject = require("../base/Subject");
const addressTemplate = require("../templates/addressTemplate");

class Organizations extends Subject {
    getSearchName()
    {
            let name;
            if (this.short) name = this.short + ", ИНН: " +  this.INN;
            else name = this.name;
            this.setDataValue('name', name);
            return this.name;
    }
    deleteUnusedSearchFields()
    {
        this.deleteData('short');
        this.deleteData('INN');
    }

}

Organizations.init(
     {
        id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false},
        name: {type: DataTypes.STRING, allowNull: false},
        short: {type: DataTypes.STRING, },
        requisits: {type: DataTypes.TEXT, unique: true},
        INN: {type: DataTypes.INTEGER, unique: true, allowNull: false},
        KPP: {type: DataTypes.INTEGER, unique: true},
        ...addressTemplate,
        createdAt: {type: DataTypes.DATEONLY, allowNull: false, get(){
                const val = this.getDataValue('createdAt')
                if(val) return val.toLocaleString('ru-RU').substring(0, 10)
                return val;
            }}
    }, {
         sequelize,
         modelName: 'organizations'
    })

module.exports = Organizations;