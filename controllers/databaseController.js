const db = require("../modules/Db");
/*----------------------- Credorex table --------------*/
exports.createTbl_credorex = (req,res,next)=>{
    db.createTable_credorx();

}

exports.deleteTbl_credorex = (req, res, next)=>{
    db.deleteTable('credorex');
}


//--------------------- Cp table ------------------------//
exports.createTbl_cp = (req, res, next)=>{
    db.createTable_cp();
}

exports.deleteTbl_cp = (req, res, next)=>{
    db.deleteTable('cp');
}

