const { Debtors, Passports } = require("../models/models");
const { getOrCreateAddressIdsFromDB } = require("./adressController");

class DebtorsController {
    getList(req, res, next) {
        const page = req.body.page;
        const limit = req.body.limit;
        const offset = page * limit - limit;


    }
    async createDebtor(req, res, next) {
        try{
        const data = req.body;
        const groupId = req.user.groupId;
        const address = await getOrCreateAddressIdsFromDB(data.address);
        const debtor = await Debtors.create({...address, ...data.debtor, groupId});
        await Passports.create({...data.passport, debtorId: debtor.id});
        return res.json(debtor);
        }
        catch(e) {
            console.log(e);
            next(ApiError.internal(e.message));
        }
    }

}

module.exports = new DebtorsController;