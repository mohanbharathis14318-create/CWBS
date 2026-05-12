// Import Modules
import { motion } from "motion/react";
import { Navigate, NavLink, Route, Routes, useNavigate } from "react-router-dom";
import { BadgeIndianRupee, BanknoteArrowDown, CircleArrowLeft } from "lucide-react";

// Import Components
import OfficeExpense from "../../../components/OfficeAccountBoard/OfficeExpense.jsx";
import OfficeInvestment from "../../../components/OfficeAccountBoard/OfficeInvestment.jsx";

const OfficeAccountBoard = () => {

    const navigate = useNavigate();

    return (
        <div>
            <div className="flex items-center justify-between gap-4">
                <div className="flex gap-2">
                    <motion.div  className="grid" initial={{ opacity: 0, y: 100 }}
                                 animate={{ y: 0, opacity: 1 }}
                                 transition={{delay: 0.1 }}>
                        <NavLink to="/app-area/transaction_book/office_account_board/office_investment_board"
                                 className={({ isActive }) => isActive ? "flex gap-2 justify-center items-center text-xl text-[#005BEA] border border-[#6392E5] bg-[#C9D8F3] rounded p-4" : "flex gap-2 justify-center items-center text-xl text-[#005BEA] border border-[#6392E5] bg-[#D9E1EF] hover:bg-[#C9D8F3] p-4 rounded"}>
                            <BadgeIndianRupee />
                            <span className="hidden md:hidden lg:block xl:block">Office Investment Board</span>
                        </NavLink>
                    </motion.div>

                    <motion.div  className="grid" initial={{ opacity: 0, y: 100 }}
                                 animate={{ y: 0, opacity: 1 }}
                                 transition={{delay: 0.2 }}>
                        <NavLink to="/app-area/transaction_book/office_account_board/office_expense_board"
                                 className={({ isActive }) => isActive ? "flex gap-2 justify-center items-center text-xl text-[#005BEA] border border-[#6392E5] bg-[#C9D8F3] rounded px-6 py-2" : "flex gap-2 justify-center items-center text-xl text-[#005BEA] border border-[#6392E5] bg-[#D9E1EF] hover:bg-[#C9D8F3] px-6 py-2 rounded"}>
                            <BanknoteArrowDown />
                            <span className="hidden md:hidden lg:block xl:block">Office Expenses Board</span>
                        </NavLink>
                    </motion.div>

                </div>
                <motion.button initial={{ opacity: 0, y: 100 }}
                               animate={{ y: 0, opacity: 1 }}
                               transition={{delay: 0.3 }}
                               onClick={() => navigate("/app-area/transaction_book")}
                               className="flex gap-2 justify-center items-center text-[#005BEA] cursor-pointer text-xl border border-[#6392E5] bg-[#D9E1EF] hover:bg-[#C9D8F3] p-4 rounded">
                    <CircleArrowLeft />
                    <span className="hidden md:hidden lg:block xl:block">Back</span>
                </motion.button>
            </div>



            <div className="py-4">
                <Routes>
                    {/*Office Investment Board*/}
                    <Route index element={<Navigate to='office_investment_board' />} />
                    <Route path="office_investment_board" element={<OfficeInvestment />} />

                    {/*Office Expenses Board*/}
                    <Route path="office_expense_board" element={<OfficeExpense />} />

                </Routes>
            </div>

        </div>
    );
};

export default OfficeAccountBoard;