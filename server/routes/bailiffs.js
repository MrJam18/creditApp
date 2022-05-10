const Router = require('express');
const bailiffsController = require('../controllers/bailiffsController');
const authMiddleware = require('../middleware/authMiddleware');
const router = new Router();

router.use(authMiddleware);
router.post('/createOne', bailiffsController.createOne);
router.get('/search', bailiffsController.searchBailiffs);

module.exports = router;