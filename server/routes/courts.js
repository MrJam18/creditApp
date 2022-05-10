const Router = require('express');
const courtsController = require('../controllers/courtsController');
const authMiddleware = require('../middleware/authMiddleware');

const router = new Router();

router.use(authMiddleware);
router.get('/findByName',  courtsController.findByName);
router.get('/getTypes', courtsController.getTypes);
router.get('/getLevels', courtsController.getLevels);
router.post('/create', courtsController.create)

module.exports = router;