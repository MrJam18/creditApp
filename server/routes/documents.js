const Router = require('express');
const router = new Router();
const documentsController = require('../controllers/documentsController');
const authMiddleware = require('../middleware/authMiddleware');

router.use(authMiddleware);

router.post('/createCourtClaim', documentsController.createCourtClaim);
router.get('/createClaim', documentsController.createClaim );
router.get('/getDocument', documentsController.getDocument);
router.get('/createCourtReqForID', documentsController.createCourtRequestforID);
router.post('/createIPInit', documentsController.createIPInit)

module.exports = router;