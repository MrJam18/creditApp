const ClientFile = require("./ClientFile");


module.exports = class Contract extends ClientFile
{
    name = 'Договор и приложения';
    changedStatus = 2;

    constructor(buffer, contractId) {
        super(buffer, contractId);
    }
    
}