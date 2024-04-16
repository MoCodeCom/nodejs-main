const pool = require('../util/database');
/*-------------------------------------------------*/

/*-------------------------------------------------*/
module.exports = class Data{
    constructor(){}
    save(){}
    /***************** Check exist table **************/
    static exist_Table(table_name) {
        const q = `SELECT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = '${table_name}')`;
        return pool.query(q);
    }

    /***************** Delete Table *******************/
    static deleteTable(table_name){
        const q = `DROP TABLE ${table_name};`;
        return pool.query(q);
    }

    /***************** Cp ************************/

    
    static createTable_cp(){
        const q = "CREATE TABLE cp (id INT UNSIGNED NOT NULL AUTO_INCREMENT,ID_trans VARCHAR(20) NOT NULL,sDate VARCHAR(20) NOT NULL,rDate VARCHAR(20) NOT NULL,Status VARCHAR(10) NOT NULL,Paid VARCHAR(45) NOT NULL,pCrn VARCHAR(45) NOT NULL,Received VARCHAR(15) NOT NULL,rCrn VARCHAR(15) NOT NULL,Processor VARCHAR(15) NOT NULL,Pay_out_agent VARCHAR(5) NOT NULL,PID VARCHAR(15) NOT NULL,PRIMARY KEY (id),UNIQUE INDEX id_UNIQUE (id ASC) VISIBLE);";
        return pool.query(q);
    }


    /***************** Credorx ************************/

    
    static createTable_credorx(){
        const q = "CREATE TABLE credorex (id INT UNSIGNED NOT NULL AUTO_INCREMENT,statement_date VARCHAR(20) ,transaction_date VARCHAR(20),posting_date VARCHAR(20) ,transaction_currency VARCHAR(10) ,transaction_amount VARCHAR(45) ,fixed_transaction_fee VARCHAR(45) ,discount_rate VARCHAR(15),interchange VARCHAR(15),card_scheme_fees VARCHAR(15),acquiring_fee VARCHAR(15),net_activity VARCHAR(15),card_scheme VARCHAR(15), merchant_reference_number_h9 VARCHAR(20),PRIMARY KEY (id),UNIQUE INDEX id_UNIQUE (id ASC) VISIBLE);";
        return pool.query(q);
    }

    /************************************************/

    
}