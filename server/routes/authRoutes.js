const express = require('express');
<<<<<<< HEAD
const router = express.Router();
const { registerUser, loginUser } = require('../auth/authController');

router.post('/signup', registerUser);
router.post('/login', loginUser);
=======
const { signup, login } = require('../models/auth/authControllers');

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
>>>>>>> parent of 1a3aa6e (auth added)

module.exports = router;
