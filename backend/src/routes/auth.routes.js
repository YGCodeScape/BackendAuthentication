const express = require('express');
const router = express.Router();

const authController  = require('../controllers/auth.controller');

// Register Route
router.post('/user/register', authController.registerUser);
// login route
router.post('/user/login', authController.loginUser);
// logOut route
router.get('/user/logout', authController.logoutUser);

module.exports = router;