// Import Modules
import { Router } from "express";

// Import User Controller
import {
    AddBank,
    GetBankDetails,
    GetBankDetailsById,
    UpdateBankDetails,
    DeleteBankDetails,
} from "../controller/bank.controller.js";

// Import Auth Middleware
import { protectRoute } from "../middleware/auth.middleware.js";

// Prop Variable
const router = Router();

// Bank Details Routes

// Add Bank Details
router.post("/add_bank_details", protectRoute, AddBank);

// Fetch Bank Details Data
router.get("/get_bank_details", protectRoute, GetBankDetails);

// Get Bank details based on id
router.get("/get_bank_details/:id", protectRoute, GetBankDetailsById);

// Update Bank Details based on id
router.put("/update_bank_details/:id", protectRoute, UpdateBankDetails);

// Delete Bank details based on id
router.delete("/delete_bank_details/:id", protectRoute, DeleteBankDetails);

export default router;