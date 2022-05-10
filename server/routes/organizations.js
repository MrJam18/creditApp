const Router = require('express');
const organizationsController = require('../controllers/organizationsController');
const authMiddleware = require('../middleware/authMiddleware');
const router = new Router();

router.use(authMiddleware);
router.get('/getSearchList', organizationsController.getNameList);
router.get('/getList', organizationsController.getList);
router.post('/addOne', organizationsController.addOne);
router.post('/changeOne', organizationsController.changeOne);
router.post('/deleteOne', organizationsController.deleteOne)


module.exports = router;