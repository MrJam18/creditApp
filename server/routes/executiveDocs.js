const Router = require('express');
const controller = require('../controllers/executiveDocsController');
const authMiddleware = require('../middleware/authMiddleware');
const router = new Router();

router.use(authMiddleware);

router.get('/getExecutiveDoc', controller.getExecutiveDoc);
router.post('/setExecutiveDoc', controller.setExecutiveDoc);



module.exports = router;