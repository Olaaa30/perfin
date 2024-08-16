const express = require('express');
const User = require('../models/User');
const auth = require('../middleware/auth');


const router = express.Router();
// protected route to get user profile
router.get('/profile', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;