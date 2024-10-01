const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { errorResponse, successResponse } = require('../utils/errorHandler');
const StatusCodes = require('http-status-codes');
const logger = require('../utils/logger');

// exports.getUserProfile = async (req, res) => {
//     try {
//         const email = req.email;
//         if(!email){
//             return errorResponse(res, StatusCodes.BAD_REQUEST, 'provide necessary parameters')
//         }
//         const user = User.findOne({email: email});
//         successResponse(res, StatusCodes.OK, 'User profile returned', user)
//     } catch (error) {
//         logger.error(error)
//     }
// }
exports.getUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password');
        res.json(users);
    } catch (error) {
        logger.error(error.message);
        return errorResponse(res, StatusCodes.SERVICE_UNAVAILABLE, error);
    }
}

exports.findUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-password');
        if (!user) {
            return errorResponse(res, StatusCodes.NOT_FOUND, 'User not found');
        }

        successResponse(res, StatusCodes.OK, 'success', user)
    } catch (error) {
        if (error.name === 'CastError') {
            return errorResponse(res, StatusCodes.BAD_REQUEST, 'Invalid user ID format');
        }
        logger.error('Error fetching user by ID:', error);
        errorResponse(res, StatusCodes.INTERNAL_SERVER_ERROR, 'Server error');
    }
}

