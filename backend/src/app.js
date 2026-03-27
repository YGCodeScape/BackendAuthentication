// create server on express
const express = require('express');
const app = express();

app.get("/", (req, res) => {
    res.send("hello here is server live");
})



module.exports  = app;