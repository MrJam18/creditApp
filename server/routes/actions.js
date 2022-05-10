const Router = require('express');
const actionsController = require('../controllers/actionsController');
const authMiddleware = require('../middleware/authMiddleware');
const router = new Router();

router.use(authMiddleware);
router.get('/getList', actionsController.getContractActions);
router.get('/getLastActionsList', actionsController.getLastActionsList)


module.exports = router;