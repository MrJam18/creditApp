const Provider = require("../base/Provider");
const Cessions = require("../../models/documents/Cessions");
module.exports = class CessionsProvider extends Provider
{
    constructor() {
        super(Cessions);
    }
}