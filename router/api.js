const express = require('express');
const router = express.Router();
//const fileUpload = require('express-fileupload');
const uploadOpts = {
    useTempFiles : true,
    tempFileDir : '/temp/'
}

const uploadcpfile = {
    useTempFiles : true,
    tempFileDir : '/temp/'
}

const XLSX = require('xlsx');
const fs = require('fs');
const pool = require('../util/database');
const csv = require('csv-parser');
const csvtojson = require('csvtojson');
const db = require("../modules/Db");
/*----------------------------------------------------*/
const databaseController = require('../controllers/databaseController');
const filesController = require('../controllers/filesController');
const fileUpload = require('express-fileupload');
/*----------------------------------------------------*/
//********* Create table ********/
router.get('/creatcredorextbl', databaseController.createTbl_credorex);
router.get('/createcptbl', databaseController.createTbl_cp);
router.get('/createreconcredorex', databaseController.createTbl_recon_credorex)

//********* Delete table ********/
router.delete('/deletcredorextbl', databaseController.deleteTbl_credorex);
router.delete('/deletecptbl', databaseController.deleteTbl_cp);
router.delete('/deletereconcredorex', databaseController.deleteTbl_recon_credorex);


//********* Upload Data *********/
router.post('/uploadcredorex',fileUpload(uploadOpts), async(req, res)=>{
    try{
        const {excel} = req.files.file;
        await csvtojson().fromFile(req.files.file.tempFilePath)
        .then(source => {
            
            db.exist_credorex_table_item(`credorex`,'statement_date',source[1]['statement_date'])
            .then(result =>{
                if(result[0].length > 1){
                    res.status(200).json(
                        {message:'The data statement already exist in the database.'}
                    );
                }else{
                    for(var i = 0;i<source.length;i++){
                        var statement_date = source[i]['statement_date'],
                            transaction_date = source[i]['transaction_date'],
                            posting_date = source[i]['posting_date'],
                            transaction_currency = source[i]['transaction_currency'],
                            transaction_amount = source[i]['transaction_amount'],
                            fixed_transaction_fee = source[i]['fixed_transaction_fee'],
                            discount_rate = source[i]['discount_rate'],
                            interchange = source[i]['interchange'],
                            card_scheme_fees = source[i]['card_scheme_fees'],
                            acquiring_fee = source[i]['acquiring_fee'],
                            net_activity = source[i]['net_activity'],
                            card_scheme = source[i]['card_scheme'],
                            merchant_reference_number_h9 = source[i]['merchant_reference_number_h9'];
        
                        
                            var insertStatement = 'INSERT INTO credorex(statement_date, transaction_date, posting_date, transaction_currency, transaction_amount,fixed_transaction_fee,discount_rate,interchange,card_scheme_fees,acquiring_fee,net_activity,card_scheme,merchant_reference_number_h9)VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?)';
                            var items = [statement_date, transaction_date, posting_date, transaction_currency, transaction_amount,fixed_transaction_fee,discount_rate,interchange,card_scheme_fees,acquiring_fee,net_activity,card_scheme,merchant_reference_number_h9];
                            pool.query(insertStatement, items);
                    }
                    res.status(200).json({
                        message:'The data is uploaded successfully'
                    });
                }
            })
            .catch(error =>{
                console.log(error.sqlMessage)
            });

            
        })
        .catch((err) => {
            console.log(err.sqlmessage)
            
        })
        ;
    }catch(error){
        console.log(error);
    }
});


router.post('/uploadcpcredorex',fileUpload(uploadcpfile),async(req, res)=>{
    try{
        const {excel} = req.files;
        await csvtojson().fromFile(req.files.file.tempFilePath)
        .then(async source => {
            await console.log(source.length);
            db.exist_cp_credorex_table_item(source[1]['sDate'])
            .then(async result =>{
                if(result[0].length > 0){
                    res.status(200).json(
                        {message:'The data statement already exist in the database.'}
                    );
                }else{
                    for(let i = 0; i < source.length ;i++){
                        var ID = source[i]['ID'],
                            sDate = source[i]['sDate'],
                            rDate = source[i]['rDate'],
                            Status = source[i]['Status'],
                            Paid = source[i]['Paid'],
                            pCrn = source[i]['pCrn'],
                            Received = source[i]['Received'],
                            rCrn = source[i]['rCrn'],
                            Processor = source[i]['Processor'],
                            payoutagent = source[i]['Pay out agent'],
                            PID = source[i]['PID'];
                        
                            var insertStatement = 'INSERT INTO cp_credorex(ID_trans,sDate,rDate,Status,Paid,pCrn,Received,rCrn,Processor,Pay_out_agent,PID)VALUES(?,?,?,?,?,?,?,?,?,?,?)';
                            var items = [ID,sDate, rDate, Status, Paid, pCrn, Received, rCrn, Processor, payoutagent, PID];
                            await pool.query(insertStatement, items);
                    }
                    res.status(200).json({
                        message:'The data is uploaded successfully'
                    });
                }
            }).catch(error => console.log(error.sqlMessage))
        })
        .catch(
            (err) => {
                console.log(err.sqlMessage)
            }
        )
    }catch(error){
        console.log(error);
    }
});









/*-----------------------------------------------------*/
module.exports = router;