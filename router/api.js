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
/*----------------------------------------------------*/
const databaseController = require('../controllers/databaseController');
const filesController = require('../controllers/filesController');
const fileUpload = require('express-fileupload');
/*----------------------------------------------------*/
//********* Create table ********/
router.get('/creatcredorextbl', databaseController.createTbl_credorex);
router.get('/createcptbl', databaseController.createTbl_cp);

//********* Delete table ********/
router.delete('/deletcredorextbl', databaseController.deleteTbl_credorex);
router.delete('/deletecptbl', databaseController.deleteTbl_cp);


//********* Upload Data *********/
router.post('/uploadcredroex',fileUpload(uploadOpts), async(req, res)=>{
    try{
        const { excel } = req.files;
        
        if(excel.mimetype !== 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'){
            fs.unlinkSync(excel.tempFilePath);
            return res.status(400).json({msg:'File is invalid'})
            //console.log(excel);
        }
        const workbook = XLSX.readFile(excel.tempFilePath);
        const sheetName = workbook.SheetNames[0];
        const data = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

        const successData = [];
        const failurData = [];

        for(let i = 0 ; i < data.length ; i++){
            const {statement_date, transaction_date, posting_date, transaction_currency, transaction_amount,fixed_transaction_fee,discount_rate,interchange,card_scheme_fees,acquiring_fee,net_activity,card_scheme,merchant_reference_number_h9} = data[i];
            const sql = 'INSERT INTO credorex(statement_date, transaction_date, posting_date, transaction_currency, transaction_amount,fixed_transaction_fee,discount_rate,interchange,card_scheme_fees,acquiring_fee,net_activity,card_scheme,merchant_reference_number_h9)VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?)';
            const [rows,fields] = await pool.query(sql, [statement_date, transaction_date, posting_date, transaction_currency, transaction_amount,fixed_transaction_fee,discount_rate,interchange,card_scheme_fees,acquiring_fee,net_activity,card_scheme,merchant_reference_number_h9]);
            if(rows.affectedRows){
                successData.push(data[i]);
            }else{
                failurData.push(data[i]);
            }
        }


        fs.unlinkSync(excel.tempFilePath)
        return res.status(200).json(
            {msg:'OK', data:{successData, failurData}
        });

    }catch(error){
        console.log(error);
    }
});


router.post('/uploadcp',fileUpload(uploadcpfile),async(req, res)=>{
    try{
        arr=[]
        const {excel} = req.files;
        fs.createReadStream(excel.tempFilePath)
        .pipe(csv())
        .on('data',async function(data){
            arr.push(data);
            //console.log(arr);

            const successData = [];
            const failurData = [];

            for(let i = 0 ; i < data.length ; i++){
                const {ID,sDate,rDate,Status,Paid,pCrn,Received,rCrn,Processor,PayOutAgent,PID} = data[i];
                const sql = 'INSERT INTO cp(ID_trans,sDate,rDate,Status,Paid,pCrn,Received,rCrn,Processor,Pay_out_agent,PID)VALUES(?,?,?,?,?,?,?,?,?,?,?)';
                const [rows,fields] = await pool.query(sql, [ID,sDate,rDate,Status,Paid,pCrn,Received,rCrn,Processor,PayOutAgent,PID]);
                if(rows.affectedRows){
                    successData.push(data[i]);
                }else{
                    failurData.push(data[i]);
                }
            }

            fs.unlinkSync(excel.tempFilePath)
              return res.status(200).json(
              {msg:'OK', data:{successData, failurData}
              });
        });
        
    }catch(error){
        console.log(error);
    }
});







/*-----------------------------------------------------*/
module.exports = router;