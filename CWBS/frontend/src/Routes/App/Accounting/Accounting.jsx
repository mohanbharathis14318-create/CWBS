// Import Modules
import {
    Building,
    PencilRuler,
    ClockArrowUp,
    HandCoins,
    Hourglass,
    ArrowUpDown
} from "lucide-react";
import {NavLink, Routes, Route, Navigate} from "react-router-dom";

// Import Routes
import OfficeAccount from "./OfficeAccount/OfficeAccount.jsx";
import SiteAccount from "./SiteAccount/SiteAccount.jsx";
import CashInHand from "./Cash/CashInHand.jsx";
import CashGivenReturn from "./CashGivenReturn/CashGivenReturn.jsx";

const Accounting = () => {
    return (
        <div>

            <div className="tabs grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-6">
                <NavLink to="/app-area/accounting/office_account"
                         className={({ isActive }) => isActive ? "flex gap-2 justify-center items-center text-[#005BEA] border-b-2 border-[#6392E5] bg-[#C9D8F3] px-6 py-2" : "flex gap-2 justify-center items-center text-[#202020] border-b-2 border-[#6392E5] hover:bg-[#C9D8F3] px-6 py-2"}>
                    <PencilRuler />
                    Office A/C
                </NavLink>

                <NavLink to="/app-area/accounting/site_account"
                         className={({ isActive }) => isActive ? "flex gap-2 justify-center items-center text-[#005BEA] border-b-2 border-[#6392E5] bg-[#C9D8F3] px-6 py-2" : "flex gap-2 justify-center items-center text-[#202020] border-b-2 border-[#6392E5] hover:bg-[#C9D8F3] px-6 py-2"}>
                    <Building />
                    Site A/C
                </NavLink>

                <NavLink to="/app-area/accounting/outstanding_payment"
                         className={({ isActive }) => isActive ? "flex gap-2 justify-center items-center text-[#005BEA] border-b-2 border-[#6392E5] bg-[#C9D8F3] px-6 py-2" : "flex gap-2 justify-center items-center text-[#202020] border-b-2 border-[#6392E5] hover:bg-[#C9D8F3] px-6 py-2"}>
                    <ClockArrowUp />
                    Outstanding Payment
                </NavLink>

                <NavLink to="/app-area/accounting/cash_account"
                         className={({ isActive }) => isActive ? "flex gap-2 justify-center items-center text-[#005BEA] border-b-2 border-[#6392E5] bg-[#C9D8F3] px-6 py-2" : "flex gap-2 justify-center items-center text-[#202020] border-b-2 border-[#6392E5] hover:bg-[#C9D8F3] px-6 py-2"}>
                    <HandCoins />
                    Cash in Hands
                </NavLink>

                <NavLink to="/app-area/accounting/cashgiven_account"
                         className={({ isActive }) => isActive ? "flex gap-2 justify-center items-center text-[#005BEA] border-b-2 border-[#6392E5] bg-[#C9D8F3] px-6 py-2" : "flex gap-2 justify-center items-center text-[#202020] border-b-2 border-[#6392E5] hover:bg-[#C9D8F3] px-6 py-2"}>
                    <ArrowUpDown />
                    Cash Given/Return
                </NavLink>

                <NavLink to="/app-area/accounting/supplier_oustanding"
                         className={({ isActive }) => isActive ? "flex gap-2 justify-center items-center text-[#005BEA] border-b-2 border-[#6392E5] bg-[#C9D8F3] px-6 py-2" : "flex gap-2 justify-center items-center text-[#202020] border-b-2 border-[#6392E5] hover:bg-[#C9D8F3] px-6 py-2"}>
                    <Hourglass />
                    Supplier outstanding
                </NavLink>

            </div>

            <section>
                <Routes>
                    <Route index element={<Navigate to="office_account" />} />
                    <Route path="office_account/*" element={<OfficeAccount />} />
                    <Route path="site_account/*" element={<SiteAccount />} />
                    <Route path="cash_account/*" element={<CashInHand />} />
                    <Route path="cashgiven_account/*" element={<CashGivenReturn />} />
                </Routes>
            </section>

        </div>
    );
};

export default Accounting;