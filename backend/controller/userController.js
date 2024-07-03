const User = require('../models/userModel');
const ErrorResponse = require('../utils/errorResponse');
const bcrypt = require('bcryptjs');


//load all users
exports.allUsers = async (req, res, next) => {
    // enable pagination
    const pageSize = 10;
    const page = Number(req.query.pageNumber) || 1;
    const count = await User.find({}).estimatedDocumentCount();
    try {
        const users = await User.find().sort({ createdAt: -1}).select('-password')
            .skip(pageSize * (page-1))
            .limit(pageSize)

        res.status(200).json({
            success: true,
            data: users,
            page,
            pages: Math.ceil(count / pageSize),
            count
        })
        next();
    } catch (error) {
        return next(error);
    }
}


// load single-user by id
exports.singleUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        res.status(200).json({
            success: true,
            data: user
        })
        next();
    } catch (error) {
        return next(error);
    }
}

//edit user
exports.editUser = async (req, res, next) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .select('-password');
        res.status(200).json({
            success: true,
            data: user
        })
        next()
    } catch (error) {
        return next(error);
    }
}

//delete user
exports.deleteUser = async (req, res, next) => {
    try {
        const user = await User.findByIdAndRemove(req.params.id);
        res.status(200).json({
            success: true,
            message: "user deleted successfully"
        })
        next()
    } catch (error) {
        return next(error);
    }
}


exports.updateProfile = async (req, res, next) => {
    try {
        const { id } = req.user; // Assuming req.user is set by isAuthenticated middleware
        const updateData = req.body;

        if (updateData.password) {
            const salt = await bcrypt.genSalt(10);
            updateData.password = await bcrypt.hash(updateData.password, salt);
        }

        const updatedUser = await User.findByIdAndUpdate(id, updateData, { new: true }).select('-password');

        if (!updatedUser) {
            res.status(404).json({
                error: "User not found"
            });
            return;
        }

        res.status(200).json({
            success: true,
            data: updatedUser
        });
    } catch (error) {
        console.error("Error updating user profile: ", error);
        next(error);
    }
};
