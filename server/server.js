// server/server.js
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const jobRoutes = require('./routes/jobRoutes'); // Import jobRoutes
const cors = require('cors');
const authMiddleware = require('./middlewares/authMiddleware'); // Import middleware

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch((err) => console.log(err));
console.log('In Server now');

app.use('/api/auth', authRoutes);
app.use('/api/jobs', authMiddleware, jobRoutes); // Use middleware for job routes

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));