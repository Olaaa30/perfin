const express = require('express');
const User = require('../models/User');
// const user = require('../middleware/user');
const userControllers = require('../controllers/userControllers');
const router = express.Router();

// protected route to get user profile
router.get('/profile', userControllers.getUserProfile);
router.get('/', userControllers.getUsers);
module.exports = router;