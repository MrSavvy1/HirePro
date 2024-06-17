const express = require('express');
const { postJob, getJobs } = require('../controllers/jobController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/', authMiddleware, postJob);
router.get('/', getJobs);

module.exports = router;
