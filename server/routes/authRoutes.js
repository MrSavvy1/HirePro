const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/signup/:role', authController.signup);
router.post('/login/employee', authController.loginEmployee); 
router.post('/login/company', authController.loginCompany);

module.exports = router;
