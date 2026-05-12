// Import Modules
import { motion } from "motion/react";
import {useCallback, useEffect, useMemo} from "react";
import { useNavigate } from "react-router-dom";
import {
    IndianRupee,
    Landmark,
    User,
    CreditCard,
    ClipboardList,
    MapPin,
    Coins,
    Banknote,
    Hash,
    SquarePen,
    Trash,

    ListCheck, HandCoins, IdCard
} from "lucide-react";

// Import Hooks
import { useBank } from "../../../Hooks/useBank.js";

// Import Components
import Loading_Screen from "../../../components/Loading_Screen.jsx";
import emptyBox from "../../../assets/img/empty-box.png";

const BankBoard = () => {

    // Get the module to fetch data
    const { fetchBank, deleteBankDetails, BankDataList, loading } = useBank();

    const navigate = useNavigate();

    useEffect(() => {

        fetchBank();

    }, [fetchBank]);

    // Delete Bank Details
    const HandleDeleteBank = useCallback(async (id) => {

        const deleteBankSuccess = await deleteBankDetails(id);

        if (deleteBankSuccess) return await fetchBank();

    }, [deleteBankDetails, fetchBank]);

    // Make role based grouping
    const empRoles = useMemo(() => {

        const roles = new Set();

        const safeList = BankDataList || [];

        safeList.forEach(bank => {

            if (bank?.created_by?.user_designation) roles.add(bank.created_by.user_designation);

        });

        return Array.from(roles);

    }, [BankDataList]);

    const groupBanks = useMemo(() => {

        const grouped = {};

        empRoles.forEach(role => grouped[role] = []);

        const safeList = BankDataList || [];

        safeList.forEach(bank => {

            console.log(bank.created_by?.user_designation);

            const role = bank.created_by.user_designation;

            if (grouped[role]) grouped[role].push(bank);

        });

        return grouped;

    }, [empRoles, BankDataList]);

    if (loading) return <Loading_Screen />

    return (
        <>
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
                            Bank Account Dashboard
                        </p>

                        <p>
                            Manage all saved bank account records. You can view balances, update details, or remove outdated entries.
                        </p>
                    </motion.div>
                </div>
            </motion.div>

            <motion.hr
                initial={{ opacity: 0, y: 100 }}
                animate={{ y: 0, opacity: 1 }}
                className="border-[#6392E5]"/>

            <div>

                {

                    Array.isArray(BankDataList) && BankDataList.length === 0

                    &&

                    (
                        <div className="col-span-full grid gap-4 justify-center items-center tracking-widest rounded p-16 my-4">
                            <div className="grid justify-center">
                                <img className="w-60" src={emptyBox} alt="empty-box-img"/>
                            </div>
                            <div className="grid text-center gap-4">
                                <p className="text-2xl text-[#202020]">
                                    Empty.........!
                                </p>
                                <p className="text-xl text-[#005BEA]">
                                    Please Add the Bank Details
                                </p>
                            </div>

                        </div>
                    )

                }

                {

                    empRoles.map(role => (

                        groupBanks[role].length > 0

                        &&

                        (

                            <div className="grid gap-2 mt-4" key={role}>
                                <h2 className="flex gap-2 items-center text-xl text-[#202020] font-bold">
                                    <IdCard className="text-[#005BEA]" />
                                    { role }
                                </h2>

                                <div  className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                    {

                                        groupBanks[role].map((bankData) => (

                                            <div key={ bankData.bank_id }>

                                                <div className="grid gap-4 border border-[#8CAEE9] bg-[#F1F1F1] hover:scale-102 transition-all duration-200 rounded p-4">

                                                    <div className="flex gap-2 items-center justify-between">
                                                        <div className="flex gap-2">
                                                        <span className="text-[#005BEA]">
                                                            <Landmark />
                                                        </span>
                                                            <p className="text-[#202020] text-xl font-bold">
                                                                { bankData?.bank_name }
                                                            </p>

                                                        </div>

                                                        <div className="flex flex-wrap gap-2">
                                                            <button onClick={() => navigate(`/app-area/bank/update_bank_details/${bankData.bank_id}`)} title="Edit" className="cursor-pointer p-2 rounded text-[#005BEA] bg-[#D9E1EF] hover:bg-[#C2CEE9] transition-colors">
                                                                <SquarePen className="size-5" />
                                                            </button>
                                                            <button
                                                                title="Delete"
                                                                onClick={() => HandleDeleteBank(bankData.bank_id)}
                                                                className="cursor-pointer p-2 rounded text-red-700 bg-red-100 hover:bg-red-200 transition-colors">
                                                                <Trash className="size-5" />
                                                            </button>
                                                        </div>
                                                    </div>

                                                    <motion.hr
                                                        initial={{ opacity: 0, y: 100 }}
                                                        animate={{ y: 0, opacity: 1 }}
                                                        className="border-[#6392E5]"/>

                                                    <div className="space-y-2">
                                                        <p className="flex items-center gap-4 text-[#202020]">
                                                            <User className="text-[#005BEA]" />
                                                            <strong>Holder Name:</strong> {bankData?.bank_holder_name}
                                                        </p>
                                                        <p className="flex items-center gap-4 text-[#202020]">
                                                            <CreditCard className="text-[#005BEA]" />
                                                            <strong>Account Number:</strong> {bankData?.bank_account_no}
                                                        </p>
                                                        <p className="flex items-center gap-4 text-[#202020]">
                                                            <Hash className="text-[#005BEA]" />
                                                            <strong>IFSC Code:</strong> {bankData?.ifsc_code}
                                                        </p>
                                                        <p className="flex items-center gap-4 text-[#202020]">
                                                            <ClipboardList className="text-[#005BEA]" />
                                                            <strong>Account Type:</strong> {bankData?.account_type}
                                                        </p>
                                                        <p className="flex items-center gap-4 text-[#202020]">
                                                            <MapPin className="text-[#005BEA]" />
                                                            <strong>Bank Branch:</strong> {bankData?.bank_branch_name}
                                                        </p>
                                                    </div>

                                                    <motion.hr
                                                        initial={{ opacity: 0, y: 100 }}
                                                        animate={{ y: 0, opacity: 1 }}
                                                        className="border-[#6392E5]"/>

                                                    {/* Financial Amounts with Rectangular Cards */}
                                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                                        <div className="p-3 bg-[#D9E1EF]/50 rounded-lg flex flex-col items-start gap-2">
                                                            <p className="flex items-center gap-2 text-base text-[#005BEA] font-semibold">
                                                                <Banknote />
                                                                Bank Amount
                                                            </p>
                                                            <p className="flex items-center text-xl font-bold text-gray-800">
                                                                <IndianRupee />
                                                                {parseFloat(bankData?.bank_amount).toLocaleString('en-IN')}
                                                            </p>
                                                        </div>
                                                        <div className="p-3 bg-[#D9E1EF]/50 rounded-lg flex flex-col items-start gap-2">
                                                            <p className="flex items-center gap-2 text-base text-[#005BEA] font-semibold">
                                                                <Coins />
                                                                Cash
                                                            </p>
                                                            <p className="flex items-center text-xl font-bold text-gray-800">
                                                                <IndianRupee />
                                                                {parseFloat(bankData?.cash).toLocaleString('en-IN')}
                                                            </p>
                                                        </div>
                                                        <div className="p-3 bg-[#D9E1EF]/50 rounded flex flex-col items-start gap-2">
                                                            <p className="flex items-center gap-2 text-base text-[#005BEA] font-semibold">
                                                                <HandCoins />
                                                                Total CIH
                                                            </p>
                                                            <p className="flex items-center text-xl font-bold text-gray-800">
                                                                <IndianRupee />
                                                                {(parseFloat(bankData?.bank_amount) + parseFloat(bankData?.cash)).toLocaleString('en-IN')}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>

                                        ))

                                    }

                                </div>

                            </div>

                        )

                    ))

                }

            </div>

        </>

    );
};

export default BankBoard;