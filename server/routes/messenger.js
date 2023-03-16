const Router = require('express');
const messengerController = require('../controllers/messengerController');
const authMiddleware = require('../middleware/authMiddleware');
const router = new Router();

router.use(authMiddleware);

router.post('/postMessages', messengerController.create);
router.get('/getMessages');


module.exports = router;