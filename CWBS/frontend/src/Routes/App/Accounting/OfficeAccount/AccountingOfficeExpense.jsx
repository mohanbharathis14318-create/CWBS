// Import Modules
import { motion } from "motion/react";
import toast from "react-hot-toast";
import React, { useState, useEffect } from "react";
import {useNavigate, NavLink, Routes, Route, Navigate} from "react-router-dom";
import {
    BadgeIndianRupee,
    BanknoteArrowDown,
    ChartPie,
    Clock,
    IndianRupee,
    ListCheck,
    PencilRuler,
    Send,
    TrendingUp
} from "lucide-react";

// Import Hooks
import { useBudget } from "../../../../Hooks/useBudget.js";
import { useOfficeAccount } from "../../../../Hooks/useTransaction.js";

// Import Components
import Status from "./Expense/Status.jsx";
import Loading_Screen from "../../../../components/Loading_Screen.jsx";
import ExpenseTrxn from "./Expense/ExpenseTrxn.jsx";

function AccountingOfficeExpense() {

    return (
        <>
            <div className="h-full">

                <motion.div initial={{ opacity: 0, y: 100 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.8, type: 'spring', stiffness: 100 }}
                            className="grid gap-4 border border-[#8CAEE9] bg-[#F1F1F1] rounded p-2 my-4">

                    <div className="flex gap-4 items-center">
                        <motion.div initial={{ opacity: 0, y: 100 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.10, type: 'spring', stiffness: 100 }}
                                    className="bg-[#D9E1EF] text-[#005BEA] rounded p-4">
                            <BanknoteArrowDown />
                        </motion.div>

                        <motion.div initial={{ opacity: 0, y: 100 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.12, type: 'spring', stiffness: 100 }} >
                            <p className="head text-xl text-[#005BEA]">
                                Office Expense
                            </p>

                            <p>
                                Creat a expense request or Track the status of your submitted expense requests
                            </p>
                        </motion.div>
                    </div>
                </motion.div>

                {/*Accounting Office Expenses*/}
                <section>
                    <motion.div initial={{ opacity: 0, y: 100 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ type: 'spring', stiffness: 100 }}
                                className="grid gap-2 border border-[#8CAEE9] my-4 rounded p-4">
                        <div className="flex gap-2 justify-center items-center">
                            <NavLink to="/app-area/accounting/office_account/expenses_account/expense_status"
                                     className={({ isActive }) => isActive ? "flex gap-2 justify-center items-center text-[#005BEA] bg-[#C9D8F3] rounded-full px-6 py-2" : "flex gap-2 justify-center items-center text-[#202020] bg-[#D9E1EF] hover:bg-[#C9D8F3] rounded-full px-6 py-2"}>
                                <Clock />
                                Status
                            </NavLink>

                            <NavLink to="/app-area/accounting/office_account/expenses_account/expense_transaction"
                                     className={({ isActive }) => isActive ? "flex gap-2 justify-center items-center text-[#005BEA] bg-[#C9D8F3] rounded-full px-6 py-2" : "flex gap-2 justify-center items-center text-[#202020] bg-[#D9E1EF] hover:bg-[#C9D8F3] rounded-full px-6 py-2"}>
                                <BadgeIndianRupee />
                                Transaction
                            </NavLink>
                        </div>

                        <motion.div initial={{ opacity: 0, y: 100 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.4, type: 'spring', stiffness: 100 }}
                                    className="border border-[#6392E5] roundedp-4 p-4">

                            <Routes>
                                <Route index element={ <Navigate to="expense_status" /> } replace/>
                                <Route path="/expense_status" element={ <Status /> } />
                                <Route path="/expense_transaction" element={ <ExpenseTrxn /> } />
                            </Routes>

                        </motion.div>

                    </motion.div>
                </section>
            </div>
        </>
    )

}

export default AccountingOfficeExpense;