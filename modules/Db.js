const pool = require('../util/database');
/*-------------------------------------------------*/

/*-------------------------------------------------*/
module.exports = class Data{
    constructor(){}
    save(){}
    /***************** Check exist table **************/
    static exist_Table(table_name) {
        const q = `SELECT EXISTS (SELECT * FROM information_schema.tables WHERE table_schema = 'appdb' AND table_name = '${table_name}') AS tableExists`;
        return pool.query(q);
    }

    static tables_names(table_name){
        const q = `SHOW TABLES FROM appdb LIKE '${table_name}'`;
        return pool.query(q);
    }

    /***************** Check exist table **************/
    /*-----------------> check credorex table <---------------------------*/
    static exist_credorex_table_item(table_name,column_title,item){
        const q = `SELECT * FROM credorex WHERE statement_date = '${item}';`;
        return pool.query(q);
    }

    /*-----------------> check cp_credorex table <-----------------------*/
    static exist_cp_credorex_table_item(item){
        const q = `SELECT * FROM cp_credorex WHERE sDate = '${item}';`;
        return pool.query(q);
    }

    /***************** Delete Table *******************/
    static deleteTable(table_name){
        const q = `DROP TABLE ${table_name};`;
        return pool.query(q);
    }

    /***************** Cp ************************/

    
    static createTable_cp(){
        const q = "CREATE TABLE cp_credorex (id INT UNSIGNED NOT NULL AUTO_INCREMENT,ID_trans VARCHAR(20),sDate VARCHAR(20),rDate VARCHAR(20),Status VARCHAR(10),Paid VARCHAR(45),pCrn VARCHAR(45),Received VARCHAR(15),rCrn VARCHAR(15),Processor VARCHAR(15),Pay_out_agent VARCHAR(25),PID VARCHAR(50),PRIMARY KEY (id),UNIQUE INDEX id_UNIQUE (id ASC) VISIBLE);";
        return pool.query(q);
    }


    /***************** Credorx ************************/

    
    static createTable_credorex(){
        const q = "CREATE TABLE credorex (id INT UNSIGNED NOT NULL AUTO_INCREMENT,statement_date VARCHAR(20) ,transaction_date VARCHAR(20),posting_date VARCHAR(20) ,transaction_currency VARCHAR(10) ,transaction_amount VARCHAR(45) ,fixed_transaction_fee VARCHAR(45) ,discount_rate VARCHAR(15),interchange VARCHAR(15),card_scheme_fees VARCHAR(15),acquiring_fee VARCHAR(15),net_activity VARCHAR(15),card_scheme VARCHAR(15), merchant_reference_number_h9 VARCHAR(20),PRIMARY KEY (id),UNIQUE INDEX id_UNIQUE (id ASC) VISIBLE);";
        return pool.query(q);
    }

    /************************************************/

    static createTable_recon_credorex(){
        const q = "CREATE TABLE recon_credorex (id INT UNSIGNED NOT NULL AUTO_INCREMENT,ID_system VARCHAR(20) ,ID_credorex VARCHAR(20),amount_system VARCHAR(20) ,amount_credorex VARCHAR(20),status VARCHAR(10),PRIMARY KEY (id),UNIQUE INDEX id_UNIQUE (id ASC) VISIBLE);";
        return pool.query(q);
    }

    
}