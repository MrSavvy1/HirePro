// server/controllers/authController.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Employee = require('../models/Employee');
const Company = require('../models/Company');

exports.signup = async (req, res) => {
	const { name, email, password } = req.body;
	const role = req.params.role;

	try {
		const hashedPassword = await bcrypt.hash(password, 10);
		const user = role === 'employee' 
			? new Employee({ name, email, password: hashedPassword }) 
			: new Company({ name, email, password: hashedPassword });

		await user.save();
		res.status(201).json({ message: 'User created successfully' });
	} catch (err) {
		res.status(500).json({ message: 'Error creating user', error: err });
	}
};

exports.login = async (req, res) => {
	const { email, password } = req.body;
	const role = req.params.role;

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

		const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
		res.json({ token });
	} catch (err) {
		res.status(500).json({ message: 'Server error', error: err });
	}
};
