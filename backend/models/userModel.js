const mongoose = require('mongoose');
const bcyrpt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: [true, "Name is required"],
        maxlength: 255,
    },

    email: {
        type: String,
        trim: true,
        required: [true, "Email address is required"],
        maxlength: 255,
        unique: true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Please fill a valid email address'
        ]
    },

    password: {
        type: String,
        trim: true,
        required: [true, 'Password is required'],
        minlength: [6, 'Password should be more than 6 characters'],
    },

    role: {
        type: String,
        //default: 'admin'
    }
    
}, {timestamps:true})


// code to encrpyt password
userSchema.pre('save', async function(next){
    if (!this.isModified('password')){
        next();
    }
    this.password = await bcyrpt.hash(this.password, 10)
})


// compare password
userSchema.methods.comparePassword = async function(enteredPassword){
    return await bcyrpt.compare(enteredPassword, this.password);
}

// create token
userSchema.methods.getJwtToken = function() {
    if (!process.env.JWT_SECRET) {
        throw new Error('JWT_SECRET must be defined');
    }
    return jwt.sign({id: this.id}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE || "86400s"
    });
}

module.exports = mongoose.model("User", userSchema);