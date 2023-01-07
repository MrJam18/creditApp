const Requisites = require("../../models/documents/Requisites");
const AddressBuilder = require("../../Builders/AddressBuilder");
const Creditors = require("../../models/subjects/Creditors");

class CreditorsProvider
{
    /**
     *
     * @param {Creditors} creditor
     * @param {AddressBuilder} address
     * @param {Requisites} requisites
     * @returns {Promise<void>}
     */
    async addOne(creditor, address, requisites)
    {
        const requisitesInDB = await requisites.save();
        creditor.requisitesId = requisitesInDB.id;
        await address.save(creditor);
    }
    async prepareDataForSave(body, groupId)
    {
        const requisites = Requisites.build({
            checkingAccount: body.checkingAccount,
            correspondentAccount: body.correspondentAccount,
            bankRequisitesId: body.bankRequisitesId,
            id: body.requisitesId || null
        });
        let address = null;
        if(body.address !== 'default') address = await AddressBuilder.build(body.address);
        delete body.address;
        delete body.checkingAccount;
        delete body.correspondentAccount;
        delete body.bankRequisitesId;
        const creditor = Creditors.build(body);
        creditor.groupId = groupId;
        creditor.removeEmptyStrings();
        return {
            requisites,
            address,
            creditor
        }
    }
}


module.exports = new CreditorsProvider();