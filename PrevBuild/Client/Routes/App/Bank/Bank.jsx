// Import Modules
import { motion } from "motion/react";
import { CircleArrowLeft, Library, Blocks } from "lucide-react";
import {NavLink, Routes, Route, useNavigate, Navigate} from "react-router-dom";

// Import Routes
import AddBank from "./AddBank.jsx";
import BankBoard from "./BankBoard.jsx";

const Bank = () => {

    const navigate = useNavigate();

    return (
        <div>
            <div className="grid md:flex lg:flex xl:flex gap-2 justify-between">
                <div className="flex gap-2">
                    <motion.div className="flex" initial={{ opacity: 0, y: 100 }}
                               animate={{ y: 0, opacity: 1 }}
                               transition={{delay: 0.1 }}>
                        <NavLink to="/app-area/bank/bank_board"
                                 className={({ isActive }) => isActive ? "flex gap-2 justify-center items-center text-xl text-[#005BEA] border border-[#6392E5] bg-[#C9D8F3] rounded px-6 py-2" : "flex gap-2 justify-center items-center text-xl text-[#005BEA] border border-[#6392E5] bg-[#D9E1EF] hover:bg-[#C9D8F3] px-6 py-2 rounded"}>
                            <Library />
                            Bank Board
                        </NavLink>
                    </motion.div>


                    <motion.div className="flex" initial={{ opacity: 0, y: 100 }}
                               animate={{ y: 0, opacity: 1 }}
                               transition={{delay: 0.2 }}>
                        <NavLink to="/app-area/bank/add_bank"
                                 className={({ isActive }) => isActive ? "flex gap-2 justify-center items-center text-xl text-[#005BEA] border border-[#6392E5] bg-[#C9D8F3] rounded px-6 py-2" : "flex gap-2 justify-center items-center text-xl text-[#005BEA] border border-[#6392E5] bg-[#D9E1EF] hover:bg-[#C9D8F3] px-6 py-2 rounded"}>
                            <Blocks />
                            Add Bank
                        </NavLink>
                    </motion.div>

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
                    <Route index element={<Navigate to="/app-area/bank/bank_board" />} />
                    <Route path="bank_board" element={<BankBoard />} />
                    <Route path="add_bank" element={<AddBank />} />
                </Routes>
            </div>

        </div>
    );
};

export default Bank;