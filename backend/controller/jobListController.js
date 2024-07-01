const Joblist = require('../models/joblist');
const JobCategory = require('../models/jobType');




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
    //search and filter
    const keyword = req.query.keyword ? {
        title: {
            $regex: req.query.keyword,
            $options: 'i'
        }
    } : {}

    //filter by category
    let ids = [];
    const jobTCategory = await JobCategory.find({}, {_id:1});
    jobTCategory.forEach(cat => {
        ids.push(cat._id);
    })

    let cat = req.query.cat;
    let categ = cat !== '' ? cat: ids;

    //filter by location
    let locations = [];
    const jobLocation = await Joblist.find({}, {location: 1});
    jobLocation.forEach(value => {
        locations.push(value.location);
    });
    let uniqLocation = [...new Set(locations)];
    let location = req.query.location;
    let locFilter = location && location !== '' ? [location]: uniqLocation;

    // pagination
    const pageSize = 10;
    const page = Number(req.query.pageNumber) || 1;
    //const count = await Joblist.find({ ...keyword, jobCategory: categ}).countDocuments();
    const count = await Joblist.find({ ...keyword, location: locFilter }).countDocuments();
    
    try {
        const jobs = await Joblist.find({ 
            ...keyword, location: { $in: locFilter} }).sort({ createdAt: -1 }).skip(pageSize * (page-1)).limit(pageSize);
        res.status(200).json({
            success: true,
            data: jobs,
            page,
            pages: Math.ceil(count / pageSize),
            count,
            //uniqLocation
            //ids
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
        const singleJob = await Joblist.findById(req.params.id).populate('jobCategory', 'jobTypeName').populate('userId', 'name');
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
        const editJob = await Joblist.findByIdAndUpdate(req.params.id, req.body, {new: true}).populate('jobCategory', 'jobTypeName').populate('userId', 'name');
        res.status(200).json({
            success: true,
            data: editJob
        });
        next()
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