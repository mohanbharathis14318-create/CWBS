// DB Connection
import pool from '../config/db_config.js'

// Supplier Controller

// Create Supplier
export const CreateSupplier = async (req, res) => {

    try {

        // Req Data from body
        const {
            supplier_name,
            company_name,
            phone_number,
            business_type,
            supplier_address,
            gst_number,
            pan_number,
            company_type,
            bank_name,
            bank_account_number,
            ifsc_code,
            upi_number,
        } = req.body;

        // Save it ot Table
        const SupplierData = await pool.query(
            "INSERT INTO supplier_profile (full_name, phone, company_name, business_type, company_type, gst_number, pan_number, bank_name, bank_account_number, ifsc_code, upi_number, supplier_address) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *",
            [supplier_name, phone_number, company_name, business_type, company_type, gst_number, pan_number, bank_name, bank_account_number, ifsc_code, upi_number, supplier_address]
        );

        console.log(SupplierData.rows);

        res.status(200).json({ msg: 'Supplier Added Successfully', data: SupplierData.rows });

    } catch (e) {

        console.error("Error On Creating Supplier:", e);

        res.status(500).json({ msg: `Failed to Add Supplier ${e}` });

    }

}

// Get Supplier Data
export const GetSupplier = async (req, res) => {

    try {

        const SupplierData = await pool.query(
            "SELECT * FROM supplier_profile",
        );
        console.log(SupplierData.rows);

        res.status(200).json({ msg: "Fetching Data", suppliers: SupplierData.rows });

    } catch (e) {

        console.error("Error On Fetching Supplier Data:", e);

        res.status(500).json({ msg: `Failed to fetch Supplier ${e}` });

    }

}

// Get Supplier By ID
export const GetSupplierDetailsById = async (req, res) => {

    try {

        const { id } = req.params;

        const SupplierData = await pool.query(
            "SELECT * FROM supplier_profile WHERE supplier_id = $1",
            [id]
        );

        res.status(200).json({ msg: "Supplier Details", SupplierData: SupplierData.rows[0] });


    } catch (e) {

        console.error("Error On Fetching Supplier Data By ID:", e);

        res.status(500).json({ msg: `Failed to fetch Supplier br Id: ${e}` });

    }

}

// Update Supplier Details
export const UpdateSupplierDetails = async (req, res) => {

    try {

        const { id } = req.params;

        const {
            supplier_name,
            company_name,
            phone_number,
            business_type,
            supplier_address,
            gst_number,
            pan_number,
            company_type,
            bank_name,
            bank_account_number,
            ifsc_code,
            upi_number,
        } = req.body;

        const UpdateSupplierDetails = await pool.query(
            "UPDATE supplier_profile SET full_name = $1, phone = $2, company_name = $3, company_type = $4, business_type = $5, gst_number = $6, pan_number = $7, bank_name = $8, bank_account_number = $9, ifsc_code = $10, upi_number = $11, supplier_address = $12 WHERE supplier_id = $13",
            [supplier_name, phone_number, company_name, business_type, company_type, gst_number, pan_number, bank_name, bank_account_number, ifsc_code, upi_number, supplier_address, id]
        );

        res.status(200).json({ msg: "Supplier Detail Updated Successfully", UpdatedSupplierDetails: UpdateSupplierDetails.rows[0] });

    } catch (e) {

        console.error("Error updating Supplier details:", e);

        res.status(500).json({ msg: "Failed to update supplier details" });

    }

};

// Delete Supplier Details
export const DeleteSupplierDetails = async (req, res) => {

    try {

        const { id } = req.params;

        await pool.query(
            "DELETE FROM supplier_profile WHERE supplier_id = $1",
            [id]
        );

        res.status(200).json({ msg: "Supplier Detail Deleted Successfully" });

    } catch (e) {

        console.error("Error deleting bank details:", e);

        res.status(500).json({ msg: "Failed to delete supplier detail" });

    }

};