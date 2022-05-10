const { Op } = require("sequelize")

module.exports = function(groupId, userId) {
    const where = {
        [Op.or]: [
            {groupId}, {userId}
        ]
    }
    return where;
}