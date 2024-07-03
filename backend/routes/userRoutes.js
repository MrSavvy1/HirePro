const express = require('express');
const router = express.Router();
const { allUsers, singleUser, editUser, deleteUser, updateProfile } = require('../controller/userController');
const { isAuthenticated, isAdmin } = require('../middleware/auth');



//get all users /api/allusers
router.get("/allusers", isAuthenticated, isAdmin, allUsers);

//get user by id /api/user/:id
router.get("/user/:id", isAuthenticated, singleUser);

//edit user by id  /api/edituser
router.put("/user/edit/:id", isAuthenticated, editUser);

//delete user by id  /api/deleteuser
router.delete("/deleteuser/:id", isAuthenticated, deleteUser);

// update profile
router.put("/user/updateprofile", isAuthenticated, updateProfile);

module.exports = router;