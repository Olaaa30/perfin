const express = require('express');
const router = express.Router()
const adminController = require('../controllers/adminControllers')
const auth = require('../middleware/auth');
// user management
router.get('/users/:id', adminController.getUserById);
router.get('/users', adminController.getUsers);
router.delete('/users/:id/', adminController.deleteUser);
router.put('/users/:id/', adminController.updateUserRole);
// course management
router.get

module.exports = router;