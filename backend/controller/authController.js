const User = require('../models/userModel');
const ErrorResponse = require('../utils/errorResponse');

exports.signup = async (req, res, next) => {
    const { email } = req.body;
    const userExist = await User.findOne({email});

    if (userExist){
        return next(new ErrorResponse("E-mail already exist", 400));
    }
    try {
        const user = await User.create(req.body);
        res.status(201).json({
            success: true,
            user
        })
    } catch (error){
        next(error);
    }
}

exports.signin = async (req, res, next) => {
    try {
        const {email, password} = req.body;
        // validation
        if (!email) {
            return next(new ErrorResponse("Email address is requires", 400));
        }
        if (!password){
            return next(new ErrorResponse("Password field is empty", 400));
        }

        // check user is valid
        const user = await User.findOne({email});
        if (!user){
            return next(new ErrorResponse("Invalid Email, Please signup if your are a new user", 403));
        }
        //check password
        const checkPwd = await user.comparePassword(password)
        if (!checkPwd){
            return next(new ErrorResponse("Invalid Password", 403));
        }

        //send token
        sendTokenResponse(user, 200, res);
    } catch (error) {
        next(error);
    }

}

const sendTokenResponse = async (user, codeStatus, res) => {
    const token = await user.getJwtToken();
    res.status(codeStatus)
        .cookie('token', token, {maxAge: 60*60*1000, httpOnly: true})
        .json({
            success: true, token, user
        })
}

// logout
exports.logout = (req, res, next) => {
    res.clearCookie('token');
    res.status(200).json({
        success: true,
        message: "Logged out successfully"
    })
}

// UserProfile
exports.userProfile = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id).select('-password');

        if (!user) {
            return next(new ErrorResponse("User not found", 404));
        }
        res.status(200).json({
            success: true,
            data: user
        });
    } catch (error) {
        console.error("Error fetching user profile: ", error);
        next(error);
    }
};