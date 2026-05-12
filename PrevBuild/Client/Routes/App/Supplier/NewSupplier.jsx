// Import Modules
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import {
    BadgeInfo,
    PackagePlus
} from 'lucide-react';

// Import Hooks
import { useSupplier } from "../../../Hooks/useSupplier.js";
import toast from "react-hot-toast";

// Import Components
import Loading_Screen from "../../../components/Loading_Screen.jsx";
import Loader from "../../../components/Loader.jsx";

// Show the Over All Supplier List  and add new supplier
const NewSupplier = () => {

    // Hooks
    const { addSupplier, loading } = useSupplier();

    const navigate = useNavigate();

    // Grabbing Data from input fields
    const [formData, setFormData] = useState({
        supplier_name: "",
        company_name: "",
        phone_number: "",
        business_type: "",
        supplier_address: "",
        gst_number: "",
        pan_number: "",
        company_type: "",
        bank_name: "",
        bank_account_number: "",
        ifsc_code: "",
        upi_number: "",
    });

    const [checked, setChecked] = useState(false);

    const [redirect, setRedirect] = useState(false);

    async function HandleSubmit(ev) {

        ev.preventDefault();

        if (!checked)
        {

            toast.error("Please confirm that the transaction details are valid.", {
                style: {
                    border: '1px solid #6392E5',
                    color: '#005bea',
                    background: '#f1f1f1',
                }
            });

        } else {

            const add_success = await addSupplier(formData);

            if (add_success)
            {
                setRedirect(true);

                setTimeout(() => {

                    return navigate('/app-area/suppliers/suppliers_board');

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
                <div className="grid box-border border border-[#A9C1EA] rounded p-4 my-4">
                    <div className="flex items-center justify-between">
                        <motion.div
                            initial={{opacity: 0, y: 100}}
                            animate={{opacity: 1, y: 0}}
                            transition={{delay: 0.1}}
                            className="head text-xl">
                            Add New Supplier
                        </motion.div>
                    </div>
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
                            Fill every fields that you want to add new supplier
                        </p>
                        </motion.span>
                    </div>

                    <div>
                        <form onSubmit={HandleSubmit}>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 text-[#202020] my-4">
                                <div className="grid gap-10">
                                    <motion.label
                                        initial={{opacity: 0, y: 100}}
                                        animate={{opacity: 1, y: 0}}
                                        transition={{delay: 0.1}}
                                        className="grid" htmlFor="name">
                                        <span className="mx-2">Full Name</span>
                                        <input type="text"
                                               value={ formData.supplier_name }
                                               onChange={(ev) => setFormData({ ...formData, supplier_name: ev.target.value })}
                                               className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                               placeholder="Enter Your Name" aria-required="true"/>
                                    </motion.label>
                                    <motion.label
                                        initial={{opacity: 0, y: 100}}
                                        animate={{opacity: 1, y: 0}}
                                        transition={{delay: 0.3}}
                                        className="grid" htmlFor="number">
                                        <span className="mx-2">IFSC Code</span>
                                        <input type="text"
                                               value={ formData.ifsc_code }
                                               onChange={(ev) => setFormData({ ...formData, ifsc_code: ev.target.value })}
                                               className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                               placeholder="Enter the IFSC No" aria-required="true"/>
                                    </motion.label>
                                    <motion.label
                                        initial={{opacity: 0, y: 100}}
                                        animate={{opacity: 1, y: 0}}
                                        transition={{delay: 0.2}}
                                        className="grid" htmlFor="address">
                                        <span className="mx-2">Address</span>
                                        <textarea className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                                  value={ formData.supplier_address }
                                                  onChange={(ev) => setFormData({ ...formData, supplier_address: ev.target.value })}
                                                  placeholder="Enter Your Address" aria-required="true"
                                                  cols="30" rows="1">
                                        </textarea>
                                    </motion.label>
                                </div>

                                <div className="grid gap-10">
                                    <motion.label
                                        initial={{opacity: 0, y: 100}}
                                        animate={{opacity: 1, y: 0}}
                                        transition={{delay: 0.4}}
                                        className="grid" htmlFor="name">
                                        <span className="mx-2">Company Name</span>
                                        <input type="text"
                                               value={ formData.company_name }
                                               onChange={(ev) => setFormData({ ...formData, company_name: ev.target.value })}
                                               className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                               placeholder="Enter the Company Name" aria-required="true"/>
                                    </motion.label>
                                    <motion.label
                                        initial={{opacity: 0, y: 100}}
                                        animate={{opacity: 1, y: 0}}
                                        transition={{delay: 0.5}}
                                        className="grid" htmlFor="number">
                                        <span className="mx-2">GST No</span>
                                        <input type="text"
                                               value={ formData.gst_number }
                                               onChange={(ev) => { setFormData({ ...formData, gst_number: ev.target.value }) }}
                                               className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                               placeholder="Enter the GST No" aria-required="true"/>
                                    </motion.label>
                                    <motion.label
                                        initial={{opacity: 0, y: 100}}
                                        animate={{opacity: 1, y: 0}}
                                        transition={{delay: 0.6}}
                                        className="grid" htmlFor="number">
                                        <span className="mx-2">UPI No</span>
                                        <input type="text"
                                               value={ formData.upi_number }
                                               onChange={(ev) => { setFormData({ ...formData, upi_number: ev.target.value }) }}
                                               className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                               placeholder="Enter the UPI No" aria-required="true"/>
                                    </motion.label>
                                </div>

                                <div className="grid gap-10">
                                    <motion.label
                                        initial={{opacity: 0, y: 100}}
                                        animate={{opacity: 1, y: 0}}
                                        transition={{delay: 0.7}}
                                        className="grid" htmlFor="type">
                                        <span className="mx-2">Business Type</span>
                                        <select name="type"
                                                value={ formData.business_type }
                                                onChange={(ev) => setFormData({ ...formData, business_type: ev.target.value })}
                                                className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4">
                                            <option value="">
                                                Select Your Type
                                            </option>
                                            <option>Electrical</option>
                                            <option>Bricks</option>
                                            <option>Cement</option>
                                        </select>
                                    </motion.label>
                                    <motion.label
                                        initial={{opacity: 0, y: 100}}
                                        animate={{opacity: 1, y: 0}}
                                        transition={{delay: 0.8}}
                                        className="grid" htmlFor="type">
                                        <span className="mx-2">Company Type</span>
                                        <select name="type"
                                                value={ formData.company_type }
                                                onChange={(ev) => setFormData({ ...formData, company_type: ev.target.value })}
                                                className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4">
                                            <option value="">
                                                Select Your Type
                                            </option>
                                            <option>Firm</option>
                                            <option>PartnerShip</option>
                                            <option>Pvt.Ltd</option>
                                        </select>
                                    </motion.label>
                                    <motion.label
                                        initial={{opacity: 0, y: 100}}
                                        animate={{opacity: 1, y: 0}}
                                        transition={{delay: 0.9}}
                                        className="grid" htmlFor="service">
                                        <span className="mx-2">Bank Account Number</span>
                                        <input name="type"
                                               value={ formData.bank_account_number }
                                               onChange={(ev) => {setFormData({ ...formData, bank_account_number: ev.target.value })}}
                                               className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                               placeholder="Enter the Bank Account Number" aria-required="true"/>
                                    </motion.label>
                                </div>

                                <div className="grid gap-10">
                                    <motion.label
                                        initial={{opacity: 0, y: 100}}
                                        animate={{opacity: 1, y: 0}}
                                        transition={{delay: 1.0}}
                                        className="grid" htmlFor="phone">
                                        <span className="mx-2">Phone No</span>
                                        <input name="type"
                                               value={ formData.phone_number }
                                               onChange={(ev) => {setFormData({ ...formData, phone_number: ev.target.value })}}
                                               className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                               id="role" placeholder="Enter the Phone No"/>
                                    </motion.label>
                                    <motion.label
                                        initial={{opacity: 0, y: 100}}
                                        animate={{opacity: 1, y: 0}}
                                        transition={{delay: 1.1}}
                                        className="grid" htmlFor="name">
                                        <span className="mx-2">Bank Name</span>
                                        <input name="text"
                                               value={formData.bank_name }
                                               onChange={(ev) => {setFormData({ ...formData, bank_name: ev.target.value })}}
                                               className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                               id="role" placeholder="Enter the Bank Name"/>
                                    </motion.label>
                                    <motion.label
                                        initial={{opacity: 0, y: 100}}
                                        animate={{opacity: 1, y: 0}}
                                        transition={{delay: 1.2}}
                                        className="grid" htmlFor="pan">
                                        <span className="mx-2">Pan No</span>
                                        <input name="text"
                                               value={ formData.pan_number }
                                               onChange={(ev) => {setFormData({ ...formData, pan_number: ev.target.value })}}
                                               className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                               placeholder="Enter the Pan No"/>
                                    </motion.label>
                                </div>

                            </div>

                            <div className="grid md:grid lg:grid xl:grid justify-start items-center gap-2 pt-6">
                                <motion.label className="flex gap-x-2 items-center"
                                              initial={{opacity: 0, y: 100}}
                                              animate={{opacity: 1, y: 0}}
                                              transition={{delay: 0.2}}
                                              htmlFor="box">
                                    <input checked={ checked }
                                           onChange={(ev) => { setChecked(ev.target.checked) }}
                                           className="accent-[#005BEA]" type="checkbox"/>
                                    Check the transaction details is valid to submit
                                </motion.label>

                                <motion.button type="submit"
                                               initial={{opacity: 0, y: 100}}
                                               animate={{opacity: 1, y: 0}}
                                               transition={{delay: 0.3}}
                                               className="text-xl border border-[#6392E5] bg-[#D9E1EF] text-[#005BEA] hover:bg-[#C9D8F3] p-4 rounded">
                                    {

                                        loading
                                            ?

                                            ( <Loader /> )

                                            :

                                            (
                                                <span className="flex gap-2 justify-center items-center">
                                                    <PackagePlus />
                                                    Add Supplier
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

export default NewSupplier;