const Router = require('express');
const contractsController = require('../controllers/contractsController');
const authMiddleware = require('../middleware/authMiddleware');
const router = new Router();

router.use(authMiddleware);
router.get('/getContract', contractsController.getContract);
router.post('/changeContract', contractsController.changeContract);
router.get('/getLimitationsList', contractsController.getLimitations);
router.post('/createOne', contractsController.createOne);
router.post('/deleteOne', contractsController.deleteOne);
router.get('/getStatuses', contractsController.getStatuses);


module.exports = router;