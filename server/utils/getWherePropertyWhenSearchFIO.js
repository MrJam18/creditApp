const { Op } = require("sequelize");

module.exports = function(searchArray) {
    let where;
    if(searchArray.length == 1) {
        where = {
            [Op.or]: [
                {name: {[Op.iLike]: `${searchArray[0]}%`}}, {surname: {[Op.iLike]: `${searchArray[0]}%`}}, {patronymic: {[Op.iLike]: `${searchArray[0]}%`}}
            ]
        }
    }
    else if(searchArray.length == 2) {
        where = {
            [Op.or]: [
                {name: {[Op.iLike]: `${searchArray[0]}%`}, surname: {[Op.iLike]: `${searchArray[1]}%`}}, {name: {[Op.iLike]: `${searchArray[1]}%`}, surname: {[Op.iLike]: `${searchArray[0]}%`}}, {name: {[Op.iLike]: `${searchArray[0]}%`}, patronymic: {[Op.iLike]: `${searchArray[1]}%`}},
            ]
        }
    }
    else {
        where = {
            [Op.or]: [
                {surname: {[Op.iLike]: `${searchArray[0]}%`}, name: {[Op.iLike]: `${searchArray[1]}%`}, patronymic: {[Op.iLike]: `${searchArray[2]}%`}}
            ]
        }
    }
    return where;
}