const express = require('express');
const { createJobCategory, listJobCategory } = require('../controller/jobCategoryController');
const { isAuthenticated, isnewAuthenticated, isEmployer } = require('../middleware/auth');
const router = express.Router();


// /api/createJobCategory
router.post('/jobCat/create',isAuthenticated, createJobCategory);

// /api/createJobCategory
router.get('/jobCat/all',isAuthenticated,isEmployer, listJobCategory);



module.exports = router;