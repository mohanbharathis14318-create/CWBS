// Import Modules
import { Router } from "express";

// Import Controller

// Import Office Investment Controllers
import {
    CreatOfficeInvestment,
    FetchOfficeInvestment,
    GetACIDataById,
    UpdateOfficeInvestment,
    DeleteOfficeInvestment,
} from "../controller/Accounting.controller.js"

// Import Office Expenses
import {
    CreateOfficeExpenseReq,
    FetchOfficeExpenseReq,
    StatusChangesByMD,
    EditExpReq,
    DeleteExpReq
} from "../controller/Accounting.controller.js";

// Import CIH Controllers
import {
    AddCashInHand,
    GetCashInHandDetails,
    GetCashInHandById,
    UpdateCashInHandDetails,
    DeleteCashInHandDetails,
} from "../controller/Accounting.controller.js";

// Import Auth Middleware
import { protectRoute } from "../middleware/auth.middleware.js";

// Prop Variable
const router = Router();

// || Office Account

// || Office Investment

// Create Office Investment
router.post("/create_office_investment", protectRoute, CreatOfficeInvestment);

// Fetch Office Investment Data
router.get('/get_account_office_investment', protectRoute, FetchOfficeInvestment);

// Get Office Investment By Id
router.get('/get_office_investment/:id', protectRoute, GetACIDataById);

// Update Office Investment
router.put('/update_office_investment/:id', protectRoute, UpdateOfficeInvestment);

// Delete Office Investment
router.delete('/delete_office_investment/:id', protectRoute, DeleteOfficeInvestment)


// || Office Expenses

// Create Office Expenses
router.post('/create_office_expense/request', protectRoute, CreateOfficeExpenseReq);

// Fetch Office Expense request
router.get('/get_office_expenses/request', protectRoute, FetchOfficeExpenseReq);

// Update the Status of the request
router.put('/office/expense_request/:id/status_change', protectRoute, StatusChangesByMD);

// Edit Expense Request
router.put('/office/expense_req/:id/update', protectRoute, EditExpReq)

// Delete Expense request
router.delete('/delete/:id/expense_request', protectRoute, DeleteExpReq);



// || Cash In Hand

// Add Cash In Hand Details
router.post("/add_cih_details", protectRoute, AddCashInHand);

// Fetch Cash In Hand Details Data
router.get("/get_cih_details", protectRoute, GetCashInHandDetails);

// Get Cash In Hand details based on id
router.get("/get_cih_details/:id", protectRoute, GetCashInHandById);

// Update Cash In Hand Details based on id
router.put("/update_cih_details/:id", protectRoute, UpdateCashInHandDetails);

// Delete Cash In Hand details based on id
router.delete("/delete_cih_details/:id", protectRoute, DeleteCashInHandDetails);


export default router;