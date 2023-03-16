const Human = require('../base/Human');
const sequelize = require('../../db');
const {DataTypes} = require('sequelize');
const {PassportTypes} = require("../PassportType");
const Contracts = require("../documents/Contracts");
const Creditors = require("./Creditors");

// const getFullAddressWithoutInclude = require("../utils/adress/getFullAddressWithoutInclude");
//
//



class Debtors extends Human
{
     static async getAllById(id, groupId){
         const Passports = require("../documents/Passport");
         let debtor = await this.findOne({where: {id, groupId}});
         let passport = await Passports.findOne({where: {
             debtorId: id
             }, include: {model: PassportTypes, attributes: ['name']}});
         if(passport)
         {
             passport.setTimeStamps();
             passport = passport.getPlain();
             passport.type =  {value: passport.type.name, id: passport.typeId};
             delete passport.typeId;
         }
         else passport = 'noPassport';
         await debtor.getFullAddress();
         await debtor.getInitials();
         debtor.setTimeStamps();
         debtor = debtor.getPlain(debtor);
         debtor.passport = passport;
         delete debtor.flat;
         delete debtor.house;
         delete debtor.block;
         delete debtor.regionId;
         delete debtor.cityId;
         delete debtor.streetId;
         delete debtor.areaId;
         delete debtor.blockTypeId;
         delete debtor.houseTypeId;
         delete debtor.flatTypeId;
         return debtor;
    }
    static async getList(where, limit, offset, order, include = null)
    {
        if(!include) include = [{ model: Contracts,
            attributes: ['id', 'number', 'date_issue'],
                include: [{model: Creditors, attributes: ['name']}]},
        ];
        const rows = await Debtors.findAll({limit, offset, order, where, include,
            attributes: ['surname', 'name', 'patronymic', 'birth_date', 'birth_place', 'createdAt'],
            });
        const count = await Debtors.count({where});
        return {rows, count};
    }

}

Debtors.init({
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false},
    name: {type: DataTypes.STRING, allowNull: false},
    surname: {type: DataTypes.STRING, allowNull: false},
    patronymic: {type: DataTypes.STRING},
    birth_date: {type: DataTypes.DATEONLY,},
    birth_place: {type: DataTypes.STRING},
    house: {type: DataTypes.STRING(30), allowNull:false},
    flat: {type: DataTypes.STRING(30)},
    block: {type: DataTypes.STRING(30)},
}, {
    sequelize,
    modelName: 'debtors'
})

module.exports = Debtors;
