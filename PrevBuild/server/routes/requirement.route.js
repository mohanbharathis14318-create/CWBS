// Import Modules
import { Router } from "express";

// Import Controller
import {
    Create_Expense_Request,
    fetchAllExpenseRequests,
    getExpenseRequestsByUser,
    approveTransaction,
    returnedTransaction,
    UpdateTransaction,
    DeleteTransaction,
    UpdateExpenseTransaction
} from '../controller/requirement.controller.js';

// Import Auth Middleware
import { protectRoute } from "../middleware/auth.middleware.js";

// Prop Variable
const router = Router();

// || Requirement Routes

// Create CIH Request Trxn
router.post('/create_transaction_request', protectRoute, Create_Expense_Request);

// Update Expense Transaction Reques
router.put('/update/expense/:id/transaction/request', protectRoute, UpdateExpenseTransaction);

//Fetch all req for MD
router.get('/get_all_trxn_requests', protectRoute, fetchAllExpenseRequests);

// Get all req by user
router.get('/get_all_trxn_requests/:user_name', protectRoute, getExpenseRequestsByUser);

// Update status --> Approved
router.put("/transactions/:id/approve", protectRoute, approveTransaction);

// Update status --> Returned
router.put("/transactions/:id/return", protectRoute, returnedTransaction);

// Pending and Denied Status
router.put('/update/:id/transaction', protectRoute, UpdateTransaction);

// Delete Transaction
router.delete('/delete/:id/transaction', protectRoute, DeleteTransaction)

export default router;