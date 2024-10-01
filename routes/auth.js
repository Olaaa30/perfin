const express = require('express');
const authControllers = require('../controllers/authControllers');
const isLoggedIn = require('../middleware/auth');
const router = express.Router();

router.post('/register', authControllers.register);

router.post('/login', authControllers.login);

router.post('/resetPassword', authControllers.resetPassword);

module.exports = router;