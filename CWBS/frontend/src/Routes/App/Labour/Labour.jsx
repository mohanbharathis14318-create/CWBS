// Import Modules
import { motion } from "motion/react";
import React from 'react';
import {
    CircleArrowLeft,
    PackagePlus,
    LayoutList
} from "lucide-react";
import {Navigate, NavLink, Route, Routes, useNavigate} from "react-router-dom";



// Import Routes
import LabourBoard from "./LabourBoard.jsx";
import AddLabour from "./AddLabour.jsx";


const Labour = () => {

    const navigate = useNavigate();

    return (
        <div>
           <section>
               <div className="grid md:flex lg:flex xl:flex gap-2 justify-between">
                   <div className="flex gap-2">
                       <NavLink
                           to="/app-area/labour/labour_board"
                           className={({ isActive }) => isActive ? "flex gap-2 justify-center items-center text-xl text-[#005BEA] border border-[#6392E5] bg-[#C9D8F3] rounded px-6 py-2" : "flex gap-2 justify-center items-center text-xl text-[#005BEA] border border-[#6392E5] bg-[#D9E1EF] hover:bg-[#C9D8F3] px-6 py-2 rounded"}>
                           <LayoutList />
                           Labour Board
                       </NavLink>

                       <NavLink to="/app-area/labour/addlabour"
                                className={({ isActive }) => isActive ? "flex gap-2 justify-center items-center text-xl text-[#005BEA] border border-[#6392E5] bg-[#C9D8F3] rounded px-6 py-2" : "flex gap-2 justify-center items-center text-xl text-[#005BEA] border border-[#6392E5] bg-[#D9E1EF] hover:bg-[#C9D8F3] px-6 py-2 rounded"}>
                           <PackagePlus />
                           Add New Labour
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
           </section>


            <div className="py-4">

                <Routes>
                    <Route index element={<Navigate to="labour_board" /> } />
                    <Route path="labour_board" element={<LabourBoard />} />
                    <Route path="addlabour" element={<AddLabour />} />
                </Routes>

            </div>
        </div>
    );
};

export default Labour;