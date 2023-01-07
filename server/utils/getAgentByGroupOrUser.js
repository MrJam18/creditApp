const { Op } = require("sequelize")

module.exports = function(groupId, userId) {
    return {
        [Op.or]: [
            {groupId}, {userId}
        ]
    };
}