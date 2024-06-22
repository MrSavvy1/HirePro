const Job = require('../models/Job');

exports.postJob = async (req, res) => {
		const { title, description, location, experience, type, salary } = req.body;
		try {
				const newJob = new Job({
						title,
						description,
						location,
						experience,
						type,
						salary,
						postedBy: req.user.id
				});
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

exports.getJobById = async (req, res) => {
		try {
				const job = await Job.findById(req.params.id);
				if (!job) {
						return res.status(404).json({ message: 'Job not found' });
				}
				res.status(200).json(job);
		} catch (err) {
				res.status(500).json({ message: 'Server error', error: err });
		}
};

exports.deleteJob = async (req, res) => {
		try {
				const job = await Job.findByIdAndDelete(req.params.id);
				if (!job) {
						return res.status(404).json({ message: 'Job not found' });
				}
				res.status(204).send();
		} catch (err) {
				res.status(500).json({ message: 'Server error', error: err });
		}
};
