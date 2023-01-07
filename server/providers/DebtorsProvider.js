const Provider = require("./base/Provider");
const {Debtors} = require("../models/connections");

 class DebtorsProvider extends Provider
{
    constructor()
    {
        super(Debtors)
    }

}

module.exports = new DebtorsProvider();