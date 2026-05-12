import {NavLink} from "react-router-dom";
import {IndianRupee, ArrowRightLeft, CircleArrowLeft, CircleFadingPlus} from "lucide-react";
import {motion} from "motion/react";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

// Import Hooks
import { useCashInHand } from "../../../../Hooks/useTransaction.js";

// Import Components
import toast from "react-hot-toast";
import Loader from "../../../../components/Loader.jsx";
import Loading_Screen from "../../../../components/Loading_Screen.jsx";

const UpdateCashInHand = () => {


    const { getCashInHandDetailsById, updateCIH, loading } = useCashInHand();

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


    // Getting id of the data
    const { id } = useParams();

    console.log("CIHId: " + id);

    useEffect(() => {

        const fetchCashInHandData = async () => {

            const cihData = await getCashInHandDetailsById(id);

            console.log(cihData);

            if (cihData) {

                setFormData({
                    daily_activity: cihData.daily_activity|| "",
                    CIH_transaction_type: cihData.cih_transaction_type || "",
                    CIH_holders_name: cihData.cih_holders_name || "",
                    CIH_designation: cihData.cih_designation || "",
                    CIH_remarks: cihData.cih_remarks || "",
                    amount: cihData.cih_amount || "0",
                });

                setTransaction(cihData.cih_transaction_type || "");

            }

        }

        fetchCashInHandData();

    }, [getCashInHandDetailsById, id]);


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

            const add_success = await updateCIH({
                id,
                daily_activity: formData.daily_activity,
                CIH_transaction_type: formData.CIH_transaction_type,
                CIH_holders_name: formData.CIH_holders_name,
                CIH_designation: formData.CIH_designation,
                CIH_remarks: formData.CIH_remarks,
                amount: formData.amount,
            });

            console.log(add_success);

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
                    <div className="flex justify-between items-center">
                        <motion.p
                            initial={{opacity: 0, y: 100}}
                            animate={{opacity: 1, y: 0}}
                            transition={{delay: 0.1}}
                            className="head text-5xl">
                            Plan to Change the Environment
                        </motion.p>

                        <motion.button initial={{ opacity: 0, y: 100 }}
                                       animate={{ y: 0, opacity: 1 }}
                                       transition={{delay: 0.3 }}
                                       onClick={() => navigate("/app-area/transaction_book/cih_board")}
                                       className="flex gap-2 justify-center items-center text-[#005BEA]  text-xl border border-[#6392E5] bg-[#D9E1EF] hover:bg-[#C9D8F3] p-4 rounded">
                            <CircleArrowLeft />
                            Back
                        </motion.button>
                    </div>

                    <div className="py-4">
                        <motion.hr
                            initial={{opacity: 0, y: 100}}
                            animate={{y: 0, opacity: 1}}
                            className="border-[#6392E5]"/>
                    </div>

                    <div>
                        <motion.p
                            initial={{opacity: 0, y: 100}}
                            animate={{opacity: 1, y: 0}}
                            transition={{delay: 0.1}}
                            className="head text-xl">
                            Update Cash In Hand Detail
                        </motion.p>
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
                            <div className="flex justify-between items-center border border-[#6392E5] rounded p-4">
                                <motion.p
                                    initial={{opacity: 0, y: 100}}
                                    animate={{opacity: 1, y: 0}}
                                    transition={{delay: 0.1}}
                                    className="flex text-[#005BEA] gap-2 text-xl">
                                    Total Cash In Hand
                                </motion.p>

                                <div className="flex justify-between items-center text-lg">
                                    <motion.div
                                        initial={{ opacity: 0, y: 100 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.6 }}
                                        className="text-xl">
                                        <span className="flex gap-2 items-center text-[#005BEA] py-4">
                                        <IndianRupee />
                                            {

                                                formData.amount

                                            }
                                    </span>
                                    </motion.div>
                                </div>
                            </div>
                        </div>

                        <div className="grid md:grid lg:grid xl:grid justify-between items-center gap-6 mt-6">
                            <motion.label className="flex gap-x-2 items-center"
                                          initial={{ opacity: 0, y: 100 }}
                                          animate={{ opacity: 1, y: 0 }}
                                          transition={{ delay: 0.7 }}
                                          htmlFor="box">
                                <input checked={checked} onChange={(ev) => { setChecked(ev.target.checked) }} className="accent-[#005BEA]" type="checkbox"/>
                                Confirm all entries are valid
                            </motion.label>

                            <div className="py-2">

                                {

                                    loading
                                        ?

                                        ( <Loader /> )

                                        :

                                        (
                                            <motion.button
                                                type="submit"
                                                className="grid gap-2 items-center cursor-pointer text-xl border border-[#6392E5] bg-[#D9E1EF] text-[#005BEA] hover:bg-[#C9D8F3] p-4 w-fit rounded"
                                                initial={{opacity: 0, y: 100}}
                                                animate={{opacity: 1, y: 0}}
                                                transition={{delay: 0.3}}
                                                disabled={loading}>
                                                    <span className="flex gap-2 justify-center items-center">
                                                        <CircleFadingPlus />
                                                        Update Cash In Hand
                                                    </span>
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

export default UpdateCashInHand;