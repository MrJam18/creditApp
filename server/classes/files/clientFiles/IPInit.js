const ClientFile = require("./ClientFile");

module.exports = class IPInit extends ClientFile
{
    name = 'Постановление о возбуждении ИП';
    changedStatus = 10;

    constructor(buffer, contractId) {
        super(buffer, contractId);
    }
}