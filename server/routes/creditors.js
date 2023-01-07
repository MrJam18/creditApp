const Router = require('express');
const creditorsController = require('../controllers/CreditorsController');
const authMiddleware = require('../middleware/authMiddleware');
const router = new Router();

router.use(authMiddleware);
router.get('/getSearchList', creditorsController.getNameList);
router.get('/getNameListForCessions', creditorsController.getNameListForCessions);
router.get('/getList', creditorsController.getList);
router.post('/addOne', creditorsController.addOne);
router.post('/changeOne', creditorsController.changeOne);
router.post('/deleteOne', creditorsController.deleteOne);
router.post('/addBankRequisites', creditorsController.addBankRequisites);
router.get('/searchBankRequisites', creditorsController.searchBankRequisites);
router.get('/getSearchWithCessions', creditorsController.getSearchWithCessions);
router.post('/changeDefaultCession', creditorsController.changeDefaultCession);
router.get('/getCreditor', creditorsController.getCreditor);



module.exports = router;