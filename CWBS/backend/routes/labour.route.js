// Import Modules
import { Router } from 'express';

// Import Labour Controller
import {
    AddLabour,
    FetchLabourData,
    DeleteLabour

} from '../controller/labour.controller.js';

//Import Auth Middleware
import { protectRoute } from '../middleware/auth.middleware.js';

// Prop Variable
const router = Router();

// Add Labour Details
router.post("/add_labour", protectRoute, AddLabour);

// Fetch Labour Data
router.get("/fetch_labour/data", protectRoute, FetchLabourData);

// Delete Labour Data
router.delete("/delete/:id/labour", protectRoute, DeleteLabour);


export default router;

