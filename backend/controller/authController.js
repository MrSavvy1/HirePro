const User = require('../models/userModel');
const { setToken } = require('../utils/tokenStore');  // Import the setToken function

exports.signup = async (req, res, next) => {
    const { email } = req.body;
    const userExist = await User.findOne({ email });

    if (userExist) {
        res.status(400).json({
            error: "E-mail already exist"
        });
        return;
    }
    try {
        const user = await User.create(req.body);
        res.status(201).json({
            success: true,
            user
        });
    } catch (error) {
        next(error);
    }
};

exports.signin = async (req, res, next) => {
    try {
        const { email, password, role } = req.body;

        // Validation
        if (!email) {
            res.status(400).json({
                error: "Email address is required"
            });
            return;
        }
        if (!password) {
            res.status(400).json({
                error: "Password field is empty"
            });
            return;
        }

        // Check user is valid
        const user = await User.findOne({ email });
        if (!user) {
            res.status(403).json({
                error: "Invalid Email, Please signup if you are a new user"
            });
            return;
        }

        // Check role
        if (user.role !== role) {
            res.status(403).json({
                error: "Incorrect role"
            });
            return;
        }

        // Check password
        const checkPwd = await user.comparePassword(password);
        if (!checkPwd) {
            res.status(403).json({
                error: "Wrong Password"
            });
            return;
        }


        // Send token
        sendTokenResponse(user, 200, res);
    } catch (error) {
        next(error);
    }
};

const sendTokenResponse = async (user, codeStatus, res) => {
    const token = await user.getJwtToken();
    setToken(token);  // Store the token in the shared module
    console.log('here is the : ', token);
    res.status(codeStatus)
        .cookie('token', token, { maxAge: 60 * 60 * 24 * 1000, httpOnly: true })
        .json({
            success: true, token, user
        });
};

// Logout
exports.logout = (req, res, next) => {
    res.clearCookie('token');
    res.status(200).json({
        success: true,
        message: "Logged out successfully"
    });
};

// UserProfile
exports.userProfile = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id).select('-password');

        if (!user) {
            res.status(404).json({
                error: "User not found"
            });
            return;
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
