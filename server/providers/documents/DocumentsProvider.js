const Provider = require("../base/Provider");
const Contracts = require("../../models/documents/Contracts");

module.exports = class DocumentsProvider extends Provider
{
    constructor()
    {
        super(Contracts)
    }
}