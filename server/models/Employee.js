// server/models/Employee.js
const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
	name: { type: String, required: true },
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true },
});


EmployeeSchema.methods.comparePassword = async function(candidatePassword) {
		return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('Employee', EmployeeSchema);
