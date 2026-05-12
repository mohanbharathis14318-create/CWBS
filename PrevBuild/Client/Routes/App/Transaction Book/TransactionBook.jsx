// Import Modules
import { motion } from 'motion/react'
import {
    Building,
    Hourglass,
    PencilRuler,
    ArrowUpDown,
    ClockArrowUp,
    BanknoteArrowDown, HandCoins, CircleArrowLeft,
} from "lucide-react";
import { NavLink, useNavigate, Routes, Route } from "react-router-dom";

// Import Hooks

// Import Routes
import Cgr from "./CGR.jsx";
import CIHBoard from "./CIHBoard.jsx";
import TrxnDashboard from "./TrxnDashboard.jsx";
import OfficeAccountBoard from "./OfficeAccountBoard.jsx";
import UpdateAccountingOfficeInvestment from "../Accounting/OfficeAccount/UpdateAccountingOfficeInvestment.jsx";
import UpdateCashInHand from "../Accounting/Cash/UpdateCashInHand.jsx";



// Import Components


const TransactionBook = () => {

    const navigate = useNavigate();

    // VNav
    const VNav = [
        { name: 'Office A/C Board', icon: <PencilRuler />, path: '/app-area/transaction_book/office_account_board' },
        { name: 'Site A/C Board', icon: <Building />, path: '/app-area/transaction_book/site_account_board' },
        { name: 'Outstanding Payment Board', icon: <ClockArrowUp />, path: '/app-area/transaction_book/outstanding_payment_board' },
        { name: 'Cash In Hand Board', icon: <HandCoins />, path: '/app-area/transaction_book/CIH_board' },
        { name: 'Cash Given/Return Board', icon: <ArrowUpDown />, path: '/app-area/transaction_book/CGR_board' },
        { name: 'Supplier Outstanding Board', icon: <Hourglass />, path: '/app-area/transaction_book/supplier_outstanding_board' },
    ];

    return (
        <>

            <div className="flex justify-center items-center gap-2">
                <motion.div className="fixed bottom-2 flex gap-4 border border-[#8CAEE9] bg-[#F1F1F1] rounded p-4 z-50"
                            initial={{opacity: 0, y: 100}}
                            animate={{y: 0, opacity: 1}}
                            transition={{delay: 0.1}}
                >

                    {

                        VNav.map(({name, icon, path}, index) => {

                            const delay = 0.1 + index * 0.1

                            return (

                                <motion.div key={name} className="relative group"
                                            initial={{opacity: 0, y: 100}}
                                            animate={{y: 0, opacity: 1}}
                                            transition={{ delay, type: "spring", stiffness: 100 }}>

                                    <NavLink to={path}
                                             className={({isActive}) =>
                                                 `flex justify-center items-center text-xl text-[#005BEA] transition-all duration-200 ${
                                                     isActive
                                                         ? "bg-[#D9E1EF] border-[#8CAEE9] rotate-6 -translate-y-2"
                                                         : "bg-[#F1F1F1] border-transparent"
                                                 } drop-shadow-sm rounded border hover:border-[#8CAEE9] hover:bg-[#D9E1EF] hover:rotate-6 hover:-translate-y-2 p-2`
                                             }>
                                        <div>
                                            {icon}
                                        </div>
                                        <div
                                            className="fixed hidden group-hover:flex border border-[#6392E5] bg-[#D9E1EF] text-[#202020] text-sm rounded p-2 bottom-18 whitespace-nowrap">
                                            {name}
                                        </div>
                                    </NavLink>

                                </motion.div>

                            );

                        })

                    }

                    <div>
                        <motion.button initial={{ opacity: 0, y: 100 }}
                                       animate={{ y: 0, opacity: 1 }}
                                       transition={{ delay: 0.1 + VNav.length * 0.1 }}
                                       onClick={() => navigate("/app-area")}
                                       className="flex gap-2 justify-center items-center cursor-pointer text-[#005BEA] text-xl border border-[#6392E5] bg-[#D9E1EF] hover:bg-[#C9D8F3] p-2 rounded">
                            <CircleArrowLeft />
                            Back
                        </motion.button>
                    </div>

                </motion.div>
            </div>

            <div>

                <Routes>

                    {/*Dashboard*/}
                    <Route index element={<TrxnDashboard />} />

                    {/*Office A/C Board*/}
                    <Route path="office_account_board/*" element={<OfficeAccountBoard />} />
                    <Route path="office_account_board/update_investment/:id" element={<UpdateAccountingOfficeInvestment />} />

                    <Route path="CIH_board/*" element={<CIHBoard />} />
                    <Route path="CIH_board/update_cih_detail/:id" element={<UpdateCashInHand />} />

                    <Route path="CGR_board" element={<Cgr />} />

                </Routes>

            </div>

        </>
    );
};

export default TransactionBook;