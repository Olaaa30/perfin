const User = require('../models/User');

const fetchUserProfile = async (req, res) => {
    try {
        const userId = req.user.id;
        res.json(userId);
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
};