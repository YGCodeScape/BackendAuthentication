const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const registerUser = async (req, res) => {
    try {
        const { fullName, email, password } = req.body;

        // Validation
        if (!fullName || !email || !password) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        // Check existing user
        const existingUser = await User.findByEmail(email);
        if (existingUser) {
            return res.status(409).json({
                message: "User already exists"
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const user = await User.create({
            fullName,
            email,
            password: hashedPassword
        });

        const token = jwt.sign({
           id: user.insertId,
        }, "7e8457a06e97fceb89fecc6edc1752f9944b330895045995");
        res.cookie("token", token);

        res.status(201).json({
            message: "User registered successfully",
            user: {
                id: user.insertId,
                email: user.email,
                fullName: user.fullName
            }
        });

    } catch (error) {
        console.error("Register Error:", error.message);

        res.status(500).json({
            message: "Server error"
        });
    }
};

module.exports = {
    registerUser
};

// install bcrypt
// install mysql

// install jsonwebtoken for generate token send token on login
// install cookie-parser for store token in cookie and send token in cookie on login and logout its act as middleware for login