// Import Modules
import { motion } from "motion/react";
import {useEffect, useState} from "react";
import {
    BadgeInfo,
    CircleArrowLeft,
    CircleFadingPlus, ListCheck
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

// Import Hooks
import { useUser } from "../../../Hooks/useUser.js";
import { useBank } from "../../../Hooks/useBank.js";

// Import Components
import Loader from "../../../components/Loader.jsx";
import Loading_Screen from "../../../components/Loading_Screen.jsx";

const EditBank = () => {

    const { user } = useUser();

    // Property From Hooks
    const { getBankDetailsById, updateBankDetails, loading } = useBank();

    // State
    const [checked, setChecked] = useState(false);

    const [Redirecting, setRedirecting] = useState(false);

    const navigate = useNavigate();

    // Getting id of the data
    const { id } = useParams();

    console.log("BankId: " + id);

    // State for Getting Input Values
    const [ formData, setFormData ] = useState({
        holder_name: "",
        ifsc_code: "",
        bank_account_number: "",
        branch_name: "",
        bank_name: "",
        balance_amount: 0,
        cash: 0,
        account_type: "",
    });

    useEffect(() => {

        const fetchBankData = async () => {

            const BankData = await getBankDetailsById(id);

            console.log("Bank Details By Id" + BankData);

            if (BankData)
            {

                setFormData({
                    holder_name: BankData.bank_holder_name || "",
                    ifsc_code: BankData.ifsc_code || "",
                    bank_account_number: BankData.bank_account_no || "",
                    branch_name: BankData.bank_branch_name || "",
                    bank_name: BankData.bank_name || "",
                    balance_amount: BankData.bank_amount || 0,
                    cash: BankData.cash || 0,
                    account_type: BankData.account_type || "",
                });

            }

        }

        fetchBankData();

    }, [getBankDetailsById, id])

    // Handler the Update of Bank Details
    const HandleSubmit = async (ev) => {

        ev.preventDefault();

        const update_success = await updateBankDetails({
            id,
            holder_name: formData.holder_name,
            ifsc_code: formData.ifsc_code,
            bank_account_number: formData.bank_account_number,
            branch_name: formData.branch_name,
            bank_name: formData.bank_name,
            balance_amount: formData.balance_amount,
            cash: formData.cash,
            account_type: formData.account_type,
        });

        if (update_success)
        {

            setRedirecting(true);

            setTimeout(() => {

                navigate("/app-area/bank/bank_board");

            }, 2000);

        }

    }

    if (Redirecting) return <Loading_Screen />;

    return (
        <div>
            <section>

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
                                Update Bank Details
                            </p>

                            <p>
                                Add your bank details that helps to track the transactions.
                            </p>
                        </motion.div>
                    </div>
                </motion.div>

                <motion.hr
                    initial={{ opacity: 0, y: 100 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="border-[#6392E5]"/>

                {

                    user.role === "MD"

                        ?

                        (

                            <div className="grid my-4">
                                <motion.span className="flex gap-2 border-l-10 border-[#005BEA] bg-[#F1F1F1] drop-shadow-lg p-4"
                                             initial={{opacity: 0, y: 100}}
                                             animate={{opacity: 1, y: 0}}
                                             transition={{delay: 0.2}}>
                                    <BadgeInfo className="text-[#005BEA]" />
                                    <p>
                                        Fill every fields that you want to setup the account holding bank amount and cash
                                    </p>
                                </motion.span>
                            </div>

                        )
                        :

                        (

                            <div className="grid my-4">
                                <motion.span className="flex gap-2 border-l-10 border-[#005BEA] bg-[#F1F1F1] drop-shadow-lg p-4"
                                             initial={{opacity: 0, y: 100}}
                                             animate={{opacity: 1, y: 0}}
                                             transition={{delay: 0.2}}>
                                    <BadgeInfo className="text-[#005BEA]" />
                                    <p>
                                        Fill every fields that you want to setup the account holding bank amount and cash, and <span className="text-[#005BEA]">leave the bank amount and cash in hand field zero (0)</span>
                                    </p>
                                </motion.span>
                            </div>

                        )

                }

                <div className="grid box-border border border-[#A9C1EA] rounded p-4 my-4">
                    <div className="flex items-end justify-between">
                        <motion.div
                            initial={{opacity: 0, y: 100}}
                            animate={{opacity: 1, y: 0}}
                            transition={{delay: 0.1}}
                            className="head text-5xl">
                            Know Your Data to Manage
                        </motion.div>

                        <motion.button initial={{ opacity: 0, y: 100 }}
                                       animate={{ y: 0, opacity: 1 }}
                                       transition={{delay: 0.3 }}
                                       onClick={() => navigate("/app-area/bank")}
                                       className="flex gap-2 justify-center items-center text-[#005BEA] text-xl border border-[#6392E5] bg-[#D9E1EF] hover:bg-[#C9D8F3] p-4 rounded">
                            <CircleArrowLeft />
                            Back
                        </motion.button>
                    </div>

                    <div className="py-4">
                        <motion.hr
                            initial={{opacity: 0, y: 100}}
                            animate={{y: 0, opacity: 1}}
                            className="border-[#6392E5]"/>

                        <motion.p className="head mt-4 text-2xl" initial={{ opacity: 0, y: 100 }}
                                  animate={{ y: 0, opacity: 1 }}
                                  transition={{delay: 0.4 }}>
                            Update Bank Details
                        </motion.p>
                    </div>

                    <div className="flex py-6">
                        <motion.span className="flex gap-2 border-l-10 border-[#005BEA] bg-[#F1F1F1] drop-shadow-lg p-4"
                                     initial={{opacity: 0, y: 100}}
                                     animate={{opacity: 1, y: 0}}
                                     transition={{delay: 0.2}}>
                            <BadgeInfo className="text-[#005BEA]" />
                            <p>
                                Please check the details, Before updating the bank details.
                            </p>
                        </motion.span>
                    </div>

                    <div>
                        <form onSubmit={ HandleSubmit }>
                            <div className="new grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-10 text-[#202020] my-4">
                                <motion.label
                                    initial={{opacity: 0, y: 100}}
                                    animate={{opacity: 1, y: 0}}
                                    transition={{delay: 0.1}}
                                    className="grid" htmlFor="name">
                                    <span className="mx-2">Holder Name</span>
                                    <input type="text"
                                           value={ formData.holder_name }
                                           onChange={(ev) => { setFormData({ ...formData, holder_name: ev.target.value }) }}
                                           className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                           placeholder="Enter the Holder Name" required/>
                                </motion.label>
                                <motion.label
                                    initial={{opacity: 0, y: 100}}
                                    animate={{opacity: 1, y: 0}}
                                    transition={{delay: 0.2}}
                                    className="grid" htmlFor="number">
                                    <span className="mx-2">IFSC Code</span>
                                    <input type="text"
                                           value={ formData.ifsc_code }
                                           onChange={(ev) => { setFormData({ ...formData, ifsc_code: ev.target.value }) }}
                                           className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                           placeholder="Enter the IFSC No" required/>
                                </motion.label>

                                <motion.label
                                    initial={{opacity: 0, y: 100}}
                                    animate={{opacity: 1, y: 0}}
                                    transition={{delay: 0.3}}
                                    className="grid" htmlFor="account">
                                    <span className="mx-2">Account No</span>
                                    <input type="text"
                                           value={ formData.bank_account_number }
                                           onChange={(ev) => { setFormData({ ...formData, bank_account_number: ev.target.value } ) }}
                                           className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                           placeholder="Enter the Account No" required/>
                                </motion.label>
                                <motion.label
                                    initial={{opacity: 0, y: 100}}
                                    animate={{opacity: 1, y: 0}}
                                    transition={{delay: 0.4}}
                                    className="grid" htmlFor="name">
                                    <span className="mx-2">Branch Name</span>
                                    <input type="text"
                                           value={ formData.branch_name }
                                           onChange={ (ev) => { setFormData({ ...formData, branch_name: ev.target.value }) } }
                                           className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                           placeholder="Enter the Branch Name" required/>
                                </motion.label>

                                <motion.label
                                    initial={{opacity: 0, y: 100}}
                                    animate={{opacity: 1, y: 0}}
                                    transition={{delay: 0.5}}
                                    className="grid" htmlFor="bankname">
                                    <span className="mx-2">Bank Name</span>
                                    <input name="type"
                                           value={ formData.bank_name }
                                           onChange={ (ev) => { setFormData({ ...formData, bank_name: ev.target.value }) } }
                                           className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                           placeholder="Enter the Bank Name" required/>
                                </motion.label>

                                <motion.label
                                    initial={{opacity: 0, y: 100}}
                                    animate={{opacity: 1, y: 0}}
                                    transition={{delay: 0.7}}
                                    className="grid" htmlFor="bankname">
                                    <span className="mx-2">Type</span>
                                    <select name="type"
                                            value={ formData.account_type }
                                            onChange={ (ev) => { setFormData({ ...formData, account_type: ev.target.value }) } }
                                            className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4">
                                        <option>
                                            Select Your Type
                                        </option>
                                        <option>Savings Account</option>
                                        <option>Current Account</option>
                                    </select>
                                </motion.label>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 py-4">
                                <motion.label
                                    initial={{opacity: 0, y: 100}}
                                    animate={{opacity: 1, y: 0}}
                                    transition={{delay: 0.6}}
                                    className="grid" htmlFor="amount">
                                    <span className="mx-2">Bank Amount</span>
                                    <input name="type"
                                           value={ formData.balance_amount }
                                           onChange={ (ev) => { setFormData({ ...formData, balance_amount: ev.target.value }) } }
                                           className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                           placeholder="Enter the Amount" required/>
                                </motion.label>

                                <motion.label
                                    initial={{opacity: 0, y: 100}}
                                    animate={{opacity: 1, y: 0}}
                                    transition={{delay: 0.6}}
                                    className="grid" htmlFor="cashamount">
                                    <span className="mx-2">Cash in Hand</span>
                                    <input name="type"
                                           value={ formData.cash }
                                           onChange={ (ev) => { setFormData({ ...formData, cash: ev.target.value }) } }
                                           className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                           placeholder="Enter the Cash in Hand Amount" required/>
                                </motion.label>
                            </div>

                            <div className="grid md:grid lg:grid xl:grid justify-between items-center gap-2 pt-6">
                                <motion.label className="flex gap-x-2 items-center"
                                              initial={{opacity: 0, y: 100}}
                                              animate={{opacity: 1, y: 0}}
                                              transition={{delay: 0.2}}>
                                    <input className="accent-[#005BEA]"
                                           type="checkbox"
                                           checked={checked} onChange={ (ev) => { setChecked(ev.target.checked) } } />
                                    Check details is valid to complete
                                </motion.label>


                                <motion.button type="submit"
                                               initial={{opacity: 0, y: 100}}
                                               animate={{opacity: 1, y: 0}}
                                               transition={{delay: 0.3}}
                                               disabled={loading}
                                               className="text-xl border border-[#6392E5] bg-[#D9E1EF] text-[#005BEA] hover:bg-[#C9D8F3] p-4 rounded">
                                    {

                                        loading
                                            ?

                                            ( <Loader /> )

                                            :

                                            (
                                                <span className="flex gap-2 justify-center items-center">
                                                    <CircleFadingPlus />
                                                    Update Bank Details
                                                </span>
                                            )

                                    }

                                </motion.button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default EditBank;