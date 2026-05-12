// Import Modules
import { Router } from "express";

// Import User Controller
import {
    CreateSupplier,
    GetSupplier,
    GetSupplierDetailsById,
    UpdateSupplierDetails,
    DeleteSupplierDetails
} from "../controller/supplier.controller.js";

// Import Auth Middleware
import { protectRoute } from "../middleware/auth.middleware.js";

const router = Router();


// Supplier Routes

// Create New Suppliers
router.post('/create_supplier', protectRoute, CreateSupplier);

// Fetch Supplier Data
router.get('/get_supplier', protectRoute, GetSupplier);

// Get Supplier based on id
router.get("/get_supplier_details/:id", protectRoute, GetSupplierDetailsById);

// Update Supplier Details based on id
router.put("/update_supplier_details/:id", protectRoute, UpdateSupplierDetails);

// Delete Supplier based on id
router.delete("/delete_supplier_detail/:id", protectRoute, DeleteSupplierDetails);


export default router;