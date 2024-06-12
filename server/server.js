const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv').config();
const authRoutes = require('./routes/authRoutes');

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;
const JWT_SECRET = process.env.JWT_SECRET;

mongoose.connect('mongodb+srv://HirePro:alxProject1@ac-m4xb6eu.cpcsvem.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
		.then(() => {
				console.log('Database connected successfully!');
				app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
		})
		.catch((error) => console.error('Error connecting to database:', error));

app.use(cors());
app.use(express.json());
app.use('/auth', authRoutes);
