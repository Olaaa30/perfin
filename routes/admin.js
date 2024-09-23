const express = require('express');
const router = express.Router()
const adminController = require('../controllers/adminControllers')
// user management
router.get('/users/:id', auth, adminController.getUserById);
router.get('/users', auth, adminController.getUsers);
router.delete('/users/:id/', auth, adminController.deleteUser)
router.put('/users/:id/', auth, adminController.updateUserRole)
// course management
router.get

module.exports = router;