const ErrorResponse = require('../utils/errorResponse');
const User = require('../models/userModel');
const JobApplication = require('../models/jobApplication')
const jwt = require('jsonwebtoken');

//check if user is authenticated
exports.isAuthenticated = async (req, res, next) => {
    const { token } = req.cookies;
    //make sure token exist
    if (!token) {
        res.status(401).json({
            "error": "Kindly login to access this endpoint"
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        //console.log("Decoded token:", decoded);
        req.user = await User.findById(decoded.id);
        if (!req.user){
            res.status(404).json({
                "error": "No user found"
            });
        }
        next()
    } catch (error) {
        return res.status(500).json({
            error: error
        });
    }
};

//middleware to check admin
exports.isAdmin = async (req, res, next) => {
    if (req.user.role !== 'admin') {
        res.status(401).json({
            "error": "Only Admins can access"
        });
        //return next(new ErrorResponse("Only Admins can access", 401))
    }
    next();
};


//middleware to check employee
exports.isEmployer = async (req, res, next) => {
    if (req.user.role === 'regular') {
        res.status(401).json({
            "error": "Only Employers or Admins can access"
        });
        //return next(new ErrorResponse("Only Admins can access", 401))
    }
    next();
};


//middleware to download cv
exports.canDownloadCv = async (req, res, next) => {
    try {
        const { applicationId } = req.params;
        const jobApplication = await JobApplication.findById(applicationId);

        if (!jobApplication) {
            return res.status(404).send({ error: 'Job application not found' });
        }

        if (jobApplication.employerId.toString() !== req.user._id.toString()) {
            return res.status(403).send({ error: 'Access denied' });
        }

        next();
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};


