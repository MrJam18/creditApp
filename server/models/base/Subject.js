const BaseModel = require("./BaseModel");
module.exports = class Subject extends BaseModel {

    async getFullAddress()
    {
        const getAddress = require("../../utils/adress/getFullAddressWithoutInclude");
        this.setDataValue('fullAddress', await getAddress(this));
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
    // async getName(key)
    // {
    //     this.setDataValue(key, this[key].name);
    //     return this[key];
    // }
}
