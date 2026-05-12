// Import Modules
import { Router } from "express";

// Import User Controller
import {
    Register_User,
    Login_User,
    Logout_User,
    User_Profile,
    GetUsers,
    CreateUser,
    GetUserById,
    UpdateUser,
    DeleteUser
} from '../controller/user.controller.js';

// Import Auth Middleware
import { protectRoute } from "../middleware/auth.middleware.js";

// Prop Variable
const router = Router();

// User Routes

// Register Route
router.post('/register', Register_User);

// Login Route
router.post('/login', Login_User);

// Logout Route
router.post('/logout', Logout_User);

// User Profile
router.get('/profile', protectRoute, User_Profile);

// For MD access of other users

// Get all Users
router.get('/users', protectRoute, GetUsers);

// Add New Users | Create a New Users
router.post('/create_user', protectRoute, CreateUser);

// Get user Data based on id
router.get('/get_user/:id', protectRoute, GetUserById);

// Update User
router.put('/update_user/:id', protectRoute, UpdateUser);

// Delete Users
router.delete('/delete_user/:id', protectRoute, DeleteUser);

// Export Router
export default router;