const express = require('express');
const { isAuthenticated, isEmployer, isAdmin } = require('../middleware/auth');
const { createJobList, showAllJobs, showSingleJob, editSingleJob, deleteSingleJob } = require('../controller/jobListController');
//const { model } = require('mongoose');
const router = express.Router();




// create new joblist
router.post('/jobs', isAuthenticated, isEmployer, createJobList);

// show all joblisting
router.get('/alljobs', isAuthenticated, showAllJobs);


//show single joblisting
router.get('/job/:id', isAuthenticated, showSingleJob);

//editsingle joblisting
router.put('/job/:id', isAuthenticated, isEmployer, editSingleJob);


//deletesingle joblisting
router.delete('/job/:id', isAuthenticated, isAdmin, deleteSingleJob);



module.exports = router;