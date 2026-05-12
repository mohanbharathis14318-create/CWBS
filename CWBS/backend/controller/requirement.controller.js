// DB Connection
import pool from "../config/db_config.js";

// || Create Expense Request
const Create_Expense_Request = async (req, res) => {

    try {

        const {
            daily_activity_type,
            requirement_type,
            transaction_title,
            trxn_remarks,
            user_name,
            user_designation,
            payment_mode,
            expense_type,
            amount,
            cash_flow_type,
            trxn_id,

            // Cash Given Fields
            given_date,
            given_sender_name,
            given_sender_designation,
            given_payment_mode,
            given_amount,

            // Cash Return Fields
            return_date,
            return_sender_name,
            return_sender_designation,
            return_payment_mode,
            total_requested_amount,
            total_expensed_amount,
            total_balance_amount,
            total_return_amount,

            // Expense Items
            expense_items
        } = req.body;


        if (cash_flow_type === "Cash Given") {

            const { rows } = await pool.query(
                `INSERT INTO expense_requests (
                daily_activity_type, requirement_type, transaction_title, trxn_remarks,
                user_name, user_designation, payment_mode, expense_type, amount, cash_flow_type
                ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
                RETURNING trxn_id`,
                [
                    daily_activity_type, requirement_type, transaction_title, trxn_remarks,
                    user_name, user_designation, payment_mode, expense_type, amount, cash_flow_type
                ]
            );

            const trxnId = rows[0].trxn_id;

            await pool.query(
                `INSERT INTO cash_given (
                  trxn_id, given_date, given_sender_name, given_sender_designation,
                  given_payment_mode, given_amount
                ) VALUES ($1,$2,$3,$4,$5,$6)`,
                [trxnId, given_date, given_sender_name, given_sender_designation, given_payment_mode, given_amount]
            );

            res.status(200).json({ msg: "Expense request created successfully" });

        } else if (cash_flow_type === "Cash Return") {

            const { rows } = await pool.query(
                `INSERT INTO cash_return (
                  trxn_id, return_date, return_sender_name, return_sender_designation,
                  return_payment_mode, total_requested_amount, total_expensed_amount,
                  total_balance_amount, total_return_amount
                ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)
                RETURNING return_id`,
                [
                    trxn_id, return_date, return_sender_name, return_sender_designation,
                    return_payment_mode, total_requested_amount, total_expensed_amount,
                    total_balance_amount, total_return_amount
                ]
            );

            const returnId = rows[0].return_id;

            // Insert expense items
            if (Array.isArray(expense_items)) {

                for (const item of expense_items)
                {

                    await pool.query(
                        `INSERT INTO expense_items 
                            (return_id, expense_description, expense_amount)
                         VALUES 
                            ($1,$2,$3)`,
                        [returnId, item.expense_description, item.expense_amount]
                    );

                }

            }

            res.status(200).json({ msg: "Cash returned" });

        }



    } catch (e) {

        console.error("Error On Creating Expense Request:", e);

        res.status(500).json({ msg: "Failed to create expense request", error: e });

    }

};

// Update Transaction request
const UpdateExpenseTransaction = async (req, res) => {

    try {

        const { id } = req.params;

        const {
            transaction_title,
            trxn_remarks,
            payment_mode,
            expense_type,
            amount,
            given_payment_mode,
            given_amount,
        } = req.body;

        await pool.query(
            `UPDATE expense_requests SET
                transaction_title = $1,
                trxn_remarks = $2,
                payment_mode = $3,
                expense_type = $4,
                amount = $5
            WHERE trxn_id = $6`,
            [transaction_title, trxn_remarks, payment_mode,expense_type, amount, id]
        );

        await pool.query(
            `UPDATE cash_given SET
                given_payment_mode = $1,
                given_amount = $2
            WHERE trxn_id = $3`,
            [given_payment_mode, given_amount, id]
        );

        res.status(200).json({ msg: "Expense transaction request updated successfully" });

    } catch (e) {

        console.error("Error Updating Expense Transaction Requests:", e);

        res.status(500).json({ msg: "Failed to Update Expense Transaction Requests" });

    }

};

