const express = require('express');
const router = express.Router();
const fs = require('fs');
const pool = require('../util/database');
const fileUpload = require("express-fileupload");
const uploadOpts = {
    useTempFiles : true,
    tempFileDir : '/temp/'
}
const csvFile = require('csvtojson');
const csv = require('csv-parser');

//*********************************************************/

exports.uploadcp = fileUpload(uploadOpts),async(req, res, next)=>{
    try{
        const file = req.files;
        fs.createReadStream(file)
        .pipe(csv())
        .on('data', function(data){
            console.log(data);
        });
        
    }catch(error){
        console.log(error);
    }
}