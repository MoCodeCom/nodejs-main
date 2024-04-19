const db = require("../modules/Db");
/*----------------------- Credorex table --------------*/
exports.createTbl_credorex = (req,res,next)=>{
    db.createTable_credorex()
    .then(result =>{
        console.log(result);
        res.status(200).json(
            {message:'The credorex table is created successfully.'}
        );
    })
    .catch(error =>{
        console.log(error.sqlMessage);
        if(error.sqlMessage.includes('already exists')){
            res.status(200).json(
                { message:'The table exist already in the database!'}
            )
        }
    });

}

exports.deleteTbl_credorex = (req, res, next)=>{
    db.deleteTable('credorex')
    .then(result =>{
        console.log(result);
        res.status(200).json(
            {message:'The credorex is deleted from database successfully.'}
        );
    })
    .catch(error =>{
        console.log(error.sqlMessage);
        if(error.sqlMessage.includes('Unknown table')){
            res.status(200).json({
                message:'no table with this name in the databse!'
            });
        }
    });
}


//--------------------- Cp table ------------------------//
exports.createTbl_cp = (req, res, next)=>{
    db.createTable_cp()
    .then(result =>{
        console.log(result);
        res.status(200).json(
            {message:'The cp_credorex table is created successfully.'}
        );
    })
    .catch(error =>{
        console.log(error.sqlMessage);
        if(error.sqlMessage.includes('already exists')){
            res.status(200).json(
                { message:'The table exist already in the database!'}
            )
        }
    });
    
}

exports.deleteTbl_cp = (req, res, next)=>{
    
    db.deleteTable('cp_credorex')
    .then(result =>{
        console.log(result);
        res.status(200).json(
            {message:'The cp_credorex is deleted from database successfully.'}
        );
    })
    .catch(error =>{
        console.log(error.sqlMessage);
        if(error.sqlMessage.includes('Unknown table')){
            res.status(200).json({
                message:'no table with this name in the databse!'
            });
        }
    });
    
}

//-------------------- Recon Credorex table -----------------//
exports.createTbl_recon_credorex = (req, res, next)=>{
    db.createTable_recon_credorex()
    .then(result =>{
        console.log(result);
        res.status(200).json(
            {message:'The Recon_credorex table is created successfully.'}
        );
    })
    .catch(error =>{
        console.log(error.sqlMessage);
        if(error.sqlMessage.includes('already exists')){
            res.status(200).json(
                { message:'The table exist already in the database!'}
            )
        }
    });
}


exports.deleteTbl_recon_credorex = (req, res, next)=>{
    
    db.deleteTable('recon_credorex')
    .then(result =>{
        console.log(result);
        res.status(200).json(
            {message:'The recon_credorex is deleted from database successfully.'}
        );
    })
    .catch(error =>{
        console.log(error.sqlMessage);
        if(error.sqlMessage.includes('Unknown table')){
            res.status(200).json({
                message:'no table with this name in the databse!'
            });
        }
    });
    
}

//************************************************************ */

