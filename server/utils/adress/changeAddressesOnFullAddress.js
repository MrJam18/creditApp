const getFullAddressWithoutInclude = require('./getFullAddressWithoutInclude');

module.exports = async function(addressHolder) {
    addressHolder.fullAddress = await getFullAddressWithoutInclude(addressHolder);
    delete addressHolder.flat;
    delete addressHolder.house;
    delete addressHolder.block;
    delete addressHolder.regionId;
    delete addressHolder.cityId;
    delete addressHolder.streetId;
    delete addressHolder.areaId;
    delete addressHolder.blockTypeId;
    delete addressHolder.houseTypeId;
    delete addressHolder.flatTypeId;
    return addressHolder;
}