const ClientFile = require("./ClientFile");

module.exports = class CancelDecision extends ClientFile
{
    name = 'Определение об отмене судебного приказа';
    changedStatus = 4;
    constructor(buffer, contractId) {
        super(buffer, contractId);
    }
}