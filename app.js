const express = require('express');
const app = express();
const bodyParser = require('body-parser');
require("dotenv").config();
const PORT = process.env.PORT;

app.get("/login",(req, res, next)=>{
    return res.status(200).json({
        message:'you are login a page!2'
    })
})

app.use((req, res, next)=>{
    res.status(200).json({
        message:'Done! home pages',

    });
});




app.listen(PORT, console.log(`server running on port ${PORT}`));