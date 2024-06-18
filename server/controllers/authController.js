const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Employee = require('../models/Employee');
const Company = require('../models/Company');

exports.signup = async (req, res) => {
	const role = req.params.role; // Get the role from the URL parameter

	const { name, email, password } = req.body;
	
	try {
		if (role === 'employee') {
								const employee = await Employee.create({ name, email, password }); // Create Employee
								const token = employee.generateToken();
								res.status(201).json({ message: 'Employee created', token });
						} else if (role === 'company') {
								const company = await Company.create({ name, email, password }); // Create Company
								const token = company.generateToken();
								res.status(201).json({ message: 'Company created', token });
						} else {
								res.status(400).json({ message: 'Invalid role' });
						}
				} catch (err) {
						if (err.code === 11000) {
								res.status(400).json({ message: 'Email already exists' });
						} else {
								res.status(500).json({ message: 'Server error', error: err });
						}
				}
		};
exports.login = async (req, res) => {
	const { email, password } = req.body;
	const role = req.body.role; // Get the role from the URL parameter

	try {
		const user = role === 'employee' 
			? await Employee.findOne({ email }) 
			: await Company.findOne({ email });

		if (!user) {
			return res.status(400).json({ message: 'Invalid credentials' });
		}

		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) {
			return res.status(400).json({ message: 'Invalid credentials' });
		}

		const token = jwt.sign({ id: user._id, role }, process.env.JWT_SECRET, { expiresIn: '1h' });
		res.json({ token });
	} catch (err) {
		res.status(500).json({ message: 'Server error', error: err });
	}
};
