// Import Modules
import {useEffect} from "react";
import {Routes, Route, useLocation} from "react-router-dom";

// Import Hooks
import { useUser } from "../../Hooks/useUser.js";

// Import Routes

// Import Components
import Profile from "../../components/Profile.jsx";
import Loading_Screen from "../../components/Loading_Screen.jsx";

// || Import Routes

// App View List Main Renderer
import AppViewList from "./AppViewList.jsx";
import ProfilePage from "../ProfilePage.jsx";

// Apps List
import Bank from "./Bank/Bank.jsx";
import Budget from "./Budget/Budget.jsx";
import Labour from "./Labour/Labour.jsx";
import Suppliers from "./Supplier/Suppliers.jsx";
import ProjectArea from "./Project/ProjectArea.jsx";
import Accounting from "./Accounting/Accounting.jsx";
import UserManagement from "./User/UserManagement.jsx";
import Requirements from "./Requirement/Requirements.jsx";
import TransactionBook from "./Transaction Book/TransactionBook.jsx";

// Add New User Route
import CreateNewUser from "../../components/CreateNewUser.jsx";

// Edit Routes
import EditBank from './Bank/EditBank.jsx'
import EditBudget from "./Budget/EditBudget.jsx";
import EditSupplier from "./Supplier/EditSupplier.jsx";
import UpdateUser from "../../components/UpdateUser.jsx";

const appTitles = {
    home: "Choose Your Way",
    dashboard: "Dashboard",
    accounting: "Accounting",
    "user-management": "User Management",
    project: "Project",
    report: "Report",
    requirements: "Requirements",
    transaction_book: "Transaction Book",
    suppliers: "Suppliers",
    budgets: "Budgets",
    profile_page: "User Profile",
    bank: "Bank Details",
    labour: "Labour Profile",
};



const AppArea = () => {

    const { fetchAllUsers, user, userList} = useUser();

    const location = useLocation();

    useEffect(() => {

        fetchAllUsers();

    }, [fetchAllUsers]);


    if (!user) return <Loading_Screen />;

    const path_Segment = location.pathname.split("/")[2] || "home";

    console.log(path_Segment);

    const currentTitle = appTitles[path_Segment] || "Choose Your Way";

    console.log(currentTitle);

    return (
        <div>
            <section className="h-full md:h-full lg:h-full xl:h-full justify-center items-center mx-10 my-2">

                <Profile letter={user.user[0]} name={user.user} designation={user.role} appTitle={currentTitle} />

                <div className="my-6">
                    <Routes>
                        <Route path='/profile_page' element={<ProfilePage username={user.user} email={user.email} phone={user.phone} designation={user.role} />} />
                        <Route path='' element={<AppViewList role={user.role} />} />

                        {/*App Routes*/}

                        {/*User Management*/}
                        <Route path='/user-management/*' element={<UserManagement userList={userList} />} />
                        <Route path='/user-management/create-user' element={<CreateNewUser />}  />
                        <Route path='/user-management/update-user/:id' element={<UpdateUser />}  />

                        {/*Accounting*/}
                        <Route path="/accounting/*" element={<Accounting />} />

                        {/*Transaction Books*/}
                        <Route path="/transaction_book/*" element={<TransactionBook/>} />

                        {/*Suppliers*/}
                        <Route path="/suppliers/*" element={<Suppliers />} />
                        <Route path="/suppliers/update_supplier_detail/:id" element={<EditSupplier />} />

                        {/*Project*/}
                        <Route path="/project/*" element={<ProjectArea />} />

                        {/*Budget*/}
                        <Route path="/budgets/*" element={<Budget />} />
                        <Route path="/budgets/update_budget_detail/:id" element={<EditBudget />} />

                        {/*Bank*/}
                        <Route path="/bank/*" element={<Bank />} />
                        <Route path="/bank/update_bank_details/:id" element={<EditBank />} />

                        {/*Labour Profile*/}
                        <Route path="/labour/*" element={<Labour />} />

                        {/* Requirements */}
                        <Route path="/requirements/*" element={<Requirements />} />




                    </Routes>
                </div>
            </section>
        </div>
    );
};

export default AppArea;