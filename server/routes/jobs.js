// routes/jobs.js
const express = require('express');
const router = express.Router();
const Job = require('../models/Job');
const auth = require('../middleware/auth');

// Get all jobs (protected route for Employees)
router.get('/', auth('Employee'), async (req, res) => {
		const jobs = await Job.find();
		res.json(jobs);
});

// Get job by ID (protected route for Employees)
router.get('/:id', auth('Employee'), async (req, res) => {
		const job = await Job.findById(req.params.id);
		res.json(job);
});

// Post a new job (protected route for Companies)
router.post('/', auth('Company'), async (req, res) => {
		const newJob = new Job(req.body);
		await newJob.save();
		res.json(newJob);
});

module.exports = router;
