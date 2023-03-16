// const findOrCreateByName = require("../utils/findOrCreateinDBByName");
// const {
//     RegionTypes,
//     Regions,
//     CityTypes,
//     Cities,
//     StreetTypes,
//     Streets,
//     HouseTypes,
//     FlatTypes,
//     Areas,
//     BlockTypes
// } = require("../models/connections");
//
// module.exports = class Address {
//     static async getIds(address)
//     {
//         const regionTypeId = await findOrCreateByName(RegionTypes, address.region_type, {short: address.region_type_short});
//         const regionId = await findOrCreateByName(Regions, address.region, {regionTypeId});
//         const cityTypeId = await findOrCreateByName(CityTypes, address.city_type, {short: address.city_type_short});
//         const cityId = await findOrCreateByName(Cities, address.city, {cityTypeId});
//         const streetTypeId = await findOrCreateByName(StreetTypes, address.street_type, {short: address.street_type_short});
//         const streetId = await findOrCreateByName(Streets, address.street, {streetTypeId})
//         const houseTypeId = await findOrCreateByName(HouseTypes, address.house_type, {short: address.house_type_short});
//         let flatTypeId;
//         let areaId;
//         let blockTypeId;
//         if (address.flat_type) {
//             flatTypeId = await findOrCreateByName(FlatTypes, address.flat_type, {short: address.flat_type_short});
//         }
//         if (address.area) {
//             areaId = await findOrCreateByName(Areas, address.area);
//         }
//         if (address.block_type) {
//             blockTypeId = await findOrCreateByName(BlockTypes, address.block_type, {short: address.block_type_short})
//         }
//         return {
//             regionId,
//             cityId,
//             streetId,
//             streetTypeId,
//             houseTypeId,
//             flatTypeId: flatTypeId || null,
//             areaId: areaId || null,
//             blockTypeId: blockTypeId || null,
//             flat: address.flat || null,
//             house: address.house,
//             block: address.block || null
//         }
//     }
//
// }