// Fetch All Requests for MD
const fetchAllExpenseRequests = async (req, res) => {

    try {

        const data = await pool.query(
            `SELECT
              er.*,
              cg.given_date, cg.given_amount, cg.given_sender_name, cg.given_sender_designation, cg.given_payment_mode,
              cr.return_id, cr.return_date, cr.return_payment_mode, cr.total_return_amount, cr.total_requested_amount, cr.total_balance_amount, cr.total_expensed_amount, cr.return_payment_mode,
              COALESCE(
                json_agg(
                  json_build_object(
                    'expense_id', ei.expense_id,
                    'expense_description', ei.expense_description,
                    'expense_amount', ei.expense_amount,
                    'created_at', ei.created_at
                  )
                ) FILTER (WHERE ei.expense_id IS NOT NULL), '[]'
              ) AS expense_items
            FROM expense_requests er
            LEFT JOIN cash_given cg ON er.trxn_id = cg.trxn_id
            LEFT JOIN cash_return cr ON er.trxn_id = cr.trxn_id
            LEFT JOIN expense_items ei ON cr.return_id = ei.return_id
            GROUP BY er.trxn_id, cg.given_date, cg.given_amount, cg.given_sender_name, cg.given_sender_designation, cg.given_payment_mode,
                     cr.return_id, cr.return_date, cr.total_return_amount, cr.total_requested_amount, cr.total_balance_amount, cr.total_expensed_amount
            ORDER BY er.created_at DESC`
        );

        res.status(200).json({ msg: "Fetched all expense requests", requests: data.rows });

    } catch (e) {

        console.error("Error Fetching Expense Requests:", e);

        res.status(500).json({ msg: "Failed to fetch expense requests" });

    }

};

// Get All Requests by User
const getExpenseRequestsByUser = async (req, res) => {

    try {

        const { user_name } = req.params;

        const data = await pool.query(
            `SELECT
              er.*,
              cg.given_date, cg.given_amount, cg.given_sender_name, cg.given_sender_designation, cg.given_payment_mode,
              cr.return_id, cr.return_date, cr.total_return_amount, cr.total_requested_amount, cr.total_balance_amount, cr.total_expensed_amount, cr.return_payment_mode,
              COALESCE(
                json_agg(
                  json_build_object(
                    'expense_id', ei.expense_id,
                    'expense_description', ei.expense_description,
                    'expense_amount', ei.expense_amount,
                    'created_at', ei.created_at
                  )
                ) FILTER (WHERE ei.expense_id IS NOT NULL), '[]'
              ) AS expense_items
            FROM expense_requests er
            LEFT JOIN cash_given cg ON er.trxn_id = cg.trxn_id
            LEFT JOIN cash_return cr ON er.trxn_id = cr.trxn_id
            LEFT JOIN expense_items ei ON cr.return_id = ei.return_id
            WHERE er.user_name = $1
            GROUP BY er.trxn_id, cg.given_date, cg.given_amount, cg.given_sender_name, cg.given_sender_designation, cg.given_payment_mode,
                     cr.return_id, cr.return_date, cr.total_return_amount, cr.total_requested_amount, cr.total_balance_amount, cr.total_expensed_amount
            ORDER BY er.created_at DESC`,
            [user_name]
        );

        res.status(200).json({ msg: "Fetched user's expense requests", requests: data.rows });

    } catch (e) {

        console.error("Error Fetching User Expense Requests:", e);

        res.status(500).json({ msg: "Failed to fetch user's expense requests" });

    }
};

