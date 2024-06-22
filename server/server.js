const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const jobRoutes = require('./routes/jobRoutes');
const authMiddleware = require('./middlewares/authMiddleware');

dotenv.config();

const app = express();

const corsOptions = {
    origin: 'https://8ed859db-3274-42a7-8bfe-0f4fc51860b6-00-1bu3l2l7vxr5i.spock.replit.dev:5173', // your frontend URL
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // if you need to send cookies with the requests
    optionsSuccessStatus: 204
};

app.use(cors(corsOptions));
app.use(express.json());

mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch((err) => console.log(err));

app.use('/api/auth', authRoutes);
app.use('/api/jobs', authMiddleware, jobRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
