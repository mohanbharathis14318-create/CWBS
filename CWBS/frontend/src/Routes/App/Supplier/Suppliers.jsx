// Import Modules
import { motion } from "motion/react";
import {
    CircleArrowLeft,
    PackagePlus,
    LayoutList
} from "lucide-react";
import { Routes, Route, NavLink, useNavigate, Navigate } from "react-router-dom";

// Import Routes
import NewSupplier from "./NewSupplier.jsx";
import SupplierBoard from "./SupplierBoard.jsx";

// Import Components

const Suppliers = () => {

    const navigate = useNavigate();

    return (
        <div>

            <div className="grid md:flex lg:flex xl:flex gap-2 justify-between">
                <div className="flex gap-2">
                    <NavLink to="/app-area/suppliers/suppliers_board"
                             className={({ isActive }) => isActive ? "flex gap-2 justify-center items-center text-xl text-[#005BEA] border border-[#6392E5] bg-[#C9D8F3] rounded px-6 py-2" : "flex gap-2 justify-center items-center text-xl text-[#005BEA] border border-[#6392E5] bg-[#D9E1EF] hover:bg-[#C9D8F3] px-6 py-2 rounded"}>
                        <LayoutList />
                        Supplier Board
                    </NavLink>

                    <NavLink to="/app-area/suppliers/add_new_suppliers"
                             className={({ isActive }) => isActive ? "flex gap-2 justify-center items-center text-xl text-[#005BEA] border border-[#6392E5] bg-[#C9D8F3] rounded px-6 py-2" : "flex gap-2 justify-center items-center text-xl text-[#005BEA] border border-[#6392E5] bg-[#D9E1EF] hover:bg-[#C9D8F3] px-6 py-2 rounded"}>
                        <PackagePlus />
                        Add New Supplier
                    </NavLink>
                </div>

                <motion.button initial={{ opacity: 0, y: 100 }}
                               animate={{ y: 0, opacity: 1 }}
                               transition={{delay: 0.3 }}
                               onClick={() => navigate("/app-area")}
                               className="flex gap-2 justify-center items-center text-[#005BEA]  text-xl border border-[#6392E5] bg-[#D9E1EF] hover:bg-[#C9D8F3] p-4 rounded">
                    <CircleArrowLeft />
                    Back
                </motion.button>
            </div>

            <div className="py-4">

                <Routes>
                    <Route index element={<Navigate to="suppliers_board" /> } />
                    <Route path="suppliers_board" element={<SupplierBoard />} />
                    <Route path="add_new_suppliers" element={<NewSupplier />} />
                </Routes>

            </div>

        </div>
    );
};

export default Suppliers;