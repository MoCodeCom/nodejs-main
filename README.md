INSERT INTO appdb.recon_credorex (ID_trans_system,amount_system)
SELECT merchant_reference_number_h9, transaction_amount FROM appdb.credorex LEFT JOIN appdb.cp_credorex ON appdb.cp_credorex.ID_trans = appdb.credorex.merchant_reference_number_h9 WHERE appdb.cp_credorex.ID_trans IS NULL;
INSERT INTO appdb.recon_credorex (ID_trans_credorex,amount_credorex)
SELECT ID_trans, Paid FROM appdb.cp_credorex LEFT JOIN appdb.credorex ON appdb.credorex.merchant_reference_number_h9 = appdb.cp_credorex.ID_trans WHERE appdb.credorex.merchant_reference_number_h9 IS NULL;
