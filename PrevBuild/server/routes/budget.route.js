// Import Modules
import { Router } from 'express';

// Import Budget Controller
import {
    AddBudget,
    GetBudgetDetails,
    GetBudgetById,
    UpdateBudgetDetail,
    DeleteBudgetDetail,
} from "../controller/budget.controller.js"

//Import Auth Middleware
import { protectRoute } from '../middleware/auth.middleware.js';

// Prop Variable
const router = Router();

// Add Budget Details
router.post("/add_budget_details", protectRoute, AddBudget);

// Fetch Budget Details Data
router.get("/get_budget_details", protectRoute, GetBudgetDetails);

// Get Budget Data by Id
router.get('/get_budget_detail/:id', protectRoute, GetBudgetById)

// Update Budget Detail
router.put("/update_budget_detail/:id", protectRoute, UpdateBudgetDetail);

// Delete Budget Detail
router.delete("/delete_budget_detail/:id", protectRoute, DeleteBudgetDetail);

export default router;