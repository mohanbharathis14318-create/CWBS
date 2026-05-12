// Import Modules
import {useCallback, useMemo} from "react";
import  { AgGridReact } from "ag-grid-react";
import { motion } from "motion/react";
import { Link, useNavigate } from "react-router-dom";
import { CircleArrowLeft, UserPlus, SquarePen, Trash } from 'lucide-react'
import { AllCommunityModule, ModuleRegistry, themeQuartz } from 'ag-grid-community';

// Import Hooks
import { useUser } from "../../../Hooks/useUser.js";

// Import Assets

// Import Routes

// Import Components

// Register all Community features
ModuleRegistry.registerModules([AllCommunityModule]);

// Setting Theme for Grid
const Theme = themeQuartz
    .withParams({
        accentColor: "#005BEA",
        backgroundColor: "#F1F1F1",
        borderColor: "#6392E5",
        browserColorScheme: "light",
        foregroundColor: "#202020",
        headerBackgroundColor: "#D9E1EF",
        headerFontSize: 14,
        headerTextColor: "#005BEA",
    });

const UserManagement = ({ userList }) => {

    // User Hooks
    const { deleteUser } = useUser();

    const navigate = useNavigate();

    // Edit and Delete Btn
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const ActionBtn = params => {

        const user_id = params.data.user_id;

        // console.log(user_id);

        // Delete User
        const HandleDeleteUser = useCallback(() => {

            const deleteSuccess = deleteUser(user_id);

            if (deleteSuccess) return navigate(0)

        }, [user_id])

        return (
            <div className="flex gap-4 items-center">
                <div>
                    <Link to={`/app-area/user-management/update-user/${user_id}`} className="flex gap-2 justify-center items-center text-[#005BEA] rounded cursor-pointer">
                        <SquarePen />
                        Edit
                    </Link>
                </div>
                <button onClick={HandleDeleteUser} className="flex gap-2 justify-center items-center text-[#005BEA] rounded cursor-pointer">
                    <Trash />
                    Delete
                </button>
            </div>
        );

    };


    const columnDefs = useMemo(() => [
        { headerName: "ID", field: "user_id", sortable: true, filter: true },
        { headerName: "Name", field: "full_name", sortable: true, filter: true },
        { headerName: "Email", field: "user_email", sortable: true, filter: true },
        { headerName: "Phone", field: "phone", sortable: true, filter: true },
        { headerName: "Designation", field: "user_designation", sortable: true, filter: true },
        { headerName: "Created At", field: "created_at", valueFormatter: (p) => new Date(p.value).toLocaleString(), sortable: true, filter: true },
        { headerName: "Actions", field: "actions", cellRenderer: ActionBtn }
    ], [ActionBtn]);

    return (
        <div className="grid gap-4">

            <div className="flex gap-4 justify-between items-center">
                <motion.div initial={{ opacity: 0, y: 100 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{delay: 0.2 }}>
                    <Link to='/app-area/user-management/create-user' className="flex gap-2 items-center text-xl text-[#005BEA] border border-[#6392E5] bg-[#D9E1EF] hover:border-[#6392E5] hover:bg-[#C9D8F3] px-6 py-4 rounded">
                        <UserPlus />
                        Create User
                    </Link>
                </motion.div>

                <motion.button initial={{ opacity: 0, y: 100 }}
                               animate={{ y: 0, opacity: 1 }}
                               transition={{delay: 0.2 }}
                               onClick={() => navigate("/app-area")}
                               className="flex gap-2 justify-center items-center text-[#005BEA]  text-xl border border-[#6392E5] bg-[#D9E1EF] hover:bg-[#C9D8F3] p-4 rounded">
                    <CircleArrowLeft />
                    Back
                </motion.button>
            </div>

            <AgGridReact
                rowData={Array.isArray(userList) ? userList : []}
                columnDefs={columnDefs}
                pagination={true}
                theme={Theme}
                paginationPageSize={10}
                paginationPageSizeSelector={[10, 20, 50, 100]}
                domLayout='autoHeight'
            />

        </div>
    );
};

export default UserManagement;