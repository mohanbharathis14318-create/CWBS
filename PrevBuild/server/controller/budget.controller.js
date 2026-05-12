// DB Connection
import pool from '../config/db_config.js'
import promise from "express/lib/application.js";
import BudgetData from "pg/lib/query.js";

// Add Budget
export const AddBudget = async (req, res) => {

    try {

        // Array of budget
        const budgets = req.body

        if (!Array.isArray(budgets) || budgets.length === 0) {
            return res.status(400).json({ msg: "No budget entries provided" });
        }

        const ArrayBudgetData = budgets.map((budget) => {

            const {
                budget_month,
                budget_expenses_type,
                budget_particulars,
                budget_amount
            } = budget;

            return pool.query(
                "INSERT INTO budget_details (budget_month, budget_expenses_type, budget_particulars, budget_amount) VALUES ($1, $2, $3, $4) RETURNING *",
                [budget_month, budget_expenses_type, budget_particulars, budget_amount]
            );

        });

        const result = await Promise.all(ArrayBudgetData);

        const BudgetData = result.map(budget => {budget.rows[0];})

        console.log(BudgetData);

        res.status(200).json({ msg: 'Budget successfully added', data: BudgetData });

    } catch (e) {

        console.error("Error in AddBudget", e);

        res.status(500).json({ msg: `Failed to add budget ${e}` });
    }

}

// Fetch Budget Details
export const GetBudgetDetails = async (req, res) => {

    try{

        const BudgetData = await pool.query(
            "SELECT * FROM budget_details",
        );

        console.log(BudgetData.rows);

        res.status(200).json({ msg: "Fetching Data", BudgetData: BudgetData.rows });

    } catch (e) {

        console.error("Error on Fetching Budget", e);

        res.status(500).json({ msg: `Failed to fetch Budget ${e}` });

    }

}

// Get Budget Details By Id
export const GetBudgetById = async (req, res) => {

    try{

        const { id } = req.params;

        const BudgetDataById = await pool.query(
            "SELECT * FROM budget_details WHERE budget_id = $1",
            [id]
        );

        console.log(BudgetDataById.rows);

        res.status(200).json({ msg: "Fetching Data", BudgetData: BudgetDataById.rows[0] });

    } catch (e) {

        console.error("Error on Fetching Budget By id", e);

        res.status(500).json({ msg: `Failed to fetch Budget by id ${e}` });
    }

};

// Update Budget Detail
export const UpdateBudgetDetail = async (req, res) => {

    try {

        const { id } = req.params;

        const {
            budget_month,
            budget_expenses_type,
            budget_particulars,
            budget_amount
        } = req.body;

        const UpdateBudgetDetail = await pool.query(
            "UPDATE budget_details SET budget_month = $1, budget_expenses_type = $2, budget_particulars = $3, budget_amount = $4 WHERE budget_id = $5",
            [budget_month, budget_expenses_type, budget_particulars, budget_amount, id]
        );

        res.status(200).json({ msg: "Budget Detail updated Successfully", BudgetData: UpdateBudgetDetail.rows[0] });

    } catch (e) {

        console.error("Error updating budget details:", e);

        res.status(500).json({ msg: "Failed to update budget details" });

    }

};

// Delete Budget By Id
export const DeleteBudgetDetail = async (req, res) => {

    try {

        const { id } = req.params;

        await pool.query(
            "DELETE FROM budget_details WHERE budget_id = $1",
            [id]
        );

        res.status(200).json({ msg: "Budget Detail Deleted Successfully" });

    } catch (e) {

        console.error("Error deleting budget details:", e);

        res.status(500).json({ msg: "Failed to delete budget detail" });

    }

};





