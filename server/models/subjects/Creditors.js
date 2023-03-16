const sequelize = require(process.env.ROOT + '/db');
const {DataTypes} = require('sequelize');
const Subject = require("../base/Subject");
const addressTemplate = require("../templates/addressTemplate");

class Creditors extends Subject {
    getSearchName()
    {
        let name;
        if (this.creditorTypeId !== 3 && this.short) name = this.short + ", ИНН: " +  this.courtIdentifier;
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

Creditors.init(
     {
        id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false},
        name: {type: DataTypes.STRING, allowNull: false},
        short: {type: DataTypes.STRING},
        courtIdentifier: {type: DataTypes.STRING(50), allowNull: false},
        ...addressTemplate,
        createdAt: {type: DataTypes.DATEONLY, allowNull: false, get(){
                const val = this.getDataValue('createdAt')
                if(val) return val.toLocaleString('ru-RU').substring(0, 10)
                return val;
            }},
         groupId: {type: DataTypes.INTEGER, allowNull: false},
         requisitesId: {type: DataTypes.INTEGER, unique: true},
    }, {
         sequelize,
         modelName: 'creditors'
    })


module.exports = Creditors;