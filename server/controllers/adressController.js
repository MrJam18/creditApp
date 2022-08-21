const { Regions, Cities, Streets, CityTypes, StreetTypes, RegionTypes, HouseTypes, FlatTypes, Areas, BlockTypes } = require('../models/models');
const findOrCreateByName = require('../utils/findOrCreateinDBByName');

//this deprecated
class AdressController {
    async getOrCreateAddressIdsFromDB(address) {
        try {
        const [regionType] = await findOrCreateByName(RegionTypes, address.region_type, {short: address.region_type_short});
        const [region] = await findOrCreateByName(Regions, address.region, {regionTypeId: regionType.id});
        const [cityType] = await findOrCreateByName(CityTypes, address.city_type, {short: address.city_type_short});
        const [city] = await findOrCreateByName(Cities, address.city, {cityTypeId: cityType.id});
        const [streetType] = await findOrCreateByName(StreetTypes, address.street_type, {short: address.street_type_short});
        const [street] = await findOrCreateByName(Streets, address.street, {streetTypeId: streetType.id})
        const [houseType] = await findOrCreateByName(HouseTypes, address.house_type, {short: address.house_type_short});
        let flatType;
        let area;
        let blockType;
        if (address.flat_type) {
        [flatType] = await findOrCreateByName(FlatTypes, address.flat_type, {short: address.flat_type_short});
        }
        if (address.area) {
         [area] = await findOrCreateByName(Areas, address.area);
        }
        if(address.block_type) {
            [blockType] = await findOrCreateByName(BlockTypes, address.block_type, {short: address.block_type_short})
        }
        return {
            regionId: region.id,
            cityId: city.id,
            streetId: street.id,
            houseTypeId: houseType.id,
            flatTypeId: flatType ? flatType.id : null,
            areaId: area ? area.id : null,
            blockTypeId: blockType ? blockType.id : null,
            flat: address.flat ? address.flat : null,
            house: address.house,
            block: address.block ? address.block : null
        }
        }
        catch(e) {
            throw new Error(e.message)
        }
        
    }
}






module.exports = new AdressController();


