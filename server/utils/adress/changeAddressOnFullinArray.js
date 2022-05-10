const getFullAddressWithoutInclude = require("./getFullAddressWithoutInclude");

module.exports = async function(array) {
    let rows = [];
    for(const el of array) {
        const element = el.get({plain: true});
        element.fullAddress = await getFullAddressWithoutInclude(element);
        delete element.flat;
        delete element.house;
        delete element.block;
        delete element.regionId;
        delete element.cityId;
        delete element.streetId;
        delete element.areaId;
        delete element.blockTypeId;
        delete element.houseTypeId;
        delete element.flatTypeId;
        rows.push(element);
    }
    return rows;
}   