// Import Modules
import { motion } from 'motion/react';
import toast from "react-hot-toast";
import React, { useState, useCallback, useEffect, useMemo} from "react";
import {
    BadgeIndianRupee,
    Landmark,
    HandCoins,
    IndianRupee,
    ListCheck,
    Send,
    CircleCheck,
    Clock,
    CircleX,
    Info,
    Calendar,
    Tag,
    User,
    Briefcase,
    ReceiptIndianRupee,
    Banknote,
    ArrowBigDownDash,
    Trash,
    SquarePen,
    ListChecks,
    Handshake,
    BanknoteArrowDown,
    RotateCcw,
    X,
    Users,
    ArrowBigUpDash,
    CircleFadingPlus, BadgeInfo
} from 'lucide-react';

// Import Hooks
import { useUser } from "../../../Hooks/useUser.js";
import { useBank } from "../../../Hooks/useBank.js";
import { useRequirement } from "../../../Hooks/useRequirement.js"

// Import Components
import Loading_Screen from "../../../components/Loading_Screen.jsx";
import ExpenseReq from "../../../components/RequirementComp/ExpenseReq.jsx";

// Import Assets
import emptyBox from '../../../assets/img/empty-box.png'
import Loader from "../../../components/Loader.jsx";

const CIHBoard = () => {

    // State for selected user filter
    const [selectedUserFilter, setSelectedUserFilter] = useState('All');

    // State to filter based onb month
    const [selectedMonthFilter, setSelectedMonthFilter] = useState('');

    // State to filter status
    const [selectedStatusFilter, setSelectedStatusFilter] = useState('All');

    // State for modal for return
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    // Sate to selected transaction
    const [selectedTransaction, setSelectedTransaction] = useState(null);

    const [checked, setChecked] = useState(false);

    const [formData, setFormData] = useState({
        trxn_id: '',
        status: "Returned",
        transaction_title: "",
        trxn_remarks: "",
        user_name: "",
        cash_flow_type: "Cash Return",
        return_date: "",
        return_sender_name: "",
        return_payment_mode: "",
        total_requested_amount: 0,
        total_expensed_amount: 0,
        expense_items: [
            {
                expense_description: "",
                expense_amount: 0,
            }
        ],
        total_balance_amount: 0,
        total_return_amount: 0,
    });

    // Edit Expense Request Form Data
    const [expReqformData, setExpReqformData] = useState({
        trxn_id: 0,
        transaction_title: "",
        trxn_remarks: "",
        user_name: "",
        user_designation: "",
        payment_mode: "",
        expense_type: "",
        amount: 0,
        cash_flow_type: "Cash Given", // Cash Given / Cash Return

        // Cash Given fields
        given_date: "",
        given_sender_name: "",
        given_sender_designation: "MD",
        given_payment_mode: "",
        given_amount: 0,
    });

    // Return Modal Render
    useEffect(() => {
        if (isModalOpen && selectedTransaction) {

            const requested = parseFloat(selectedTransaction.amount) || 0;
            const expensed = parseFloat(formData.total_expensed_amount) || 0;

            const balance = requested - expensed;

            setFormData(prev =>({
                ...prev,
                trxn_id: selectedTransaction.trxn_id,
                status: "Returned",
                given_amount: parseFloat(selectedTransaction.given_amount),
                transaction_title: selectedTransaction.transaction_title || "",
                trxn_remarks: selectedTransaction.trxn_remarks || "",
                cash_flow_type: "Cash Return",
                return_date: prev.return_date || "",
                return_payment_mode: prev.return_payment_mode || "",
                return_sender_name: selectedTransaction.given_sender_name || "",
                total_requested_amount: requested,
                total_return_amount: balance,
                total_balance_amount: balance,
            }));
        }
    }, [formData.total_expensed_amount, isModalOpen, selectedTransaction]);
    
    // Edit Modal Render
    useEffect(() => {
        
        if (isEditModalOpen && selectedTransaction)
        {
            
            setExpReqformData(prev => ({
                ...prev,
                trxn_id: selectedTransaction.trxn_id,
                transaction_title: selectedTransaction.transaction_title || "",
                trxn_remarks: selectedTransaction.trxn_remarks || "",
                user_name: selectedTransaction.user_name || "",
                user_designation: selectedTransaction.user_designation || "",
                payment_mode: selectedTransaction.payment_mode || "",
                expense_type: selectedTransaction.expense_type || "",
                amount: selectedTransaction.amount || 0,
                cash_flow_type: selectedTransaction.cash_flow_type || "Cash Given", // Cash Given / Cash Return

                // Cash Given fields
                given_date: selectedTransaction.given_date || "",
                given_sender_name: selectedTransaction.given_sender_name || "",
                given_sender_designation: selectedTransaction.given_sender_designation || "",
                given_payment_mode: selectedTransaction.given_payment_mode || "",
                given_amount: selectedTransaction.given_amount || 0,
            }));
            
        }
        
    }, [isEditModalOpen, selectedTransaction]);

    const { user } = useUser();

    const { CreateCIHTrxnReq, getAllTrxnReq, getAllReqByUser, PendingDeniedStatus, approveStatus, returnedStatus, updateExpenseTransaction, DeleteTransaction, RequirementReqDataListMD, RequirementReqDataListUser, loading } = useRequirement();

    // Bank Data Hooks
    const { fetchBank, BankDataList } = useBank();

    const HandleReturned = async (ev) => {

        ev.preventDefault();

        const {
            trxn_id,
            status,
            transaction_title,
            trxn_remarks,
            user_name,
            return_date,
            cash_flow_type,
            return_sender_name,
            return_payment_mode,
            total_requested_amount,
            total_expensed_amount,
            total_balance_amount,
            total_return_amount
        } = formData;

        await CreateCIHTrxnReq({
            trxn_id,
            status,
            transaction_title,
            trxn_remarks,
            user_name,
            cash_flow_type,
            return_date,
            return_sender_name,
            return_payment_mode,
            total_requested_amount,
            total_expensed_amount,
            total_balance_amount,
            total_return_amount,
            expense_items: formData.expense_items
        });


        await returnedStatus({
            trxn_id: selectedTransaction.trxn_id,
            return_sender_name: selectedTransaction.given_sender_name,
            user_name: selectedTransaction.user_name,
            given_amount: selectedTransaction.given_amount,
            total_return_amount: total_return_amount,
            return_payment_mode: return_payment_mode,
        });

        setIsModalOpen(false);

        setSelectedTransaction(null);

        if (user.role === "MD")
        {

            getAllTrxnReq();

        } else {

            getAllReqByUser(user.user);

        }

        // 🔑 Refresh balances after any status change
        await fetchBank();

    };

    useEffect(() => {

        if (user.role === "MD")
        {

            getAllTrxnReq();

        } else {

            getAllReqByUser(user.user);

        }

    }, [user, getAllTrxnReq, getAllReqByUser]);

    // Bank data render
    useEffect(() => {

        fetchBank();

    }, [fetchBank]);

    const getStatusStyle = (status) => {

        let icon, style;

        switch (status) {

            case 'Approved':
                icon = <CircleCheck />;
                style = 'flex gap-2 items-center bg-[#D1FAE5] border border-[#10B981] text-[#065F46] p-2 rounded-full';
                break;

            case 'Pending':
                icon = <Clock />
                style = 'flex gap-2 items-center bg-[#FEF3C7] border border-[#F59E0B] text-[#92400E] p-2 rounded-full';
                break;

            case 'Denied':
                icon = <CircleX />
                style = 'flex gap-2 items-center bg-[#FEE2E2] border border-[#EF4444] text-[#991B1B] p-2 rounded-full';
                break;

            case 'Returned':
                icon = <ArrowBigUpDash />;
                style = 'flex gap-2 items-center bg-[#E0E7FF] border border-[#4F46E5] text-[#312E81] p-2 rounded-full';
                break;

            default:
                icon = null;
                style = '';

        }

        return {icon, style};

    };

    const getRequirementTypeStyle = (type) => {

        let icon, style;

        switch (type) {

            case 'Expenses':
                icon = <BanknoteArrowDown />
                style = 'flex gap-2 items-center bg-[#DBEAFE] border border-[#2563EB] text-[#1E40AF] p-2 rounded-full';
                break;

            default:
                icon = null;
                style = '';

        }

        return { icon, style };

    }

    let MdList;
    MdList = Array.isArray(RequirementReqDataListMD) ? RequirementReqDataListMD : [];

    console.log(MdList);

    let UserListData;
    UserListData = Array.isArray(RequirementReqDataListUser) ? RequirementReqDataListUser : [];

    // List of req Data
    const Data = useMemo(() => {
        return user.role === "MD" ? MdList : UserListData;
    }, [user.role, MdList, UserListData]);

    // Render bank data based on user
    let BankDataCIH;
    BankDataCIH = Array.isArray(BankDataList) ? BankDataList : [];

    // Function to open the return model
    const openReturnModal = useCallback((Data) => {

        setSelectedTransaction(Data);

        setIsModalOpen(true);

    }, []);

    // Filtered Data Based on selectedUser
    const filteredData = useMemo(() => {

        let currentData = Data;

        if (selectedUserFilter !== 'All')
        {

            currentData = currentData.filter(item => item.user_name === selectedUserFilter);

        }

        if (selectedMonthFilter)
        {

            currentData = currentData.filter(item => {

                // Extract YYYY-MM from the date string
                const itemMonth = item.created_at.substring(0, 7);

                return itemMonth === selectedMonthFilter;

            });

        }

        // Status Filter
        if (selectedStatusFilter !== 'All')
        {

            currentData = currentData.filter(item => item.status === selectedStatusFilter);

        }

        Data.filter(item => {

            const itemMonth = item.created_at.substring(0, 7);

            console.log(itemMonth);

            return itemMonth === selectedMonthFilter;

        });

        return currentData;

    }, [Data, selectedUserFilter, selectedMonthFilter, selectedStatusFilter]);

    // Get Unique usernames for the filter dropdown
    const uniqueUsers =  useMemo(() => {

        const users = new Set(Data.map(item => item.user_name));

        return ['All', ...Array.from(users).sort()];

    }, [Data]);

    // Get unique status for filter
    const uniqueStatuses = useMemo(() => {

        const status = new Set(Data.map(item => item.status));

        return ['All', ...Array.from(status).sort()];

    }, [Data]);

    // List the data based on the transaction status
    const mainTransaction = filteredData.filter(item => item.status !== "Returned");

    const returnedTransaction = filteredData.filter(item => item.status === "Returned");

    // Total amount
    const { bankTotal, cashTotal, totalCIH, statusSummary } = useMemo(() => {

        let bank = 0, cash = 0;

        BankDataCIH.filter(acc => acc.created_by.user_id === user.id)
            .forEach(acc => {
                bank += parseFloat(acc.bank_amount) || 0;
                cash += parseFloat(acc.cash) || 0;
            });

        let statusCount = {

            Approved: { count: 0, sum: 0 },
            Pending: { count: 0, sum: 0 },
            Denied: { count: 0, sum: 0 },
            Returned: { count: 0, sum: 0 },

        };

        filteredData.forEach(item => {

            const amt = parseFloat(item.amount) || 0;

            const returnAmt = parseFloat(item.total_return_amount) || 0;

            switch (item.status)
            {

                case "Approved":
                    statusCount.Approved.count++;
                    statusCount.Approved.sum += amt;
                    break;

                case "Pending":
                    statusCount.Pending.count++;
                    statusCount.Pending.sum += amt;
                    break;

                case "Denied":
                    statusCount.Denied.count++;
                    statusCount.Denied.sum += amt;
                    break;

                case "Returned":
                    statusCount.Returned.count++;
                    statusCount.Returned.sum += returnAmt;
                    break;

                default:
                    break;

            }

        });

        return {

            cashTotal: cash,
            bankTotal: bank,
            totalCIH: bank + cash,
            statusSummary: statusCount,

        };

    }, [BankDataCIH, filteredData, user.id]);


    // Callback for Handling status changes (Approved/Denied/Pending)
    const ApproveStatusChange = useCallback(async (trxn_id, given_amount, given_payment_mode, given_sender_name, user_name) => {

        await approveStatus(trxn_id, given_amount, given_payment_mode, given_sender_name, user_name);

        if (user.role === "MD")
        {

            await getAllTrxnReq();

        } else {

            await getAllReqByUser(user.user);

        }

        // Refresh balances after any status change
        await fetchBank();

    }, [approveStatus, user.role, user.user, fetchBank, getAllTrxnReq, getAllReqByUser]);

    // Handling Pending and Denied Status
    const PendingDeniedStatusChange = useCallback(async (trxn_id, newStatus, given_amount, given_payment_mode, given_sender_name, user_name) => {

        await PendingDeniedStatus(trxn_id, newStatus, given_amount, given_payment_mode, given_sender_name, user_name);

        if (user.role === "MD")
        {

            await getAllTrxnReq();

        } else {

            await getAllReqByUser(user.user);

        }

        // Refresh balances after any status change
        await fetchBank();

    }, [PendingDeniedStatus, user.role, user.user, fetchBank, getAllTrxnReq, getAllReqByUser]);

    // Open Edit modal and display data
    const openEditModal = useCallback((Data) => {

        setSelectedTransaction(Data)

        setIsEditModalOpen(true);

    }, []);

    // Edit Transaction Request
    const HandleEdit = async (ev) => {

        ev.preventDefault();

        if (!checked) {

            toast.error("Please confirm that the entered cash in hand details are valid.", {
                style: {
                    border: '1px solid #6392E5',
                    color: '#005bea',
                    background: '#f1f1f1',
                }
            });

        } else {

            const {
                trxn_id,
                transaction_title,
                trxn_remarks,
                payment_mode,
                amount,
                expense_type,
                given_payment_mode,
                given_amount,
            } = expReqformData;

            let payload = {
                trxn_id,
                transaction_title,
                trxn_remarks,
                payment_mode,
                expense_type,
                amount,
                given_payment_mode,
                given_amount,
            };

            await updateExpenseTransaction(payload);

            setIsEditModalOpen(false);

            setSelectedTransaction(null);

            if (user.role === "MD")
            {

                await getAllTrxnReq();

            } else {

                await getAllReqByUser(user.user);

            }

            // Refresh balances after any status change
            await fetchBank();

        }



    };
    
    // Delete Transaction
    const HandleDelete = useCallback(async (trxn_id) => {
        
        const deleteSuccess = await DeleteTransaction(trxn_id);
        
        if (deleteSuccess)
        {

            if (user.role === "MD")
            {

                getAllTrxnReq();

            } else {

                getAllReqByUser(user.user);

            }

        }
        
    }, [DeleteTransaction, getAllReqByUser, getAllTrxnReq, user.role, user.user]);

    // Handle Add item for expense
    function AddExpense()
    {

        setFormData(prev => ({
            ...prev,
            expense_items: [
                ...prev.expense_items,
                {
                    expense_description: "",
                    expense_amount: 0,
                }
            ],
        }));

    }

    // Remove Expense item
    function RemoveExpense(index)
    {

        setFormData(prev => {
            const updatedItems = prev.expense_items.filter((_, i) => i !== index);

            // Recalculate total expense
            const totalExpensed = updatedItems.reduce(
                (sum, item) => sum + (Number(item.expense_amount) || 0),
                0
            );

            return {
                ...prev,
                expense_items: updatedItems,
                total_expensed_amount: totalExpensed,
                total_balance_amount: prev.total_requested_amount - totalExpensed,
                total_return_amount: prev.total_requested_amount - totalExpensed,
            };
        });

    }

    // HandleExpense Items
    function HandleAddExpense(index, field, value)
    {

        const updateExpenses = [...formData.expense_items];

        updateExpenses[index][field] = field === "expense_amount" ? Number(value) : value;


        // Recalculate total expense
        const totalExpensed = updateExpenses.reduce(
            (sum, item) => sum + (Number(item.expense_amount) || 0),
            0
        );

        setFormData(prev => ({
            ...prev,
            expense_items: updateExpenses,
            total_expensed_amount: totalExpensed,
            total_balance_amount: prev.total_requested_amount - totalExpensed,
            total_return_amount: prev.total_requested_amount - totalExpensed,
        }));

    }

    if (loading) return <Loading_Screen />;

    return (
        <div>
            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                <motion.div className="relative h-28 flex gap-4 justify-start items-center border border-[#8CAEE9] bg-[#F1F1F1] rounded overflow-hidden"
                            initial={{ opacity: 0, y: 100 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
                >
                    <span className="mx-4 text-[#005BEA] bg-[#D9E1EF] rounded-full p-4">
                        <BadgeIndianRupee />
                    </span>
                    <span className="text-xl text-[#202020]">
                        <p>
                            Cash
                        </p>
                        <p className="flex items-center text-2xl text-[#005BEA]">
                            <IndianRupee />
                            { cashTotal.toLocaleString("en-IN") }
                        </p>
                    </span>

                    <span className="absolute right-0 text-[#005BEA] bg-[#D9E1EF] rounded-full p-14 translate-x-8">
                        <BadgeIndianRupee className="size-12" />
                    </span>
                </motion.div>

                <motion.div className="relative h-28 flex gap-4 justify-start items-center border border-[#8CAEE9] bg-[#F1F1F1] rounded overflow-hidden"
                            initial={{ opacity: 0, y: 100 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4, type: "spring", stiffness: 100 }}
                >
                    <span className="mx-4 text-[#005BEA] bg-[#D9E1EF] rounded-full p-4">
                        <Landmark />
                    </span>
                    <span className="text-xl text-[#202020]">
                        <p>
                            Bank
                        </p>
                        <p className="flex items-center text-2xl text-[#005BEA]">
                            <IndianRupee />
                            { bankTotal.toLocaleString("en-IN") }
                        </p>
                    </span>

                    <span className="absolute right-0 text-[#005BEA] bg-[#D9E1EF] rounded-full p-14 translate-x-8">
                        <Landmark className="size-12" />
                    </span>
                </motion.div>

                <motion.div className="relative h-28 flex gap-4 justify-start items-center border border-[#8CAEE9] bg-[#F1F1F1] rounded overflow-hidden"
                            initial={{ opacity: 0, y: 100 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6, type: "spring", stiffness: 100 }}
                >
                    <span className="mx-4 text-[#005BEA] bg-[#D9E1EF] rounded-full p-4">
                        <HandCoins />
                    </span>
                    <span className="text-xl text-[#202020]">
                        <p>
                            Total CIH
                        </p>
                        <p className="flex items-center text-2xl text-[#005BEA]">
                            <IndianRupee />
                            { totalCIH.toLocaleString("en-IN") }
                        </p>
                    </span>

                    <span className="absolute right-0 text-[#005BEA] bg-[#D9E1EF] rounded-full p-14 translate-x-8">
                        <HandCoins className="size-12" />
                    </span>
                </motion.div>
            </section>

            <motion.hr
                initial={{ opacity: 0, y: 100 }}
                animate={{ y: 0, opacity: 1 }}
                className="border-[#6392E5] my-4"/>

            {/*Conditional Rendering based on role for CIH Dashboard*/}
            {

                user.role === "MD"

                ?

                    (

                        <div>

                            <motion.div initial={{ opacity: 0, y: 100 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.8, type: 'spring', stiffness: 100 }}
                                        className="space-y-4 border border-[#8CAEE9] bg-[#F1F1F1] rounded p-2 my-4">

                                <div className="flex gap-4 items-center">
                                    <motion.div initial={{ opacity: 0, y: 100 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: 0.10, type: 'spring', stiffness: 100 }}
                                                className="bg-[#D9E1EF] text-[#005BEA] rounded p-4">
                                        <Send  />
                                    </motion.div>

                                    <motion.div initial={{ opacity: 0, y: 100 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: 0.12, type: 'spring', stiffness: 100 }} >
                                        <p className="head text-xl text-[#005BEA]">
                                            Transaction Request
                                        </p>

                                        <p>
                                            View all pending user transaction requests that require approval.
                                        </p>
                                    </motion.div>
                                </div>

                            </motion.div>

                        </div>


                    )

                :

                    (

                        <motion.div initial={{ opacity: 0, y: 100 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.8, type: 'spring', stiffness: 100 }}
                                    className="grid gap-4 border border-[#8CAEE9] bg-[#F1F1F1] rounded p-2 my-4">

                            <div className="flex gap-4 items-center">
                                <motion.div initial={{ opacity: 0, y: 100 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.10, type: 'spring', stiffness: 100 }}
                                            className="bg-[#D9E1EF] text-[#005BEA] rounded p-4">
                                    <ListCheck />
                                </motion.div>

                                <motion.div initial={{ opacity: 0, y: 100 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.12, type: 'spring', stiffness: 100 }} >
                                    <p className="head text-xl text-[#005BEA]">
                                        Transaction Status
                                    </p>

                                    <p>
                                        Track the status of your submitted transaction requests
                                    </p>
                                </motion.div>
                            </div>
                        </motion.div>

                    )

            }

            {/*Status Count */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-4 border border-[#8CAEE9] bg-[#F1F1F1] rounded my-4 p-4">
                {['Approved', 'Denied', 'Pending', 'Returned'].map((status, index) => {
                    const { count, sum } = statusSummary[status] || { count: 0, sum: 0 };

                    const styleMap = {
                        Approved: {
                            bg: "bg-[#D1FAE5]",
                            border: "border-[#10B981]",
                            text: "text-[#065F46]",
                            icon: <CircleCheck />,
                            title: "Total amount of approved transaction"
                        },
                        Denied: {
                            bg: "bg-[#FEE2E2]",
                            border: "border-[#EF4444]",
                            text: "text-[#991B1B]",
                            icon: <CircleX />,
                            title: "Total amount of denied transaction"
                        },
                        Pending: {
                            bg: "bg-[#FEF3C7]",
                            border: "border-[#F59E0B]",
                            text: "text-[#92400E]",
                            icon: <Clock />,
                            title: "Total amount of pending transaction"
                        },
                        Returned: {
                            bg: "bg-[#E0E7FF]",
                            border: "border-[#4F46E5]",
                            text: "text-[#312E81]",
                            icon: <ArrowBigUpDash />,
                            title: "Total amount of returned transaction"
                        }
                    };

                    const { bg, border, text, icon, title } = styleMap[status];

                    return (
                        <motion.div
                            key={status}
                            initial={{ opacity: 0, y: 100 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 + index * 0.2, type: 'spring', stiffness: 100 }}
                            className={`grid grid-cols-2 gap-2 items-center ${bg} border ${border} ${text} p-4 rounded`}>
                            <div className="flex gap-2 items-center text-xl">
                                {icon}
                                <p title={title}>{status}</p>
                                <p>({count})</p>
                            </div>
                            <div className="flex justify-end items-center text-4xl">
                                <IndianRupee />
                                <p>{sum.toLocaleString('en-IN')}</p>
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            {/*User Filter Dropdown*/}

            {

                user.role === "MD"

                ?

                    (

                        <motion.div className="grid md:flex items-center gap-4 border border-[#8CAEE9] bg-[#F1F1F1] rounded my-4 p-4"
                            initial={{opacity: 0, y: 100}}
                            animate={{y: 0, opacity: 1}}
                            transition={{ delay: 0.14, type: "spring", stiffness: 100 }}>
                            <label className="text-[#005BEA]" htmlFor="user-filter">

                                Filter by User:

                            </label>

                            <select
                                className="p-2 border border-[#6392E5] rounded-md bg-transparent text-[#202020] focus:outline-none focus:ring-2 focus:ring-[#005BEA]"
                                value={selectedUserFilter}
                                onChange={(ev) => setSelectedUserFilter(ev.target.value)}>
                                {

                                    uniqueUsers.map(userOption => (

                                        <option key={userOption} value={userOption}>
                                            {userOption}
                                        </option>

                                    ))

                                }
                            </select>

                            <label className="text-[#005BEA]" htmlFor="user-filter">

                                Filter by Month:

                            </label>

                            <input type="month"
                                   className="p-2 border border-[#6392E5] rounded-md bg-transparent text-[#202020] focus:outline-none focus:ring-2 focus:ring-[#005BEA]"
                                   value={selectedMonthFilter}
                                   onChange={(ev) => setSelectedMonthFilter(ev.target.value)}/>

                            <label htmlFor="status-filter" className="text-[#005BEA]">
                                Filter by Status:
                            </label>

                            <select
                                id="status-filter"
                                className="p-2 border border-[#6392E5] rounded-md bg-transparent text-[#202020] focus:outline-none focus:ring-2 focus:ring-[#005BEA]"
                                value={selectedStatusFilter}
                                onChange={(e) => setSelectedStatusFilter(e.target.value)}
                            >
                                {

                                    uniqueStatuses.map(statusOption => (

                                        <option key={statusOption} value={statusOption}>{statusOption}</option>

                                    ))

                                }
                            </select>

                        </motion.div>


                    )
                :

                    (

                        <motion.div className="grid md:flex items-center gap-4 border border-[#8CAEE9] bg-[#F1F1F1] rounded my-4 p-4"
                            initial={{opacity: 0, y: 100}}
                            animate={{y: 0, opacity: 1}}
                            transition={{ delay: 0.16, type: "spring", stiffness: 100 }}>
                            <label className="text-[#005BEA]" htmlFor="user-filter">

                                Filter by Month:

                            </label>

                            <input type="month"
                                   className="p-2 border border-[#6392E5] rounded-md bg-transparent text-[#202020] focus:outline-none focus:ring-2 focus:ring-[#005BEA]"
                                   value={selectedMonthFilter}
                                   onChange={(ev) => setSelectedMonthFilter(ev.target.value)}/>
                            <label htmlFor="status-filter" className="text-[#005BEA]">
                                Filter by Status:
                            </label>

                            <select
                                id="status-filter"
                                className="p-2 border border-[#6392E5] rounded-md bg-transparent text-[#202020] focus:outline-none focus:ring-2 focus:ring-[#005BEA]"
                                value={selectedStatusFilter}
                                onChange={(e) => setSelectedStatusFilter(e.target.value)}
                            >
                                {

                                    uniqueStatuses.map(statusOption => (

                                        <option key={statusOption} value={statusOption}>{statusOption}</option>

                                    ))

                                }
                            </select>

                        </motion.div>


                    )


            }

            {/*Main Card Display*/}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                {

                    mainTransaction.length > 0

                        ?
                        (

                            mainTransaction.map((item, index) => {

                                const { icon, style } = getStatusStyle(item.status);

                                const { icon: requirementIcon, style: requirementStyle } = getRequirementTypeStyle(item.requirement_type);

                                const delay = 0.1 + index * 0.1

                                return (

                                <motion.div key={index} className="flex flex-col gap-4 border border-[#8CAEE9] bg-[#F1F1F1] hover:scale-102 transition-all duration-200 rounded p-4"
                                    initial={{opacity: 0, y: 100 }}
                                    animate={{y: 0, opacity: 1}}
                                    transition={{ delay, type: "spring", stiffness: 100 }}>

                                    <div className="flex gap-4 justify-between items-center">

                                        <p className="flex items-center gap-2 font-bold text-[#005BEA] text-xl tracking-widest">
                                            <Info />
                                            { item.transaction_title }
                                        </p>

                                        <div className={style}>

                                            { icon }
                                            { item.status }

                                        </div>

                                    </div>

                                    <hr className="border-t border-[#8CAEE9]"/>

                                    <div className="flex gap-2 items-center text-[#005BEA]">
                                        <Users />
                                        <p className="font-bold text-lg">Requested By (Employee)</p>
                                    </div>

                                    <div className="flex gap-4 items-center">
                                                        <span className="text-[#005BEA]">
                                                            <User />
                                                        </span>
                                        <p className="flex gap-2">
                                            <strong>
                                                Requested By:
                                            </strong>
                                            { item.user_name }
                                        </p>
                                    </div>

                                    <div className="flex gap-4 items-center">
                                        <span className="text-[#005BEA]">
                                            <Briefcase />
                                        </span>
                                        <p className="flex gap-2">
                                            <strong>
                                                Designation:
                                            </strong>
                                            { item.user_designation }
                                        </p>
                                    </div>

                                    <div className="flex gap-4 items-center">
                                        <span className="text-[#005BEA]">
                                            <Calendar />
                                        </span>
                                        <p className="flex gap-2">
                                            <strong>
                                                Date:
                                            </strong>
                                            { new Date(item.given_date).toDateString() }
                                        </p>
                                    </div>

                                    <div className="flex gap-4 items-center">
                                                        <span className="text-[#005BEA]">
                                                            <Tag />
                                                        </span>
                                        <p className="flex gap-2">
                                            <strong>
                                                Purpose:
                                            </strong>
                                            { item.trxn_remarks }
                                        </p>
                                    </div>

                                    <div className="flex gap-4 items-center">
                                        <span className="text-[#005BEA]">
                                            <ReceiptIndianRupee />
                                        </span>
                                        <p className="flex gap-2">
                                            <strong>
                                                Fund Flow:
                                            </strong>
                                            { item.cash_flow_type === "Cash Given" ? "Fund provided by MD" : "Funds Returned by Employee" }
                                        </p>
                                    </div>

                                    <div className="flex gap-4 items-center">
                                        <span className="text-[#005BEA]">
                                            <Banknote />
                                        </span>
                                        <p className="flex gap-2">
                                            <strong>
                                                Preferred Payment Mode:
                                            </strong>
                                            { item.payment_mode }
                                        </p>
                                    </div>

                                    <div className="flex gap-4 items-center">
                                                        <span className="text-[#005BEA]">
                                                            <ArrowBigDownDash />
                                                        </span>
                                        <p className="flex gap-2">
                                            <strong>
                                                Expense Category::
                                            </strong>
                                            { item.expense_type }
                                        </p>
                                    </div>

                                    <div className="flex gap-4 items-center">
                                        <span className="text-[#005BEA]">
                                            <Tag />
                                        </span>
                                        <p className="flex items-center gap-2">
                                            <strong>
                                                Request Type:
                                            </strong>
                                            <span className={requirementStyle}>
                                                { requirementIcon }
                                                { item.requirement_type }
                                            </span>
                                        </p>
                                    </div>

                                    <hr className="border-t border-[#8CAEE9]"/>

                                    <div className="space-y-4">
                                        <div className="flex gap-2 items-center text-[#005BEA]">
                                            <Handshake />
                                            <p className="text-xl font-bold">
                                                Approved & Given By (MD)
                                            </p>
                                        </div>
                                        <div className="flex gap-4 items-center">
                                            <span className="text-[#005BEA]">
                                                <User />
                                            </span>
                                            <p className="flex gap-2">
                                                <strong>
                                                    Given By:
                                                </strong>
                                                { item.given_sender_name }
                                            </p>
                                        </div>

                                        <div className="flex gap-4 items-center">
                                            <span className="text-[#005BEA]">
                                                <Briefcase />
                                            </span>
                                            <p className="flex gap-2">
                                                <strong>
                                                    Designation:
                                                </strong>
                                                { item.given_sender_designation }
                                            </p>
                                        </div>

                                        <div className="flex gap-4 items-center">
                                            <span className="text-[#005BEA]">
                                                <User />
                                            </span>
                                            <p className="flex gap-2">
                                                <strong>
                                                    Payment Mode Used:
                                                </strong>
                                                { item.given_payment_mode }
                                            </p>
                                        </div>

                                        <div className="flex gap-4 items-center">
                                            <span className="text-[#005BEA]">
                                                <IndianRupee />
                                            </span>
                                            <p className="flex gap-2">
                                                <strong>
                                                    Amount Given:
                                                </strong>
                                                { item.given_amount }
                                            </p>
                                        </div>
                                    </div>

                                    <hr className="border-t border-[#8CAEE9]"/>

                                    <div className="flex flex-wrap gap-4 justify-between items-center text-xl">

                                        <div className="flex gap-1 items-center text-[#005BEA]">
                                            <span>
                                                <IndianRupee />
                                            </span>

                                            <strong>
                                                { item.amount }
                                            </strong>
                                        </div>

                                        <div>
                                            {

                                                user.role === "MD" && item.status !== 'Returned'

                                                ?

                                                    (

                                                        <div className="flex flex-wrap gap-2 justify-start items-center">
                                                            <button title="Approved" onClick={() => ApproveStatusChange(item.trxn_id, item.given_amount, item.given_payment_mode, item.given_sender_name, item.user_name)}
                                                                    className="flex gap-2 items-center bg-[#D1FAE5] border border-[#10B981] text-[#065F46] cursor-pointer p-2 rounded">
                                                                <CircleCheck />
                                                                <span className="hidden">Approved</span>
                                                            </button>

                                                            <button title="Denied" onClick={() => PendingDeniedStatusChange(item.trxn_id, "Denied", item.given_amount, item.given_payment_mode, item.given_sender_name, item.user_name)}
                                                                    className="flex gap-2 items-center bg-[#FEE2E2] border border-[#EF4444] text-[#991B1B] cursor-pointer p-2 rounded">
                                                                <CircleX />
                                                                <span className="hidden">Denied</span>
                                                            </button>

                                                            <button title="Pending" onClick={() => PendingDeniedStatusChange(item.trxn_id, "Pending", item.given_amount, item.given_payment_mode, item.given_sender_name, item.user_name)}
                                                                    className="flex gap-2 items-center bg-[#FEF3C7] border border-[#F59E0B] text-[#92400E] cursor-pointer p-2 rounded">
                                                                <Clock />
                                                                <span className="hidden">Pending</span>
                                                            </button>

                                                            <button title="Edit"
                                                                    onClick={() => openEditModal(item)}
                                                                    className="flex gap-2 items-center bg-[#D9E1EF] border border-[#8CAEE9] text-[#005BEA] cursor-pointer p-2 rounded">
                                                                <SquarePen />
                                                                <span className="hidden">Edit</span>
                                                            </button>

                                                            <button title="Delete"
                                                                    onClick={() => HandleDelete(item.trxn_id)}
                                                                    className="flex gap-2 items-center bg-[#FEE2E2] border border-[#EF4444] text-[#991B1B] cursor-pointer p-2 rounded">
                                                                <Trash />
                                                                <span className="hidden">Delete</span>
                                                            </button>

                                                            {

                                                                item.status === 'Approved'

                                                                &&

                                                                (
                                                                    <div className="flex flex-wrap gap-2 items-center">
                                                                        <div className="h-10 border-r-1 border-[#8CAEE9]/50"></div>
                                                                        <button title="Cash Return" onClick={() => openReturnModal(item)}
                                                                                className="flex gap-2 items-center bg-[#E0E7FF] border border-[#4F46E5] text-[#312E81] cursor-pointer p-2 rounded">
                                                                            <RotateCcw />
                                                                            <span className="hidden">Return</span>
                                                                        </button>
                                                                    </div>

                                                                )

                                                            }

                                                        </div>

                                                    )

                                                :

                                                    (

                                                        <div>
                                                            {

                                                                item.status !== 'Returned'

                                                                &&

                                                                (

                                                                    <div className="flex flex-wrap gap-2 justify-start items-center">
                                                                        <button title="Edit"
                                                                                onClick={() => openEditModal(item)}
                                                                                className="flex gap-2 items-center bg-[#D9E1EF] border border-[#8CAEE9] text-[#005BEA] cursor-pointer p-2 rounded">
                                                                            <SquarePen />
                                                                            <span className="hidden">Edit</span>
                                                                        </button>

                                                                        <button title="Delete"
                                                                                onClick={() => HandleDelete(item.trxn_id)}
                                                                                className="flex gap-2 items-center bg-[#FEE2E2] border border-[#EF4444] text-[#991B1B] cursor-pointer p-2 rounded">
                                                                            <Trash />
                                                                            <span className="hidden">Delete</span>
                                                                        </button>

                                                                        {

                                                                            item.status === 'Approved'

                                                                            &&

                                                                            (
                                                                                <div className="flex flex-wrap gap-2 items-center">
                                                                                    <div className="h-10 border-r-1 border-[#8CAEE9]/50"></div>
                                                                                    <button title="Cash Return" onClick={() => openReturnModal(item)}
                                                                                            className="flex gap-2 items-center bg-[#E0E7FF] border border-[#4F46E5] text-[#312E81] cursor-pointer p-2 rounded">
                                                                                        <RotateCcw />
                                                                                        <span className="hidden">Return</span>
                                                                                    </button>
                                                                                </div>

                                                                            )

                                                                        }
                                                                    </div>

                                                                )

                                                            }
                                                        </div>



                                                    )

                                            }
                                        </div>

                                    </div>

                                </motion.div>

                            )})

                        )

                        :

                        (

                            // Empty Display Msg
                            <div className="col-span-full flex flex-col border border-[#8CAEE9] gap-4 justify-center items-center tracking-widest rounded p-16 my-4">
                                <div className="grid justify-center">
                                    <img className="w-60" src={emptyBox} alt="empty-box-img"/>
                                </div>
                                <div className="grid text-center gap-4">
                                    <p className="text-2xl text-[#202020]">
                                        Empty.........!
                                    </p>
                                    <p className="text-xl text-[#005BEA]">
                                        No Request Data Presented or it been expensed and returned.
                                    </p>
                                </div>

                            </div>

                        )

                }

            </div>


            <div>

                <motion.div initial={{ opacity: 0, y: 100 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.8, type: 'spring', stiffness: 100 }}
                            className="space-y-4 border border-[#8CAEE9] bg-[#F1F1F1] rounded p-2 my-4">

                    <div className="flex gap-4 items-center">
                        <motion.div initial={{ opacity: 0, y: 100 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.10, type: 'spring', stiffness: 100 }}
                                    className="bg-[#D9E1EF] text-[#005BEA] rounded p-4">
                            <ListChecks  />
                        </motion.div>

                        <motion.div initial={{ opacity: 0, y: 100 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.12, type: 'spring', stiffness: 100 }} >
                            <p className="head text-xl text-[#005BEA]">
                                Cash Returned
                            </p>

                            <p>
                                View all cash returned transactions.
                            </p>
                        </motion.div>
                    </div>

                </motion.div>


                {/*Returned Card Display*/}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                    {

                        returnedTransaction.length > 0

                            ?
                            (

                                returnedTransaction.map((item, index) => {

                                    const { icon, style } = getStatusStyle(item.status);

                                    const { icon: requirementIcon, style: requirementStyle } = getRequirementTypeStyle(item.requirement_type);

                                    const delay = 0.1 + index * 0.1

                                    return (

                                        <motion.div key={index} className="flex flex-col gap-4 border border-[#8CAEE9] bg-[#F1F1F1] hover:scale-102 transition-all duration-200 rounded p-4"
                                                    initial={{opacity: 0, y: 100 }}
                                                    animate={{y: 0, opacity: 1}}
                                                    transition={{ delay, type: "spring", stiffness: 100 }}>

                                            <div className="flex gap-4 justify-between items-center">

                                                <p className="flex items-center gap-2 font-bold text-[#005BEA] text-xl tracking-widest">
                                                    <Info />
                                                    { item.transaction_title }
                                                </p>

                                                <div className={style}>

                                                    { icon }
                                                    { item.status }

                                                </div>

                                            </div>

                                            <hr className="border-t border-[#8CAEE9]"/>

                                            <div className="flex gap-2 items-center text-[#005BEA]">
                                                <Users />
                                                <p className="font-bold text-lg">Requested By (Employee)</p>
                                            </div>

                                            <div className="flex gap-4 items-center">
                                                        <span className="text-[#005BEA]">
                                                            <User />
                                                        </span>
                                                <p className="flex gap-2">
                                                    <strong>
                                                        Requested By:
                                                    </strong>
                                                    { item.user_name }
                                                </p>
                                            </div>

                                            <div className="flex gap-4 items-center">
                                        <span className="text-[#005BEA]">
                                            <Briefcase />
                                        </span>
                                                <p className="flex gap-2">
                                                    <strong>
                                                        Designation:
                                                    </strong>
                                                    { item.user_designation }
                                                </p>
                                            </div>

                                            <div className="flex gap-4 items-center">
                                        <span className="text-[#005BEA]">
                                            <Calendar />
                                        </span>
                                                <p className="flex gap-2">
                                                    <strong>
                                                        Date:
                                                    </strong>
                                                    { new Date(item.given_date).toDateString() }
                                                </p>
                                            </div>

                                            <div className="flex gap-4 items-center">
                                                        <span className="text-[#005BEA]">
                                                            <Tag />
                                                        </span>
                                                <p className="flex gap-2">
                                                    <strong>
                                                        Purpose:
                                                    </strong>
                                                    { item.trxn_remarks }
                                                </p>
                                            </div>

                                            <div className="flex gap-4 items-center">
                                        <span className="text-[#005BEA]">
                                            <ReceiptIndianRupee />
                                        </span>
                                                <p className="flex gap-2">
                                                    <strong>
                                                        Fund Flow:
                                                    </strong>
                                                    { item.cash_flow_type === "Cash Given" ? "Fund provided by MD" : "Funds Returned by Employee" }
                                                </p>
                                            </div>

                                            <div className="flex gap-4 items-center">
                                        <span className="text-[#005BEA]">
                                            <Banknote />
                                        </span>
                                                <p className="flex gap-2">
                                                    <strong>
                                                        Preferred Payment Mode:
                                                    </strong>
                                                    { item.payment_mode }
                                                </p>
                                            </div>

                                            <div className="flex gap-4 items-center">
                                                        <span className="text-[#005BEA]">
                                                            <ArrowBigDownDash />
                                                        </span>
                                                <p className="flex gap-2">
                                                    <strong>
                                                        Expense Category::
                                                    </strong>
                                                    { item.expense_type }
                                                </p>
                                            </div>

                                            <div className="flex gap-4 items-center">
                                        <span className="text-[#005BEA]">
                                            <Tag />
                                        </span>
                                                <p className="flex items-center gap-2">
                                                    <strong>
                                                        Request Type:
                                                    </strong>
                                                    <span className={requirementStyle}>
                                                { requirementIcon }
                                                        { item.requirement_type }
                                            </span>
                                                </p>
                                            </div>

                                            <hr className="border-t border-[#8CAEE9]"/>

                                            <div className="space-y-4">
                                                <div className="flex gap-2 items-center text-[#005BEA]">
                                                    <Handshake />
                                                    <p className="text-xl font-bold">
                                                        Approved & Given By (MD)
                                                    </p>
                                                </div>
                                                <div className="flex gap-4 items-center">
                                            <span className="text-[#005BEA]">
                                                <User />
                                            </span>
                                                    <p className="flex gap-2">
                                                        <strong>
                                                            Given By:
                                                        </strong>
                                                        { item.given_sender_name }
                                                    </p>
                                                </div>

                                                <div className="flex gap-4 items-center">
                                            <span className="text-[#005BEA]">
                                                <Briefcase />
                                            </span>
                                                    <p className="flex gap-2">
                                                        <strong>
                                                            Designation:
                                                        </strong>
                                                        { item.given_sender_designation }
                                                    </p>
                                                </div>

                                                <div className="flex gap-4 items-center">
                                            <span className="text-[#005BEA]">
                                                <User />
                                            </span>
                                                    <p className="flex gap-2">
                                                        <strong>
                                                            Payment Mode Used:
                                                        </strong>
                                                        { item.given_payment_mode }
                                                    </p>
                                                </div>

                                                <div className="flex gap-4 items-center">
                                            <span className="text-[#005BEA]">
                                                <IndianRupee />
                                            </span>
                                                    <p className="flex gap-2">
                                                        <strong>
                                                            Amount Given:
                                                        </strong>
                                                        { item.given_amount }
                                                    </p>
                                                </div>
                                            </div>

                                            <hr className="border-t border-[#8CAEE9]"/>

                                            <div className="flex flex-wrap gap-4 justify-between items-center text-xl">

                                                <div className="flex gap-1 items-center text-[#005BEA]">
                                            <span>
                                                <IndianRupee />
                                            </span>

                                                    <strong>
                                                        { item.amount }
                                                    </strong>
                                                </div>


                                            </div>

                                        </motion.div>

                                    )})

                            )
                            :

                            (

                                <div className="col-span-full flex flex-col border border-[#8CAEE9] gap-4 justify-center items-center tracking-widest rounded p-16 my-4">
                                    <div className="grid justify-center">
                                        <img className="w-60" src={emptyBox} alt="empty-box-img"/>
                                    </div>
                                    <div className="grid text-center gap-4">
                                        <p className="text-2xl text-[#202020]">
                                            Empty.........!
                                        </p>
                                        <p className="text-xl text-[#005BEA]">
                                            No Request Data Presented.
                                        </p>
                                    </div>

                                </div>

                            )

                    }

                </div>


            </div>

            {/*Edit Modal*/}
            {

                isEditModalOpen && selectedTransaction

                &&

                (

                    <div className="fixed inset-0 bg-[#202020]/50 flex items-center justify-center backdrop-blur-xs z-50">
                        <motion.div initial={{ opacity: 0, x: 100, y: 100, rotate: 10 }}
                                    animate={{ opacity: 1 , x: 0, y: 0, rotate: 0 }}
                                    transition={{ delay: 0.2, type: 'spring', stiffness: 100 }}
                                    className="bg-[#F1F1F1] rounded w-11/12 h-9/10 md:w-1/2 lg:w-1/2 shadow-xl overflow-y-auto scroll-smooth">
                            <div className="sticky top-0 flex justify-between items-center bg-[#D9E1EF] rounded p-4 z-20">
                                <h2 className="flex gap-2 items-center text-xl text-[#005BEA]">
                                    <SquarePen />
                                    Edit Transaction Request
                                </h2>
                                <button onClick={() => setIsEditModalOpen(false)} className="cursor-pointer text-gray-500 hover:text-gray-700">
                                    <X />
                                </button>
                            </div>

                            <form onSubmit={HandleEdit} className="grid gap-4 p-4">

                                {/* Transaction Type Label */}
                                <div>

                                    <div>
                                        <p className="flex gap-2 items-center head text-[#005BEA] text-xl">
                                            <User />
                                            Receiver Details (Employee Requesting Funds)
                                        </p>
                                        <p className="text-sm text-gray-600">
                                            Fill in the purpose and details of why you need funds.
                                        </p>
                                    </div>

                                    <div className="grid md:grid-cols-1 xl:grid-cols-1 gap-10 text-[#202020] py-6">
                                        <motion.label
                                            initial={{ opacity: 0, y: 100 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.3}}
                                            className="grid" htmlFor="name">
                                            <span className="mx-2">Transaction Title</span>
                                            <input type="text"
                                                   value={expReqformData.transaction_title}
                                                   onChange={(ev) => {setExpReqformData({ ...expReqformData, transaction_title: ev.target.value })}}
                                                   className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                                   placeholder="Enter the Name" required/>
                                        </motion.label>
                                    </div>


                                    <div className="grid md:grid-cols-1 xl:grid-cols-1 gap-10">
                                        <motion.label
                                            initial={{ opacity: 0, y: 100 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.2 }}
                                            className="grid" htmlFor="remarks">
                                            <span className="mx-2">Transaction Description</span>
                                            <textarea
                                                value={expReqformData.trxn_remarks}
                                                onChange={(ev) => {setExpReqformData({ ...expReqformData, trxn_remarks: ev.target.value })}}
                                                className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                                placeholder="Enter the Description" required>
                                            </textarea>
                                        </motion.label>
                                    </div>
                                </div>


                                <div className="grid gap-10 text-[#202020] py-6">
                                    <motion.label
                                        initial={{ opacity: 0, y: 100 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.3}}
                                        className="grid" htmlFor="name">
                                        <span className="mx-2">Your Name</span>
                                        <input type="text"
                                               disabled={true}
                                               value={expReqformData.user_name}
                                               onChange={(ev) => {setExpReqformData({ ...expReqformData, user_name: ev.target.value })}}
                                               className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                               placeholder="Enter the Name" required/>
                                    </motion.label>

                                    <motion.label initial={{ opacity: 0, y: 100 }}
                                                  animate={{ opacity: 1, y: 0 }}
                                                  transition={{ delay: 0.4 }}
                                                  className="grid" htmlFor="designation">
                                        <span className="mx-2">Your Designation</span>
                                        <select name="designation"
                                                value={expReqformData.user_designation}
                                                disabled={true}
                                                onChange={(ev) => {setExpReqformData({ ...expReqformData, user_designation: ev.target.value })}}
                                                className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                                placeholder="Select Your Designation">
                                            <option>
                                                Select Your Designation
                                            </option>
                                            <option value="MD">MD</option>
                                            <option value="Accountant">Accountant</option>
                                            <option value="Site Supervisor">Site Supervisor</option>
                                            <option value="Other Individuals">Other Individuals</option>
                                        </select>
                                    </motion.label>

                                    <motion.label
                                        initial={{ opacity: 0, y: 100 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.5 }}
                                        className="grid" htmlFor="paymentmode">
                                        <span className="mx-2">Payment Mode</span>
                                        <select name="paymentmode"
                                                value={expReqformData.payment_mode}
                                                onChange={(ev) => { setExpReqformData({ ...expReqformData, payment_mode: ev.target.value })}}
                                                className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                                placeholder="Select Your Payment Mode">
                                            <option>
                                                Select Your Payment Mode
                                            </option>
                                            <option>UPI</option>
                                            <option>Bank</option>
                                            <option>Cash</option>
                                        </select>
                                    </motion.label>

                                    <motion.label
                                        initial={{ opacity: 0, y: 100 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.6 }}
                                        className="grid" htmlFor="type">
                                        <span className="mx-2">Expense Type</span>
                                        <select name="Type"
                                                value={expReqformData.expense_type}
                                                onChange={(ev) => { setExpReqformData({ ...expReqformData, expense_type: ev.target.value })}}
                                                className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                                placeholder="Indirect/Direct">
                                            <option>
                                                Select Your Type
                                            </option>
                                            <option>Direct</option>
                                            <option>Indirect</option>
                                        </select>
                                    </motion.label>
                                    <div className="grid">
                                        <motion.span className="flex gap-4 border-l-10 border-[#005BEA] bg-[#F1F1F1] drop-shadow-lg p-4"
                                                     initial={{opacity: 0, y: 100}}
                                                     animate={{opacity: 1, y: 0}}
                                                     transition={{delay: 0.7}}>
                                            <div className="flex text-[#005BEA] items-center">
                                                <BadgeInfo />
                                            </div>
                                            <div>
                                                <p>
                                                    Payment mode - Whether the expense transaction take place in form original cash or bank
                                                </p>
                                            </div>
                                        </motion.span>
                                    </div>
                                </div>


                                <div className="grid md:grid-cols-1 xl:grid-cols-1 gap-10">
                                    <motion.label
                                        initial={{ opacity: 0, y: 100 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.8 }}
                                        className="grid" htmlFor="amount">
                                        <span className="mx-2">Requested Amount</span>
                                        <input type="text"
                                               value={expReqformData.amount}
                                               onChange={(ev) => { const value = ev.target.value;
                                                   setExpReqformData({ ...expReqformData, amount: value, given_amount: value })}}
                                               className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                               placeholder="Enter the Amount" required/>
                                    </motion.label>
                                </div>




                                {/* Payment mode - Whether the expense trxn take place in form og cash or bank*/}

                                <div className="grid md:grid lg:grid xl:grid gap-2 my-6">
                                    <div
                                        className="grid md:flex lg:flex xl:flex justify-between items-center text-xl border border-[#6392E5] rounded p-4">
                                        <motion.label
                                            className="flex text-[#005BEA] gap-2"
                                            initial={{opacity: 0, y: 100}}
                                            animate={{opacity: 1, y: 0}}
                                            transition={{delay: 0.2}}
                                            htmlFor="box">
                                            Total Requested Amount
                                        </motion.label>


                                        <motion.div
                                            initial={{opacity: 0, y: 100}}
                                            animate={{opacity: 1, y: 0}}
                                                                transition={{delay: 0.3}}>
                                            <span className="flex gap-2 items-center text-[#005BEA] py-4">
                                                <IndianRupee/>
                                                {expReqformData.amount}
                                            </span>
                                        </motion.div>
                                    </div>
                                </div>

                                {/* Cash Given */}
                                <div>

                                    <div>
                                        <p className="flex gap-2 items-center head text-[#005BEA] text-xl">
                                            <Briefcase />
                                            Sender Details (Funds Given By MD)
                                        </p>
                                        <p className="text-sm text-gray-600">
                                            This section records how the MD or authorized person gives you the
                                            funds.
                                        </p>
                                    </div>

                                    {/*Cash Flow Type*/}
                                    <div className="grid md:grid-cols-1 xl:grid-cols-1 gap-10  text-[#202020] py-6">
                                        <motion.label
                                            initial={{ opacity: 0, y: 100 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.1 }}
                                            className="grid" htmlFor="cashflow">
                                            <span className="mx-2">Cash flow Type</span>
                                            <select name="cashflow"
                                                    disabled={true}
                                                    value={expReqformData.cash_flow_type}
                                                    onChange={(ev) => {
                                                        setExpReqformData({ ...expReqformData, cash_flow_type: ev.target.value})
                                                    }}
                                                    className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                                    placeholder="Select Your Payment Mode">
                                                <option>
                                                    Select Your Type
                                                </option>
                                                <option>Cash Given</option>
                                            </select>
                                        </motion.label>
                                    </div>

                                    <motion.span
                                        className="flex gap-4 border-l-10 border-[#005BEA] bg-[#F1F1F1] drop-shadow-lg p-4"
                                        initial={{opacity: 0, y: 100}}
                                        animate={{opacity: 1, y: 0}}
                                        transition={{delay: 0.7}}>
                                        <div className="flex text-[#005BEA] items-center">
                                            <BadgeInfo />
                                        </div>
                                        <div>
                                            <p>
                                                <strong>Cash Flow Type:</strong> <span className="text-[#005BEA]">Cash Given</span><br />
                                                This means the MD (sender) is providing cash to you (receiver) for this request.
                                            </p>
                                        </div>
                                    </motion.span>


                                    <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1 gap-10 my-6">
                                        <motion.label
                                            initial={{opacity: 0, y: 100}}
                                            animate={{opacity: 1, y: 0}}
                                            transition={{delay: 0.3}}
                                            className="grid" htmlFor="date">
                                            <span className="mx-2">Date</span>
                                            <input type="date"
                                                   value={ expReqformData.given_date }
                                                   disabled={true}
                                                   onChange={ (ev) => setExpReqformData({ ...expReqformData, given_date: ev.target.value }) }
                                                   className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                                   placeholder="DD-MM-YYYY" required/>
                                        </motion.label>

                                        <motion.label
                                            initial={{ opacity: 0, y: 100 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.4}}
                                            className="grid" htmlFor="name">
                                            <span className="mx-2">Sender Name</span>
                                            <input type="text" value={ expReqformData.given_sender_name }
                                                    disabled={true}
                                                    onChange={ (ev) => setExpReqformData({ ...expReqformData, given_sender_name: ev.target.value }) }
                                                    className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                                    placeholder="Enter the Name" required />

                                        </motion.label>
                                        <motion.label initial={{ opacity: 0, y: 100 }}
                                                      animate={{ opacity: 1, y: 0 }}
                                                      transition={{ delay: 0.5 }}
                                                      className="grid" htmlFor="designation">
                                            <span className="mx-2">Designation</span>
                                            <input type="text" name="designation"
                                                    value={ expReqformData.given_sender_designation }
                                                    disabled={true}
                                                    onChange={ (ev) => setExpReqformData({ ...expReqformData, given_sender_designation: ev.target.value }) }
                                                    className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                                    placeholder="Select Your Designation" />
                                        </motion.label>
                                        <motion.label
                                            initial={{ opacity: 0, y: 100 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.6 }}
                                            className="grid" htmlFor="paymentmode">
                                            <span className="mx-2">Payment Mode</span>
                                            <select name="paymentmode"
                                                    value={ expReqformData.given_payment_mode }
                                                    onChange={ (ev) => setExpReqformData({ ...expReqformData, given_payment_mode: ev.target.value }) }
                                                    className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                                    placeholder="Select Your Payment Mode">
                                                <option>
                                                    Select Your Payment Mode
                                                </option>
                                                <option>UPI</option>
                                                <option>Bank</option>
                                                <option>Cash</option>
                                            </select>
                                        </motion.label>
                                        <motion.label
                                            initial={{ opacity: 0, y: 100 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.7 }}
                                            className="grid" htmlFor="amount">
                                            <span className="mx-2">Given Amount</span>
                                            <input type="text"
                                                   value={expReqformData.given_amount}
                                                   disabled={true}
                                                   onChange={ev => setExpReqformData({ ...expReqformData, givenAmount: ev.target.value }) }
                                                   className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                                   placeholder="Enter the Amount" required/>
                                        </motion.label>
                                    </div>

                                    <div className="grid md:grid lg:grid xl:grid gap-2 my-6">
                                        <div
                                            className="grid md:flex lg:flex xl:flex justify-between items-center text-xl border border-[#6392E5] rounded p-4">
                                            <motion.label
                                                className="flex text-[#005BEA] gap-2"
                                                initial={{opacity: 0, y: 100}}
                                                animate={{opacity: 1, y: 0}}
                                                transition={{delay: 0.8 }}
                                                htmlFor="box">
                                                Total Given Amount
                                            </motion.label>


                                            <motion.div
                                                initial={{opacity: 0, y: 100}}
                                                animate={{opacity: 1, y: 0}}
                                                transition={{delay: 0.3}}>
                                                <span className="flex gap-2 items-center text-[#005BEA] py-4">
                                                    <IndianRupee/>
                                                    {expReqformData.given_amount}
                                                </span>
                                            </motion.div>
                                        </div>
                                    </div>


                                </div>

                                <div className="grid md:grid lg:grid xl:grid justify-between items-center">
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

                                            <motion.button
                                                type="submit"
                                                className="flex gap-2 items-center cursor-pointer text-xl border border-[#6392E5] bg-[#D9E1EF] text-[#005BEA] hover:bg-[#C9D8F3] px-4 py-2 w-fit rounded"
                                                initial={{opacity: 0, y: 100}}
                                                animate={{opacity: 1, y: 0}}
                                                transition={{delay: 0.3}}>
                                                  <span className="flex gap-2 justify-center items-center">
                                                        <Send />
                                                        Update Request
                                                  </span>
                                            </motion.button>

                                        )


                                }


                            </form>


                        </motion.div>
                    </div>

                )

            }


            {/* Return Confirmation Modal */}
            {

                isModalOpen && selectedTransaction

                &&

                (

                    <div className="fixed inset-0 bg-[#202020]/50 flex items-center justify-center backdrop-blur-xs z-50">
                        <motion.div initial={{ opacity: 0, x: 100, y: 100, rotate: 10 }}
                                    animate={{ opacity: 1 , x: 0, y: 0, rotate: 0 }}
                                    transition={{ delay: 0.2, type: 'spring', stiffness: 100 }}
                                    className="bg-[#F1F1F1] rounded w-11/12 h-9/10 md:w-1/2 lg:w-1/2 shadow-xl overflow-y-auto scroll-smooth">
                            <div className="sticky top-0 flex justify-between items-center bg-[#D9E1EF] rounded p-4 z-20">
                                <h2 className="flex gap-2 items-center text-xl text-[#005BEA]">
                                    <ArrowBigUpDash />
                                    Confirm Return
                                </h2>
                                <button onClick={() => setIsModalOpen(false)} className="cursor-pointer text-gray-500 hover:text-gray-700">
                                    <X />
                                </button>
                            </div>
                            <form onSubmit={HandleReturned} className="space-y-4 p-6">
                                <motion.label
                                    initial={{ opacity: 0, y: 100 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 }}
                                    className="grid" htmlFor="amount">
                                    <span className="mx-2">Transaction Title</span>
                                    <input type="text" readOnly={true}
                                           value={formData.transaction_title}
                                           onChange={(ev) => setFormData({ ...formData, transaction_title: ev.target.value }) }
                                           className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                           placeholder="Enter the Amount" required/>
                                </motion.label>

                                <motion.label
                                    initial={{ opacity: 0, y: 100 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.4 }}
                                    className="grid" htmlFor="remarks">
                                    <span className="mx-2">Transaction Description</span>
                                    <textarea readOnly={true}
                                        value={formData.trxn_remarks}
                                        onChange={(ev) => {setFormData({ ...formData, trxn_remarks: ev.target.value })}}
                                        className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                        placeholder="Enter the Description" required>
                                    </textarea>
                                </motion.label>

                                <motion.label
                                    initial={{opacity: 0, y: 100}}
                                    animate={{opacity: 1, y: 0}}
                                    transition={{delay: 0.6}}
                                    className="grid" htmlFor="date">
                                    <span className="mx-2">Return Date</span>
                                    <input type="date"
                                           value={ formData.return_date }
                                           onChange={ (ev) => setFormData({ ...formData, return_date: ev.target.value }) }
                                           className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                           placeholder="DD-MM-YYYY" required/>
                                </motion.label>

                                <motion.label
                                    initial={{ opacity: 0, y: 100 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.8 }}
                                    className="grid" htmlFor="paymentmode">
                                    <span className="mx-2">Return Payment Mode</span>
                                    <select name="paymentmode"
                                            value={ formData.return_payment_mode }
                                            onChange={ (ev) => setFormData({ ...formData, return_payment_mode: ev.target.value }) }
                                            className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                            placeholder="Select Your Payment Mode">
                                        <option>
                                            Select Your Payment Mode
                                        </option>
                                        <option>UPI</option>
                                        <option>Bank</option>
                                        <option>Cash</option>
                                    </select>
                                </motion.label>

                                <motion.label
                                    initial={{opacity: 0, y: 100}}
                                    animate={{opacity: 1, y: 0}}
                                    transition={{delay: 1}}
                                    className="grid">

                                    <div className="flex items-center justify-between">
                                        <span className="mx-2">Add Expenses</span>
                                    </div>

                                    <div className="bg-[#F1F1F1] border border-[#6392E5] rounded p-4" >

                                        {

                                            formData.expense_items.map((item, index) => (

                                                <div key={index} className="flex gap-10 my-4">
                                                    <div className="grid grid-cols-3 gap-8">
                                                        <motion.input type="text"
                                                                      initial={{opacity: 0, y: 100}}
                                                                      animate={{opacity: 1, y: 0}}
                                                                      transition={{delay: 0.2}}
                                                               value={item.expense_description}
                                                               onChange={(ev) => HandleAddExpense(index, 'expense_description', ev.target.value)}
                                                               className="col-span-2 outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                                               placeholder="Expense Description" required/>

                                                        <motion.input type="number"
                                                                      initial={{opacity: 0, y: 100}}
                                                                      animate={{opacity: 1, y: 0}}
                                                                      transition={{delay: 0.4}}
                                                               value={item.expense_amount}
                                                               onChange={(ev) => HandleAddExpense(index, 'expense_amount', ev.target.value)}
                                                               className="col-span-1 outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                                               placeholder="Amount" required/>

                                                    </div>

                                                    {

                                                        formData.expense_items.length > 1

                                                        &&

                                                        (

                                                            <motion.button title="Delete"
                                                                    initial={{opacity: 0, y: 100}}
                                                                    animate={{opacity: 1, y: 0}}
                                                                    transition={{delay: 0.2}}
                                                                    type="button"
                                                                    onClick={() => RemoveExpense(index)}
                                                                    className="bg-[#FEE2E2] border border-[#EF4444] text-[#991B1B] cursor-pointer px-4 rounded">
                                                                <Trash />
                                                                {/*<span >Delete</span>*/}
                                                            </motion.button>

                                                        )

                                                    }
                                                </div>

                                            ))

                                        }

                                        <div>
                                            <motion.button
                                                type="button"
                                                onClick={AddExpense}
                                                className="cursor-pointer flex text-[#005BEA] rounded gap-2"
                                                initial={{opacity: 0, y: 100}}
                                                animate={{opacity: 1, y: 0}}
                                                transition={{delay: 0.4}}>
                                                <CircleFadingPlus/>
                                                Add Items
                                            </motion.button>
                                        </div>
                                        <div className="flex items-center text-xl justify-between border border-[#6392E5] rounded p-4 mt-4">
                                            <div>
                                                Total Expense:
                                            </div>
                                            <p className="flex items-center font-bold text-[#005BEA]">
                                                <IndianRupee />
                                                { formData.total_expensed_amount }
                                            </p>
                                        </div>
                                    </div>
                                </motion.label>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                    <motion.label
                                        initial={{ opacity: 0, y: 100 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.4 }}
                                        className="grid" htmlFor="amount">
                                        <span className="mx-2">Requested Amount</span>
                                        <input type="text"
                                               value={formData.total_requested_amount}
                                               readOnly={true}
                                               onChange={(ev) => setFormData({ ...formData, given_amount: ev.target.value }) }
                                               className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                               placeholder="Enter the Amount" required/>
                                    </motion.label>

                                    <motion.label
                                        initial={{ opacity: 0, y: 100 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.6 }}
                                        className="grid" htmlFor="amount">
                                        <span className="mx-2">Expense Amount</span>
                                        <input type="text"
                                               value={formData.total_expensed_amount}
                                               readOnly={true}
                                               onChange={(e) => setFormData(prev => ({ ...prev, total_expensed_amount: Number(e.target.value) || 0 }))}
                                               className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                               placeholder="Enter the Amount" required/>
                                    </motion.label>
                                </div>

                                <motion.label
                                    initial={{ opacity: 0, y: 100 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.8 }}
                                    className="grid" htmlFor="amount">
                                    <span className="mx-2">Returned Amount</span>
                                    <input type="text"
                                           value={formData.total_return_amount}
                                            readOnly={true}
                                           className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                           placeholder="Enter the Amount" required/>
                                </motion.label>

                                <div className="flex flex-col gap-1">
                                    <p className="text-gray-500">Return Amount</p>
                                    <p className="font-semibold text-[#065F46] text-xl flex items-center">
                                        <IndianRupee size={20} />
                                        { formData.total_return_amount }
                                    </p>
                                </div>
                                <div className="mt-6 flex justify-end gap-2">
                                    <button
                                        onClick={() => setIsModalOpen(false)}
                                        className="bg-gray-200 cursor-pointer text-gray-700 font-bold py-2 px-4 rounded-full hover:bg-gray-300 transition-colors duration-200">
                                        Cancel
                                    </button>
                                    <button type="submit"
                                            className="flex items-center gap-2 cursor-pointer bg-[#E0E7FF] border border-[#4F46E5] text-[#312E81] py-2 px-4 rounded-full transition-colors duration-200">
                                        <RotateCcw />
                                        Confirm Return
                                    </button>
                                </div>
                            </form>

                        </motion.div>
                    </div>

                )
            }

        </div>
    );
};

export default CIHBoard;