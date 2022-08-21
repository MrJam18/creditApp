const ClientFile = require("./ClientFile");

module.exports = class IPEnd extends ClientFile
{
    name = 'Постановление об окончании ИП';
    changedStatus = 11;
    constructor(buffer, contractId) {
        super(buffer, contractId);
    }
}