// const {Model} = require("sequelize");
const BaseModel = require("./BaseModel");
// const {Model} = require("sequelize");
const getSurnameAndInitials = require('../../utils/getSurnameAndInititals');
const Subject = require("./Subject");
const {incline} = require("lvovich");

module.exports = class Human extends Subject {
   getFullName()
    {
        const fullName = `${this.surname} ${this.name} ${this.patronymic}`;
        this.setDataValue('fullName', fullName);
        return fullName;
    }
    getInitials()
    {
        const initials = getSurnameAndInitials(this);
        this.setDataValue('initials', initials);
        return initials
    }
    inclineFullName(declension)
    {
        const names = incline({first: this.name, last: this.surname, middle: this.patronymic}, declension);
        this.setDataValue(declension, `${names.last} ${names.first} ${names.middle}`);
        return this[declension];
    }
  // async getFullAddress() {
  //       const getAddress = require("../../utils/adress/getFullAddressWithoutInclude");
  //       this.setDataValue('fullAddress', await getAddress(this));
  //       return this.fullAddress;
  //   }
    setBirthDateOnRus()
    {
       this.setDataValue('birth_date', this.setDateOnRus(this.birth_date));
    }

}