const Router = require('express');
const paymentsController = require('../controllers/paymentsController');
const authMiddleware = require('../middleware/authMiddleware');
const router = new Router();

router.use(authMiddleware);

router.delete('/deleteOne', paymentsController.deletePayment);
router.get('/getPayments', paymentsController.getPayments);
router.get('/sortPayments', paymentsController.sortPayments);
router.post('/add', paymentsController.createPayment);
router.post('/change', paymentsController.changePayment);


module.exports = router;