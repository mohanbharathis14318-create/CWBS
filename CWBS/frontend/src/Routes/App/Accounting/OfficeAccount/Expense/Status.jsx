// Import Modules
import { motion } from "motion/react";
import {
    ArrowBigUpDash, ChartNoAxesColumn, CircleCheck,
    CircleFadingPlus, CircleX, ClipboardCheck, Clock,
    CopyCheck, Eye, IndianRupee, RotateCcw, Send, SquarePen, Tag, Trash, User,
    UserCheck, X
} from "lucide-react";
import React, {useCallback, useEffect, useMemo, useState} from "react";

// Import Hooks
import { useOfficeAccount } from "../../../../../Hooks/useTransaction.js";
import { useUser } from "../../../../../Hooks/useUser.js";

// Import Components
import Loader from "../../../../../components/Loader.jsx";
import toast from "react-hot-toast";

const Status = () => {
    
    // State for requests
    const [selectedRequest, setSelectedRequest] = useState([]);

    // State for status Filter
    const [selectedStatus, setSelectedStatus] = useState("All");

    const [selectedLevel, setSelectedLevel] = useState("All");

    // State for expense request modal
    const [isModalOpen, setIsModalOpen] = useState(false);

    // State for view modal
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);

    // State for edit modal
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    const [checked, setChecked] = useState(false);
    
    // For Rendering data
    const [ExpReqData, setExpReqData] = useState([]);

    const { fetchAllUsers, userList } = useUser();

    const {
        createOfficeExpenseReq,
        loading,
        fetchOfficeExpenseReq,
        OfficeExpRequestedRender,
        updateExpReq,
        deleteExpReq,
        OfficeExpMDRender,
        statusChangesByMD
    } = useOfficeAccount();

    // User Role
    const { user } = useUser();

    const UserRole = user.role;

    const [reqFormData, setReqFormData] = useState({
        daily_activity_type: "Office Expenses",
        date: "",
        particulars: "",
        expense_type: "",
        base_amount: "0",
        payment_mode: "",
        transaction_remark: "",
        priority_level: ""
    });

    useEffect(() => {

        fetchOfficeExpenseReq()

    }, [fetchOfficeExpenseReq]);

    useEffect(() => {

        fetchAllUsers();

    }, [fetchAllUsers]);

    useEffect(() => {

        if (UserRole === "MD") {

            setExpReqData(Array.isArray(OfficeExpMDRender) ? OfficeExpMDRender : []);

        } else {

            setExpReqData(Array.isArray(OfficeExpRequestedRender) ? OfficeExpRequestedRender : []);

        }

    }, [OfficeExpMDRender, OfficeExpRequestedRender, UserRole]);

    // Edit Render Handler
    useEffect(() => {

        if (isEditModalOpen && selectedRequest)
        {

            setReqFormData(prev => ({

                ...prev,
                date: reqFormData.date,
                particulars: selectedRequest.particulars || "",
                expense_type: selectedRequest.expense_type || "",
                base_amount: selectedRequest.amount_requested || "",
                payment_mode: selectedRequest.payment_mode || "",
                priority_level: selectedRequest.priority_level || "",
                transaction_remark: selectedRequest.transaction_remark || "",

            }));

        }

    }, [isEditModalOpen, reqFormData.date, selectedRequest]);

    const GeneralUsers = UserRole === "Site Supervisor" || UserRole === "Other Individuals";

    // Utility to format today's date to YYYY-MM-DD
    const getTodayDate = () => {
        const today = new Date();
        return today.toISOString().split("T")[0];
    };

    // Open New expense Reques
    function openExpenseReq()
    {

        setReqFormData(prev => ({

            ...prev,
            date: getTodayDate(),

        }));

        setIsModalOpen(true);

    }

    const uniqueStatuses = useMemo(() => {

        const statuses = ExpReqData.map(item => item.status);

        return ["All", ...new Set(statuses)];

    }, [ExpReqData]);

    const uniqueLevel = useMemo(() => {

        const Levels = ExpReqData.map(item => item.priority_level);

        return ["All", ...new Set(Levels)];

    }, [ExpReqData]);

    const FilteredData = useMemo(() => {

        return ExpReqData.filter(item => {

            const statusMatch = selectedStatus === "All" || item.status === selectedStatus;

            const levelMatch = selectedLevel === "All" || item.priority_level === selectedLevel;

            return statusMatch && levelMatch;

        });
    }, [selectedStatus, selectedLevel, ExpReqData]);

    // Create New req Handler for office expense request
    const HandleSubmitExpenseReq = useCallback(async (ev) => {

        ev.preventDefault();

        if (!checked) {

            toast.error("Please confirm that the entered details are valid and check the box.", {
                style: {
                    border: '1px solid #6392E5',
                    color: '#005bea',
                    background: '#f1f1f1',
                }
            });

        } else {

            const reqCreated = await createOfficeExpenseReq(reqFormData);

            if (reqCreated) {

                setIsModalOpen(false);

                await fetchOfficeExpenseReq();

            }

        }

    }, [checked, createOfficeExpenseReq, fetchOfficeExpenseReq, reqFormData]);


    // Render Data in view modal
    function openViewModal(id)
    {

        setIsViewModalOpen(true);

        const selectedData = FilteredData.find(item => {

            return item.request_id === id;

        });

        setSelectedRequest(selectedData);

    }

    // Rendering Data in Edit modal
    function openEditModal(id)
    {

        setReqFormData(prev => ({

            ...prev,
            date: getTodayDate(),

        }));

        setIsEditModalOpen(true);

        const selectedData = FilteredData.find(item => {

            return item.request_id === id;

        });

        setSelectedRequest(selectedData);

    }

    async function HandleEditSubmit(ev)
    {

        ev.preventDefault();

        if (!checked)
        {

            toast.error("Please confirm that the entered details are valid and check the box.", {
                style: {
                    border: '1px solid #6392E5',
                    color: '#005bea',
                    background: '#f1f1f1',
                }
            });

        } else {

            const {
                date,
                particulars,
                expense_type,
                base_amount,
                payment_mode,
                priority_level,
                transaction_remark
            } = reqFormData;

            let payload = {
                date,
                particulars,
                expense_type,
                base_amount,
                payment_mode,
                priority_level,
                transaction_remark,
                req_id: selectedRequest.request_id
            }

            const updated = await updateExpReq(payload);

            if (updated) {

                setIsEditModalOpen(false);

                await fetchOfficeExpenseReq();

            }


        }

    }

    // User Data fetch the requester name
    const getuser = Array.isArray(userList) ? userList.find(user => selectedRequest.requested_by === user.user_id) : [];

    // Handle status change
    const HandleStatus = useCallback(async (newStatus) => {

        await statusChangesByMD(newStatus);

    }, [statusChangesByMD]);

    // Style for scales
    const getLevelStyles = (level) => {

        switch (level) {

            case "Critical":
                return { text: "text-red-600", bg: "bg-red-500" };
            case "High":
                return { text: "text-orange-500", bg: "bg-orange-500" };
            case "Medium":
                return { text: "text-yellow-500", bg: "bg-yellow-500" };
            case "Low":
                return { text: "text-green-500", bg: "bg-green-500" };
            case "Anytime":
                return { text: "text-slate-800", bg: "bg-slate-400" };
            default:
                return { text: "text-gray-600", bg: "bg-gray-400" };

        }
    };

    // Handle Delete Request
    const HandleDeleteReq = useCallback(async (id) => {
        
        const Deleted = await deleteExpReq(id);

        if (Deleted) {

            await fetchOfficeExpenseReq()

        }
        
    }, [deleteExpReq, fetchOfficeExpenseReq]);


    return (
        <div>

            <div className="grid gap-4">

                <div className="flex flex-wrap justify-between itemsc-center">

                    <p className="head flex items-center gap-2 text-xl">
                        <Clock />
                        <span>Status</span>
                        <span>
                            (<span className="text-[#005BEA]">1</span>)
                        </span>
                    </p>

                    <motion.button onClick={openExpenseReq} initial={{ opacity: 0, y: 100 }}
                                   animate={{ opacity: 1, y: 0 }}
                                   transition={{ delay: 0.2 ,type: 'spring', stiffness: 100 }}
                                   className="flex gap-2 items-center text-[#005BEA] cursor-pointer">
                        <CircleFadingPlus />
                        <span>
                            New Request
                        </span>
                    </motion.button>

                </div>

                <div className="grid">
                    <label className="text-[#005BEA]" htmlFor="user-filter">

                        Filter by Status:

                    </label>

                    <select
                        className="p-2 border border-[#6392E5] rounded-md bg-transparent text-[#202020] focus:outline-none focus:ring-2 focus:ring-[#005BEA]"
                        value={selectedStatus}
                        onChange={(ev) => setSelectedStatus(ev.target.value)}>
                        {

                            uniqueStatuses.map((status, index) => (
                                <option key={index} value={status}>
                                    {status}
                                </option>
                            ))

                        }
                    </select>

                </div>

                <div className="grid">
                    <label className="text-[#005BEA]" htmlFor="user-filter">

                        Filter by Priority Level:

                    </label>

                    <select
                        className="p-2 border border-[#6392E5] rounded-md bg-transparent text-[#202020] focus:outline-none focus:ring-2 focus:ring-[#005BEA]"
                        value={selectedLevel}
                        onChange={(ev) => setSelectedLevel(ev.target.value)}>
                        {

                            uniqueLevel.map((level, index) => (

                                <option key={index} value={level}>
                                    {level}
                                </option>

                            ))

                        }
                    </select>

                </div>

                {

                    loading

                    ?

                        (

                            <div className="grid items-center justify-center my-4">

                                <Loader />

                            </div>

                        )

                    :

                        (

                            <motion.div initial={{ opacity: 0, y: 100 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.2 ,type: 'spring', stiffness: 100 }}
                                        className="grid gap-4">


                                {

                                    FilteredData.length === 0

                                    ?

                                        (

                                            <div className="flex flex-col items-center justify-center text-center p-10 bg-[#D9E1EF]/10 border border-dashed border-[#6392E5] rounded-lg">
                                                <div className="bg-[#D9E1EF] p-4 rounded-full mb-4">
                                                    <ClipboardCheck size={40} className="text-[#005BEA]" />
                                                </div>
                                                <p className="text-[#005BEA] text-xl font-semibold mb-2">
                                                    No Requests Found
                                                </p>
                                                <p className="text-gray-600 mb-6">
                                                    Start by creating a new request using the{" "}
                                                    <span className="font-bold">New Request</span> button above,
                                                    or click below to get started.
                                                </p>
                                                <motion.button
                                                    onClick={openExpenseReq}
                                                    initial={{ opacity: 0, y: 20 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ delay: 0.3, type: "spring", stiffness: 100 }}
                                                    className="flex gap-2 items-center text-[#005BEA] border border-[#6392E5] bg-[#D9E1EF] hover:bg-[#C9D8F3] px-6 py-3 rounded cursor-pointer font-medium"
                                                >
                                                    <CircleFadingPlus />
                                                    <span>Create New Request</span>
                                                </motion.button>
                                            </div>

                                        )

                                    :


                                        (

                                            FilteredData.map((item, index) => {

                                                let levelStyle, textStyle;

                                                const Level = item.priority_level;

                                                if (Level === "Critical")
                                                {

                                                    textStyle = 'text-red-600';

                                                    levelStyle = 'bg-red-500';

                                                } else if (Level === "Medium")
                                                {

                                                    textStyle = 'text-yellow-500'

                                                    levelStyle = 'bg-yellow-500';

                                                } else if (Level === "High")
                                                {

                                                    textStyle = 'text-orange-500'

                                                    levelStyle = 'bg-orange-500';

                                                } else if (Level === "Low")
                                                {

                                                    textStyle = 'text-green-500'

                                                    levelStyle = 'bg-green-500';

                                                } else if (Level === "Anytime")
                                                {

                                                    textStyle = "text-slate-800";

                                                    levelStyle = "bg-slate-400";

                                                }


                                                return (

                                                    <motion.div key={index}
                                                                initial={{opacity: 0, y: 100}}
                                                                animate={{opacity: 1, y: 0}}
                                                                transition={{delay: 0.4, type: 'spring', stiffness: 100}}
                                                                className="flex flex-wrap justify-between gap-4 bg-[#D9E1EF]/20 border border-[#6392E5]/30 p-4 rounded">
                                                        <div className="flex flex-wrap gap-4 items-center">

                                                            <div>
                                                                <p className='font-bold text-[#005bea]'>
                                                                    Req Id
                                                                </p>
                                                                <p>
                                                                    Req#{item.request_id}
                                                                </p>
                                                            </div>

                                                            <p className="text-[#005bea]/50">
                                                                |
                                                            </p>


                                                            <div>
                                                                <p className='font-bold text-[#005bea]'>
                                                                    Date
                                                                </p>
                                                                <p>
                                                                    {new Date(item.date_requested).toLocaleDateString()}
                                                                </p>
                                                            </div>

                                                            <p className="text-[#005bea]/50">
                                                                |
                                                            </p>

                                                            <div>
                                                                <p className='font-bold text-[#005bea]'>
                                                                    Particulars
                                                                </p>
                                                                <p>
                                                                    {item.particulars}
                                                                </p>
                                                            </div>

                                                            <p className="text-[#005bea]/50">
                                                                |
                                                            </p>

                                                            <div className="bg-[#D9E1EF] text-[#005BEA] rounded-full p-4">
                                                                <p className="flex items-center">
                                                    <span>
                                                        <IndianRupee size="20"/>
                                                    </span>
                                                                    <span className="font-bold">
                                                        {parseFloat(item.amount_requested).toLocaleString('en-IN')}
                                                    </span>
                                                                </p>
                                                            </div>

                                                            <div
                                                                className="flex gap-2 bg-[#D7DAF2] text-[#312E81] rounded-full px-6 py-4">
                                                                <Clock/>
                                                                {item.status}
                                                            </div>

                                                            <div className="flex items-center gap-2">
                                                        <span className="relative flex size-3">
                                                          <span
                                                              className={`absolute inline-flex h-full w-full animate-ping rounded-full ${levelStyle} opacity-75`}></span>
                                                          <span
                                                              className={`relative inline-flex size-3 rounded-full ${levelStyle}`}></span>
                                                        </span>
                                                                <p className={`${textStyle}`}>
                                                                    {item.priority_level}
                                                                </p>
                                                            </div>
                                                        </div>


                                                        {/*Action btns*/}
                                                        <div className="grid justify-end items-center gap-2">

                                                            {/*MD Role*/}
                                                            {
                                                                UserRole === "MD"

                                                                &&

                                                                (

                                                                    <div className="grid left-0">
                                                                        <motion.div
                                                                            initial={{opacity: 0, y: 100}}
                                                                            animate={{opacity: 1, y: 0}}
                                                                            transition={{delay: 0.2}}
                                                                            className="flex flex-wrap gap-2 justify-end items-center">
                                                                            <button title="Approved" type="button"
                                                                                    className="flex gap-2 items-center bg-[#D1FAE5] border border-[#10B981] text-[#065F46] cursor-pointer transition hover:-translate-y-2 hover:scale-120 duration-200 p-2 rounded">
                                                                                <CircleCheck/>
                                                                                <span className="hidden">Approved</span>
                                                                            </button>

                                                                            <button title="In Review" type="button"
                                                                                    className="flex gap-2 items-center bg-[#D7DAF2] border border-[#4F46E5] text-[#312E81] cursor-pointer transition hover:-translate-y-2 hover:scale-120 duration-200 p-2 rounded">
                                                                                <Clock/>
                                                                                <span className="hidden">In Review</span>
                                                                            </button>

                                                                            <button title="Denied" type="button"
                                                                                    className="flex gap-2 items-center bg-[#FEE2E2] border border-[#EF4444] text-[#991B1B] cursor-pointer transition hover:-translate-y-2 hover:scale-120 duration-200 p-2 rounded">
                                                                                <CircleX/>
                                                                                <span className="hidden">Denied</span>
                                                                            </button>


                                                                            <button title="View" type="button"
                                                                                    onClick={() => openViewModal(item.request_id)}
                                                                                    className="flex gap-2 items-center bg-[#FEF3C7] border border-[#F59E0B] text-[#92400E] cursor-pointer transition hover:-translate-y-2 hover:scale-120 duration-200 p-2 rounded">
                                                                                <Eye/>
                                                                                <span className="hidden">View</span>
                                                                            </button>

                                                                            <button title="Edit" type="button"
                                                                                    onClick={() => openEditModal(item.request_id)}
                                                                                    className="flex gap-2 items-center bg-[#D9E1EF] border border-[#8CAEE9] text-[#005BEA] cursor-pointer transition hover:-translate-y-2 hover:scale-120 duration-200 p-2 rounded">
                                                                                <SquarePen/>
                                                                                <span className="hidden">Edit</span>
                                                                            </button>

                                                                            <button title="Delete" type="button"
                                                                                    onClick={() => HandleDeleteReq(item.request_id)}
                                                                                    className="flex gap-2 items-center bg-[#FEE2E2] border border-[#EF4444] text-[#991B1B] cursor-pointer transition hover:-translate-y-2 hover:scale-120 duration-200 p-2 rounded">
                                                                                <Trash/>
                                                                                <span className="hidden">Delete</span>
                                                                            </button>
                                                                        </motion.div>
                                                                    </div>

                                                                )
                                                            }


                                                            {/*Accountant Role*/}
                                                            {
                                                                UserRole === "Accountant"

                                                                &&

                                                                (

                                                                    <motion.div
                                                                        initial={{opacity: 0, y: 100}}
                                                                        animate={{opacity: 1, y: 0}}
                                                                        transition={{delay: 0.2}}
                                                                        className="flex flex-wrap gap-2 justify-end items-center">
                                                                        <button title="Payment Received" type="button"
                                                                                className="flex gap-2 items-center bg-[#F2E2FC] border border-[#8E4EC6] text-[#8E4EC6] cursor-pointer transition hover:-translate-y-2 hover:scale-120 duration-200 p-2 rounded">
                                                                            <UserCheck/>
                                                                            <span className="hidden">Received</span>
                                                                        </button>
                                                                        <button title="Edit" type="button"
                                                                                onClick={() => openEditModal(item.request_id)}
                                                                                className="flex gap-2 items-center bg-[#D9E1EF] border border-[#8CAEE9] text-[#005BEA] cursor-pointer transition hover:-translate-y-2 hover:scale-120 duration-200 p-2 rounded">
                                                                            <SquarePen/>
                                                                            <span className="hidden">Edit</span>
                                                                        </button>
                                                                    </motion.div>

                                                                )
                                                            }


                                                            {/*Site supervisor or others Role*/}
                                                            {
                                                                GeneralUsers

                                                                &&

                                                                (

                                                                    <motion.div
                                                                        initial={{opacity: 0, y: 100}}
                                                                        animate={{opacity: 1, y: 0}}
                                                                        transition={{delay: 0.2}}
                                                                        className="flex flex-wrap gap-2 justify-end items-center">
                                                                        <button title="Request Received" type="button"
                                                                                className="flex gap-2 items-center bg-[#F2E2FC] border border-[#8E4EC6] text-[#8E4EC6] cursor-pointer transition hover:-translate-y-2 hover:scale-120 duration-200 p-2 rounded">
                                                                            <UserCheck/>
                                                                            <span className="hidden">Received</span>
                                                                        </button>

                                                                        <button title="Paymenet Sent" type="button"
                                                                                className="flex gap-2 items-center bg-[#C9E8CA] border border-[#65BA74] text-[#46A758] cursor-pointer transition hover:-translate-y-2 hover:scale-120 duration-200 p-2 rounded">
                                                                            <CopyCheck/>
                                                                            <span className="hidden">Sent</span>
                                                                        </button>
                                                                        <button title="Edit" type="button"
                                                                                onClick={() => openEditModal(item.request_id)}
                                                                                className="flex gap-2 items-center bg-[#D9E1EF] border border-[#8CAEE9] text-[#005BEA] cursor-pointer transition hover:-translate-y-2 hover:scale-120 duration-200 p-2 rounded">
                                                                            <SquarePen/>
                                                                            <span className="hidden">Edit</span>
                                                                        </button>
                                                                        <button title="Delete" type="button"
                                                                                onClick={() => HandleDeleteReq(item.request_id)}
                                                                                className="flex gap-2 items-center bg-[#FEE2E2] border border-[#EF4444] text-[#991B1B] cursor-pointer transition hover:-translate-y-2 hover:scale-120 duration-200 p-2 rounded">
                                                                            <Trash/>
                                                                            <span className="hidden">Delete</span>
                                                                        </button>
                                                                    </motion.div>


                                                                )
                                                            }

                                                        </div>

                                                    </motion.div>


                                                )
                                            })

                                        )

                                }
                            </motion.div>

                        )

                }

            </div>


            {

                isModalOpen

                &&

                (

                    <div className="fixed inset-0 bg-[#202020]/50 flex items-center justify-center md:justify-end backdrop-blur-xs z-50">
                        <motion.div initial={{ opacity: 0, x: 100 }}
                                    animate={{ opacity: 1 , x: 0 }}
                                    transition={{ delay: 0.2, type: 'spring', stiffness: 100 }}
                                    className="bg-[#F1F1F1] rounded w-11/12 md:w-3/2 lg:w-1/3 h-full shadow-xl overflow-y-auto scroll-smooth">
                            <div className="sticky top-0 flex justify-between items-center bg-[#D9E1EF] rounded p-4 z-20">
                                <h2 className="flex gap-2 items-center text-xl text-[#005BEA]">
                                    <Send />
                                    New Expense Requests Form
                                </h2>
                                <button onClick={() => setIsModalOpen(false)} className="cursor-pointer text-gray-500 hover:text-gray-700">
                                    <X />
                                </button>
                            </div>

                            <form onSubmit={HandleSubmitExpenseReq}>
                                <div className="grid grid-cols-1 gap-10 text-[#202020] py-6 p-6">
                                    <motion.label
                                        initial={{ opacity: 0, y: 100 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.2 }}
                                        className="grid" htmlFor="date">
                                        <span className="mx-2">Date</span>
                                        <input type="date"
                                               value={reqFormData.date}
                                               readOnly={true}
                                               onChange={ev => setReqFormData({ ...reqFormData, date: ev.target.value })}
                                               className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                               placeholder="DD-MM-YYYY"/>
                                    </motion.label>

                                    <motion.label
                                        initial={{ opacity: 0, y: 100 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.3 }}
                                        className="grid" htmlFor="particulars">
                                        <span className="mx-2">Particulars</span>
                                        <input type="text"
                                               value={reqFormData.particulars}
                                               onChange={ev => setReqFormData({ ...reqFormData, particulars: ev.target.value })}
                                               className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                               placeholder="Enter Your Particular"/>
                                    </motion.label>

                                    <motion.label
                                        initial={{ opacity: 0, y: 100 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.5 }}
                                        className="grid" htmlFor="type">
                                        <span className="mx-2">Type</span>
                                        <select name="Type"
                                                value={reqFormData.expense_type}
                                                onChange={ev => setReqFormData({ ...reqFormData, expense_type: ev.target.value })}
                                                className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                                placeholder="Indirect/Direct">
                                            <option value="">
                                                Select Your Type
                                            </option>
                                            <option>Direct</option>
                                            <option>Indirect</option>
                                        </select>
                                    </motion.label>

                                    <motion.label
                                        initial={{ opacity: 0, y: 100 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.5 }}
                                        className="grid" htmlFor="amount">
                                        <span className="mx-2">Amount</span>
                                        <input type="text"
                                               value={reqFormData.base_amount}
                                               onChange={ev => setReqFormData({ ...reqFormData, base_amount: ev.target.value })}
                                               className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                               placeholder="Enter the Amount"/>
                                    </motion.label>

                                    <motion.label
                                        initial={{ opacity: 0, y: 100 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.6 }}
                                        className="grid" htmlFor="paymentmode">
                                        <span className="mx-2">Payment Mode</span>
                                        <select name="paymentmode"
                                                value={reqFormData.payment_mode}
                                                onChange={ev => setReqFormData({ ...reqFormData, payment_mode: ev.target.value })}
                                                className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                                id="" placeholder="Select Your Payment Mode">
                                            <option value="">
                                                Select Your Payment Mode
                                            </option>
                                            <option>UPI</option>
                                            <option>Bank</option>
                                            <option>Cash</option>
                                            <option>Other(Mention it in transaction remarks)</option>
                                        </select>
                                    </motion.label>

                                    <motion.label
                                        initial={{ opacity: 0, y: 100 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.6 }}
                                        className="grid" htmlFor="paymentmode">
                                        <span className="mx-2">Priority Level</span>
                                        <select name="Priority Level"
                                                value={reqFormData.priority_level}
                                                onChange={ev => setReqFormData({ ...reqFormData, priority_level: ev.target.value })}
                                                className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                                id="" placeholder="Priority Level">
                                            <option value="">
                                                Select Your Priority Level
                                            </option>
                                            <option>Critical</option>
                                            <option>High</option>
                                            <option>Medium</option>
                                            <option>Low</option>
                                            <option>Anytime</option>
                                        </select>
                                    </motion.label>

                                    <motion.label
                                        initial={{ opacity: 0, y: 100 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.7 }}
                                        className="grid" htmlFor="remarks">
                                        <span className="mx-2">Transaction Remarks</span>
                                        <input type="text"
                                               value={reqFormData.transaction_remark}
                                               onChange={ev => setReqFormData({ ...reqFormData, transaction_remark: ev.target.value })}
                                               className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                               placeholder="Enter the Remarks"/>
                                    </motion.label>
                                </div>


                                <div className="grid md:grid lg:grid xl:grid justify-between items-center px-6">
                                    <motion.label className="flex gap-x-2 items-center"
                                                  initial={{ opacity: 0, y: 100 }}
                                                  animate={{ opacity: 1, y: 0 }}
                                                  transition={{ delay: 0.7 }}
                                                  htmlFor="box">
                                        <input type="checkbox" className="accent-[#005BEA]" checked={checked} onChange={(ev) => {
                                            setChecked(ev.target.checked)
                                        }} />
                                        I confirm that the entered details are correct
                                    </motion.label>

                                </div>

                                {

                                    loading

                                        ?

                                        ( <Loader /> )

                                        :

                                        (

                                            <div className="grid items-center p-6">
                                                <motion.button type="submit"
                                                               className="flex gap-2 items-center justify-center cursor-pointer text-xl border border-[#6392E5] bg-[#D9E1EF] text-[#005BEA] hover:bg-[#C9D8F3] p-4 rounded"
                                                               initial={{opacity: 0, y: 100}}
                                                               animate={{opacity: 1, y: 0}}
                                                               transition={{delay: 0.8}}>
                                                    <Send />
                                                    Send Request
                                                </motion.button>
                                            </div>


                                        )


                                }
                            </form>

                        </motion.div>
                    </div>

                )
            }



            {/*View Model*/}
            {

                isViewModalOpen && selectedRequest

                &&

                (

                    <div className="fixed inset-0 bg-[#202020]/50 flex items-center justify-center backdrop-blur-xs z-50">
                        <motion.div initial={{ opacity: 0, x: 100, y: 100, rotate: 10 }}
                                    animate={{ opacity: 1 , x: 0, y: 0, rotate: 0 }}
                                    transition={{ delay: 0.2, type: 'spring', stiffness: 100 }}
                                    className="bg-[#F1F1F1] rounded w-11/12 h-9/10 md:w-1/2 lg:w-1/2 shadow-xl overflow-y-auto scroll-smooth">
                            <div className="sticky top-0 flex justify-between items-center bg-[#D9E1EF] rounded p-4 z-20">
                                <h2 className="flex gap-2 items-center text-xl text-[#005BEA]">
                                    <Eye />
                                    { selectedRequest.particulars }
                                </h2>
                                <button onClick={() => setIsViewModalOpen(false)} className="cursor-pointer text-gray-500 hover:text-gray-700">
                                    <X />
                                </button>
                            </div>

                            <div className="grid gap-4 p-4">


                                {/* Requester Profile */}
                                <div className="grid gap-2 border border-[#6392E5] rounded p-2">
                                    <div className="flex items-center gap-2">
                                        <div className="text-[#005BEA] bg-[#D9E1EF] rounded p-2">
                                            <User />
                                        </div>
                                        <p className="text-[#005BEA] text-xl">
                                            Requester Profile
                                        </p>
                                    </div>

                                    <div className="grid items-center bg-[#D9E1EF]/20 border border-[#6392E5]/30 rounded p-2">
                                        <div className="flex items-center gap-2">
                                            <p className="text-[#202020] font-bold">
                                                Req Id:
                                            </p>
                                            <p>
                                                Req#{ selectedRequest.request_id }
                                            </p>
                                        </div>

                                        {

                                            getuser

                                            &&

                                            (

                                                <div className="flex items-center gap-2">
                                                    <p className="text-[#202020] font-bold">
                                                        Requested User Name:
                                                    </p>
                                                    <p>
                                                        { getuser.full_name }
                                                    </p>
                                                </div>

                                            )

                                        }

                                        {

                                            getuser

                                            &&

                                            (

                                                <div className="flex items-center gap-2">
                                                    <p className="text-[#202020] font-bold">
                                                        Requested User Designation:
                                                    </p>
                                                    <p>
                                                        { getuser.user_designation }
                                                    </p>
                                                </div>

                                            )

                                        }
                                    </div>
                                </div>

                                {/* Requested User Details */}
                                <div className="grid gap-2 border border-[#6392E5] rounded p-2">
                                    <div className="flex items-center gap-2">
                                        <div className="text-[#005BEA] bg-[#D9E1EF] rounded p-2">
                                            <ClipboardCheck />
                                        </div>
                                        <p className="text-[#005BEA] text-xl">
                                            Request Details
                                        </p>
                                    </div>

                                    <div className="grid items-center bg-[#D9E1EF]/20 border border-[#6392E5]/20 rounded p-2">
                                        <div className="flex items-center gap-2">
                                            <p className="text-[#202020] font-bold">
                                                Date:
                                            </p>
                                            <p>
                                                { new Date(selectedRequest.date_requested).toLocaleDateString() }
                                            </p>
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <p className="text-[#202020] font-bold">
                                                Particulars:
                                            </p>
                                            <p>
                                                { selectedRequest.particulars }
                                            </p>
                                        </div>


                                        <div className="flex items-center gap-2">
                                            <p className="text-[#202020] font-bold">
                                                Transaction Remarks:
                                            </p>
                                            <p>
                                                { selectedRequest.transaction_remark }
                                            </p>
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <p className="text-[#202020] font-bold">
                                                Expense Type:
                                            </p>
                                            <p>
                                                { selectedRequest.expense_type }
                                            </p>
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <p className="text-[#202020] font-bold">
                                                Payment Mode:
                                            </p>
                                            <p>
                                                { selectedRequest.payment_mode }
                                            </p>
                                        </div>

                                        <div className="flex flex-wrap md:justify-between items-end gap-2">

                                            <div className="flex items-center gap-2">
                                                <p className="text-[#202020] font-bold">Priority Level:</p>
                                                <span className="relative flex size-3">
                                                  <span
                                                      className={`absolute inline-flex h-full w-full animate-ping rounded-full ${getLevelStyles(selectedRequest.priority_level).bg} opacity-75`}
                                                  ></span>
                                                  <span
                                                      className={`relative inline-flex size-3 rounded-full ${getLevelStyles(selectedRequest.priority_level).bg}`}
                                                  ></span>
                                                </span>
                                                <p className={`${getLevelStyles(selectedRequest.priority_level).text} text-xl`}>
                                                    {selectedRequest.priority_level}
                                                </p>
                                            </div>

                                            <div className="grid items-center gap-2 bg-[#D9E1EF]  rounded p-4">
                                                <p className="text-[#202020]">
                                                    Request Amount
                                                </p>
                                                <p className="flex items-center justify-end text-xl text-[#005BEA] font-bold">
                                                    <IndianRupee size={20} />
                                                    { parseFloat(selectedRequest.amount_requested).toLocaleString("en-IN") }
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Status */}

                                </div>

                                {/* Status */}
                                <div className="grid gap-2 border border-[#6392E5] rounded p-2">
                                    <div className="flex items-center gap-2">
                                        <div className="text-[#005BEA] bg-[#D9E1EF] rounded p-2">
                                            <ChartNoAxesColumn />
                                        </div>
                                        <p className="text-[#005BEA] text-xl">
                                            Status
                                        </p>
                                    </div>

                                    <div className="grid items-center bg-[#D9E1EF]/20 border border-[#6392E5]/20 rounded p-2">
                                        <div className="flex items-center gap-2">
                                            <p className="text-[#202020] font-bold">
                                                Approved By:
                                            </p>
                                            <div>
                                                {

                                                    selectedRequest.approved_by === null

                                                    ?

                                                        (

                                                            <div>
                                                                <p>
                                                                    The request beeen sent to MD
                                                                </p>
                                                            </div>

                                                        )

                                                    :

                                                        (

                                                            <div>
                                                                <p>
                                                                    MD Name
                                                                </p>
                                                            </div>

                                                        )

                                                }
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <p className="text-[#202020] font-bold">
                                                Funded Provided by:
                                            </p>
                                            <div>
                                                {

                                                    selectedRequest.forwarded_to === null

                                                    ?

                                                        (

                                                            <div>
                                                                <p>
                                                                    MD Will assign
                                                                </p>
                                                            </div>

                                                        )

                                                    :

                                                        (

                                                            <div>
                                                                <p>
                                                                    Accountant name
                                                                </p>
                                                            </div>

                                                        )

                                                }
                                            </div>
                                        </div>


                                        <div className="flex flex-col items-center gap-2">
                                            <p className="text-[#202020] font-bold">
                                                Status:
                                            </p>
                                            <div
                                                className="flex gap-2 bg-[#D7DAF2] text-[#312E81] rounded-full px-6 py-4">
                                                <Clock/>
                                                {selectedRequest.status}
                                            </div>
                                        </div>


                                    </div>

                                    {/* Status */}

                                </div>
                            </div>


                            <div className="grid justify-end items-center gap-2 px-4">

                                {/*MD Role*/}
                                {
                                    UserRole === "MD"

                                    &&

                                    (

                                        <div className="grid left-0">
                                            <motion.div
                                                initial={{opacity: 0, y: 100}}
                                                animate={{opacity: 1, y: 0}}
                                                transition={{delay: 0.2}}
                                                className="flex flex-wrap gap-2 justify-end items-center">
                                                <button title="Approved" type="button"
                                                        className="flex gap-2 items-center bg-[#D1FAE5] border border-[#10B981] text-[#065F46] cursor-pointer transition hover:-translate-y-2 hover:scale-120 duration-200 p-2 rounded">
                                                    <CircleCheck/>
                                                    <span className="hidden">Approved</span>
                                                </button>

                                                <button title="In Review" type="button"
                                                        className="flex gap-2 items-center bg-[#D7DAF2] border border-[#4F46E5] text-[#312E81] cursor-pointer transition hover:-translate-y-2 hover:scale-120 duration-200 p-2 rounded">
                                                    <Clock/>
                                                    <span className="hidden">In Review</span>
                                                </button>

                                                <button title="Denied" type="button"
                                                        className="flex gap-2 items-center bg-[#FEE2E2] border border-[#EF4444] text-[#991B1B] cursor-pointer transition hover:-translate-y-2 hover:scale-120 duration-200 p-2 rounded">
                                                    <CircleX/>
                                                    <span className="hidden">Denied</span>
                                                </button>

                                                <button title="Edit" type="button"
                                                        className="flex gap-2 items-center bg-[#D9E1EF] border border-[#8CAEE9] text-[#005BEA] cursor-pointer transition hover:-translate-y-2 hover:scale-120 duration-200 p-2 rounded">
                                                    <SquarePen/>
                                                    <span className="hidden">Edit</span>
                                                </button>

                                                <button title="Delete" type="button"
                                                        className="flex gap-2 items-center bg-[#FEE2E2] border border-[#EF4444] text-[#991B1B] cursor-pointer transition hover:-translate-y-2 hover:scale-120 duration-200 p-2 rounded">
                                                    <Trash/>
                                                    <span className="hidden">Delete</span>
                                                </button>
                                            </motion.div>
                                        </div>

                                    )
                                }


                                {/*Accountant Role*/}
                                {
                                    UserRole === "Accountant"

                                    &&

                                    (

                                        <motion.div
                                            initial={{opacity: 0, y: 100}}
                                            animate={{opacity: 1, y: 0}}
                                            transition={{delay: 0.2}}
                                            className="flex flex-wrap gap-2 justify-end items-center">
                                            <button title="Payment Received" type="button"
                                                    className="flex gap-2 items-center bg-[#F2E2FC] border border-[#8E4EC6] text-[#8E4EC6] cursor-pointer transition hover:-translate-y-2 hover:scale-120 duration-200 p-2 rounded">
                                                <UserCheck/>
                                                <span className="hidden">Received</span>
                                            </button>

                                            <button title="Edit" type="button"
                                                    className="flex gap-2 items-center bg-[#D9E1EF] border border-[#8CAEE9] text-[#005BEA] cursor-pointer transition hover:-translate-y-2 hover:scale-120 duration-200 p-2 rounded">
                                                <SquarePen/>
                                                <span className="hidden">Edit</span>
                                            </button>

                                            <button title="Delete" type="button"
                                                    className="flex gap-2 items-center bg-[#FEE2E2] border border-[#EF4444] text-[#991B1B] cursor-pointer transition hover:-translate-y-2 hover:scale-120 duration-200 p-2 rounded">
                                                <Trash/>
                                                <span className="hidden">Delete</span>
                                            </button>
                                        </motion.div>


                                    )
                                }


                                {/*Site supervisor or others Role*/}
                                {
                                    GeneralUsers

                                    &&

                                    (

                                        <motion.div
                                            initial={{opacity: 0, y: 100}}
                                            animate={{opacity: 1, y: 0}}
                                            transition={{delay: 0.2}}
                                            className="flex flex-wrap gap-2 justify-end items-center">
                                            <button title="Request Received" type="button"
                                                    className="flex gap-2 items-center bg-[#F2E2FC] border border-[#8E4EC6] text-[#8E4EC6] cursor-pointer transition hover:-translate-y-2 hover:scale-120 duration-200 p-2 rounded">
                                                <UserCheck/>
                                                <span className="hidden">Received</span>
                                            </button>

                                            <button title="Paymenet Sent" type="button"
                                                    className="flex gap-2 items-center bg-[#C9E8CA] border border-[#65BA74] text-[#46A758] cursor-pointer transition hover:-translate-y-2 hover:scale-120 duration-200 p-2 rounded">
                                                <CopyCheck/>
                                                <span className="hidden">Sent</span>
                                            </button>
                                        </motion.div>


                                    )
                                }

                            </div>

                        </motion.div>
                    </div>

                )
            }


            {/* Edit Modal */}
            {

                isEditModalOpen && selectedRequest

                &&

                (

                    <div className="fixed inset-0 bg-[#202020]/50 flex items-center justify-center md:justify-end backdrop-blur-xs z-50">
                        <motion.div initial={{ opacity: 0, x: 100 }}
                                    animate={{ opacity: 1 , x: 0 }}
                                    transition={{ delay: 0.2, type: 'spring', stiffness: 100 }}
                                    className="bg-[#F1F1F1] rounded w-11/12 md:w-3/2 lg:w-1/3 h-full shadow-xl overflow-y-auto scroll-smooth">
                            <div className="sticky top-0 flex justify-between items-center bg-[#D9E1EF] rounded p-4 z-20">
                                <h2 className="flex gap-2 items-center text-xl text-[#005BEA]">
                                    <Send />
                                    Edit Expense Request - { selectedRequest.particulars }
                                </h2>
                                <button onClick={() => setIsEditModalOpen(false)} className="cursor-pointer text-gray-500 hover:text-gray-700">
                                    <X />
                                </button>
                            </div>

                            <form onSubmit={HandleEditSubmit}>
                                <div className="grid grid-cols-1 gap-10 text-[#202020] py-6 p-6">
                                    <motion.label
                                        initial={{ opacity: 0, y: 100 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.2 }}
                                        className="grid" htmlFor="date">
                                        <span className="mx-2">Date</span>
                                        <input type="date"
                                               value={reqFormData.date}
                                               readOnly={true}
                                               onChange={ev => setReqFormData({ ...reqFormData, date: ev.target.value })}
                                               className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                               placeholder="DD-MM-YYYY"/>
                                    </motion.label>

                                    <motion.label
                                        initial={{ opacity: 0, y: 100 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.3 }}
                                        className="grid" htmlFor="particulars">
                                        <span className="mx-2">Particulars</span>
                                        <input type="text"
                                               value={reqFormData.particulars}
                                               onChange={ev => setReqFormData({ ...reqFormData, particulars: ev.target.value })}
                                               className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                               placeholder="Enter Your Particular"/>
                                    </motion.label>

                                    <motion.label
                                        initial={{ opacity: 0, y: 100 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.5 }}
                                        className="grid" htmlFor="type">
                                        <span className="mx-2">Type</span>
                                        <select name="Type"
                                                value={reqFormData.expense_type}
                                                onChange={ev => setReqFormData({ ...reqFormData, expense_type: ev.target.value })}
                                                className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                                placeholder="Indirect/Direct">
                                            <option value="">
                                                Select Your Type
                                            </option>
                                            <option>Direct</option>
                                            <option>Indirect</option>
                                        </select>
                                    </motion.label>

                                    <motion.label
                                        initial={{ opacity: 0, y: 100 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.5 }}
                                        className="grid" htmlFor="amount">
                                        <span className="mx-2">Amount</span>
                                        <input type="text"
                                               value={reqFormData.base_amount}
                                               onChange={ev => setReqFormData({ ...reqFormData, base_amount: ev.target.value })}
                                               className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                               placeholder="Enter the Amount"/>
                                    </motion.label>

                                    <motion.label
                                        initial={{ opacity: 0, y: 100 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.6 }}
                                        className="grid" htmlFor="paymentmode">
                                        <span className="mx-2">Payment Mode</span>
                                        <select name="paymentmode"
                                                value={reqFormData.payment_mode}
                                                onChange={ev => setReqFormData({ ...reqFormData, payment_mode: ev.target.value })}
                                                className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                                id="" placeholder="Select Your Payment Mode">
                                            <option value="">
                                                Select Your Payment Mode
                                            </option>
                                            <option>UPI</option>
                                            <option>Bank</option>
                                            <option>Cash</option>
                                            <option>Other(Mention it in transaction remarks)</option>
                                        </select>
                                    </motion.label>

                                    <motion.label
                                        initial={{ opacity: 0, y: 100 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.6 }}
                                        className="grid" htmlFor="paymentmode">
                                        <span className="mx-2">Priority Level</span>
                                        <select name="Priority Level"
                                                value={reqFormData.priority_level}
                                                onChange={ev => setReqFormData({ ...reqFormData, priority_level: ev.target.value })}
                                                className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                                id="" placeholder="Priority Level">
                                            <option value="">
                                                Select Your Priority Level
                                            </option>
                                            <option>Critical</option>
                                            <option>High</option>
                                            <option>Medium</option>
                                            <option>Low</option>
                                            <option>Anytime</option>
                                        </select>
                                    </motion.label>

                                    <motion.label
                                        initial={{ opacity: 0, y: 100 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.7 }}
                                        className="grid" htmlFor="remarks">
                                        <span className="mx-2">Transaction Remarks</span>
                                        <input type="text"
                                               value={reqFormData.transaction_remark}
                                               onChange={ev => setReqFormData({ ...reqFormData, transaction_remark: ev.target.value })}
                                               className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                               placeholder="Enter the Remarks"/>
                                    </motion.label>
                                </div>


                                <div className="grid md:grid lg:grid xl:grid justify-between items-center px-6">
                                    <motion.label className="flex gap-x-2 items-center"
                                                  initial={{ opacity: 0, y: 100 }}
                                                  animate={{ opacity: 1, y: 0 }}
                                                  transition={{ delay: 0.7 }}
                                                  htmlFor="box">
                                        <input type="checkbox" className="accent-[#005BEA]" checked={checked} onChange={(ev) => {
                                            setChecked(ev.target.checked)
                                        }} />
                                        I confirm that the entered details are correct
                                    </motion.label>

                                </div>

                                {

                                    loading

                                        ?

                                        ( <Loader /> )

                                        :

                                        (

                                            <div className="grid items-center p-6">
                                                <motion.button type="submit"
                                                               className="flex gap-2 items-center justify-center cursor-pointer text-xl border border-[#6392E5] bg-[#D9E1EF] text-[#005BEA] hover:bg-[#C9D8F3] p-4 rounded"
                                                               initial={{opacity: 0, y: 100}}
                                                               animate={{opacity: 1, y: 0}}
                                                               transition={{delay: 0.8}}>
                                                    <Send />
                                                    Update Request
                                                </motion.button>
                                            </div>


                                        )


                                }
                            </form>

                        </motion.div>
                    </div>

                )

            }

        </div>
    );
};

export default Status;