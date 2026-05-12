// Import Modules
import { Router } from 'express';

// Import Project Controller
import {
    AddProject,
    GetProjectDetails,
    GetProjectById,
    UpdateStatus, DeleteProjectDetail, UpdateProjectDetail
} from "../controller/project.controller.js";

//Import Auth Middleware
import { protectRoute } from '../middleware/auth.middleware.js';

// Prop Variable
const router = Router();

// Add Project Details
router.post("/add_project", protectRoute, AddProject);

// Fetch Project Details Data
router.get("/get_project_details", protectRoute, GetProjectDetails);

// Get Project Data By Id
router.get("/get_project/:id", protectRoute, GetProjectById);

// Add Project to Ongoing
router.put("/update_status/:id", protectRoute, UpdateStatus);

// Delete Project Detail
router.delete("/delete_project_detail/:id", protectRoute, DeleteProjectDetail);

// Update Project Detail
router.put("/update_project/:id", protectRoute, UpdateProjectDetail);

export default router;