// Approve Status over transaction
const approveTransaction = async (req, res) => {

    try {

        const { id } = req.params;

        const { given_amount, given_payment_mode, given_sender_name, user_name } = req.body;

        const MDData = await pool.query(
            `SELECT user_id FROM user_profile WHERE full_name = $1`,
            [given_sender_name]
        );

        const MD = MDData.rows[0];

        const MDId = MD.user_id;


        // get user data that flow from md to emp accounts
        const UserData = await pool.query(
            `SELECT user_id FROM user_profile WHERE full_name = $1`,
            [user_name]
        );

        const user = UserData.rows[0];

        const userId = user.user_id;

        if (MDId)
        {

            await pool.query("BEGIN");

            // mark the trxn as Approved
            await pool.query(
                `UPDATE expense_requests SET status = 'Approved' WHERE trxn_id = $1`,
                [id]
            );

            // 2. Deduct from MD account
            if (given_payment_mode === "Cash") {

                const cashDebited = await pool.query(
                    `UPDATE bank_details SET cash = cash - $1 WHERE created_by = $2`,
                    [given_amount, MDId]
                );

                if (cashDebited)
                {

                    // Credited to concern user
                    await pool.query(
                        `UPDATE bank_details SET cash = cash + $1 WHERE created_by = $2`,
                        [given_amount, userId]
                    );

                }

            } else {

                const bankDebited = await pool.query(
                    `UPDATE bank_details SET bank_amount = bank_amount - $1 WHERE created_by = $2`,
                    [given_amount, MDId]
                );

                if (bankDebited)
                {

                    // Credited to concern user
                    await pool.query(
                        `UPDATE bank_details SET bank_amount = bank_amount + $1 WHERE created_by = $2`,
                        [given_amount, userId]
                    );

                }

            }

            // 3. Log in bank_ledger
            await pool.query(
                `INSERT INTO bank_ledger (bank_id, trxn_id, flow_type, payment_mode, amount) 
                 VALUES ((SELECT bank_id FROM bank_details WHERE created_by = $1 LIMIT 1), $2, 'OUT', $3, $4)`,
                [MDId, id, given_payment_mode, given_amount]
            );

            await pool.query("COMMIT");

            res.json({ success: true, message: "Transaction approved & amount deducted" });

        }

    } catch (e) {

        await pool.query("ROLLBACK");

        console.error("Error Updating Status:", e);

        res.status(500).json({ msg: "Failed to update approve status" });

    }

};

// Deny & Pending Status
const UpdateTransaction = async (req, res) => {

    try {
        const { id } = req.params;

        const { newStatus, given_amount, given_payment_mode, given_sender_name, user_name } = req.body;

        // Ensure only valid statuses
        if (!["Denied", "Pending"].includes(newStatus)) {

            return res.status(400).json({ msg: "Invalid status" });

        }

        // Get MD and user IDs
        const MDData = await pool.query(
            `SELECT user_id FROM user_profile WHERE full_name = $1`,
            [given_sender_name]
        );
        const userData = await pool.query(
            `SELECT user_id FROM user_profile WHERE full_name = $1`,
            [user_name]
        );

        const MDId = MDData.rows[0]?.user_id;

        const userId = userData.rows[0]?.user_id;

        if (!MDId || !userId) {
            return res.status(404).json({ msg: "MD or User not found" });
        }

        await pool.query("BEGIN");

        // 1. Get current status
        const trxData = await pool.query(
            `SELECT status FROM expense_requests WHERE trxn_id = $1`,
            [id]
        );

        const currentStatus = trxData.rows[0]?.status;

        // 2. If Approved → Denied/Pending → reverse
        if (currentStatus === "Approved" && (newStatus === "Denied" || newStatus === "Pending")) {

            if (given_payment_mode === "Cash") {

                // Deduct from user
                await pool.query(
                    `UPDATE bank_details SET cash = cash - $1 WHERE created_by = $2`,
                    [given_amount, userId]
                );


                // Return money to MD
                await pool.query(
                    `UPDATE bank_details SET cash = cash + $1 WHERE created_by = $2`,
                    [given_amount, MDId]
                );

            } else {

                // Deduct from user
                await pool.query(
                    `UPDATE bank_details SET bank_amount = bank_amount - $1 WHERE created_by = $2`,
                    [given_amount, userId]
                );

                // Return money to MD
                await pool.query(
                    `UPDATE bank_details SET bank_amount = bank_amount + $1 WHERE created_by = $2`,
                    [given_amount, MDId]
                );

            }

            // Log reversal
            await pool.query(
                `INSERT INTO bank_ledger (bank_id, trxn_id, flow_type, payment_mode, amount) 
                 VALUES ((SELECT bank_id FROM bank_details WHERE created_by = $1 LIMIT 1), $2, 'IN', $3, $4)`,
                [MDId, id, given_payment_mode, given_amount]
            );
        }

        // 3. Update status
        await pool.query(
            `UPDATE expense_requests SET status = $1 WHERE trxn_id = $2`,
            [newStatus, id]
        );

        await pool.query("COMMIT");

        res.json({ success: true, message: `Transaction marked as ${newStatus}` });

    } catch (e) {
        await pool.query("ROLLBACK");
        console.error("Error updating status:", e);
        res.status(500).json({ msg: "Failed to update transaction status" });
    }

};

