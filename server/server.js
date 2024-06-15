// server/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');

//dotenv.config();

const app = express();

<<<<<<< HEAD
// Middleware
=======
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => app.listen(PORT, () => console.log(`Server running on port ${PORT}`)))
	.catch((error) => console.log(error));

app.use(cors());
>>>>>>> parent of 1a3aa6e (auth added)
app.use(express.json());
app.use(cors());

// Routes
app.use('/api', authRoutes);

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/mern_job_app', {
	useNewUrlParser: true,
	useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
	.catch(err => console.log(err));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
