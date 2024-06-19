// server/models/Company.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); // Add bcrypt for password hashing

const CompanySchema = new mongoose.Schema({
		name: { type: String, required: true },
		email: { type: String, required: true, unique: true },
		password: { type: String, required: true },
});

CompanySchema.pre('save', async function(next) {
		const salt = await bcrypt.genSalt(10);
		this.password = await bcrypt.hash(this.password, salt);
		next();
});

CompanySchema.methods.comparePassword = async function(candidatePassword) {
		return await bcrypt.compare(candidatePassword, this.password);
};
/*
CompanySchema.methods.generateToken = function() {
		return jwt.sign({ id: this._id, role: 'company' }, process.env.JWT_SECRET, { expiresIn: '1h' });
}; */

module.exports = mongoose.model('Company', CompanySchema);