// Returned Status over transaction
const returnedTransaction = async (req, res) => {

    try {

        const { id } = req.params;

        const { given_amount, total_return_amount, return_payment_mode, return_sender_name, user_name } = req.body;

        const MDData = await pool.query(
            `SELECT user_id FROM user_profile WHERE full_name = $1`,
            [return_sender_name]
        );

        const MD = MDData.rows[0];

        console.log(MD)

        const MDId = MD.user_id;

        // get user data that flow from md to emp accounts
        const UserData = await pool.query(
            `SELECT user_id FROM user_profile WHERE full_name = $1`,
            [user_name]
        );

        const user = UserData.rows[0];

        console.log(user);

        const userId = user.user_id;


        if (MDId) {

            await pool.query("BEGIN");

            // mark the trxn as Approved
            await pool.query(
                `UPDATE expense_requests SET status = 'Returned' WHERE trxn_id = $1`,
                [id]
            );

            // 2. Add back to MD account
            if (return_payment_mode === "Cash") {

                // Debit From concern user
                const cashDebited = await pool.query(
                    `UPDATE bank_details SET cash = cash - $1 WHERE created_by = $2`,
                    [given_amount, userId]
                );

                if (cashDebited)
                {

                    await pool.query(
                        `UPDATE bank_details SET cash = cash + $1 WHERE created_by = $2`,
                        [total_return_amount, MDId]
                    );

                }

            } else {

                // Debit from concern user
                const bankCredited = await pool.query(
                        `UPDATE bank_details SET bank_amount = bank_amount - $1 WHERE created_by = $2`,
                        [given_amount, userId]
                    );

                if (bankCredited)
                {

                    await pool.query(
                        `UPDATE bank_details SET bank_amount = bank_amount + $1 WHERE created_by = $2`,
                        [total_return_amount, MDId]
                    );

                }

            }

            // 3. Log in bank_ledger
            await pool.query(
                `INSERT INTO bank_ledger (bank_id, trxn_id, flow_type, payment_mode, amount) 
                 VALUES ((SELECT bank_id FROM bank_details WHERE created_by = $1 LIMIT 1), $2, 'IN', $3, $4)`,
                [MDId, id, return_payment_mode, total_return_amount]
            );

            await pool.query("COMMIT");

            res.json({success: true, message: "Funds returned & balance updated"});

        }

    } catch (e) {

        console.error("Error Updating Status:", e);

        res.status(500).json({ msg: "Failed to update returned status" });

    }

};

// Delete Transaction
const DeleteTransaction = async (req, res) => {

    try {

        const { id } = req.params;

        if (!id)
        {

            res.status(404).json({ message: `Transaction not found` });

        } else {

            await pool.query(
                `DELETE FROM expense_requests WHERE trxn_id = $1`,
                [id]
            );

            res.status(200).json({ message: `Transaction Deleted Successfully` });

        }

    } catch (e) {

        console.error("Error deleting transaction:", e);

        res.status(500).json({ msg: "Failed delete the transaction" });

    }

};

export {
    Create_Expense_Request,
    fetchAllExpenseRequests,
    getExpenseRequestsByUser,
    approveTransaction,
    returnedTransaction,
    UpdateTransaction,
    DeleteTransaction,
    UpdateExpenseTransaction
};
