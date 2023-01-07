const BaseModel = require("./BaseModel");

module.exports = class ContractOwned extends BaseModel
{
    async compareGroupId(groupId) {
        const Contracts = require('../documents/Contracts');
        if(!this.contract && this.contractId) {
            const contract  = await Contracts.findByIdAndGroupId(this.contractId, groupId, ['groupId']);
            return !!contract;
        }
    }
}