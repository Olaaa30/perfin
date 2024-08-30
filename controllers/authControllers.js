const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res, next) => {
    const { firstName, lastName, email, password, role} = req.body;
    try {
        try{
            let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: 'User already exists' });
        }}catch(err){
            console.log(err);
        }
        if (!firstName || !email || !password || !lastName) {
            return res.status(400).json({ msg: 'Please enter all fields' });
        }
        if (password.length < 6) {
            return res.status(400).json({ msg: 'Password must be at least 6 characters' });
        }

        const user = new User({
            email,
            password,
            firstName,
            lastName,
            updatedAt: new Date(),
            role: role || 'student',
            profilePicture: '',
        });
        await user.save();


        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        req.user = {id: user.id};
        next();
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}

exports.login = async (req, res, next) => {
    const { email, password} = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'User does not exist' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid Credentials' });
        }

        res.json({
            success: true,
            message: 'User logged in successfully',
        });

        req.user = { id: user.id };
        next();
    }catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}
exports.resetPassword = async (req, res) => {
    res.send("Under Construction");
}
