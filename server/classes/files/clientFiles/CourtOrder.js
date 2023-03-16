const ClientFile = require("./ClientFile");

module.exports = class CourtOrder extends ClientFile
{
    name = 'Судебный приказ';
    changedStatus = 12;

    constructor(buffer, contractId) {
        super(buffer, contractId);
    }
}