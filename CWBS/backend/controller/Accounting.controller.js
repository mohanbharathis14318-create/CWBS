// DB Connection
import pool from "../config/db_config.js";

// || Office Account

// || office Investment

// Create Office Investment
const CreatOfficeInvestment = async (req, res) => {

    try {

        const {
            daily_activity_type,
            date,
            particulars,
            investment_type,
            amount,
            payment_mode,
            transaction_remark
        } = req.body;

        // Validation
        if (!daily_activity_type || !date || !payment_mode || !transaction_remark || !payment_mode || !transaction_remark || !amount) {

            return res.status(400).send({ msg: "Field is required" });

        }


        const Data = await pool.query(
            "INSERT INTO account_office_investment (aci_daily_activity_type, aci_date, aci_particulars, aci_investment_type, aci_amount, aci_payment_mode, aci_transaction_remark) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
            [daily_activity_type, date, particulars, investment_type, amount, payment_mode, transaction_remark]
        );

        res.status(200).json({ msg: "Created Successfully", OfficeInvestmentData: Data.rows[0] });

    } catch (e) {

        console.error("Error On Creating Office Investment:", e);

        res.status(500).json({ msg: "Failed to Add Office Investment" + e });

    }

};

// Fetch Office Investment Data Entries
const FetchOfficeInvestment = async (req, res) => {

    try {

        const Data = await pool.query(
            "SELECT * FROM account_office_investment"
        )

        res.status(200).json({ msg: "Fetching Data", ACI: Data.rows });

    } catch (e) {

        console.error("Error On Fetching Office Investment Data:", e);

        res.status(500).json({ msg: "Failed to fetch Office Investment Data" });

    }

};

// Get Office Investment Data By ID
const GetACIDataById = async (req, res) => {

    try {

        const { id } = req.params;

        const AOIData = await pool.query(
            "SELECT * FROM account_office_investment WHERE aci_id = $1",
            [id]
        );

        res.status(200).json({ msg: "Office Investment Details", AOIData: AOIData.rows[0] });


    } catch (e) {

        console.error("Error On Fetching Office Investment Data By ID:", e);

        res.status(500).json({ msg: `Failed to fetch office investment Id: ${e}` });

    }

}

// Update Office Investment
const UpdateOfficeInvestment = async (req, res) => {

    try {

        const { id } = req.params;

        const {
            daily_activity_type,
            date,
            particulars,
            investment_type,
            amount,
            payment_mode,
            transaction_remark
        } = req.body;

        const Data = await pool.query(
            "UPDATE account_office_investment SET aci_daily_activity_type = $1, aci_date = $2, aci_particulars = $3, aci_investment_type = $4, aci_amount = $5, aci_payment_mode = $6, aci_transaction_remark = $7 WHERE aci_id = $8",
            [daily_activity_type, date, particulars, investment_type, amount, payment_mode, transaction_remark, id]
        );

        res.status(200).json({ msg: "Office Investment updated" });

    } catch (e) {

        console.error(`Error On Updating Office Investment Data: ${e}`);

        res.status(500).json({ msg: "Failed to update Office Investment Data" });

    }

};

// Delete Office Investment
const DeleteOfficeInvestment = async (req, res) => {

    try {

        const { id } = req.params;

        await pool.query(
            "DELETE FROM account_office_investment WHERE aci_id = $1",
            [id]
        );

        res.status(200).json({ msg: "Office Investment Data Deleted Successfully" });

    } catch (e) {

        console.error("Error deleting office investment:", e);

        res.status(500).json({ msg: "Failed to delete office investment data" });

    }

}

// Export Office A/C Investment
export {
    CreatOfficeInvestment,
    FetchOfficeInvestment,
    GetACIDataById,
    UpdateOfficeInvestment,
    DeleteOfficeInvestment
};


// || Office Expenses

// Create Office Expense Request
const CreateOfficeExpenseReq = async (req, res) => {

    try {

        const reqUserId =  req.user.id;

        const {
            date,
            particulars,
            expense_type,
            base_amount,
            payment_mode,
            transaction_remark,
            priority_level
        } = req.body;

        await pool.query(
            `
                INSERT INTO office_expense_requests
                    (
                        requested_by,
                        date_requested,
                        particulars,
                        amount_requested,
                        expense_type,
                        payment_mode,
                        priority_level,
                        transaction_remark
                    ) 
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
            `,
            [
                reqUserId,
                date,
                particulars,
                base_amount,
                expense_type,
                payment_mode,
                priority_level,
                transaction_remark
            ]
        );


        res.status(200).json({ msg: "Created Office Expense Request" });

    } catch (e) {

        console.error("Error On Creating Office Expense Request:", e);

        res.status(500).json({ msg: "Failed to Create Office Expense Request" + e });

    }

};

