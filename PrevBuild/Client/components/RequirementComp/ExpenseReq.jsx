// Import
import {motion} from "motion/react";
import {BadgeInfo, Briefcase, IndianRupee, Send, User} from "lucide-react";
import React, { useEffect } from "react";

// Import Hooks
import { useUser } from "../../Hooks/useUser.js";


// Import Components


const ExpenseReq = ({ formData, setFormData }) => {

    const { fetchAllUsers, userList } = useUser();
    
    useEffect(() => {

        fetchAllUsers();

    }, [fetchAllUsers]);

    const userData = Array.isArray(userList) ? userList : [];

    return (
        <div>

            <motion.hr
                initial={{opacity: 0, y: 100}}
                animate={{y: 0, opacity: 1}}
                className="border-[#6392E5] my-4"/>

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

                <div className="grid md:grid-cols-1 xl:grid-cols-2 gap-10 text-[#202020] py-6">
                    <motion.label
                        initial={{ opacity: 0, y: 100 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3}}
                        className="grid" htmlFor="name">
                        <span className="mx-2">Transaction Title</span>
                        <input type="text"
                               value={formData.transaction_title}
                               onChange={(ev) => {setFormData({ ...formData, transaction_title: ev.target.value })}}
                               className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                               placeholder="Enter the Name" required/>
                    </motion.label>
                </div>


                <div className="grid md:grid-cols-1 xl:grid-cols-2 gap-10">
                    <motion.label
                        initial={{ opacity: 0, y: 100 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="grid" htmlFor="remarks">
                        <span className="mx-2">Transaction Description</span>
                        <textarea
                            value={formData.trxn_remarks}
                            onChange={(ev) => {setFormData({ ...formData, trxn_remarks: ev.target.value })}}
                            className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                            placeholder="Enter the Description" required>
                        </textarea>
                    </motion.label>
                </div>
            </div>



            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-10 text-[#202020] py-6">
                <motion.label
                    initial={{ opacity: 0, y: 100 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3}}
                    className="grid" htmlFor="name">
                    <span className="mx-2">Your Name</span>
                    <input type="text"
                           value={formData.user_name}
                           onChange={(ev) => {setFormData({ ...formData, user_name: ev.target.value })}}
                           className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                           placeholder="Enter the Name" required/>
                </motion.label>

                <motion.label initial={{ opacity: 0, y: 100 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.4 }}
                              className="grid" htmlFor="designation">
                    <span className="mx-2">Your Designation</span>
                    <select name="designation"
                            value={formData.user_designation}
                            disabled={true}
                            onChange={(ev) => {setFormData({ ...formData, user_designation: ev.target.value })}}
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
                            value={formData.payment_mode}
                            onChange={(ev) => { setFormData({ ...formData, payment_mode: ev.target.value })}}
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
                            value={formData.expense_type}
                            onChange={(ev) => { setFormData({ ...formData, expense_type: ev.target.value })}}
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


            <div className="grid md:grid-cols-1 xl:grid-cols-2 gap-10">
                <motion.label
                    initial={{ opacity: 0, y: 100 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    className="grid" htmlFor="amount">
                    <span className="mx-2">Requested Amount</span>
                    <input type="text"
                           value={formData.amount}
                           onChange={(ev) => { const value = ev.target.value;
                               setFormData({ ...formData, amount: value, given_amount: value })}}
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
                            {formData.amount}
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
                <div className="grid md:grid-cols-1 xl:grid-cols-2 gap-10  text-[#202020] py-6">
                    <motion.label
                        initial={{ opacity: 0, y: 100 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="grid" htmlFor="cashflow">
                        <span className="mx-2">Cash flow Type</span>
                        <select name="cashflow"
                                disabled={true}
                                value={formData.cash_flow_type}
                                onChange={(ev) => {
                                    setFormData({ ...formData, cash_flow_type: ev.target.value})
                                }}
                                className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                placeholder="Select Your Payment Mode">
                            <option>
                                Select Your Type
                            </option>
                            <option>Cash Given</option>
                            {/*<option>Cash Return</option>*/}
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


                <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-10 my-6">
                    <motion.label
                        initial={{opacity: 0, y: 100}}
                        animate={{opacity: 1, y: 0}}
                        transition={{delay: 0.3}}
                        className="grid" htmlFor="date">
                        <span className="mx-2">Date</span>
                        <input type="date"
                               value={ formData.given_date }
                               onChange={ (ev) => setFormData({ ...formData, given_date: ev.target.value }) }
                               className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                               placeholder="DD-MM-YYYY" required/>
                    </motion.label>

                    <motion.label
                        initial={{ opacity: 0, y: 100 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4}}
                        className="grid" htmlFor="name">
                        <span className="mx-2">Sender Name</span>
                        <select value={ formData.given_sender_name }
                                onChange={ (ev) => setFormData({ ...formData, given_sender_name: ev.target.value }) }
                                className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                placeholder="Enter the Name" required>
                            <option>
                                Select Sender Name
                            </option>
                            {

                                userData.map((user, index) => user.user_designation === "MD" ? (

                                    <option key={index}>
                                        {user.full_name}
                                    </option>

                                ) : ( <p>Contact MD</p> ))

                            }
                        </select>
                    </motion.label>
                    <motion.label initial={{ opacity: 0, y: 100 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ delay: 0.5 }}
                                  className="grid" htmlFor="designation">
                        <span className="mx-2">Designation</span>
                        <select name="designation"
                                value={ formData.given_sender_designation }
                                disabled={true}
                                onChange={ (ev) => setFormData({ ...formData, given_sender_designation: ev.target.value }) }
                                className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                placeholder="Select Your Designation">
                            <option>
                                Select Your Designation
                            </option>
                            <option>
                                MD
                            </option>
                            <option>
                                Accountant
                            </option>
                            <option>
                                Site Supervisor
                            </option>
                            <option>
                                Other Individual
                            </option>
                        </select>
                    </motion.label>
                    <motion.label
                        initial={{ opacity: 0, y: 100 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        className="grid" htmlFor="paymentmode">
                        <span className="mx-2">Payment Mode</span>
                        <select name="paymentmode"
                                value={ formData.given_payment_mode }
                                onChange={ (ev) => setFormData({ ...formData, given_payment_mode: ev.target.value }) }
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
                               value={formData.given_amount}
                               onChange={(ev) => {

                                   const value = ev.target.value;

                                   setFormData({

                                   ...formData, given_amount: value, amount: value

                               })}}
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
                                {formData.given_amount}
                            </span>
                        </motion.div>
                    </div>
                </div>


            </div>

        </div>
    );
};

export default ExpenseReq;