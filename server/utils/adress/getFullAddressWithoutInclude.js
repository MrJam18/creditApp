const { Regions, Cities, Streets, Areas, FlatTypes, BlockTypes, HouseTypes, RegionTypes, CityTypes, StreetTypes,
    Debtors
} = require("../../models/models");

module.exports = async function(addressHolder){
    let fullAddress;
    const region = await Regions.findByPk(addressHolder.regionId, {
        attributes: ['name'],
        include: [{model: RegionTypes, attributes: ['name']}]
    })
    const city = await Cities.findByPk(addressHolder.cityId, { 
        attributes: ['name'],
        include: [{model: CityTypes, attributes: ['short']}]
    })
    const street = await Streets.findByPk(addressHolder.streetId, {
        attributes: ['name'], include: [{model: StreetTypes, attributes: ['short']}]
    })
    const area = addressHolder.areaId ? 
    await Areas.findByPk(addressHolder.areaId, {attributes: ['name']})
    : null;
    const flatType = addressHolder.flatTypeId ? await FlatTypes.findByPk(addressHolder.flatTypeId, {
        attributes: ['short']
    }) : null;
    const blockType = addressHolder.blockTypeId ? await BlockTypes.findByPk(addressHolder.blockTypeId, {
        attributes: ['short']
    }) : null;
    const houseType = await HouseTypes.findByPk(addressHolder.houseTypeId, {
        attributes: ['short']
    })
        fullAddress = `${city.city_type.short}. ${city.name}, ${street.street_type.short}. ${street.name}, ${houseType.short}. ${addressHolder.house}`
        if(addressHolder.block) fullAddress = fullAddress + `, ${blockType.short}. ${addressHolder.block}`
        if(addressHolder.flat) fullAddress = fullAddress + `, ${flatType.short}. ${addressHolder.flat}`;
        if(area) fullAddress = `${area.name}, ` + fullAddress;
        if(region.region_type.name !== 'город') fullAddress = `${region.name} ${region.region_type.name}, ` + fullAddress;
        return fullAddress;
}