const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({
	title: { type: String, required: true },
	description: { type: String, required: true },
	postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true },
});

module.exports = mongoose.model('Job', JobSchema);
