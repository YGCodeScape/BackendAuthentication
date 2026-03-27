const express = require('express');
const router = express.Router();

const authController  = require('../controllers/auth.controller');

// Register Route
router.post('/user/register', authController.registerUser);

module.exports = router;