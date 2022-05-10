const Router = require('express');
const cessionsController = require('../controllers/cessionsController');
const authMiddleware = require('../middleware/authMiddleware');
const router = new Router();

router.use(authMiddleware);
router.get('/getNameList', cessionsController.getNameList);


module.exports = router;