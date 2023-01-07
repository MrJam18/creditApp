const BaseModel = require("./BaseModel");
const {addressColumns} = require("../../constants/dataBase/addressColumns");
module.exports = class Subject extends BaseModel {


    static getAddressColumns()
    {
        return addressColumns;
    }

    async getFullAddress()
    {
        const getAddress = require("../../utils/adress/getFullAddressWithoutInclude");
        this.fullAddress = await getAddress(this);
        this.setDataValue('fullAddress', this.fullAddress);
        return this.fullAddress;
    }

    static async setAddressByIds(address, ids)
    {
        const Address = require('../../classes/Address');
        const addressIds =  await Address.getIds(address);
        const where = this.getWhereByIds(ids);
        return await this.update(addressIds, {where});
    }
    getNameOrShort()
    {
        if(this.short) this.setDataValue('short', this.short);
        else this.setDataValue('short', this.name);
        return this.short;
    }
}
