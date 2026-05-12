// DB Connection
import pool from '../config/db_config.js'

// Bank Controller

// Add Bank
export const AddBank = async (req, res) => {
    
    try {

        const { id } = req.user;

        // Destruct
        const {
            holder_name,
            ifsc_code,
            bank_account_number,
            branch_name,
            bank_name,
            balance_amount,
            cash,
            account_type
        } = req.body;

        const BankData = await pool.query(
            "INSERT INTO bank_details (bank_holder_name, ifsc_code, bank_account_no, bank_branch_name, bank_name, bank_amount, cash, account_type, created_by) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *",
            [holder_name, ifsc_code, bank_account_number, branch_name, bank_name, balance_amount, cash, account_type, id]
        );

        console.log(BankData.rows);

        res.status(200).json({ msg: 'Bank Details Added Successfully', data: BankData.rows });

    } catch (e) {

        console.error("Error On Add Bank Details:", e);

        res.status(500).json({ msg: `Failed to Add Bank Details ${e}` });

    }
    
};

// Fetch Bank Details
export const GetBankDetails = async (req, res) => {

    try {

        const { id, role } = req.user;

        const query = `
            SELECT 
                bd.*, 
                row_to_json(up) as created_by
            FROM bank_details bd
            LEFT JOIN (
                SELECT user_id, full_name, user_email, user_designation
                FROM user_profile
            ) up ON bd.created_by = up.user_id
            ${role === 'MD' ? '' : 'WHERE bd.created_by = $1'}
            ORDER BY bd.bank_id ASC
        `;

        const values = role === 'MD' ? [] : [id];

        const BankData = await pool.query(query, values);

        console.log(BankData.rows);

        res.status(200).json({ msg: "Fetching Data", banks: BankData.rows });

    } catch (e) {

        console.error("Error On Fetching Supplier Data:", e);

        res.status(500).json({ msg: `Failed to fetch Supplier ${e}` });

    }

}

// Get Bank Details by ID
export const GetBankDetailsById = async (req, res) => {

    try {

        const { id } = req.params;

        const { id: user_id, role } = req.user;

        let BankData;

        // Get Data on role based
        if (role === "MD") {

            BankData = await pool.query(
                "SELECT * FROM bank_details WHERE bank_id = $1",
                [id]
            );

        } else {

            BankData = await pool.query(
                "SELECT * FROM bank_details WHERE bank_id = $1 AND created_by = $2",
                [id, user_id]
            );

        }

        if (BankData.rows.length === 0) {

            return res.status(404).json({ msg: "Bank details not found" });

        }

        console.log("selected Bank Details Data " + BankData.rows[0]);

        res.status(200).json({ BankData: BankData.rows[0] });

    } catch (e) {

        console.error("Error Fetch the Bank Details:", e);

        res.status(500).json({ msg: "Failed to get bank details" });

    }

};

// Update Bank Details
export const UpdateBankDetails = async (req, res) => {

    try {

        const { id } = req.params;

        const {
            holder_name,
            ifsc_code,
            bank_account_number,
            branch_name,
            bank_name,
            balance_amount,
            cash,
            account_type
        } = req.body;

        const UpdateBanDetails = await pool.query(
            "UPDATE bank_details SET bank_holder_name = $1, ifsc_code = $2, bank_account_no = $3, bank_branch_name= $4, bank_name = $5, bank_amount = $6, cash = $7, account_type = $8 WHERE bank_id = $9",
            [holder_name, ifsc_code, bank_account_number, branch_name, bank_name, balance_amount, cash, account_type, id]
        );

        res.status(200).json({ msg: "Bank Details Updated Successfully", UpdatedBankDetails: UpdateBanDetails.rows[0] });

    } catch (e) {

        console.error("Error updating bank details:", e);

        res.status(500).json({ msg: "Failed to update bank details" });

    }

};

// Delete Bank Details
export const DeleteBankDetails = async (req, res) => {

    try {

        const { id } = req.params;

        await pool.query("DELETE FROM bank_details WHERE bank_id = $1", [id]);

        res.status(200).json({ msg: "Bank Detail Deleted Successfully" });

    } catch (e) {

        console.error("Error deleting bank details:", e);

        res.status(500).json({ msg: "Failed to delete bank details" });

    }

};