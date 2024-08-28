const express = require('express');
const router = express.Router();
const User = require('../models/User')
exports.getUserProfile = async (req, res) => {
    try {
        const user = await User.findByEmail(req.user.email).select('-password');
        res.json(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
}
exports.getUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password');
        res.json(users);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
}

