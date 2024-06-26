require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
var cors = require('cors');
const cookieParser = require('cookie-parser');
const errorHandler = require("./middleware/error");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require('./routes/userRoutes');
const jobCatRoutes = require('./routes/jobCatRoutes');
const jobListRoutes = require('./routes/jobListRoute');
const jobApplicationRoute = require('./routes/jobApplicationRoute');

// database connection
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
}).then(() => console.log("DB connected"))
.catch((err) => console.log(err));



//middleware
app.use(morgan('dev'));
app.use(bodyParser.json({limit: "5mb"}));
app.use(bodyParser.urlencoded({
    limit: "5mb",
    extended: true
}));
app.use(cookieParser());
app.use(cors());

//error middleware
app.use(errorHandler);


//route
// app.get("/", (req, res)=>{
//     res.send("Hello world!!!");
// });
app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", jobCatRoutes);
app.use("/api", jobListRoutes);
app.use("/api", jobApplicationRoute);


//port
port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});