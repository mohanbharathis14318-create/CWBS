// Import Modules

import {motion} from "motion/react";
import {ArrowUpNarrowWide, IndianRupee, TicketPercent} from "lucide-react";
import React from "react";

const LabourViewUI = ({
                          DetailsIcon,
                          DetailsTitle,
                          name,
                          phone,
                          costPerSQFT,
                          TotalContractBFT,
                          address,
                          ExtraCharges,
                          TotalExtraCharges,
                          SGSTPercent, SGSTAmt,
                          CGSTPercent, CGSTAmt,
                          IGSTPercent, IGSTAmt,
                          TotalContractAFT
                      }) => {
    return (
        <div>
            <div className="grid gap-2 border border-[#A9C1EA] rounded p-2 m-2">
                <motion.div
                    initial={{ opacity: 0, y: 100 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{delay: 0.2, type: "spring", stiffness: 200}}
                    className="grid justify-start item-center border border-[#A9C1EA] rounded"
                >
                    <div className="flex gap-2">
                        <div className="flex justify-center items-center bg-[#C9D8F3] text-[#005BEA] rounded px-4">
                            { DetailsIcon }
                        </div>
                        <div className="flex items-center gap-4 px-2 py-4">
                            <p className="text-xl text-[#005BEA]">
                                { DetailsTitle } Details
                            </p>
                        </div>
                    </div>
                </motion.div>

                <div className="grid gap-2 border border-[#A9C1EA] rounded p-4">

                    <div className="flex gap-2 items-center">
                        <p className="text-[#005BEA]">
                            Name :
                        </p>
                        <p className="text-md">
                            { name }
                        </p>
                    </div>
                    <div className="flex gap-2 items-center">
                        <p className=" text-[#005BEA]">
                            Phone No :
                        </p>
                        <p>
                            { phone }
                        </p>
                    </div>

                    <div className="flex gap-2 items-center">
                        <p className=" text-[#005BEA]">
                            Cost Per Sqft :
                        </p>

                        <p className="flex justify-center items-center">
                            <IndianRupee size={16} />
                            { parseFloat(costPerSQFT).toLocaleString('en-IN') }
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-2 items-center">
                        <p className="text-[#005BEA]">
                            Address :
                        </p>
                        <p>
                            { address }
                        </p>
                    </div>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 100 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{delay: 0.2, type: "spring", stiffness: 200}}
                    className="flex  justify-between items-center border border-[#A9C1EA] rounded p-4"
                >
                    <p className="text-[#005BEA]">
                        Total { DetailsTitle } Cost:
                    </p>
                    <p className="flex justify-center items-center text-md">
                        <IndianRupee size={20} />
                        { parseFloat(TotalContractBFT).toLocaleString('en-IN') }
                    </p>
                </motion.div>


                <motion.div
                    initial={{ opacity: 0, y: 100 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{delay: 0.2, type: "spring", stiffness: 200}}
                    className="grid justify-start item-center border border-[#A9C1EA] rounded"
                >
                    <div className="flex flex-cols-2 gap-2">
                        <div className="flex justify-center items-center bg-[#C9D8F3] text-[#005BEA] rounded px-4">
                            <ArrowUpNarrowWide />
                        </div>
                        <div className="flex items-center gap-4 px-2 py-4">
                            <p className="text-xl text-[#005BEA]">
                                Extra Charges
                            </p>
                        </div>
                    </div>

                </motion.div>
                <div className="grid gap-2 border border-[#A9C1EA] rounded p-4">


                    {

                        ExtraCharges?.map((item, idx) => (

                            <div key={ idx } >
                                <div className="flex gap-2 items-center">
                                    <p className="text-[#005BEA]">
                                        Name :
                                    </p>
                                    <p className="">
                                        { item.item_name }
                                    </p>
                                </div>
                                <div className="flex gap-2 items-center">
                                    <p className="text-[#005BEA]">
                                        Remarks :
                                    </p>
                                    <p className="">
                                        { item.item_remarks }
                                    </p>
                                </div>
                                <div className="flex gap-2 items-center">
                                    <p className="text-[#005BEA]">
                                        Amount :
                                    </p>
                                    <IndianRupee size={16} />
                                    <p className="">
                                        { parseFloat(item.item_amount).toLocaleString('en-IN') }
                                    </p>
                                </div>
                                {

                                    ExtraCharges?.length > 1

                                    &&

                                    (

                                        <hr className="border border-[#A9C1EA] my-2" />

                                    )

                                }
                            </div>


                        ))

                    }

                    <motion.div
                        initial={{ opacity: 0, y: 100 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{delay: 0.2, type: "spring", stiffness: 200}}
                        className="flex  justify-between items-center border border-[#A9C1EA] rounded p-4"
                    >
                        <p className="text-[#005BEA]">
                            Total Extra Charges :
                        </p>
                        <p className="flex justify-center items-center text-md">
                            <IndianRupee size={20} />

                            { parseFloat(TotalExtraCharges).toLocaleString('en-IN') || 0 }
                        </p>

                    </motion.div>

                </div>




                {/* Tax */}
                <motion.div
                    initial={{ opacity: 0, y: 100 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{delay: 0.2, type: "spring", stiffness: 200}}
                    className="grid justify-start items-center border border-[#A9C1EA] rounded"
                >
                    <div className="flex flex-cols-2 gap-2">
                        <div className="flex justify-center items-center bg-[#C9D8F3] text-[#005BEA] rounded px-4">
                            <TicketPercent />
                        </div>
                        <div className="flex items-center gap-4 px-2 py-4">
                            <p className="text-xl text-[#005BEA]">
                                Tax
                            </p>
                        </div>
                    </div>

                </motion.div>

                <div className="grid gap-2 border border-[#A9C1EA] rounded p-4">
                    <div className="flex items-center">
                        <p className="text-[#005BEA]">
                            SGST Percent :
                        </p>
                        <p>
                            { parseFloat(SGSTPercent).toFixed(2) }%
                        </p>
                    </div>
                    <div className="flex items-center">
                        <p className="text-[#005BEA]">
                            SGST Amount :
                        </p>
                        <IndianRupee size={16} />
                        <p>
                            { parseFloat(SGSTAmt).toLocaleString('en-IN') }
                        </p>
                    </div>

                    <hr className="border border-[#A9C1EA] my-2" />

                    <div className="flex items-center">
                        <p className="text-[#005BEA]">
                            CGST Percent :
                        </p>
                        <p>
                            { parseFloat(CGSTPercent).toFixed(2) }%
                        </p>
                    </div>
                    <div className="flex items-center">
                        <p className="text-[#005BEA]">
                            CGST Amount :
                        </p>
                        <IndianRupee size={16} />
                        <p>
                            { parseFloat(CGSTAmt).toLocaleString('en-IN') }
                        </p>
                    </div>

                    <hr className="border border-[#A9C1EA] my-2" />

                    <div className="flex items-center">
                        <p className="text-[#005BEA]">
                            IGST Percent :
                        </p>
                        <p>
                            { parseFloat(IGSTPercent).toFixed(2) }%
                        </p>
                    </div>
                    <div className="flex items-center">
                        <p className="text-[#005BEA]">
                            IGST Amount :
                        </p>
                        <IndianRupee size={16} />
                        <p>
                            { parseFloat(IGSTAmt).toLocaleString('en-IN') }
                        </p>
                    </div>
                    <hr className="border border-[#A9C1EA] my-2" />
                </div>


                <motion.div
                    initial={{ opacity: 0, y: 100 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{delay: 0.2, type: "spring", stiffness: 200}}
                    className="flex  justify-between items-center border border-[#A9C1EA] rounded p-4"
                >
                    <p className="text-[#005BEA]">
                        Total { DetailsTitle } Cost After Tax :
                    </p>
                    <p className="flex justify-center items-center text-md">
                        <IndianRupee size={20} />
                        { parseFloat(TotalContractAFT).toLocaleString('en-IN') }
                    </p>
                </motion.div>

            </div>
        </div>
    );
};

export default LabourViewUI;