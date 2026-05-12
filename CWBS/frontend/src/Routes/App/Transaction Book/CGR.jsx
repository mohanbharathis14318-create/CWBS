// Import Modules
import {motion} from "motion/react";
import {useEffect, useMemo, useState} from "react";
import {useUser} from "../../../Hooks/useUser.js";
import {useRequirement} from "../../../Hooks/useRequirement.js";
import {
    ArrowBigDownDash, ArrowBigUpDash, ArrowDownUp,
    BadgeIndianRupee, Banknote, BanknoteArrowDown, Briefcase, Calendar,
    CircleCheck, CircleQuestionMark,
    CircleX,
    Clock,
    HandCoins,
    IndianRupee, Info,
    Landmark,
    ListCheck, ListChecks, ReceiptIndianRupee,
    Send, SquarePen, Tag, Trash, TrendingUp, User, RouteIcon
} from "lucide-react";
import Loading_Screen from "../../../components/Loading_Screen.jsx";
import {Route} from "react-router-dom";


const Cgr = () => {

    // State for selected user filter
    const [selectedUserFilter, setSelectedUserFilter] = useState('All');

    // State to date ranges
    const [dateRange, setDateRange] = useState({
        start: "",
        end: "",
    });

    const { user } = useUser();

    const { getAllTrxnReq, getAllReqByUser, RequirementReqDataListMD, RequirementReqDataListUser, loading } = useRequirement();

    useEffect(() => {

        if (user.role === "MD")
        {

            getAllTrxnReq();

        } else {

            getAllReqByUser(user.user);

        }

    }, [user, getAllTrxnReq, getAllReqByUser]);


    let MdList;

    MdList = Array.isArray(RequirementReqDataListMD) ? RequirementReqDataListMD : [];

    let UserListData;

    UserListData = Array.isArray(RequirementReqDataListUser) ? RequirementReqDataListUser : [];

    // List of req Data
    const Data = useMemo(() => {
        return user.role === "MD" ? MdList : UserListData;
    }, [user.role, MdList, UserListData]);

    // State for initial selection is the first "Cash Given" transaction
    const initialCashGivenTrxn = Data.find(trxn => trxn.cash_flow_type === 'Cash Given');

    const [selectedTransaction, setSelectedTransaction] = useState(initialCashGivenTrxn || null);

    // Filtered Data Based on selectedUser
    const { givenTransaction, totalGiven, totalReturned, totalExpensed, uniqueUsers, countGiven, countReturned, countExpensed, } = useMemo(() => {

        let filteredData = Data;

        if (selectedUserFilter !== 'All')
        {

            filteredData = filteredData.filter(item => item.user_name === selectedUserFilter);

        }

        // For date range
        if (dateRange.start || dateRange.end)
        {

            const startDate = dateRange.start ? new Date(dateRange.start) : null;

            const endDate = dateRange.end ? new Date(dateRange.end) : null;

            filteredData = filteredData.filter(item => {

                const itemDate = new Date(item.created_at);

                if (startDate && endDate)
                {

                    return itemDate >= startDate && itemDate <= endDate;

                }
                if (startDate)
                {

                    return itemDate >= startDate;

                }
                if (endDate)
                {

                    return itemDate <= endDate;

                }

                return true;

            });

        }

        // Cash Given Return
        const given = filteredData.filter(item => item.cash_flow_type === 'Cash Given');

        // const returned = filteredData.filter(item => item.cash_flow_type === 'Cash Return');

        // Count the status
        const countGiven = given.length;

        const countReturned = given.filter(item => item.return_id).length;

        const countExpensed =  given.filter(item => item.expense_items?.length > 0).length;

        // Calculate totals
        const totalGiven = given.reduce((sum, item) => sum + parseFloat(item.given_amount), 0);

        const totalExpensed = given.reduce((sum, item) => {
            if (Array.isArray(item.expense_items)) {
                return sum + item.expense_items.reduce((subSum, exp) => subSum + parseFloat(exp.expense_amount || 0), 0);
            }
            return sum;
        }, 0);

        const totalReturned = filteredData.reduce((sum, item) => {
            if (item.return_id) {
                return sum + parseFloat(item.total_return_amount || 0);
            }
            return sum;
        }, 0);

        // Get a unique user for filter
        const uniqueUsers = ['All', ...new Set(Data.map(item => item.user_name))];
        
        return {
            givenTransaction: given, totalGiven, totalReturned, totalExpensed, uniqueUsers, countGiven, countReturned, countExpensed,
        };

    }, [Data, dateRange.end, dateRange.start, selectedUserFilter]);


    // Data for the detailed timeline of the single selected transaction
    const timelineData = useMemo(() => {

        if (!selectedTransaction) return [];

        const timeline = [];

        // 1. Cash Given event
        timeline.push({
            type: "Cash Given",
            date: selectedTransaction.given_date,
            ...selectedTransaction,
        });

        // 2. Insert each expense as its own timeline item
        if (selectedTransaction.expense_items?.length > 0) {
            selectedTransaction.expense_items.forEach(exp => {
                timeline.push({
                    type: "Expense",
                    date: selectedTransaction.given_date, // or store expense_date if available
                    ...exp,
                });
            });
        }

        // 3. Cash Returned event (if exists)
        if (selectedTransaction.return_date) {
            timeline.push({
                type: "Cash Returned",
                date: selectedTransaction.return_date,
                ...selectedTransaction,
            });
        }

        // Sort chronologically
        return timeline.sort((a, b) => new Date(a.date) - new Date(b.date));

    }, [selectedTransaction]);

    if (loading) return <Loading_Screen />;

    return (
        <div>
            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-4">
                <motion.div className="relative h-28 flex gap-4 justify-start items-center border border-[#8CAEE9] bg-[#F1F1F1] rounded overflow-hidden"
                            initial={{ opacity: 0, y: 100 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
                >
                    <span className="mx-4 text-[#005BEA] bg-[#D9E1EF] rounded-full p-4">
                        <ArrowBigDownDash />
                    </span>
                    <span className="text-xl text-[#202020]">
                        <p>
                            Cash Given
                        </p>
                        <p className="flex items-center text-4xl text-[#005BEA]">
                            <IndianRupee />
                            { totalGiven || 0 }
                        </p>
                    </span>

                    <span className="absolute right-0 text-[#005BEA] bg-[#D9E1EF] rounded-full p-14 translate-x-8">
                        <ArrowBigDownDash className="size-12" />
                    </span>
                </motion.div>

                <motion.div className="relative h-28 flex gap-4 justify-start items-center border border-[#8CAEE9] bg-[#F1F1F1] rounded overflow-hidden"
                            initial={{ opacity: 0, y: 100 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4, type: "spring", stiffness: 100 }}
                >
                    <span className="mx-4 text-[#005BEA] bg-[#D9E1EF] rounded-full p-4">
                        <ArrowBigUpDash />
                    </span>
                    <span className="text-xl text-[#202020]">
                        <p>
                            Cash Return
                        </p>
                        <p className="flex items-center text-4xl text-[#005BEA]">
                            <IndianRupee />
                            { totalReturned.toLocaleString("en-IN") || 0 }
                        </p>
                    </span>

                    <span className="absolute right-0 text-[#005BEA] bg-[#D9E1EF] rounded-full p-14 translate-x-8">
                        <ArrowBigUpDash className="size-12" />
                    </span>
                </motion.div>

                <motion.div className="col-span-1 md:col-span-2 relative h-28 flex gap-4 justify-start items-center border border-[#8CAEE9] bg-[#F1F1F1] rounded overflow-hidden"
                            initial={{ opacity: 0, y: 100 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6, type: "spring", stiffness: 100 }}
                >
                    <span className="mx-4 text-[#005BEA] bg-[#D9E1EF] rounded-full p-4">
                        <BanknoteArrowDown />
                    </span>
                    <span className="text-xl text-[#202020]">
                        <p>
                            Total Expensed
                        </p>
                        <p className="flex items-center text-4xl text-[#005BEA]">
                            <IndianRupee />
                            { totalExpensed.toLocaleString("en-IN") || 0 }
                        </p>
                    </span>

                    <span className="absolute right-0 text-[#005BEA] bg-[#D9E1EF] rounded-full p-14 translate-x-8">
                        <BanknoteArrowDown className="size-12" />
                    </span>
                </motion.div>
            </section>

            <motion.hr
                initial={{ opacity: 0, y: 100 }}
                animate={{ y: 0, opacity: 1 }}
                className="border-[#6392E5] my-4"/>


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
                                <RouteIcon  />
                            </motion.div>

                            <motion.div initial={{ opacity: 0, y: 100 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.12, type: 'spring', stiffness: 100 }} >
                                <p className="head text-xl text-[#005BEA]">
                                    Transaction Timeline Overview
                                </p>

                                <p>
                                    Visualize the complete journey of each transaction — from Cash Given to Expenses and Cash Returned.
                                </p>
                            </motion.div>
                        </div>
                    </motion.div>

                </div>




            {/*Status Count */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 border border-[#8CAEE9] bg-[#F1F1F1] rounded my-4 p-4">
                <motion.div
                    initial={{ opacity: 0, y: 100 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 , type: 'spring', stiffness: 100 }}
                    className={`grid grid-cols-2 gap-2 items-center bg-[#E8F5E9] border border-[#66BB6A] text-[#2E7D32] p-4 rounded`}>
                    <div className="flex gap-2 items-center text-xl">
                        <ArrowBigDownDash />
                        <p title="Cash Given">Cash Given</p>
                        <p>({ countGiven || 0 })</p>
                    </div>
                    <div className="flex justify-end items-center text-4xl">
                        <IndianRupee />
                        <p>{ totalGiven.toLocaleString("en-IN") || 0 }</p>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 100 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 , type: 'spring', stiffness: 100 }}
                    className={`grid grid-cols-2 gap-2 items-center bg-[#E0E7FF] border border-[#4F46E5] text-[#312E81] p-4 rounded`}>
                    <div className="flex gap-2 items-center text-xl">
                        <ArrowBigUpDash />
                        <p title="Cash Returned">Cash Returned</p>
                        <p>({ countReturned || 0 })</p>
                    </div>
                    <div className="flex justify-end items-center text-4xl">
                        <IndianRupee />
                        <p>{ totalReturned || 0 }</p>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 100 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 , type: 'spring', stiffness: 100 }}
                    className={`grid grid-cols-2 gap-2 items-center bg-[#FFF3E0] border border-[#FB8C00] text-[#E65100] p-4 rounded`}>
                    <div className="flex gap-2 items-center text-xl">
                        <BanknoteArrowDown />
                        <p title="Cash Not Returned">Expensed</p>
                        <p>({ countExpensed || 0 })</p>
                    </div>
                    <div className="flex justify-end items-center text-4xl">
                        <IndianRupee />
                        <p>{ totalExpensed.toLocaleString("en-In") }</p>
                    </div>
                </motion.div>
            </div>

            {/*Filter options*/}
            <div className="lg:sticky lg:top-2 z-10 grid md:flex items-center gap-4 border border-[#8CAEE9] bg-[#F1F1F1] rounded my-4 p-4">

                <label className="text-[#005BEA]" htmlFor="user-filter">

                    Filter by User:

                </label>

                <select
                    className="p-2 border border-[#6392E5] rounded bg-transparent text-[#202020] focus:outline-none focus:ring-2 focus:ring-[#005BEA]"
                    value={selectedUserFilter}
                    onChange={(ev) => setSelectedUserFilter(ev.target.value)}
                >
                    {

                        uniqueUsers.map(userOption => (

                            <option key={userOption} value={userOption}>
                                {userOption}
                            </option>

                        ))

                    }
                </select>

                <label className="text-[#005BEA]" htmlFor="user-filter">

                    Filter by Date Range:

                </label>

                <div className="flex gap-4 items-center">
                    <input type="date"
                           className="p-2 border border-[#6392E5] rounded-md bg-transparent text-[#202020] focus:outline-none focus:ring-2 focus:ring-[#005BEA]"
                           value={dateRange.start}
                           onChange={(ev) => setDateRange(prev => ({ ...prev, start: ev.target.value }))}/>

                    <span>
                        to
                    </span>

                    <input type="date"
                           className="p-2 border border-[#6392E5] rounded-md bg-transparent text-[#202020] focus:outline-none focus:ring-2 focus:ring-[#005BEA]"
                           value={dateRange.end}
                           onChange={(ev) => setDateRange(prev => ({ ...prev, end: ev.target.value }))}/>
                </div>

            </div>

            <section className="flex flex-col lg:flex-row gap-4">
                <div className="lg:w-1/3 h-full max-h-full flex flex-col gap-4">
                    <p className="head text-2xl text-[#202020]">
                        Transaction (<span className="text-[#005BEA]">{ givenTransaction.length }</span>)
                    </p>

                    {

                        givenTransaction.length > 0

                        ?

                            (

                                <div className="space-y-4">

                                    {

                                        givenTransaction.map(item => (

                                            <button type="button" key={item.trxn_id} onClick={() => setSelectedTransaction(item)}
                                                    className={`w-full text-left rounded p-4 cursor-pointer transition-all duration-200 hover:scale-102
                                                    ${selectedTransaction?.trxn_id === item.trxn_id ? 'bg-[#C9D8F3]/30 border-2 border-[#6392E5] scale-102' : `border border-[#6392E5] bg-[#F1F1F1]`}`}>

                                                <div className="flex items-center justify-between mb-2">
                                                    <div className="flex items-center gap-2">
                                                        <Info className="text-blue-600" />
                                                        <h3 className="font-bold text-lg">{item.transaction_title}</h3>
                                                    </div>
                                                    <div className="text-sm font-semibold text-[#202020] flex items-center gap-1">
                                                        <Calendar />
                                                        { new Date(item.created_at).toDateString() }
                                                    </div>
                                                </div>

                                                <div className="grid items-center gap-2">
                                                    <p className="text-[#202020] font-semibold text-xl flex items-center gap-1">
                                                        <IndianRupee />{item.given_amount.toLocaleString("en-IN")}
                                                    </p>
                                                    <p className="text-sm text-[#202020] mt-1 flex items-center gap-1">
                                                        <User />{item.user_name}
                                                    </p>
                                                </div>

                                            </button>

                                        ))

                                    }



                                </div>

                            )

                        :

                            (

                                <div className="text-center p-8 bg-[#F1F1F1] border border-[#6392E5] rounded">
                                    <Info className="text-gray-400 mx-auto mb-4" />
                                    <h3 className="text-lg font-semibold text-[#005BEA]">No Transactions Found</h3>
                                    <p className="text-gray-500 mt-2">Adjust your filters to see transactions.</p>
                                </div>

                            )
                    }
                </div>

                {/*Timeline Area - Right Side*/}
                <div className="lg:w-2/3 bg-[#F1F1F1] border border-[#6392E5] rounded p-4">
                    <div className="flex items-center gap-4">
                        <div className="bg-[#C9D8F3] text-[#005BEA] rounded p-4">
                            <TrendingUp />
                        </div>
                        <div className="grid items-center">
                            <p className="head text-xl text-[#005BEA]">
                                Timeline for "{ selectedTransaction?.transaction_title || 'Select a transaction' }"
                            </p>
                            <p>
                                Follow the entire journey of this transaction from start to finish.
                            </p>
                        </div>
                    </div>

                    <div className="my-6">

                        {

                            selectedTransaction

                            ?

                                (

                                    <div className="grid justify-start items-center relative pl-10 gap-4">

                                        {

                                            timelineData.map((item, index) => {

                                                let icon, title, content;

                                                // Define the content for each timeline event tpye
                                                if (item.type === "Cash Given") {
                                                    icon = <ArrowBigDownDash />;
                                                    title = "Cash Given";
                                                    content = (
                                                        <>
                                                            <p className="font-semibold text-[#202020]">
                                                                <IndianRupee className="inline-block mr-1" />
                                                                {Number(item.given_amount).toLocaleString("en-IN")} via {item.given_payment_mode}
                                                            </p>
                                                            <div className="flex items-center gap-2">
                                                                <p>{new Date(item.given_date).toDateString()}</p>
                                                                <p>|</p>
                                                                <p>Given By {item.given_sender_name} ({item.given_sender_designation})</p>
                                                            </div>
                                                        </>
                                                    );
                                                }

                                                else if (item.type === "Expense") {
                                                    icon = <BanknoteArrowDown />;
                                                    title = "Expense";
                                                    content = (
                                                        <>
                                                            <p className="font-semibold text-[#202020]">
                                                                <IndianRupee className="inline-block mr-1" />
                                                                {Number(item.expense_amount).toLocaleString("en-IN")}
                                                            </p>
                                                            <p>{item.expense_description}</p>
                                                        </>
                                                    );
                                                }

                                                else if (item.type === "Cash Returned") {
                                                    icon = <ArrowBigUpDash />;
                                                    title = "Cash Returned";
                                                    content = (
                                                        <>
                                                            <p className="font-semibold text-[#202020]">
                                                                <IndianRupee className="inline-block mr-1" />
                                                                {Number(item.total_return_amount).toLocaleString("en-IN")} via {item.return_payment_mode}
                                                            </p>
                                                            <div className="flex items-center gap-2">
                                                                <p>{new Date(item.return_date).toDateString()}</p>
                                                                <p>|</p>
                                                                <p>Returned By {item.user_name} ({item.user_designation})</p>
                                                            </div>
                                                        </>
                                                    );
                                                }

                                                // render timeline
                                                return (
                                                    <div key={index} className="relative">
                                                        {

                                                            index < timelineData.length - 1

                                                            &&

                                                            (

                                                                <div className="absolute left-0 top-6 bottom-[-24px] w-0.5 bg-gray-300 transform -translate-x-1/2">

                                                                </div>

                                                            )


                                                        }

                                                        <div className={`absolute left-0 top-0 transform -translate-x-1/2`}>
                                                            <div className={`p-4 rounded ${item.type === 'Cash Given' ? 'bg-[#E8F5E9] border border-[#66BB6A] text-[#2E7D32]' : item.type === 'Cash Returned' ? 'bg-[#E0E7FF] border border-[#4F46E5] text-[#312E81]' : 'bg-[#FFF3E0] border border-[#FB8C00] text-[#E65100]'}`}>
                                                                {icon}
                                                            </div>
                                                        </div>

                                                        <div className="grid mx-10 pb-4 gap-2">
                                                            <div className={`text-sm font-semibold ${item.type === 'Cash Given' && ' bg-[#E8F5E9] border border-[#66BB6A] text-[#2E7D32]'} ${item.type === 'Expense' && 'bg-[#FFF3E0] border border-[#FB8C00] text-[#E65100]'} ${item.type === 'Cash Returned' && 'bg-[#E0E7FF] border border-[#4F46E5] text-[#312E81]'} rounded p-2 uppercase`}>{title}</div>
                                                            {content}
                                                        </div>
                                                    </div>
                                                )

                                            })

                                        }

                                    </div>

                                )

                            :

                                (

                                    <div className="text-center p-8 rounded">
                                        <Info className="text-gray-400 mx-auto mb-4" />
                                        <h3 className="text-lg font-semibold  text-[#005BEA]">Select a Transaction</h3>
                                        <p className="text-gray-500 mt-2">Click on a transaction from the list on the left to see its complete timeline.</p>
                                    </div>

                                )

                        }
                    </div>
                </div>

            </section>



        </div>
    );
};

export default Cgr;