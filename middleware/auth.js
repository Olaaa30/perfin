const { checkTokenValidity } = require('../utils/jwtUtils');
const ApiError = require('./errorHandler/api-error');

const isLoggedIn = (res, req, next) => {
    const authHeader = req.headers['authorization'];

    if(!authHeader) {
        return next(ApiError.badRequest('Not Authorized'));
    }

    if(authHeader.startsWith('Bearer')){
        const token = authHeader.split(' ')[1];

        try {
            const payload = checkTokenValidity(token);
            req.user = { userId: payload.id};
            next();
        } catch (error) {
            return next(ApiError.badRequest('Authentication Failed'));
        }
    }else{
        return next(ApiError.badRequest('Invalid authorization header'))
    }
};

module.exports = {isLoggedIn};