const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema;


const jobAppSchema = new mongoose.Schema({

    applicationDate: {
        type: Date,
        default: Date.now,
    },
    status: {
        type: String,
        default: 'unemployed'
    },
    cover: {
        type: String,
        required: true
    },
    jobId: {
        type: ObjectId,
        ref: 'Joblist',
        required: true
    },
    employerId: {
        type: ObjectId,
        ref: 'User',
        required: true
    },
    userId: {
        type: ObjectId,
        ref: "User",
        required: true
    },
    cv: {
        data: Buffer,
        contentType: String
    }

}, {timestamps: true});


module.exports = mongoose.model("JobApplication", jobAppSchema);