// Import Modules
import {Link} from "react-router-dom";
import { motion } from 'motion/react'
import {
    Send,
    Truck,
    Users,
    Kanban,
    Percent,
    Pickaxe,
    Landmark,
    WalletIcon,
    ClipboardList,
    ArrowLeftRight,
    LayoutDashboard,
} from "lucide-react";

// Property holds the details of app list
const apps = [
    //{ name: "Dashboard", icon: <LayoutDashboard />, path: "/app-area/dashboard" },
    { name: "Accounting", icon: <Percent />, path: "/app-area/accounting" },
    { name: "Users", icon: <Users />, path: "/app-area/user-management" },
    { name: "Project", icon: <Kanban />, path: "/app-area/project" },
   // { name: "Report", icon: <ClipboardList />, path: "/app-area/report" },
    // { name: "Requirements", icon: <Send />, path: "/app-area/requirements" },
    //{ name: "Transaction Book", icon: <ArrowLeftRight />, path: "/app-area/transaction_book" },
   // { name: "Suppliers", icon: <Truck />, path: "/app-area/suppliers" },
    { name: "Budgets", icon: <WalletIcon />, path: "/app-area/budgets" },
    { name: "Bank", icon: <Landmark />, path: "/app-area/bank" },
    // { name: "Labour", icon: <Pickaxe />, path: "/app-area/labour" },
];

// Role other than MD should only see a limited list
const limitApps = [
    "Dashboard",
    "Accounting",
    "Project",
    "Reports",
    "Requirements",
    "Transaction Book",
    "Bank"
];

const AppViewList = ({ role }) => {

    const visibleApps = role === "MD" ? apps : apps.filter(app => limitApps.includes(app.name));

    return (
        <div className="p-10">
            <section className="h-screen md:h-0 lg:h-0 xl:h-0 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 justify-center items-center">

                {
                    visibleApps.map((app, idx) => (

                        <div key={idx} className="flex justify-center items-center">
                            <Link to={ app.path }
                                  className="flex flex-col justify-center items-center text-xl text-[#005BEA]">
                                <motion.div initial={{ opacity: 0, y: 100 }}
                                     animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }} className="bg-[#F1F1F1] drop-shadow-xl px-8 py-8 rounded border border-transparent hover:border-[#8CAEE9] hover:bg-[#D9E1EF] hover:-translate-y-4 mb-4 transition-all duration-200">
                                    { app.icon }
                                </motion.div>
                                <motion.div initial={{ opacity: 0, y: -100 }}
                                            animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.6 }}>
                                    { app.name }
                                </motion.div>
                            </Link>
                        </div>

                    ))
                }

            </section>
        </div>
    );
};

export default AppViewList;