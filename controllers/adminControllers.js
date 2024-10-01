const User = require('../models/User');
const Course = require('../models/Course');
const { errorResponse, successResponse } = require('../utils/errorHandler');
const { StatusCodes } = require('http-status-codes');

exports.deleteUser = async (req, res, next) =>{
    try {
        logger.info(`START: User Delete Service`)
        const { email } = req.body;
        const user = User.findOne({ email }); 
        if (!user){
            logger.info(`END: User Delete Service`)
            return errorResponse(res, StatusCodes.NOT_FOUND, "User not found.");
        }
        User.findOneAndDelete({ email });
        successResponse(res, StatusCodes.ACCEPTED, 'User Deleted');
        logger.info(`END: User Delete Service`)
    } catch (error) {
        
    }

};


exports.updateUserRole = async (req, res) =>{
    try {
        logger.info(`START: User Role Update Service`);
        const { email, role } = req.body;
        let user = await user.findOne({ email });

        if (!user) {
            logger.info(`END: User Role Update Service`);
            return errorResponse(res, StatusCodes.NOT_FOUND, { msg: 'User not found' });
        }
        user.role = role;
        await user.save();
        logger.info(`END: User Role Update Service`)
        successResponse(res, StatusCodes.ACCEPTED, 'User Role Updated');
    } catch (error) {
        logger.error(error.message);
        errorResponse(res, StatusCodes.INTERNAL_SERVER_ERROR, 'Server Error');
        
    }
};
exports.getUserById = async (req, res) => {
    try {
        const user = await User.findOne({}).select('-password');
        if (!user) return errorResponse(res, StatusCodes.NOT_FOUND, { msg: 'User not found' });
        res.json(user);
    } catch (error) {
        if (error.name === 'CastError') {
            return res.status(400).json({ message: 'Invalid user ID format' });
        }
        logger.error('Error fetching user by ID:', error);
        res.status(500).json({ message: 'Server error' });
    }
}

exports.getUsers = async (req, res) => {
    try {
        if (req.user.role !== 'admin'){
            return res.status(403).json({ msg: 'Permission denied' });
        }
        const users = await User.find();
        res.json(users);
    } catch (error) {
        logger.error(error.message);
        errorResponse(res, StatusCodes.INTERNAL_SERVER_ERROR, 'Server Error');
    }
}

//course management
exports.deleteCourse = async (req, res, next) => {

};