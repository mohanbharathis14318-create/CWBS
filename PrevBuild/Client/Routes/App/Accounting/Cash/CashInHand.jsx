import {NavLink} from "react-router-dom";
import {IndianRupee, ArrowRightLeft, BadgeInfo} from "lucide-react";
import {motion} from "motion/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// Import Hooks
import { useCashInHand } from "../../../../Hooks/useTransaction.js";

// Import Components
import toast from "react-hot-toast";
import Loader from "../../../../components/Loader.jsx";
import Loading_Screen from "../../../../components/Loading_Screen.jsx";

const CashInHand = () => {


    const { addCashInHandDetails, loading } = useCashInHand();

    const navigate = useNavigate();


    // Radio Btn For input Rendering
    const [transaction, setTransaction] = useState("");

    const [formData, setFormData] = useState({
        daily_activity: "Cash In Hand",
        CIH_transaction_type: "",
        CIH_designation: "",
        CIH_holders_name: "",
        CIH_remarks: "",
        amount: "0",
    });


    const [checked, setChecked] = useState(false);

    const [redirect, setRedirect] = useState(false);

    async function HandleSubmit(ev) {

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

            const add_success = await addCashInHandDetails(formData);

            if (add_success) {
                setRedirect(true);

                setTimeout(() => {

                    return navigate('/app-area/transaction_book/cih_board');

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
                <div className="grid border border-[#A9C1EA] rounded p-4 my-4">
                    <motion.div
                        initial={{opacity: 0, y: 100}}
                        animate={{opacity: 1, y: 0}}
                        transition={{delay: 0.1}}
                        className="head text-xl">
                        Cash In Hand
                    </motion.div>
                    <div className="my-2">
                        <motion.hr
                            initial={{opacity: 0, y: 100}}
                            animate={{y: 0, opacity: 1}}
                            className="border-[#6392E5]"/>
                    </div>

                    <div className="flex py-6">
                        <motion.span className="flex gap-2 border-l-10 border-[#005BEA] bg-[#F1F1F1] drop-shadow-lg p-4"
                                     initial={{opacity: 0, y: 100}}
                                     animate={{opacity: 1, y: 0}}
                                     transition={{delay: 0.2}}>
                            <BadgeInfo className="text-[#005BEA]" />
                            <p>
                                Fill every fields that you want to add cash in hand details
                            </p>
                        </motion.span>
                    </div>


                    <form onSubmit={ HandleSubmit }>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-10 my-6 mx-2">
                            <motion.label
                                initial={{opacity: 0, y: 100}}
                                animate={{opacity: 1, y: 0}}
                                transition={{delay: 0.1}}
                                className="grid" htmlFor="date">
                                <span className="mx-2">Daily Activity Type</span>
                                <input type="text"
                                       value={formData.daily_activity}
                                       onChange={(ev) => {
                                           setFormData({...formData, daily_activity: ev.target.value})
                                       }}
                                       disabled={true}
                                       className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4 my-2"
                                       placeholder="Enter the type" required/>
                            </motion.label>

                        </div>

                        <div className="my-4">
                            <motion.label
                                initial={{opacity: 0, y: 100}}
                                animate={{opacity: 1, y: 0}}
                                transition={{delay: 0.1}}
                                className="" htmlFor="date">
                                <span className="mx-2">Transaction Type</span>

                                <div className="flex gap-2 border border-[#005bea] rounded p-4">

                                    <motion.label
                                                  initial={{opacity: 0, y: 100}}
                                                  animate={{opacity: 1, y: 0}}
                                                  transition={{delay: 0.1}}
                                                  className="flex" htmlFor="date">
                                        <input type="radio"
                                               value="BankToCash"
                                               checked={transaction === "BankToCash"}
                                               onChange={(ev) => {
                                                   setTransaction(ev.target.value)
                                                   setFormData({...formData, CIH_transaction_type: ev.target.value})
                                               }}
                                               name="TrxnType" required/>
                                        <span className="mx-2">Bank to Cash</span>
                                    </motion.label>

                                    <motion.label
                                                  initial={{opacity: 0, y: 100}}
                                                  animate={{opacity: 1, y: 0}}
                                                  transition={{delay: 0.1}}
                                                  className="flex" htmlFor="date">
                                        <input type="radio" name="TrxnType"
                                               value="CashToBank"
                                               checked={transaction === "CashToBank"}
                                               onChange={(ev) => {
                                                   setTransaction(ev.target.value)
                                                   setFormData({...formData, CIH_transaction_type: ev.target.value})
                                               }}
                                               required/>
                                        <span className="mx-2">Cash to Bank</span>
                                    </motion.label>
                                </div>

                            </motion.label>

                        </div>

                        <div className="my-2">
                            <motion.hr
                                initial={{opacity: 0, y: 100}}
                                animate={{y: 0, opacity: 1}}
                                className="border-[#6392E5]"/>
                        </div>

                        {/* Bank to cash */}
                        {

                            transaction === "BankToCash"

                            &&

                            (

                                <div>

                                    {/*<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-10 pt-6 mx-2">*/}
                                    {/*    <motion.label*/}
                                    {/*        initial={{opacity: 0, y: 100}}*/}
                                    {/*        animate={{opacity: 1, y: 0}}*/}
                                    {/*        transition={{delay: 0.2}}*/}
                                    {/*        className="grid" htmlFor="date">*/}
                                    {/*        <span className="mx-2">Transaction Type</span>*/}
                                    {/*        <input type="text"*/}
                                    {/*               value={formData.CIH_transaction_type}*/}
                                    {/*               onChange={(ev) => {*/}
                                    {/*                   setFormData({...formData, CIH_transaction_type: ev.target.value})*/}
                                    {/*               }}*/}
                                    {/*               disabled={true}*/}
                                    {/*               className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4 my-2"*/}
                                    {/*               placeholder="Enter the type" required/>*/}
                                    {/*    </motion.label>*/}
                                    {/*</div>*/}
                                    <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-10 my-6 mx-2">
                                        <motion.label
                                            initial={{opacity: 0, y: 100}}
                                            animate={{opacity: 1, y: 0}}
                                            transition={{delay: 0.3}}
                                            className="grid" htmlFor="cash">
                                            <span className="mx-2">Bank</span>
                                            <input type="text"
                                                   value={formData.amount}
                                                   onChange={(ev) => {
                                                       setFormData({...formData, amount: ev.target.value})
                                                   }}
                                                   className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4 my-2"
                                                   placeholder="Enter the amount" required/>
                                        </motion.label>

                                        <motion.label
                                            initial={{opacity: 0, y: 100}}
                                            animate={{opacity: 1, y: 0}}
                                            transition={{delay: 0.4}}
                                            className="grid" htmlFor="Bank">
                                            <span className="mx-2">Holder Name</span>
                                            <input type="text"
                                                   value={formData.CIH_holders_name}
                                                   onChange={(ev) => {
                                                       setFormData({...formData, CIH_holders_name: ev.target.value})
                                                   }}
                                                   className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4 my-2"
                                                   placeholder="Enter the holder name" required/>
                                        </motion.label>

                                        <motion.label initial={{opacity: 0, y: 100}}
                                                      animate={{opacity: 1, y: 0}}
                                                      transition={{delay: 0.5}}
                                                      className="grid" htmlFor="designation">
                                            <span className="mx-2">Designation</span>
                                            <select name="designation"
                                                    value={formData.CIH_designation}
                                                    onChange={(ev) => {
                                                        setFormData({...formData, CIH_designation: ev.target.value})
                                                    }}
                                                    className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4 my-2"
                                                    id="role" placeholder="Select Your Designation">
                                                <option value="">
                                                    Select Your Designation
                                                </option>
                                                <option value="MD">MD</option>
                                                <option value="Accountant">Accountant</option>
                                                <option value="Site Supervisor">Site Supervisor</option>
                                                <option value="Other Individuals">Other Individuals</option>
                                            </select>
                                        </motion.label>

                                        <motion.label
                                            initial={{opacity: 0, y: 100}}
                                            animate={{opacity: 1, y: 0}}
                                            transition={{delay: 0.6}}
                                            className="grid" htmlFor="Bank">
                                            <span className="mx-2">Remarks</span>
                                            <input type="text"
                                                   value={formData.CIH_remarks}
                                                   onChange={(ev) => {
                                                       setFormData({...formData, CIH_remarks: ev.target.value})
                                                   }}
                                                   className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4 my-2"
                                                   placeholder="Enter the remarks" required/>
                                        </motion.label>
                                    </div>
                                    <div className="grid md:grid lg:grid xl:grid gap-2">
                                        <div className="flex justify-between items-center text-[#005BEA] text-xl">
                                            <motion.label
                                                className="flex gap-x-2 items-center"
                                                initial={{opacity: 0, y: 100}}
                                                animate={{opacity: 1, y: 0}}
                                                transition={{delay: 0.2}}
                                                htmlFor="box">
                                                Transaction Amount (Bank To Cash)
                                            </motion.label>


                                            <motion.div
                                                initial={{opacity: 0, y: 100}}
                                                animate={{opacity: 1, y: 0}}
                                                transition={{delay: 0.3}}>
                                   <span className="flex gap-2 items-center text-[#005BEA] py-4">
                                    <IndianRupee/>
                                       {formData.amount}
                                    </span>
                                            </motion.div>
                                        </div>
                                    </div>
                                    <div className="mb-2">
                                        <motion.hr
                                            initial={{opacity: 0, y: 100}}
                                            animate={{y: 0, opacity: 1}}
                                            className="border-[#6392E5]"/>
                                    </div>


                                </div>

                            )

                        }



                        {/* cash to bank*/}

                        {

                            transaction === "CashToBank"

                            &&

                            (

                                <div>

                                    {/*<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-10 pt-6 mx-2">*/}
                                    {/*    <motion.label*/}
                                    {/*        initial={{opacity: 0, y: 100}}*/}
                                    {/*        animate={{opacity: 1, y: 0}}*/}
                                    {/*        transition={{delay: 0.1}}*/}
                                    {/*        className="grid" htmlFor="date">*/}
                                    {/*        <span className="mx-2">Transaction Type</span>*/}
                                    {/*        <input type="text"*/}
                                    {/*               value={formData.CIH_transaction_type}*/}
                                    {/*               onChange={(ev) => {*/}
                                    {/*                   setFormData({...formData, CIH_transaction_type: ev.target.value})*/}
                                    {/*               }}*/}
                                    {/*               disabled={true}*/}
                                    {/*               className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4 my-2"*/}
                                    {/*               placeholder="Enter the type" required/>*/}
                                    {/*    </motion.label>*/}
                                    {/*</div>*/}
                                    <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-10 my-6 mx-2">
                                        <motion.label
                                            initial={{opacity: 0, y: 100}}
                                            animate={{opacity: 1, y: 0}}
                                            transition={{delay: 0.2}}
                                            className="grid" htmlFor="cash">
                                            <span className="mx-2">Cash</span>
                                            <input type="text"
                                                   value={formData.amount}
                                                   onChange={(ev) => {
                                                       setFormData({...formData, amount: ev.target.value})
                                                   }}
                                                   className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4 my-2"
                                                   placeholder="Enter the amount" required/>
                                        </motion.label>

                                        <motion.label
                                            initial={{opacity: 0, y: 100}}
                                            animate={{opacity: 1, y: 0}}
                                            transition={{delay: 0.3}}
                                            className="grid" htmlFor="Bank">
                                            <span className="mx-2">Holder Name</span>
                                            <input type="text"
                                                   value={formData.CIH_holders_name}
                                                   onChange={(ev) => {
                                                       setFormData({...formData, CIH_holders_name: ev.target.value})
                                                   }}
                                                   className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4 my-2"
                                                   placeholder="Enter the holder name" required/>
                                        </motion.label>

                                        <motion.label initial={{opacity: 0, y: 100}}
                                                      animate={{opacity: 1, y: 0}}
                                                      transition={{delay: 0.4}}
                                                      className="grid" htmlFor="designation">
                                            <span className="mx-2">Designation</span>
                                            <select name="designation"
                                                    value={formData.CIH_designation}
                                                    onChange={(ev) => {
                                                        setFormData({...formData, CIH_designation: ev.target.value})
                                                    }}
                                                    className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4 my-2"
                                                    id="role" placeholder="Select Your Designation">
                                                <option value="">
                                                    Select Your Designation
                                                </option>
                                                <option value="MD">MD</option>
                                                <option value="Accountant">Accountant</option>
                                                <option value="Site Supervisor">Site Supervisor</option>
                                                <option value="Other Individuals">Other Individuals</option>
                                            </select>
                                        </motion.label>

                                        <motion.label
                                            initial={{opacity: 0, y: 100}}
                                            animate={{opacity: 1, y: 0}}
                                            transition={{delay: 0.5}}
                                            className="grid" htmlFor="Bank">
                                            <span className="mx-2">Remarks</span>
                                            <input type="text"
                                                   value={formData.CIH_remarks}
                                                   onChange={(ev) => {
                                                       setFormData({...formData, CIH_remarks: ev.target.value})
                                                   }}
                                                   className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4 my-2"
                                                   placeholder="Enter the remarks" required/>
                                        </motion.label>
                                    </div>

                                    <div className="grid md:grid lg:grid xl:grid gap-2">
                                        <div className="flex justify-between items-center text-[#005BEA] text-xl">
                                            <motion.label
                                                className="flex gap-x-2 items-center"
                                                initial={{opacity: 0, y: 100}}
                                                animate={{opacity: 1, y: 0}}
                                                transition={{delay: 0.2}}
                                                htmlFor="box">
                                                Transaction Amount (Cash To Bank)
                                            </motion.label>


                                            <motion.div
                                                initial={{opacity: 0, y: 100}}
                                                animate={{opacity: 1, y: 0}}
                                                transition={{delay: 0.3}}>
                                    <span className="flex gap-2 items-center text-[#005BEA] py-4">
                                    <IndianRupee/>
                                        {formData.amount}
                                    </span>
                                            </motion.div>
                                        </div>
                                    </div>
                                    <div className="mb-2">
                                        <motion.hr
                                            initial={{opacity: 0, y: 100}}
                                            animate={{y: 0, opacity: 1}}
                                            className="border-[#6392E5]"/>
                                    </div>

                                </div>

                            )

                        }



                        <div className="grid md:grid lg:grid xl:grid gap-2 my-6">
                            <div
                                className="flex justify-between items-center text-lg border border-[#6392E5] rounded p-4">
                                <motion.label
                                    className="flex text-[#005BEA] gap-2"
                                    initial={{opacity: 0, y: 100}}
                                    animate={{opacity: 1, y: 0}}
                                    transition={{delay: 0.2}}
                                    htmlFor="box">
                                    Total Cash In Hand
                                </motion.label>


                                <motion.div
                                    initial={{opacity: 0, y: 100}}
                                    animate={{opacity: 1, y: 0}}
                                    transition={{delay: 0.3}}>
                                    <span className="flex gap-2 items-center text-[#005BEA] py-4">
                                        <IndianRupee/>
                                        {formData.amount}
                                    </span>
                                </motion.div>
                            </div>
                        </div>

                        <div className="py-8">
                            <motion.label className="flex gap-x-2 items-center"
                                          initial={{opacity: 0, y: 100}}
                                          animate={{opacity: 1, y: 0}}
                                          transition={{delay: 0.2}}
                                          htmlFor="box">
                                <input className="accent-[#005BEA]"
                                       type="checkbox"
                                       checked={checked} onChange={ (ev) => { setChecked(ev.target.checked) } } />
                                Check the transaction details is valid to submit
                            </motion.label>
                        </div>


                        <div>
                            <motion.button type="submit"
                                           className="flex gap-2 items-center cursor-pointer text-xl border border-[#6392E5] bg-[#D9E1EF] text-[#005BEA] hover:bg-[#C9D8F3] px-6 py-2 rounded"
                                           initial={{opacity: 0, y: 100}}
                                           animate={{opacity: 1, y: 0}}
                                           transition={{delay: 0.3}}
                                           disabled={loading}>
                                {

                                    loading
                                        ?

                                        ( <Loader /> )

                                        :

                                        (
                                            <span className="flex gap-2 justify-center items-center">
                                                    <ArrowRightLeft/>
                                                    Record Transactions
                                                </span>
                                        )

                                }
                            </motion.button>
                        </div>
                    </form>
                </div>
            </section>
        </div>
    );
};

export default CashInHand;