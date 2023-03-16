const Router = require('express');
const debtorsController = require('../controllers/debtorsController');
const authMiddleware = require('../middleware/authMiddleware');
const router = new Router();

router.use(authMiddleware);
router.post('/createOne', debtorsController.createDebtor);
router.get('/getDebtor', debtorsController.getDebtor);
router.post('/setDebtor', debtorsController.setDebtor);
router.get('/getPassportTypes', debtorsController.getPassportTypes);
router.post('/deleteOne', debtorsController.deleteOne);
router.post('/setPassport', debtorsController.setPassport);
router.post('/definePassport', debtorsController.definePassport);


module.exports = router;