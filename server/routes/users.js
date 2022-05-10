const Router = require('express');
const usersController = require('../controllers/usersController');
const router = new Router();

// router.post('/registration', usersController.registration);
router.post('/login', usersController.login);
router.post('/logout', usersController.logout);
router.get('/refresh', usersController.refresh);


module.exports = router;