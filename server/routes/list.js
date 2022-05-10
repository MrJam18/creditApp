const Router = require('express');
const listController = require('../controllers/listController');
const authMiddleware = require('../middleware/authMiddleware');
const router = new Router();

router.use(authMiddleware);
router.get('/getList', listController.getList);


module.exports = router;