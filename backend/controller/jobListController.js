const Joblist = require('../models/joblist');




// create joblist
exports.createJobList = async (req, res, next) => {
    try {
        const jobs = await Joblist.create({
            title: req.body.title,
            description: req.body.description,
            location: req.body.location,
            available: req.body.available,
            salary: req.body.salary,
            userId: req.user.id,
            datePosted: req.body.datePosted,
            applicationDeadline: req.body.applicationDeadline,
            jobCategory: req.body.jobCategory

        });
        res.status(201).json({
            success: true,
            created: jobs['title']
        });
    } catch (error) {
        res.status(500).json({
            error
        });
    }
};


// show all created jobs
exports.showAllJobs = async (req, res, next) => {
    try {
        const jobs = await Joblist.find();
        res.status(200).json({
            success: true,
            data: jobs
        });
    } catch (error) {
        return res.status(500).json({
            error: error
        });
    }
};


// show job by id
exports.showSingleJob = async (req, res, next) => {
    try {
        const singleJob = await Joblist.findById(req.params.id)
        res.status(200).json({
            success: true,
            data: singleJob
        })
    } catch (error) {
        res.status(500).json({
            error: error
        });  
    }
};


// update a particular job
exports.editSingleJob = async (req, res, next) => {
    try {
        const editJob = await Joblist.findByIdAndUpdate(req.params.id, req.body, {new: true})
        res.status(200).json({
            success: true,
            data: editJob
        });
    } catch (error) {
        res.status(500).json({
            error: error
        });
    }
};


// update a particular job
exports.deleteSingleJob = async (req, res, next) => {
    try {
        const deleteJob = await Joblist.findByIdAndRemove(req.params.id)
        res.status(200).json({
            success: true,
            message: "Job deleted"
        });
    } catch (error) {
        res.status(500).json({
            error: error
        });
    }
};