const findOrCreateByName = require("../utils/findOrCreateinDBByName");
const {
    RegionTypes,
    Regions,
    CityTypes,
    Cities,
    StreetTypes,
    Streets,
    HouseTypes,
    FlatTypes,
    Areas,
    BlockTypes
} = require("../models/connections");
const changeAddressesOnFullAddress = require('../utils/adress/changeAddressesOnFullAddress');

module.exports = class AddressBuilder
{
    constructor(regionId,
                cityId,
                streetId,
                streetTypeId,
                houseTypeId,
                flatTypeId,
                areaId,
                blockTypeId,
                flat,
                house,
                block)
    {
        this.regionId = regionId;
        this.cityId = cityId;
        this.streetId = streetId;
        this.streetTypeId = streetTypeId;
        this.houseTypeId = houseTypeId;
        this.flatTypeId = flatTypeId;
        this.areaId = areaId;
        this.blockTypeId = blockTypeId;
        this.flat = flat;
        this.house = house;
        this.block = block;
    }

    static async build(addressData)
    {
        const regionTypeId = await findOrCreateByName(RegionTypes, addressData.region_type, {short: addressData.region_type_short});
        const regionId = await findOrCreateByName(Regions, addressData.region, {regionTypeId});
        const cityTypeId = await findOrCreateByName(CityTypes, addressData.city_type, {short: addressData.city_type_short});
        const cityId = await findOrCreateByName(Cities, addressData.city, {cityTypeId});
        const streetTypeId = await findOrCreateByName(StreetTypes, addressData.street_type, {short: addressData.street_type_short});
        const streetId = await findOrCreateByName(Streets, addressData.street, {streetTypeId})
        const houseTypeId = await findOrCreateByName(HouseTypes, addressData.house_type, {short: addressData.house_type_short});
        let flatTypeId;
        let areaId;
        let blockTypeId;
        if (addressData.flat_type) {
            flatTypeId = await findOrCreateByName(FlatTypes, addressData.flat_type, {short: addressData.flat_type_short});
        }
        if (addressData.area) {
            areaId = await findOrCreateByName(Areas, addressData.area);
        }
        if (addressData.block_type) {
            blockTypeId = await findOrCreateByName(BlockTypes, addressData.block_type, {short: addressData.block_type_short})
        }
        return new this(
            regionId,
            cityId,
            streetId,
            streetTypeId,
            houseTypeId,
            flatTypeId || null,
            areaId || null,
            blockTypeId || null,
            addressData.flat || null,
            addressData.house,
            addressData.block || null
        );
    }
    static async getFullAddress(addressHolder) {
        await changeAddressesOnFullAddress(addressHolder);
        return addressHolder.fullAddress;
    }

    async save(Model)
    {
        for(const property in this) {
            Model[property] = this[property];
        }
       await Model.save();
    }
    addInModel(Model)
    {
        for(const property in this) {
            Model[property] = this[property];
        }
    }

}