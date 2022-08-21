const Router = require('express');
const cessionsController = require('../controllers/cessionsController');
const authMiddleware = require('../middleware/authMiddleware');
const router = new Router();

router.use(authMiddleware);
router.get('/getNameList', cessionsController.getNameList);
router.get('/getList', cessionsController.getList);
router.get('/getinfo', cessionsController.getInfo);
router.post('/changeOne', cessionsController.changeOne);
router.post('/deleteOne', cessionsController.deleteOne);
router.post('/createOne', cessionsController.addOne);


module.exports = router;