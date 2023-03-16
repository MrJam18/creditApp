// const {Model} = require("sequelize");
const BaseModel = require("./BaseModel");
// const {Model} = require("sequelize");
const getSurnameAndInitials = require('../../utils/getSurnameAndInititals');
const Subject = require("./Subject");
const {incline} = require("lvovich");
const FIO = require('../../constants/dataBase/FIO');

module.exports = class Human extends Subject {

    static getFIOColumns()
    {
        return FIO;
    }

   getFullName()
    {
        const fullName = `${this.surname} ${this.name} ${this.patronymic}`;
        this.setDataValue('fullName', fullName);
        this.fullName = fullName;
        return fullName;
    }
    getFullNameWithDel()
    {
        const fullName = this.getFullName();
        delete this.dataValues.name;
        delete this.dataValues.surname;
        delete this.dataValues.patronymic;
        return fullName;
    }
    getInitials()
    {
        this.initials = getSurnameAndInitials(this);
        this.setDataValue('initials', this.initials);
        return this.initials;
    }
    inclineFullName(declension)
    {
        const names = incline({first: this.name, last: this.surname, middle: this.patronymic}, declension);
        this[declension] = `${names.last} ${names.first} ${names.middle}`;
        return this[declension];
    }
  // async getFullAddress() {
  //       const getAddress = require("../../utils/adress/getFullAddressWithoutInclude");
  //       this.setDataValue('fullAddress', await getAddress(this));
  //       return this.fullAddress;
  //   }
  //   setBirthDateOnRus()
  //   {
  //      this.setDataValue('birth_date', this.setDateOnRus(this.birth_date));
  //   }

}