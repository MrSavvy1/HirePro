const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken'); // Add jwt for token generation

const EmployeeSchema = new mongoose.Schema({
		name: { type: String, required: true },
		email: { type: String, required: true, unique: true },
		password: { type: String, required: true },
});

EmployeeSchema.pre('save', async function(next) {
		const salt = await bcrypt.genSalt(10);
		this.password = await bcrypt.hash(this.password, salt);
		next();
});

EmployeeSchema.methods.comparePassword = async function(candidatePassword) {
		return await bcrypt.compare(candidatePassword, this.password);
};

// Method to generate a token
EmployeeSchema.methods.generateToken = function() {
		const payload = { id: this._id, email: this.email, role: 'employee' };
		return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
};

module.exports = mongoose.model('Employee', EmployeeSchema);
