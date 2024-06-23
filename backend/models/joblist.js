const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const joblistSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        maxLength: 100,
        required: [true, "Job Title is required"]
    },

    description: {
        type: String,
        trim: true,
        required: [true, "Description is required"]
    },
    location: {
        type: String,
    },
    salary: {
        type: String,
    },
    available: {
        type: Boolean,
        default: true
    },
    datePosted: {
        type: Date,
    },
    userId: {
        type: ObjectId,
        ref: "User",
        required: true
    },
    jobCategory: {
        type: ObjectId,
        ref: "JobType"
    },
    applicationDeadline: {
        type: Date,
    }
}, {timestamps: true})


module.exports = mongoose.model("Joblist", joblistSchema);