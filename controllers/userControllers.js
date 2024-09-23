const express = require('express');
const router = express.Router();
const User = require('../models/User')
exports.getUserProfile = async (req, res) => {
    try {
        updates = req.body;
        udpates.updatedAt = new Date();
        
    } catch (error) {
        
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

exports.findUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-password');
        if (!user) return res.status(404).json({ msg: 'User not found' });
        res.json(user);
    } catch (error) {
        if (error.name === 'CastError') {
            return res.status(400).json({ message: 'Invalid user ID format' });
        }
        console.error('Error fetching user by ID:', error);
        res.status(500).json({ message: 'Server error' });
    }
}

