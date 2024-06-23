const express = require('express');
const { isAuthenticated, canDownloadCv, isEmployer } = require('../middleware/auth');
const { createJobApplication, applyForJob, getCV } = require('../controller/jobApplication');
const router = express.Router();




// create new job application
router.post('/applyjob', isAuthenticated, createJobApplication);


// create new job application with cv
router.post('/uploadapplyjob', isAuthenticated, applyForJob);

// create new job application with cv
router.get('/getcv/:applicationId', isAuthenticated,isEmployer,canDownloadCv, getCV);




module.exports = router;