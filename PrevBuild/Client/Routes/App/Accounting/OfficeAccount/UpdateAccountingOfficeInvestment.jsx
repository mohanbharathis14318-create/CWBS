// Import Modules
import React, { useState, useEffect } from 'react';
import toast from "react-hot-toast";
import {motion} from "motion/react";
import { useNavigate, useParams } from "react-router-dom";
import {CircleArrowLeft, IndianRupee, Send} from 'lucide-react';

// Import Hooks
import { useOfficeAccount } from "../../../../Hooks/useTransaction.js";

// Import Routes

// Import Components
import Loader from "../../../../components/Loader.jsx";
import Loading_Screen from "../../../../components/Loading_Screen.jsx";

const UpdateAccountingOfficeInvestment = () => {

    const { getAOIById, updateOfficeInvestment, loading } = useOfficeAccount();

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        daily_activity_type: "Office Investment",
        date: "",
        particulars: "",
        investment_type: "",
        amount: "0",
        payment_mode: "",
        transaction_remark: "",
    });

    // Getting id of dat
    const { id } = useParams();

    const [checked, setChecked] = useState(false);

    const [redirect, setRedirect] = useState(false);

    useEffect(() => {

        const fetchOfficeInvestment = async () => {

            const OfficeInvestmentData = await getAOIById(id);

            if (OfficeInvestmentData) {

                setFormData({
                    daily_activity_type: "Office Investment",
                    date: OfficeInvestmentData.aci_date || "",
                    particulars: OfficeInvestmentData.aci_particulars || "",
                    investment_type: OfficeInvestmentData.aci_investment_type || "",
                    amount: OfficeInvestmentData.aci_amount || "0",
                    payment_mode: OfficeInvestmentData.aci_payment_mode || "",
                    transaction_remark: OfficeInvestmentData.aci_transaction_remark || "",
                })

            }

        }

        fetchOfficeInvestment();

    }, [getAOIById, id]);

    async function HandleSubmit(ev) {

        ev.preventDefault();

        if (!checked)
        {

            toast.error("Please confirm that the entries are valid.", {
                style: {
                    border: '1px solid #6392E5',
                    color: '#005bea',
                    background: '#f1f1f1',
                }
            });

        } else {

            const add_success = await updateOfficeInvestment({
                id,
                daily_activity_type: "Office Investment",
                date: formData.date,
                particulars: formData.particulars,
                investment_type: formData.investment_type,
                amount: formData.amount,
                payment_mode: formData.payment_mode,
                transaction_remark: formData.transaction_remark,
            });

            if (add_success)
            {
                setRedirect(true);

                setTimeout(() => {

                    return navigate('/app-area/transaction_book/office_account_board/office_investment_board');

                }, 2000)

            } else {

                setRedirect(false);

            }

        }

    }

    if (redirect) return <Loading_Screen />

    return (
        <div>

            {/* Accounting Office Investment*/}
            <section>
                <div className="box-border border-2 border-[#A9C1EA] rounded p-4">
                       <div className="flex items-end justify-between">
                           <motion.div
                               initial={{opacity: 0, y: 100}}
                               animate={{opacity: 1, y: 0}}
                               transition={{delay: 0.1}}
                               className="head text-xl">
                               Edit Office Investment Data
                           </motion.div>
                           <motion.button initial={{ opacity: 0, y: 100 }}
                                          animate={{ y: 0, opacity: 1 }}
                                          transition={{delay: 0.3 }}
                                          onClick={() => navigate("/app-area/transaction_book/office_account_board")}
                                          className="flex gap-2 justify-center items-center text-[#005BEA] cursor-pointer text-xl border border-[#6392E5] bg-[#D9E1EF] hover:bg-[#C9D8F3] p-4 rounded">
                               <CircleArrowLeft />
                               Back
                           </motion.button>
                       </div>

                        <div className="my-2">
                            <motion.hr
                                initial={{opacity: 0, y: 100}}
                                animate={{y: 0, opacity: 1}}
                                className="border-[#6392E5]"/>
                        </div>

                        <form onSubmit={ HandleSubmit }>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-10 my-4">
                                <motion.label
                                    initial={{opacity: 0, y: 100}}
                                    animate={{opacity: 1, y: 0}}
                                    transition={{delay: 0.1}}
                                    className="grid" htmlFor="date">
                                    <span className="mx-2">Daily Activity Type</span>
                                    <input type="text"
                                           value={formData.daily_activity_type}
                                           onChange={(ev) => { setFormData({ ...formData, daily_activity_type: ev.target.value}) }}
                                           disabled={true}
                                           className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4 my-2"
                                           placeholder="Enter the type"/>
                                </motion.label>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-10 text-[#202020] py-6">
                                <motion.label
                                    initial={{ opacity: 0, y: 100 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 }}
                                    className="grid" htmlFor="date">
                                    <span className="mx-2">Date</span>
                                    <input type="date"
                                           value={formData.date}
                                           onChange={(ev) => { setFormData({ ...formData, date: ev.target.value}) }}
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
                                           value={formData.particulars}
                                           onChange={(ev) => { setFormData({ ...formData, particulars: ev.target.value}) }}
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
                                            value={formData.investment_type}
                                            onChange={(ev) => {setFormData({ ...formData, investment_type: ev.target.value}) }}
                                            className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                            placeholder="Indirect/Direct">
                                        <option>
                                            Select Your Type
                                        </option>
                                        <option>Capital</option>
                                        <option>Loan</option>
                                    </select>
                                </motion.label>

                                <motion.label
                                    initial={{ opacity: 0, y: 100 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.6 }}
                                    className="grid" htmlFor="amount">
                                    <span className="mx-2">Amount</span>
                                    <input type="text"
                                           value={formData.amount}
                                           onChange={(ev) => { setFormData({ ...formData, amount: ev.target.value}) }}
                                           className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                           placeholder="Enter the Amount"/>
                                </motion.label>

                                <motion.label
                                    initial={{ opacity: 0, y: 100 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.7 }}
                                    className="grid" htmlFor="paymentmode">
                                    <span className="mx-2">Payment Mode</span>
                                    <select name="paymentmode"
                                            value={formData.payment_mode}
                                            onChange={(ev) => { setFormData({ ...formData, payment_mode: ev.target.value}) }}
                                            className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                            id="" placeholder="Select Your Payment Mode">
                                        <option value="">
                                            Select Your Payment Mode
                                        </option>
                                        <option>UPI</option>
                                        <option>Bank</option>
                                        <option>Cash</option>
                                        <option>Other</option>
                                    </select>
                                </motion.label>

                                <motion.label
                                    initial={{ opacity: 0, y: 100 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.8 }}
                                    className="grid" htmlFor="remarks">
                                    <span className="mx-2">Transaction Remarks</span>
                                    <input type="text"
                                           value={formData.transaction_remark}
                                           onChange={(ev) => { setFormData({ ...formData, transaction_remark: ev.target.value}) }}
                                           className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                           placeholder="Enter the Remarks"/>
                                </motion.label>

                                <motion.p
                                    initial={{ opacity: 0, y: 100 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.9 }}>
                                    (Please Enter the <br/>transaction ID for UPI or <br/>Bank)
                                </motion.p>
                            </div>


                            <div className="grid md:grid lg:grid xl:grid justify-between items-center gap-6 mt-6">
                                <motion.div
                                    initial={{ opacity: 0, y: 100 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 }}
                                    className="text-xl">
                                    Total <br/>
                                    <span className="flex gap-2 items-center text-[#005BEA] py-4">
                                            <IndianRupee />
                                        { formData.amount }
                                        </span>
                                </motion.div>

                                <motion.label className="flex gap-x-2 items-center"
                                              initial={{ opacity: 0, y: 100 }}
                                              animate={{ opacity: 1, y: 0 }}
                                              transition={{ delay: 0.2 }}
                                              htmlFor="box">
                                    <input type="checkbox" className="accent-[#005BEA]"
                                           checked={checked}
                                           onChange={(ev) => { setChecked(ev.target.checked) }}/>
                                    Check the transaction details is valid to submit
                                </motion.label>

                                <div className="py-2">

                                    {

                                        loading

                                        ?

                                            ( <Loader /> )

                                        :

                                            (

                                                <motion.button type="submit"
                                                               className="flex gap-2 items-center cursor-pointer text-xl border border-[#6392E5] bg-[#D9E1EF] text-[#005BEA] hover:bg-[#C9D8F3] p-4 rounded"
                                                               initial={{opacity: 0, y: 100}}
                                                               animate={{opacity: 1, y: 0}}
                                                               transition={{delay: 0.3}}>
                                                    <Send />
                                                    Submit
                                                </motion.button>

                                            )

                                    }

                                </div>
                            </div>
                        </form>
                    </div>
                </section>
            </div>
    );
};
export default UpdateAccountingOfficeInvestment;