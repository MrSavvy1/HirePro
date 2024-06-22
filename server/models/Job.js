const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
		title: { type: String, required: true },
		description: { type: String, required: true },
		location: { type: String, required: true },
		experience: { type: String, required: true },
		type: { type: String, required: true },
		salary: { type: String, required: true },
		postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true },
		createdAt: { type: Date, default: Date.now },
});

const Job = mongoose.model('Job', jobSchema);
module.exports = Job;
