const express = require('express');
const router = express.Router();
const { signup, signin, logout, userProfile } = require('../controller/authController');
const { isAuthenticated, isnewAuthenticated } = require('../middleware/auth');


//auth signup routes
router.post("/signup", signup);

//auth signin routes
router.post("/signin", signin);

// auth logout
router.get("/logout", logout);

// show userProfile
router.get("/mydata" ,isAuthenticated, userProfile);

module.exports = router;