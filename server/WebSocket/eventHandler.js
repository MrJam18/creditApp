const adressController = require("../controllers/adressController");

module.exports = async (msg) => {
    switch(msg.event) {
        case 'ADRESSES::GET_MATCHES':
        return await adressController.getAdressMatchesFromDB(msg.fragments);

    }
}