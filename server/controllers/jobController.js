const Job = require('../models/Job');

exports.postJob = async (req, res) => {
	const { title, description } = req.body;

	try {
		const newJob = new Job({ title, description, postedBy: req.user.id });
		await newJob.save();
		res.status(201).json(newJob);
	} catch (err) {
		res.status(500).json({ message: 'Server error', error: err });
	}
};

exports.getJobs = async (req, res) => {
	try {
		const jobs = await Job.find();
		res.status(200).json(jobs);
	} catch (err) {
		res.status(500).json({ message: 'Server error', error: err });
	}
};
