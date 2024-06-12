// server/routes/authRoutes.js
const express = require('express');
const router = express.Router();
const { signup, login } = require('../controllers/authController'); // Correctly importing the controller functions

router.post('/signup/:role', signup);
router.post('/login', login);

module.exports = router;
