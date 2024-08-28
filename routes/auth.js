const express = require('express');
const authControllers = require('../controllers/authControllers')
const router = express.Router();

router.post('/register', authControllers.regiser);

router.post('/login', authControllers.login);

router.post('/resetPassword', authControllers.resetPassword);

module.exports = router;