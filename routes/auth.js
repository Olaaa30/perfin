const express = require('express');
const authControllers = require('../controllers/authControllers');
const { generateToken, validateToken } = require('../middleware/auth');
const router = express.Router();

router.post('/register', authControllers.register, generateToken);

router.post('/login', authControllers.login, generateToken);

router.post('/resetPassword', authControllers.resetPassword, generateToken);

module.exports = router;