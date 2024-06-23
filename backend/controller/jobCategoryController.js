//const jobType = require('../models/jobType');
const JobType = require('../models/jobType');
const ErrorResponse = require('../utils/errorResponse');


//create job Catgory
exports.createJobCategory = async (req, res, next) => {
    //console.log("Cat Test",req.user);
    try {
        const jobCat = await JobType.create({
            jobTypeName: req.body.jobTypeName,
            user: req.user._id
        });
        //console.log("JOb Created:", jobCat);
        return res.status(201).json({
            success: true,
            jobCat
        })
    } catch (error) {
        //console.log(error);
        return res.status(500).json({
            error: error
        });
    }
}


//list all job Catgory
exports.listJobCategory = async (req, res, next) => {
    //console.log("Cat Test",req.user);
    try {
        const allCat = await JobType.find();
        //console.log("JOb Created:", jobCat);
        return res.status(200).json({
            success: true,
            allCat
        })
    } catch (error) {
        //console.log(error);
        return res.status(500).json({
            error: error
        });
    }
}