// Import Modules
import {motion} from "motion/react";
import { NavLink, Route, Routes } from "react-router-dom";
import { BadgeIndianRupee, BanknoteArrowDown } from "lucide-react";

// Import Components
import AccountingOfficeInvestment from "./AccountingOfficeInvestment.jsx";
import AccountingOfficeExpense from "./AccountingOfficeExpense.jsx";


const OfficeAccount = () => {
    return (
        <div className="py-4">
            <div className="grid md:flex lg:flex xl:flex gap-2">
                <motion.div  className="grid" initial={{ opacity: 0, y: 100 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{delay: 0.1 }}>
                    <NavLink to="/app-area/accounting/office_account/investment_account"
                             className={({ isActive }) => isActive ? "flex gap-2 justify-center items-center text-xl text-[#005BEA] border border-[#6392E5] bg-[#C9D8F3] rounded px-6 py-2" : "flex gap-2 justify-center items-center text-xl text-[#005BEA] border border-[#6392E5] bg-[#D9E1EF] hover:bg-[#C9D8F3] px-6 py-2 rounded"}>
                        <BadgeIndianRupee />
                        Office Investment
                    </NavLink>
                </motion.div>

                <motion.div  className="grid" initial={{ opacity: 0, y: 100 }}
                             animate={{ y: 0, opacity: 1 }}
                             transition={{delay: 0.2 }}>
                    <NavLink to="/app-area/accounting/office_account/expenses_account"
                             className={({ isActive }) => isActive ? "flex gap-2 justify-center items-center text-xl text-[#005BEA] border border-[#6392E5] bg-[#C9D8F3] rounded px-6 py-2" : "flex gap-2 justify-center items-center text-xl text-[#005BEA] border border-[#6392E5] bg-[#D9E1EF] hover:bg-[#C9D8F3] px-6 py-2 rounded"}>
                        <BanknoteArrowDown />
                        Office Expenses
                    </NavLink>
                </motion.div>
            </div>

            <div>
                <Routes>
                    <Route path="/investment_account" element={<AccountingOfficeInvestment />} />
                    <Route path="/expenses_account" element={<AccountingOfficeExpense />} />
                </Routes>
            </div>
        </div>
    );
};

export default OfficeAccount;