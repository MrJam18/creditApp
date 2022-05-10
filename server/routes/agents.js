const Router = require('express');
const agentsController = require('../controllers/agentsController');
const authMiddleware = require('../middleware/authMiddleware');
const router = new Router();

router.use(authMiddleware);
router.get('/getList', agentsController.getList);
router.post('/addOne', agentsController.addOne);
router.post('/changeOne', agentsController.changeOne);
router.post('/deleteOne', agentsController.deleteOne);
router.get('/getSearchList', agentsController.getSearchList);
router.get('/getDefault', agentsController.getDefaultAgent)

module.exports = router;