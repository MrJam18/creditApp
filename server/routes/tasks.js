const Router = require('express');
const tasksController = require('../controllers/tasksController');
const authMiddleware = require('../middleware/authMiddleware');
const router = new Router();

router.use(authMiddleware);
// router.post('/registration', usersController.registration);
router.get('/getList', tasksController.getList);
// router.post('/logout',authMiddleware, usersController.logout);
// router.get('/refresh',authMiddleware, usersController.refresh);


module.exports = router;