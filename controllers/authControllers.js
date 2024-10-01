const User = require('../models/User');
const jwt = require('jsonwebtoken');
const logger = require('../utils/logger');
const { 
    generateToken, 
    verifyToken, 
    checkTokenValidity,
    generateSecurePassword
} = require('../utils/jwtUtils');
const {StatusCodes} = require('http-status-codes');
// const AppError = require('../utils/appError');
const { errorResponse, successResponse} = require('../utils/errorHandler')

exports.register = async (req, res, next) => {
    logger.info(`START: Register Account Service`)

    const { firstName, lastName, email, gender, password, role} = req.body;
    try {
        let existingUser = await User.findOne({ email });
        if (existingUser) {
            logger.info(`END: Register Account Service`)
            return errorResponse(res, StatusCodes.BAD_REQUEST, 'User Already Exists');
        }
        if (!firstName || !email || !password || !lastName || !gender) {
            logger.info(`END: Register Account Service`)
            return errorResponse(res, StatusCodes.NOT_ACCEPTABLE, 'Please provide all parameters');
        }
        if (password.length < 6) {
            logger.info(`END: Register Account Service`)
            return errorResponse(res, StatusCodes.NOT_ACCEPTABLE, 'password length must be greater than or equal to six characters');
        }

        const user = new User({
            email,
            password: generateSecurePassword(password),
            firstName,
            lastName,
            gender,
            updatedAt: new Date(),
            role: role || 'student',
            profilePicture: '',
        });

        const accessToken = generateToken(user._id);
        await user.save();
        successResponse(res, StatusCodes.CREATED, `successfully created account`, {user:user, token:accessToken})
        logger.info(`END: Register Account Service`)

    }
    catch (err) {
        logger.error(error);
        next(error);
    }
}

exports.login = async (req, res, next) => {
    try {
        logger.info(`START: Login Account Service`)

        const authHeader = req.headers['authorization'];

        const { email, password} = req.body;

        if (!email || !password){
            return errorResponse(res, StatusCodes.BAD_REQUEST, `missing required auth parameters`)
        }

        const user = await User.findOne({ email });
        if (!user) {
            return errorResponse(res, StatusCodes.NOT_FOUND, `User does not exist`);
        }

        if (!checkTokenValidity(password, user.password)) {
            return errorResponse(res, StatusCodes.BAD_REQUEST, `You have entered a wrong username or password`);
        }

        const accessToken = generateToken(user._id);

        logger.info(`END: Login Account Service`);
        successResponse(res, StatusCodes.OK, `successfully logged in`, {user, token:accessToken});
    }catch (err) {
        logger.error(err.message);
        next(err);
    }
}
exports.resetPassword = async (req, res, next) => {
    
    try {
        logger.info(`START: Reset Password Service`)
        const { email, password, newPassword } = req.body;

        const user = await User.findOne({ email });
        if(!user){
            return errorResponse(res, StatusCodes.NOT_FOUND, `User does not exist`);
        }
        if (!checkTokenValidity(password, user.password)) {
            return errorResponse(res, StatusCodes.BAD_REQUEST, `You have entered a wrong username or password`);
        }

        user.password = generateSecurePassword(newPassword);

        const accessToken = createAccessToken(user._id);

        successResponse(res, StatusCodes.OK, `successfully reset password`, {user, token:accessToken})
        logger.info(`END: Reset Password Service`)


    } catch (error) {
        console.error(error.message);
    }
}
