const Provider = require("./base/Provider");
const {Debtors} = require("../models/models");

 class DebtorsProvider extends Provider
{
    constructor()
    {
        super(Debtors)
    }

}

module.exports = new DebtorsProvider();