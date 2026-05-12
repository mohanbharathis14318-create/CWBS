import React, {useState} from 'react';
import {motion} from "motion/react";
import {IndianRupee, Send} from "lucide-react";

const AccountingSiteExpense = () => {
    const [formData, setFormData] = useState({
        daily_activity_type: "Site Expenses",
        site_name: "",
        date: "",
        particulars: "",
        categories: "",
        expenses_type: "",
        amount: "0",
        remarks: "",
        payment_mode: "",
        discount: "",
        s_gst: "",
        c_gst: "",
        i_gst: "",
        upload_file: "",
    });

    async function HandleSubmit(ev) {

        ev.preventDefault();

    }

    return (
        <div>
            {/* Accounting Site Expense */}
            <section>
                <div className="grid box-border border border-[#A9C1EA] rounded p-4 my-4">
                    <motion.div
                        initial={{opacity: 0, y: 100}}
                        animate={{opacity: 1, y: 0}}
                        transition={{delay: 0.1}}
                        className="head text-xl">
                        Site Expenses
                    </motion.div>
                    <div className="py-4">
                        <motion.hr
                            initial={{opacity: 0, y: 100}}
                            animate={{y: 0, opacity: 1}}
                            className="border-[#6392E5]"/>
                    </div>


                    <div>
                        <form onSubmit={ HandleSubmit }>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-10 my-4">
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
                                           placeholder="Enter the type" required/>
                                </motion.label>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-10 my-4">
                                <motion.label
                                    initial={{opacity: 0, y: 100}}
                                    animate={{opacity: 1, y: 0}}
                                    transition={{delay: 0.2}}
                                    className="grid" htmlFor="Expenses">
                                    <span className="mx-2">Site Expenses</span>
                                    <select name="paymentmode"
                                            value={formData.site_name}
                                            onChange={(ev) => { setFormData({ ...formData, site_name: ev.target.value}) }}
                                            className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4 my-2"
                                            id="">
                                        <option value="">
                                            Select your Site Expenses
                                        </option>
                                        <option>Labour</option>
                                        <option>Material</option>
                                    </select>
                                </motion.label>
                            </div>


                            <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 xl:grid-cols-3 gap-10 py-6">
                                <motion.label
                                    initial={{opacity: 0, y: 100}}
                                    animate={{opacity: 1, y: 0}}
                                    transition={{delay: 0.3}}
                                    className="grid" htmlFor="date">
                                    <span className="mx-2">Date</span>
                                    <input type="date"
                                           value={formData.date}
                                           onChange={(ev) => { setFormData({ ...formData, date: ev.target.value}) }}
                                           className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                           placeholder="DD-MM-YYYY" required/>
                                </motion.label>
                                <motion.label
                                    initial={{opacity: 0, y: 100}}
                                    animate={{opacity: 1, y: 0}}
                                    transition={{delay: 0.4}}
                                    className="grid" htmlFor="particulars">
                                    <span className="mx-2">Particulars</span>
                                    <input type="text"
                                           value={formData.particulars}
                                           onChange={(ev) => { setFormData({ ...formData, particulars: ev.target.value}) }}
                                           className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                           placeholder="Enter Your Particulars" required/>
                                </motion.label>
                                <motion.label
                                    initial={{opacity: 0, y: 100}}
                                    animate={{opacity: 1, y: 0}}
                                    transition={{delay: 0.5}}
                                    className="grid" htmlFor="amount">
                                    <span className="mx-2">Categories</span>
                                    <select name="categories"
                                            value={formData.categories}
                                            onChange={(ev) => { setFormData({ ...formData, categories: ev.target.value}) }}
                                            className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                            id="" placeholder="Select Your Payment Mode">
                                        <option value="">
                                            Select Your Category
                                        </option>
                                        <option>Mason</option>
                                        <option>Painters</option>
                                        <option>Plumbing</option>
                                        <option>Electrician</option>
                                    </select>
                                    </motion.label>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 xl:grid-cols-3 gap-10 py-6">
                                <motion.label
                                    initial={{opacity: 0, y: 100}}
                                    animate={{opacity: 1, y: 0}}
                                    transition={{delay: 0.6}}
                                    className="grid" htmlFor="Expenses">
                                    <span className="mx-2">Expenses Type</span>
                                    <select name="type"
                                            value={formData.expenses_type}
                                            onChange={(ev) => { setFormData({ ...formData, expenses_type: ev.target.value}) }}
                                            className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                            id="" placeholder="Select Your Type">
                                        <option value="">
                                            Select Your Expenses Type
                                        </option>
                                        <option>Direct</option>
                                        <option>Indirect</option>
                                    </select>
                                </motion.label>
                                <motion.label
                                    initial={{opacity: 0, y: 100}}
                                    animate={{opacity: 1, y: 0}}
                                    transition={{delay: 0.7}}
                                    className="grid" htmlFor="amount">
                                    <span className="mx-2">Amount</span>
                                    <input type="text"
                                           value={formData.amount}
                                           onChange={(ev) => { setFormData({ ...formData, amount: ev.target.value}) }}
                                           className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                           placeholder="Enter the Amount" required/>
                                </motion.label>
                                <motion.label
                                    initial={{opacity: 0, y: 100}}
                                    animate={{opacity: 1, y: 0}}
                                    transition={{delay: 0.8}}
                                    className="grid" htmlFor="remarks">
                                    <span className="mx-2">Remarks</span>
                                    <input type="text"
                                           value={formData.remarks}
                                           onChange={(ev) => { setFormData({ ...formData, remarks: ev.target.value}) }}
                                           className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                           placeholder="Enter the Remarks" required/>
                                </motion.label>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 xl:grid-cols-3 gap-10 py-6">
                                <motion.label
                                    initial={{opacity: 0, y: 100}}
                                    animate={{opacity: 1, y: 0}}
                                    transition={{delay: 0.9}}
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
                                    initial={{opacity: 0, y: 100}}
                                    animate={{opacity: 1, y: 0}}
                                    transition={{delay: 1.0}}
                                    className="grid" htmlFor="Discount">
                                    <span className="mx-2">Discount</span>
                                    <input type="text"
                                           value={formData.discount}
                                           onChange={(ev) => { setFormData({ ...formData, discount: ev.target.value}) }}
                                           className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                           placeholder="Enter the Discont" required/>
                                </motion.label>
                            </div>


                            <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 xl:grid-cols-3 gap-10 py-6">
                                <motion.label
                                    initial={{opacity: 0, y: 100}}
                                    animate={{opacity: 1, y: 0}}
                                    transition={{delay: 1.1}}
                                    className="grid" htmlFor="sgst">
                                    <span className="mx-2">SGST</span>
                                    <div className="flex gap-4">
                                        <input type="text"
                                               className="outline outline-[#BABABA] w-30 focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                               placeholder="%" required/>
                                        <input type="text"
                                               className="outline outline-[#BABABA] w-40 focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                               placeholder="Amount" required/>
                                    </div>
                                </motion.label>
                                <motion.label
                                    initial={{opacity: 0, y: 100}}
                                    animate={{opacity: 1, y: 0}}
                                    transition={{delay: 1.2}}
                                    className="grid" htmlFor="cgst">
                                    <span className="mx-2">CGST</span>
                                    <div className="flex gap-4">
                                        <input type="text"
                                               className="outline outline-[#BABABA] w-30 focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                               placeholder="%" required/>
                                        <input type="text"
                                               className="outline outline-[#BABABA] w-40 focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                               placeholder="Amount" required/>
                                    </div>
                                </motion.label>
                                <motion.label
                                    initial={{opacity: 0, y: 100}}
                                    animate={{opacity: 1, y: 0}}
                                    transition={{delay: 1.3}}
                                    className="grid" htmlFor="igst">
                                    <span className="mx-2">IGST</span>
                                    <div className="flex gap-4">
                                        <input type="text"
                                               className="outline outline-[#BABABA] w-30 focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                               placeholder="%" required/>
                                        <input type="text"
                                               className="outline outline-[#BABABA] w-40 focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                               placeholder="Amount" required/>
                                    </div>
                                </motion.label>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-10 py-10">
                                <motion.label
                                    initial={{opacity: 0, y: 100}}
                                    animate={{opacity: 1, y: 0}}
                                    transition={{delay: 1.4}}
                                    className="grid" htmlFor="amount">
                                    <span className="text-[#005BEA] mx-2 py-4">
                                        Upload File
                                    </span>
                                    <input type="file"
                                           value={formData.upload_file}
                                           onChange={(ev) => { setFormData({ ...formData, upload_file: ev.target.value}) }}
                                           className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                           placeholder="Enter the Amount" required/>
                                    <p className="mx-2 py-3">
                                        JPG, SVG, PDF (Max File Size 5MB)
                                    </p>
                                </motion.label>
                            </div>

                            <div className="grid md:grid lg:grid xl:grid justify-between items-center gap-2">
                                <motion.div
                                    initial={{opacity: 0, y: 100}}
                                    animate={{opacity: 1, y: 0}}
                                    transition={{delay: 0.1}}
                                    className="text-xl">
                                    Total <br/>
                                    <span className="flex gap-2 items-center py-2 text-[#005BEA]">
                                             <IndianRupee />
                                        { formData.amount }
                                    </span>
                                </motion.div>

                                <motion.label className="flex gap-x-2 items-center"
                                              initial={{opacity: 0, y: 100}}
                                              animate={{opacity: 1, y: 0}}
                                              transition={{delay: 0.2}}
                                              htmlFor="box">
                                    <input className="accent-[#005BEA]" type="checkbox"/>
                                    Check the transaction details is valid to submit
                                </motion.label>


                                <div className="py-2">
                                    <motion.button type="submit"
                                                   className="flex gap-2 items-center cursor-pointer text-xl border border-[#6392E5] bg-[#D9E1EF] text-[#005BEA] hover:bg-[#C9D8F3] px-6 py-2 rounded"
                                                   initial={{opacity: 0, y: 100}}
                                                   animate={{opacity: 1, y: 0}}
                                                   transition={{delay: 0.3}}>
                                        <Send />
                                        Submit
                                    </motion.button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AccountingSiteExpense;