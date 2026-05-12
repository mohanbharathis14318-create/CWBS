import React from 'react';
import { NavLink, Route, Routes } from "react-router-dom";
import {BadgeIndianRupee, BanknoteArrowDown, Library} from "lucide-react";
import AccountingSiteIncome from "./AccountingSiteIncome.jsx";
import AccountingSiteExpense from "./AccountingSiteExpense.jsx";
import {motion} from "motion/react";

const SiteAccount = () => {
    return (
        <div className="py-4">
            <div className="grid md:flex lg:flex xl:flex gap-2">
                <motion.div className="grid" initial={{ opacity: 0, y: 100 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{delay: 0.1 }}>
                    <NavLink to="/app-area/accounting/site_account/site_income"
                             className={({ isActive }) => isActive ? "flex gap-2 justify-center items-center text-xl text-[#005BEA] border border-[#6392E5] bg-[#C9D8F3] rounded px-6 py-2" : "flex gap-2 justify-center items-center text-xl text-[#005BEA] border border-[#6392E5] bg-[#D9E1EF] hover:bg-[#C9D8F3] px-6 py-2 rounded"}>
                        <BadgeIndianRupee />
                        Site Income
                    </NavLink>
                </motion.div>


                <motion.div className="grid" initial={{ opacity: 0, y: 100 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{delay: 0.2 }}>
                    <NavLink to="/app-area/accounting/site_account/site_expense"
                             className={({ isActive }) => isActive ? "flex gap-2 justify-center items-center text-xl text-[#005BEA] border border-[#6392E5] bg-[#C9D8F3] rounded px-6 py-2" : "flex gap-2 justify-center items-center text-xl text-[#005BEA] border border-[#6392E5] bg-[#D9E1EF] hover:bg-[#C9D8F3] px-6 py-2 rounded"}>
                        <BanknoteArrowDown />
                        Site Expenses
                    </NavLink>
                </motion.div>

            </div>

            <div>
                <Routes>
                    <Route path="/site_income" element={<AccountingSiteIncome />} />
                    <Route path="/site_expense" element={<AccountingSiteExpense/>} />
                </Routes>
            </div>
        </div>
    );
};

export default SiteAccount;