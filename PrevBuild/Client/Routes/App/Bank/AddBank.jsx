// Import Modules
import { motion } from "motion/react";
import {
    BadgeInfo,
    CircleFadingPlus, ListCheck
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// Import Hooks
import { useUser } from "../../../Hooks/useUser.js";
import { useBank } from "../../../Hooks/useBank.js";

// Import Components
import Loader from "../../../components/Loader.jsx";
import toast from "react-hot-toast";
import Loading_Screen from "../../../components/Loading_Screen.jsx";


const AddBank = () => {

    const { user } = useUser();

    const { addBankDetails, loading } = useBank();

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        holder_name: "",
        ifsc_code: "",
        bank_account_number: "",
        branch_name: "",
        bank_name: "",
        account_type: "",
        balance_amount: 0,
        cash: 0,
    });

    const [checked, setChecked] = useState(false);

    const [redirect, setRedirect] = useState(false);

    async function HandleSubmit(ev) {

        ev.preventDefault();

        if (!checked)
        {

            toast.error("Please confirm that the entered bank details are valid.", {
                style: {
                    border: '1px solid #6392E5',
                    color: '#005bea',
                    background: '#f1f1f1',
                }
            });

        } else {

            const add_success = await addBankDetails(formData);

            if (add_success)
            {
                setRedirect(true);

                setTimeout(() => {

                    return navigate('/app-area/bank/bank_board');

                }, 2000)

            } else {

                setRedirect(false);

            }

        }

    }

    if (redirect) return <Loading_Screen />

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
                                Create Bank Account
                            </p>

                            <p>
                                Add bank details for your company or project. This information will be used for financial tracking, CIH reconciliation, and payments.
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

                    <div>
                        <form onSubmit={ HandleSubmit }>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-10 text-[#202020] my-4">
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
                                                    Add Bank
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

export default AddBank;