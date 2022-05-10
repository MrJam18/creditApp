const Router = require('express');
const paymentsController = require('../controllers/paymentsController');
const authMiddleware = require('../middleware/authMiddleware');
const router = new Router();

router.use(authMiddleware);

router.post('/deletePayment', paymentsController.deletePayment);
router.get('/getPayments', paymentsController.getPayments);
router.get('/sortPayments', paymentsController.sortPayments);
router.post('/add', paymentsController.createPayment);


module.exports = router;