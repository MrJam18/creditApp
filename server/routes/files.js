const Router = require('express');
const filesController = require('../controllers/filesController');
const authMiddleware = require('../middleware/authMiddleware');
const fileUpload = require("express-fileupload");
const router = new Router();

router.use(fileUpload({}));
router.use(authMiddleware);
router.post('/uploadContractFile', filesController.uploadContractFile);
router.get('/getExistingFiles', filesController.getExistingFiles);
router.get('/getContractFile', filesController.getContractFile);
router.post('/deleteContractFile', filesController.deleteContractFile)


module.exports = router;