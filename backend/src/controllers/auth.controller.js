const UserModel = require('../models/user.model');
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
        const existingUser = await UserModel.findByEmail(email);
        if (existingUser) {
            return res.status(409).json({
                message: "User already exists"
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const user = await UserModel.create({
            fullName,
            email,
            password: hashedPassword
        });

        const token = jwt.sign({
           id: user.id,
        }, process.env.JWT_SECRET);
        res.cookie("token", token, {
                httpOnly: true,
                secure: true, // only https
                sameSite: "Strict"
        });

        res.status(201).json({
            message: "User registered successfully",
            user: {
                id: user.id,
                email: user.email,
                fullName: user.name
            }
        });

    } catch (error) {
        console.error("Register Error:", error.message);

        res.status(500).json({
            message: "Server error"
        });
    }
};

const loginUser = async(req, res) => {
    try {
        const {email, password} = req.body;

        // Validation
        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password are required"
            });
        }

        const user = await UserModel.findByEmail(email);
        if(!user){
            return res.status(400).json({
                message: "Invalid email or password"
            });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if(!isPasswordValid) {
            return res.status(400).json({
                message: "Invalid email or password"
            });
        }

        const token = jwt.sign({
            id: user.id,
        },process.env.JWT_SECRET);
        res.cookie("token", token, {
                httpOnly: true,
                secure: true, // only https
                sameSite: "Strict"
        });

        res.status(200).json({
            message: "User logged in successfully",
            user: {
                id: user.id,
                email: user.email,
                fullName: user.name
            }
        });
    } catch (error) {
        console.error("Login Error:", error.message);
        res.status(500).json({
            message: "Server error"
        });
    }
}


module.exports = {
    registerUser,
    loginUser
};

// install bcrypt
// install mysql

// install jsonwebtoken for generate token send token on login
// install cookie-parser for store token in cookie and send token in cookie on login and logout its act as middleware for login