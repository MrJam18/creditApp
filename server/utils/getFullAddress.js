const { RegionTypes, CityTypes, StreetTypes } = require("../models/models");

module.exports = async function getFullAddress(addressHolder){
    let fullAddress;
    const regionType = await RegionTypes.findByPk(addressHolder.region.regionTypeId);
    const cityType = await CityTypes.findByPk(addressHolder.city.cityTypeId);
    const streetType = await StreetTypes.findByPk(addressHolder.street.streetTypeId);

        fullAddress = `${cityType.short}. ${addressHolder.city.name}, ${streetType.short}. ${addressHolder.street.name}, ${addressHolder.house_type.short}. ${addressHolder.house}`
        if(addressHolder.block) fullAddress = fullAddress + `, ${addressHolder.block_type.short}. ${addressHolder.block}`
        if(addressHolder.flat) fullAddress = fullAddress + `, ${addressHolder.flat_type.short}. ${addressHolder.flat}`;
        if(addressHolder.area) fullAddress = `${addressHolder.area.name}, ` + fullAddress;
        if(regionType.name !== 'город') fullAddress = `${addressHolder.region.name} ${regionType.name}, ` + fullAddress;
        return fullAddress;
}