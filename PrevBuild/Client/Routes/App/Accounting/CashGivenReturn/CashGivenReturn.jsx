import React, {useState} from 'react';
import {motion} from "motion/react";
import {ArrowRightLeft} from "lucide-react";

const CashGivenReturn = () => {

    const [formData, setFormData] = useState({
        date_time: "",
        name: "",
        payment_mode: "",

});

    async function HandleSubmit(ev) {

        ev.preventDefault();

    }


    return (
        <div>
            <section>
                <div className="grid box-border border border-[#A9C1EA] rounded p-4 my-4">
                    <motion.div
                        initial={{opacity: 0, y: 100}}
                        animate={{opacity: 1, y: 0}}
                        transition={{delay: 0.1}}
                        className="head text-xl">
                        Cash Given/Return
                    </motion.div>
                    <div className="py-4">
                        <motion.hr
                            initial={{opacity: 0, y: 100}}
                            animate={{y: 0, opacity: 1}}
                            className="border-[#6392E5]"/>
                    </div>

                    <form onSubmit={HandleSubmit}>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-10 my-4">
                            <motion.label
                                initial={{opacity: 0, y: 100}}
                                animate={{opacity: 1, y: 0}}
                                transition={{delay: 0.2}}
                                className="grid" htmlFor="date">
                                <span className="mx-2">Daily Activity Type</span>
                                <select name="paymentmode"
                                        value={formData.name}
                                        onChange={(ev) => { setFormData({ ...formData, name: ev.target.value}) }}
                                        className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                        id="">
                                    <option value="">
                                        Select
                                    </option>
                                    <option>Cash Given</option>
                                    <option>Cash Return</option>
                                </select>
                            </motion.label>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-10 my-6">
                            <motion.label
                                initial={{opacity: 0, y: 100}}
                                animate={{opacity: 1, y: 0}}
                                transition={{delay: 0.3}}
                                className="grid" htmlFor="date">
                                <span className="mx-2">Date</span>
                                <input type="datetime-local"
                                       value={formData.date_time}
                                       onChange={(ev) => { setFormData({ ...formData, date_time: ev.target.value}) }}
                                       className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                       placeholder="DD-MM-YYYY" required/>
                            </motion.label>
                            <motion.label
                                initial={{opacity: 0, y: 100}}
                                animate={{opacity: 1, y: 0}}
                                transition={{delay: 0.4}}
                                className="grid" htmlFor="Name">
                                <span className="mx-2">Name</span>
                                <select name="paymentmode"
                                        value={formData.name}
                                        onChange={(ev) => { setFormData({ ...formData, name: ev.target.value}) }}
                                        className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                        id="" placeholder="Select Your Name">
                                    <option value="">
                                        Select Your Name
                                    </option>
                                    <option>Sridharan</option>
                                    <option>Vinodh</option>
                                    <option>Siva</option>
                                </select>
                            </motion.label>

                            <motion.label
                                initial={{opacity: 0, y: 100}}
                                animate={{opacity: 1, y: 0}}
                                transition={{delay: 0.5}}
                                className="grid" htmlFor="Name">
                                <span className="mx-2">Payment Mode</span>
                                <select name="mode"
                                        value={formData.payment_mode}
                                        onChange={(ev) => { setFormData({ ...formData, payment_mode: ev.target.value}) }}
                                        className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                        id="" placeholder="Select Your Mode">
                                    <option value="">
                                        Select Your Payment Mode
                                    </option>
                                    <option>UPI</option>
                                    <option>BANK</option>
                                    <option>CASH</option>
                                </select>
                            </motion.label>
                        </div>

                            <div className="py-2">
                                <motion.label className="flex gap-x-2 items-center"
                                              initial={{ opacity: 0, y: 100 }}
                                              animate={{ opacity: 1, y: 0 }}
                                              transition={{ delay: 0.2 }}
                                              htmlFor="box">
                                    <input className="accent-[#005BEA]" type="checkbox"/>
                                    Check the transaction details is valid to submit
                                </motion.label>
                            </div>

                            <div className="py-2">
                                <motion.button type="submit"
                                               className="flex gap-2 items-center cursor-pointer text-xl border border-[#6392E5] bg-[#D9E1EF] text-[#005BEA] hover:bg-[#C9D8F3] px-6 py-2 rounded"
                                               initial={{opacity: 0, y: 100}}
                                               animate={{opacity: 1, y: 0}}
                                               transition={{delay: 0.3}}>
                                    <ArrowRightLeft />
                                    Record Transactions
                                </motion.button>
                            </div>
                    </form>
                </div>
            </section>
        </div>
    );
};

export default CashGivenReturn;