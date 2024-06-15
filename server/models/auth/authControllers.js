<<<<<<< HEAD:server/models/auth/authControllers.js
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const registerUser = async (req, res) => {
	const { name, email, password, role } = req.body;
	try {
		let user = await User.findOne({ email });
		if (user) return res.status(400).json({ msg: 'User already exists' });

		user = new User({ name, email, password, role });

		const salt = await bcrypt.genSalt(10);
		user.password = await bcrypt.hash(password, salt);

		await user.save();

		const payload = { user: { id: user.id } };
		jwt.sign(payload, 'your_jwt_secret', { expiresIn: 3600 }, (err, token) => {
			if (err) throw err;
			res.json({ token });
		});
	} catch (err) {
		res.status(500).json({ msg: 'Server error' });
	}
};

const loginUser = async (req, res) => {
	const { email, password } = req.body;
	try {
		const user = await User.findOne({ email });
		if (!user) return res.status(400).json({ msg: 'Invalid Credentials' });

		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) return res.status(400).json({ msg: 'Invalid Credentials' });

		const payload = { user: { id: user.id } };
		jwt.sign(payload, 'your_jwt_secret', { expiresIn: 3600 }, (err, token) => {
			if (err) throw err;
			res.json({ token });
		});
	} catch (err) {
		res.status(500).json({ msg: 'Server error' });
	}
};

module.exports = { registerUser, loginUser };
=======
// server/controllers/authController.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../Users');
const { JWT_SECRET } = require('../../config');

const signup = async (req, res) => {
	const { email, password, role } = req.body;

	try {
		const existingUser = await User.findOne({ email });
		if (existingUser) {
			return res.status(400).json({ message: 'User already exists' });
		}

		const hashedPassword = await bcrypt.hash(password, 12);

		const result = await User.create({ email, password: hashedPassword, role });

		const token = jwt.sign({ email: result.email, id: result._id }, JWT_SECRET, { expiresIn: '1h' });

		res.status(201).json({ result, token });
	} catch (error) {
		res.status(500).json({ message: 'Something went wrong' });
	}
};

const login = async (req, res) => {
	const { email, password } = req.body;

	try {
		const existingUser = await User.findOne({ email });
		if (!existingUser) {
			return res.status(404).json({ message: 'User not found' });
		}

		const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
		if (!isPasswordCorrect) {
			return res.status(400).json({ message: 'Invalid credentials' });
		}

		const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, JWT_SECRET, { expiresIn: '1h' });

		res.status(200).json({ result: existingUser, token });
	} catch (error) {
		res.status(500).json({ message: 'Something went wrong' });
	}
};

module.exports = { signup, login };
>>>>>>> parent of 1a3aa6e (auth added):server/controllers/authControllers.js
