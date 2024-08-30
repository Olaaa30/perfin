const jwt =  require('jsonwebtoken');

function validateToken(req, res, next){
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
function generateToken(req, res, next) {
    const payload = {
        user: {
            id: req.user.id // Assuming user ID is available in req.user
        }
    };

    jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: 3600 }, // 1 hour
        (err, token) => {
            if (err) {
                console.error('JWT sign error:', err);
                return res.status(500).json({ msg: 'Token generation failed' });
            }

            res.json({ token });
        }
    );
};
module.exports = {
    validateToken,
    generateToken
};