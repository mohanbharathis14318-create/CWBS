import React, {useState} from 'react';
import {ChartPie, CircleFadingPlus, Eclipse, Send, X} from "lucide-react";
import {motion} from "motion/react";

const RequirementStatus = () => {
    // State for Modal
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Function for Open Modal
    function openModal() {

        setIsModalOpen(true);

    }
    return (
        <div>
            <div className="border border-[#A9C1EA] bg-[#F1F1F1] rounded p-4 my-4">
                <div className="flex justify-between">
                    <div className="flex gap-2 items-center">
                        <ChartPie />
                        Status
                    </div>

                    <div className="py-4">
                        <button
                            onClick={openModal}
                            type="button" className="flex gap-2 items-center text-[#005BEA] border border-[#6392E5] bg-[#D9E1EF] rounded px-6 py-2 hover:text-[#005BEA] hover:border hover:border-[#6392E5] hover:bg-[#C9D8F3]">
                            <CircleFadingPlus />
                            New Requirement
                        </button>
                    </div>
                </div>


                {/*Open Modal*/}
                {isModalOpen && (
                    <div className="fixed inset-0 bg-[#202020]/50 flex items-center justify-center z-50">
                        <div className="bg-[#F1F1F1] rounded w-11/12 h-9/10 md:w-1/2 lg:w-1/2 shadow-xl overflow-y-auto scroll-smooth">
                            <div className="sticky top-0 flex justify-between items-center bg-[#D9E1EF] rounded p-4 z-20">
                                <h2 className="flex gap-2 items-center text-xl text-[#005BEA]">
                                    <CircleFadingPlus /> New Requirement
                                </h2>
                                <button onClick={() => setIsModalOpen(false)} className="cursor-pointer text-gray-500 hover:text-gray-700">
                                    <X />
                                </button>
                            </div>

                            {/*Main Content*/}
                            <form>
                                <div className="p-4">
                                    <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-6">
                                        <motion.label
                                            initial={{opacity: 0, y: 100}}
                                            animate={{opacity: 1, y: 0}}
                                            transition={{delay: 0.1}}
                                            className="grid" htmlFor="date">
                                            <span className="mx-2">Requirement By</span>
                                            <input type="text"
                                                   className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4 my-2"
                                                   placeholder="Enter the Name" required/>
                                        </motion.label>

                                        <motion.label
                                            initial={{opacity: 0, y: 100}}
                                            animate={{opacity: 1, y: 0}}
                                            transition={{delay: 0.2}}
                                            className="grid" htmlFor="date">
                                            <span className="mx-2">Date & Time</span>
                                            <input type="datetime-local"
                                                   className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4 my-2"
                                                   placeholder="Enter the date-time" required/>
                                        </motion.label>
                                    </div>


                                    <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-6 my-4">
                                        <motion.label
                                            initial={{ opacity: 0, y: 100 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.3 }}
                                            className="grid" htmlFor="type">
                                            <span className="mx-2">Site Name</span>
                                            <select name="Type"
                                                    className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4 my-2"
                                                    placeholder="Indirect/Direct">
                                                <option value="">
                                                    Select Your Site Name
                                                </option>
                                                <option>Srinivasan</option>
                                                <option>Kumar</option>
                                            </select>
                                        </motion.label>

                                        <motion.label
                                            initial={{opacity: 0, y: 100}}
                                            animate={{opacity: 1, y: 0}}
                                            transition={{delay: 0.4}}
                                            className="grid" htmlFor="date">
                                            <span className="mx-2">Particular</span>
                                            <input type="text"
                                                   className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4 my-2"
                                                   placeholder="Enter the particular" required/>
                                        </motion.label>

                                        <motion.label
                                            initial={{opacity: 0, y: 100}}
                                            animate={{opacity: 1, y: 0}}
                                            transition={{delay: 0.5}}
                                            className="grid" htmlFor="date">
                                            <span className="mx-2">Quantity</span>
                                            <input type="number"
                                                   className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4 my-2"
                                                   placeholder="Enter the quantity" required/>
                                        </motion.label>

                                        <motion.label
                                            initial={{opacity: 0, y: 100}}
                                            animate={{opacity: 1, y: 0}}
                                            transition={{delay: 0.6}}
                                            className="grid" htmlFor="date">
                                            <span className="mx-2">Estimated Amount</span>
                                            <input type="text"
                                                   className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4 my-2"
                                                   placeholder="Enter the amount" required/>
                                        </motion.label>


                                        <motion.label
                                            initial={{opacity: 0, y: 100}}
                                            animate={{opacity: 1, y: 0}}
                                            transition={{delay: 0.7}}
                                            className="grid" htmlFor="date">
                                            <span className="mx-2">Delivery Date & Time</span>
                                            <input type="datetime-local"
                                                   className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4 my-2"
                                                   placeholder="Enter the date-time" required/>
                                        </motion.label>
                                    </div>

                                    <div className="py-4">
                                        <motion.label className="flex gap-x-2 items-center"
                                                      initial={{ opacity: 0, y: 100 }}
                                                      animate={{ opacity: 1, y: 0 }}
                                                      transition={{ delay: 0.7 }}
                                                      htmlFor="box">
                                            <input type="checkbox" className="accent-[#005BEA]"/>
                                            I confirm that the entered details are correct
                                        </motion.label>
                                    </div>

                                    <div className="py-2">
                                        <motion.button
                                            type="submit"
                                            className="flex gap-2 items-center cursor-pointer text-xl border border-[#6392E5] bg-[#D9E1EF] text-[#005BEA] hover:bg-[#C9D8F3] px-4 py-2 w-fit rounded"
                                            initial={{opacity: 0, y: 100}}
                                            animate={{opacity: 1, y: 0}}
                                            transition={{delay: 0.8}}>
                                              <span className="flex gap-2 justify-center items-center">
                                                    <Send />
                                                    Submit
                                              </span>
                                        </motion.button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default RequirementStatus;