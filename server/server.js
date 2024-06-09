const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = 5000;
const SECRET = 'your_jwt_secret';

app.use(bodyParser.json());
app.use(cors());

mongoose.connect('mongodb://localhost:27017/jobapp', { useNewUrlParser: true, useUnifiedTopology: true });

const UserSchema = new mongoose.Schema({
	name: String,
	email: { type: String, unique: true },
	password: String,
	role: String,
});

const User = mongoose.model('User', UserSchema);

app.post('/api/signup', async (req, res) => {
	try {
		const { name, email, password, role } = req.body;
		const hashedPassword = await bcrypt.hash(password, 10);
		const newUser = new User({ name, email, password: hashedPassword, role });
		await newUser.save();
		res.json({ success: true });
	} catch (error) {
		res.json({ success: false, error: error.message });
	}
});

app.post('/api/login', async (req, res) => {
	try {
		const { email, password } = req.body;
		const user = await User.findOne({ email });
		if (!user) return res.json({ success: false, message: 'User not found' });

		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) return res.json({ success: false, message: 'Invalid credentials' });

		const token = jwt.sign({ id: user._id }, SECRET, { expiresIn: '1h' });
		res.json({ success: true, token });
	} catch (error) {
		res.json({ success: false, error: error.message });
	}
});

app.listen(PORT, () => {
	console.log(`Server running on http://localhost:${PORT}`);
});
