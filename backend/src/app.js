// create server 
const express = require('express');
const cookieParser = require('cookie-parser');

//    ==========ROUTES==============
const authRoutes = require('./routes/auth.routes');

const app = express();

// ===========MIDDLEWARE=========
app.use(cookieParser());
app.use(express.json());

// prefix API for user authentication
app.use('/api/auth', authRoutes);

// Test route
app.get("/", (req, res) => {
    res.send("Server is live 🚀");
});


module.exports = app;