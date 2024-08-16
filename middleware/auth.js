const jwt =  require('jsonwebtoken');

function auth(req, res, next){

    const token = req.header('Authorization'). replace('Bearer ', '');  // Get token from header

    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify token
        req.user = decoded.user;
        next(); // pass control to the next middleware
    } catch (error) {
        res.status(401).json({ msg: 'Token is not valid' });
    }
}

module.exports = auth;