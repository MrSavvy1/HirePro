const JobApplication = require('../models/jobApplication');
const multer = require('multer');
const { ObjectId } = require('mongoose').Types;



// Multer setup
const storage = multer.memoryStorage();
const upload = multer({
    storage,
    limits: { fileSize: 7 * 1024 * 1024 }, // 7 MB limit
    fileFilter: (req, file, cb) => {
        if (file.mimetype === 'application/pdf') {
            cb(null, true);
        } else {
            cb(new Error('Only PDF files are allowed'), false);
        }
    }
}).single('cv');


// create a job application
exports.createJobApplication = async (req, res, next) => {
    try {
        const jobApp = await JobApplication.create({
            cover: req.body.cover,
            userId: req.user.id,
            jobId: req.body.jobId,
            employerId: req.body.employerId,
        })
        res.status(201).json({
            success: true,
            data: jobApp
        })
    } catch (error) {
        return res.status(500).json({
            error: error
        });
    };
};



exports.applyForJob = async (req, res) => {
    upload(req, res, async function (err) {
        if (err) {
            return res.status(400).send({ error: err.message });
        }

        try {
            const { jobId, employerId } = req.body;
            const userId = req.user._id; // Assume req.user is populated by authentication middleware

            const newJobApplication = new JobApplication({
                cover: req.body.cover,
                jobId: ObjectId(jobId),
                employerId: ObjectId(employerId),
                userId: ObjectId(userId),
                cv: {
                    data: req.file.buffer,
                    contentType: req.file.mimetype
                }
            });

            await newJobApplication.save();
            res.status(201).json({
                message: 'Job application submitted successfully',
                id: newJobApplication['_id'] });
        } catch (error) {
            res.status(500).send({ error: error.message });
        }
    });
};


// Retrieve all job applications
exports.allApplication = async (req, res) => {
    try {
        const jobApplications = await JobApplication.find();
        res.status(200).json({
            success: true,
            data: jobApplications
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};




exports.getCV = async (req, res) => {
    try {
        const { applicationId } = req.params;

        const jobApplication = await JobApplication.findById(applicationId);
        if (!jobApplication || !jobApplication.cv) {
            return res.status(404).send({ error: 'CV not found' });
        }

        res.contentType(jobApplication.cv.contentType);
        res.send(jobApplication.cv.data);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};