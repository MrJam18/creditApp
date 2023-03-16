const ClientFile = require("./ClientFile");

module.exports = class ReceivingOrder extends ClientFile
{
    name = 'Исполнительный лист';
    changedStatus = 8;

    constructor(buffer, contractId) {
        super(buffer, contractId);
    }
    
}