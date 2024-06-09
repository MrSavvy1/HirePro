const ErrorResponse = require('../utils/errorResponse');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

//check if user is authenticated
exports.isAuthenticated = async (req, res, next) => {
    const { token } = req.cookies;
    //make sure token exist
    console.log("Token from cookies:", token);
    if (!token) {
        return next(new ErrorResponse("Not token authorised user", 401));
    }

    try {
        // verify token 
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Decoded token:", decoded);
        req.user = await User.findById(decoded.id);
        if (!req.user){
            return next(new ErrorResponse("No user found", 404));
        }
        next()
    } catch (error) {
        console.error("Error verifying token: ", error);
        return next(new ErrorResponse("Not authorised", 401));
    }
};

//middleware to check admin
exports.isAdmin = async (req, res, next) => {
    if (req.user.role === 'regular') {
        return next(new ErrorResponse("Only Admins can access", 401))
    }
    next();
}