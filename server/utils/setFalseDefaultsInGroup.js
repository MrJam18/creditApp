const { Agents } = require("../models/models");
const getAgentByGroupOrUser = require("./getAgentByGroupOrUser");

module.exports = async function(groupId, userId) {
    const where = getAgentByGroupOrUser(groupId, userId);
    const agents = await Agents.findAll({
        where
    })
    agents.forEach((el)=> {
        if(el.isDefault){
        el.isDefault = false;
        el.save();
        }
    })
}