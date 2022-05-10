const Router = require('express');
const debtorsController = require('../controllers/debtorsController');
const authMiddleware = require('../middleware/authMiddleware');
const router = new Router();

router.use(authMiddleware);
router.post('/createOne', debtorsController.createDebtor);


module.exports = router;