// Fetch Office Expense Data
const FetchOfficeExpenseReq = async (req, res) => {

    try {

        const Data = await pool.query(
            "SELECT * FROM office_expense_requests"
        )

        const UserId = Number(req.user.id);

        const ReqFilter = Array.isArray(Data.rows) ? Data.rows : [];


        if (req.user.role === "MD")
        {

            res.status(200).json({ msg: "Fetching Data For MD", forMDDataRender: ReqFilter  });

        } else {

            // Filter Based on requester
            const FilteredReq = ReqFilter.filter((item) => {

                return UserId === Number(item.requested_by);

            });

            console.log("Filtered Req" + FilteredReq);

            res.status(200).json({ msg: "Fetching Data of Requested User", RequesterDataRender: FilteredReq });

        }

    } catch (e) {

        console.error("Error On Fetching Office Expense Data:", e);

        res.status(500).json({ msg: "Failed to fetch Office Expense Data" });

    }

};

// MD Approves & Forward to accountant
const StatusChangesByMD = async (req, res) => {

    try {

        if (req.user.role === "MD")
        {

            // Req ID of the expense req
            const { id } = req.params;

            const { newStatus } = req.body;

            if (newStatus === "Approved")
            {

                const MDId = req.user.id;

                // for forwarding to account - Req accountant by their id
                const AccountId = null; // yet to given

                const updateStatusNForward = await pool.query(
                    `
                        UPDATE office_expense_requests 
                        SET 
                            status = 'Approved',
                            forwarded_to = $1,
                            approved_by = $2
                        WHERE request_id = $3
                    `,
                    [
                        AccountId,
                        MDId,
                        id
                    ]
                );

                // Getting amount form exp req
                const expReq = await pool.query(
                    `
                        SELECT * FROM office_expense_requests WHERE request_id = $1
                    `,
                    [id]
                );

                const RequestedAmt = expReq.rows[0].amount_requested;

                // Expense or Income
                const type = 'Expense';

                // Entries to general ledger
                await pool.query(
                    `
                       INSERT INTO general_ledger 
                           (
                                user_id, --MD ID
                                counterparty_id, --Account Id
                                type,
                                amount
                           ) 
                       VALUES ($1, $2, $3, $4)
                    `,
                    [
                        MDId,
                        AccountId,
                        type,
                        RequestedAmt
                    ]
                );

                res.status(200).json({ msg: "Approved & Entry been added to your general & expense account" });

            } else if (newStatus === "In Review") {

                await pool.query(
                    `
                        UPDATE office_expense_requests 
                        SET 
                            status = 'In Review'
                        WHERE request_id = $1
                    `,
                    [
                        id
                    ]
                );

                res.status(200).json({ msg: "In Review" });

            } else if (newStatus === "Denied") {

                await pool.query(
                    `
                        UPDATE office_expense_requests 
                        SET 
                            status = 'Denied'
                        WHERE request_id = $1
                    `,
                    [
                        id
                    ]
                );

                res.status(200).json({ msg: "Denied" });

            }

        } else {

            res.status(200).json({ msg: "Not Authorized, Denied Access" });

        }


    } catch (e) {

        console.error("Error On Approving & forwarding the request:", e);

        res.status(500).json({ msg: "Failed to Approving & forwarding the office expense request" });

    }

};

// Edit Expense Request
const EditExpReq = async (req, res) => {

    try {

        const { id } = req.params;

        const {
            date,
            particulars,
            expense_type,
            base_amount,
            payment_mode,
            transaction_remark,
            priority_level
        } = req.body;

        await pool.query(
            `
                UPDATE office_expense_requests 
                    SET 
                        date_requested = $1,
                        particulars = $2,
                        expense_type = $3,
                        amount_requested = $4,
                        payment_mode = $5,
                        transaction_remark = $6,
                        priority_level = $7
                WHERE request_id = $8
            `,
            [
                date,
                particulars,
                expense_type,
                base_amount,
                payment_mode,
                transaction_remark,
                priority_level,
                id
            ]
        );

        res.status(200).json({ msg: "Updated expense request" });


    } catch (e) {

        console.error("Error On updating the expense request:", e);

        res.status(500).json({ msg: "Failed to updating the office expense request" });

    }

};

// Delete the req
const DeleteExpReq = async (req, res) => {

    try {

        const { id } = req.params;

        await pool.query(
            `
                DELETE FROM office_expense_requests WHERE request_id = $1
            `,
            [id]
        );

        res.status(200).json({ msg: "Deleted Expense Request" });

    } catch (e) {

        console.error("Error On deleting the request:", e);

        res.status(500).json({ msg: "Failed to delete office expense request" });

    }

};

export {
    CreateOfficeExpenseReq,
    FetchOfficeExpenseReq,
    StatusChangesByMD,
    EditExpReq,
    DeleteExpReq
};



// || Cash In Hand

// Add Cash In Hand
const AddCashInHand = async (req, res) => {

    try {

        const { id } = req.user;

        // Destruct
        const {
            daily_activity, CIH_transaction_type, CIH_designation, CIH_holders_name, CIH_remarks, amount
        } = req.body;

        const CashInHandData = await pool.query(
            "INSERT INTO cih_details (daily_activity, cih_transaction_type, cih_holders_name, cih_designation, cih_remarks, cih_amount, created_by) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
            [daily_activity, CIH_transaction_type, CIH_holders_name, CIH_designation, CIH_remarks, amount, id]
        );

        console.log(CashInHandData.rows);

        res.status(200).json({msg: 'Cash In Hand Details Added Successfully', data: CashInHandData.rows});

    } catch (e) {

        console.error("Error On Add Cash In Hand Details:", e);

        res.status(500).json({msg: `Failed to Add Cash In Hand Details ${e}`});

    }

};

// Fetch Cash In Hand Details
const GetCashInHandDetails = async (req, res) => {

    try {

        const { id, role } = req.user;

        const CashInHandData = role === "MD" ? await pool.query("SELECT * FROM cih_details") : await pool.query("SELECT * FROM cih_details WHERE created_by = $1", [id]);

        console.log(CashInHandData.rows);

        res.status(200).json({ msg: "Fetching Data", expenseReq: CashInHandData.rows });

    } catch (e) {

        console.error("Error On Fetching Cash In Hand Data:", e);

        res.status(500).json({ msg: `Failed to fetch Cash In Hand ${e}` });

    }

}

// Get Cash In Hand Details by ID
const GetCashInHandById = async (req, res) => {

    try {

        const { id: cih_id } = req.params;

        const { id: user_id, role } = req.user;

        let CashInHandData;

        // Get Data on role based
        if (role === "MD") {

            CashInHandData = await pool.query(
                "SELECT * FROM cih_details WHERE cih_id = $1",
                [cih_id]
            );

        } else {

            CashInHandData = await pool.query(
                "SELECT * FROM cih_details WHERE cih_id = $1 AND created_by = $2",
                [cih_id, user_id]
            );

        }

        if (CashInHandData.rows.length === 0) {

            return res.status(404).json({ msg: "Cash In Hand details not found" });

        }

        console.log("selected Cash In Hand Details Data " + CashInHandData.rows[0]);

        res.status(200).json({ CashInHandData: CashInHandData.rows[0] });

    } catch (e) {

        console.error("Error Fetch the Cash In Hand Details:", e);

        res.status(500).json({ msg: "Failed to get Cash In Hand details" });

    }

};


// Update Cash In Hand Details
const UpdateCashInHandDetails = async (req, res) => {

    try {

        const { id } = req.params;

        const {
            daily_activity,
            CIH_transaction_type,
            CIH_designation,
            CIH_holders_name,
            CIH_remarks,
            amount
        } = req.body;

        const UpdateCashInHandDetails = await pool.query(
            "UPDATE cih_details SET daily_activity = $1, cih_transaction_type= $2, cih_designation = $3, cih_holders_name = $4, cih_remarks = $5, cih_amount = $6 WHERE cih_id = $7",
            [daily_activity, CIH_transaction_type, CIH_designation, CIH_holders_name, CIH_remarks, amount, id]
        );

        res.status(200).json({ msg: "Cash In Hand Details Updated Successfully", UpdateCashInHandDetails: UpdateCashInHandDetails.rows[0] });

    } catch (e) {

        console.error("Error updating Cash In Hand details:", e);

        res.status(500).json({ msg: "Failed to update Cash In Hand details" });

    }

};

// Delete Cash In Hand Details
const DeleteCashInHandDetails = async (req, res) => {

    try {

        const { id } = req.params;

        await pool.query("DELETE FROM cih_details WHERE cih_id = $1", [id]);

        res.status(200).json({ msg: "Cash In Hand Detail Deleted Successfully" });

    } catch (e) {

        console.error("Error deleting Cash In Hand details:", e);

        res.status(500).json({ msg: "Failed to delete Cash In Hand details" });

    }

};

// Export CIH
export {
    AddCashInHand,
    GetCashInHandDetails,
    GetCashInHandById,
    UpdateCashInHandDetails,
    DeleteCashInHandDetails,
};



