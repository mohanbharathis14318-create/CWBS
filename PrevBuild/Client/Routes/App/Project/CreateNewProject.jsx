import React, {useState, useMemo} from "react";
import { motion } from "motion/react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import {CircleFadingPlus, IndianRupee, Kanban,Trash2} from 'lucide-react';

// import Hooks
import { useProject } from "../../../Hooks/useProject.js";

import Loader from "../../../components/Loader.jsx";
import Loading_Screen from "../../../components/Loading_Screen.jsx";


const CreateNewProject = () => {

    const { addProjectDetails, loading } = useProject();

    const navigate = useNavigate();

    const [checked, setChecked] = useState(false);

    const [redirect, setRedirect] = useState(false);

    const [formData, setFormData] = useState({
        start_date: "",
        end_date: "",
        project_name: "",
        project_area: 0,
        rate_per_sqft: 0,
        area_sqft: 0,
        construction_cost: 0,
        construction_budget: 0,
        septic_tank: 0,

        amenities: [
            {
                amenities_item: "",
                amenities_amount: 0,

            }

        ],

        extra: [
            {
                extra_item: "",
                extra_amount: 0,
            }
        ],

        doc: [
            {
                doc_item: "",
                doc_amount: 0,
            }
        ],

        s_gst_percent: 0,
        s_gst_amount: 0,
        c_gst_percent: 0,
        c_gst_amount: 0,
        i_gst_percent: 0,
        i_gst_amount: 0,

        plot_cost: 0,
        plot_sqft: 0,

        project_remarks: ""
    });


    const { ConstructionBudget, ConstructionCost, TotalPlotCost, AmenitiesCost, DocCharges, ExtraCharges, TotalProjectCost, AvgROC, TotalTaxCharges, TotalProjectCostAfterTax} = useMemo(() => {

        let constructionCost, constructionBudget, totalPlotCost, amenitiesCost, docCharges, extraCharges, totalProjectCost, avgROC;

        constructionCost = (Number(formData.rate_per_sqft) || 0) * (Number(formData.area_sqft) || 0);

        constructionBudget = (Number(formData.construction_budget) || 0) + (Number(formData.septic_tank) || 0);

        totalPlotCost = constructionCost;

        amenitiesCost = formData.amenities.reduce((sum, a) => sum + Number(a.amenities_amount || 0), 0)

        docCharges = formData.doc.reduce((sum, d) => sum + Number(d.doc_amount || 0), 0);

        extraCharges = formData.extra.reduce((sum, e) => sum + Number(e.extra_amount || 0), 0);

        // Average Rate Of Construction
        avgROC = ((Number(formData.construction_budget) || 0) / (Number(formData.area_sqft) || 0)) || 0;

        totalProjectCost = constructionBudget + amenitiesCost + docCharges + extraCharges;

        //Calculation on Tax
        const sgstRate = parseFloat(formData.s_gst_percent) || 0;

        const cgstRate = parseFloat(formData.c_gst_percent) || 0;

        const igstRate = parseFloat(formData.i_gst_percent) || 0;


        const sgstAmount = (parseFloat(totalProjectCost) * sgstRate) / 100;

        const cgstAmount = (parseFloat(totalProjectCost) * cgstRate) / 100;

        const igstAmount = (parseFloat(totalProjectCost) * igstRate) / 100;

        const totalTax = sgstAmount + cgstAmount + igstAmount;

        const totalAmtAfterTax = totalProjectCost + totalTax;

        setFormData(prev => ({
            ...prev,
            plot_cost: totalPlotCost,
            plot_sqft: Number(formData.area_sqft) || 0,
            construction_cost: constructionCost || 0,
            s_gst_amount: sgstAmount.toFixed(2),
            c_gst_amount: cgstAmount.toFixed(2),
            i_gst_amount: igstAmount.toFixed(2),
        }));

        return {
            ConstructionBudget: constructionBudget,
            ConstructionCost: constructionCost,
            TotalPlotCost: totalPlotCost,
            AmenitiesCost: amenitiesCost,
            DocCharges: docCharges,
            ExtraCharges: extraCharges,
            AvgROC: avgROC,
            TotalProjectCost: totalProjectCost,
            TotalTaxCharges: totalTax,
            TotalProjectCostAfterTax: totalAmtAfterTax,
        };

    }, [formData.amenities, formData.area_sqft, formData.c_gst_percent, formData.construction_budget, formData.doc, formData.extra, formData.i_gst_percent, formData.rate_per_sqft, formData.s_gst_percent, formData.septic_tank])


    // Add Entries
    function AddAmenitiesEntry()
    {
        setFormData(prev => ({
            ...prev,
            amenities: [
                ...prev.amenities,
                {
                    amenities_item: "",
                    amenities_amount: "0",

                }

            ],
        }));
    }

    function AddExtrasEntry()
    {

        setFormData(prev => ({
            ...prev,
            extra: [
                ...prev.extra,
                {
                    extra_item: "",
                    extra_amount: "0",
                }
            ]
        }));
    }

    function AddDocEntry()
    {

        setFormData(prev => ({
            ...prev,
            doc: [
                ...prev.doc,
                {
                    doc_item: "",
                    doc_amount: "0",
                }
            ]
        }));
    }

    // Handle Individual Entries
    function HandleAmenitiesInputChange(index, field, value)
    {

        const updateAmenities = [...formData.amenities];

        updateAmenities[index][field] = value;

        setFormData(prev => ({
            ...prev,
            amenities: updateAmenities,
        }));

    }

    function HandleExtraInputChange(index, field, value)
    {

        const updateExtra = [...formData.extra];

        updateExtra[index][field] = value;

        setFormData(prev => ({
            ...prev,
            extra: updateExtra,
        }));

    }

    function HandleDocInputChange(index, field, value)
    {

        const updateDoc = [...formData.doc];

        updateDoc[index][field] = value;

        setFormData(prev => ({
            ...prev,
            doc: updateDoc,
        }));

    }

    // Remove Entry
    function RemoveAmenitiesEntry(index)
    {

        const update = [...formData.amenities];

        update.splice(index, 1);

        setFormData(prev => ({
            ...prev,
            amenities: update,
        }));

    }

    function RemoveExtraEntry(index)
    {

        const update = [...formData.extra];

        update.splice(index, 1);

        setFormData(prev => ({
            ...prev,
            extra: update,
        }));

    }

    function RemoveDocEntry(index)
    {

        const update = [...formData.doc];

        update.splice(index, 1);

        setFormData(prev => ({
            ...prev,
            doc: update,
        }));

    }


    async function HandleSubmit(ev)
    {
        ev.preventDefault();

        if (!checked)
        {

            toast.error("Please confirm that the entered project details are valid.", {
                style: {
                    border: '1px solid #6392E5',
                    color: '#005bea',
                    background: '#f1f1f1',
                }
            });

        } else {

            const add_success = await addProjectDetails(formData);

            console.log(add_success);

            if (add_success)
            {
                setRedirect(true);

                setTimeout(() => {

                    return navigate('/app-area/project/project_board');

                }, 2000)

            } else {

                setRedirect(false);

            }

        }

    }

    if (redirect) return <Loading_Screen />

    return (
        <div>
            <motion.div className="border items-center border-[#A9C1EA] bg-[#F1F1F1] rounded p-4 my-4">
                <div className="flex gap-4">
                    <div className="grid justify-center items-center bg-[#C9D8F3] text-[#005bea] rounded p-4">
                        <Kanban />
                    </div>
                    <div>
                        <p className="head text-xl text-[#005bea]">
                            Project
                        </p>

                        <p>
                           Create a New Project
                        </p>
                    </div>
                </div>
            </motion.div>
            <section className="grid box-border border border-[#A9C1EA] rounded p-4">
                <div className="grid grid-cols-1 gap-y-2 gap-x-2">
                    <div>
                        <form onSubmit={HandleSubmit}>
                            {/* Create a New Project */}
                            <div className="grid-cols-1 gap-10">
                                <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 my-4 gap-6">
                                    <motion.label
                                        initial={{opacity: 0, y: 100}}
                                        animate={{opacity: 1, y: 0}}
                                        transition={{delay: 0.1}}
                                        className="grid" htmlFor="date">
                                        <span className="mx-2">Start Date</span>
                                        <input type="date"
                                               value={formData.start_date}
                                               onChange={(ev) => { setFormData({ ...formData, start_date: ev.target.value }) }}
                                               className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                               placeholder="DD-MM-YYYY" required/>
                                    </motion.label>
                                    <motion.label
                                        initial={{opacity: 0, y: 100}}
                                        animate={{opacity: 1, y: 0}}
                                        transition={{delay: 0.2}}
                                        className="grid" htmlFor="date">
                                        <span className="mx-2">End Date</span>
                                        <input type="date"
                                               value={formData.end_date}
                                               onChange={(ev) => { setFormData({ ...formData, end_date: ev.target.value }) }}
                                               className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                               placeholder="DD-MM-YYYY" required/>
                                    </motion.label>
                                    <motion.label
                                        initial={{opacity: 0, y: 100}}
                                        animate={{opacity: 1, y: 0}}
                                        transition={{delay: 0.3}}
                                        className="grid" htmlFor="name">
                                        <span className="mx-2">Project Name</span>
                                        <input type="text"
                                               value={formData.project_name}
                                               onChange={(ev) => { setFormData({ ...formData, project_name: ev.target.value }) }}
                                               className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                               placeholder="Enter the Project Name" />
                                    </motion.label>
                                    <motion.label
                                        initial={{opacity: 0, y: 100}}
                                        animate={{opacity: 1, y: 0}}
                                        transition={{delay: 0.4}}
                                        className="grid" htmlFor="area">
                                        <span className="mx-2">Area</span>
                                        <input name="text"
                                               value={formData.project_area}
                                               onChange={(ev) => { setFormData({ ...formData, project_area: ev.target.value }) }}
                                               className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                               placeholder="Enter the Area"/>
                                    </motion.label>
                                </div>

                                <div className="grid md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 my-10 gap-6">
                                    <motion.label
                                        initial={{opacity: 0, y: 100}}
                                        animate={{opacity: 1, y: 0}}
                                        transition={{delay: 0.5}}
                                        className="grid" htmlFor="amount">
                                        <span className="mx-2">Build up Rate Per Sqft(Rs)</span>
                                        <input type="text"
                                               value={formData.rate_per_sqft}
                                               onChange={(ev) => { setFormData({ ...formData, rate_per_sqft: ev.target.value }) }}
                                               className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                               placeholder="Enter the Amount" />
                                    </motion.label>
                                    <motion.label
                                        initial={{opacity: 0, y: 100}}
                                        animate={{opacity: 1, y: 0}}
                                        transition={{delay: 0.6}}
                                        className="grid" htmlFor="area">
                                        <span className="mx-2">Total Build Area Sqft</span>
                                        <input type="text"
                                               value={formData.area_sqft}
                                               onChange={(ev) => { setFormData({ ...formData, area_sqft: ev.target.value }) }}
                                               className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                               placeholder="Enter the Area Sqft" />
                                    </motion.label>
                                </div>
                                <div className="grid md:grid lg:grid xl:grid gap-2">
                                    <div className="flex justify-between items-center">
                                        <motion.label
                                            className="flex gap-x-2 items-center text-xl text-[#005BEA]"
                                            initial={{opacity: 0, y: 100}}
                                            animate={{opacity: 1, y: 0}}
                                            transition={{delay: 0.2}}
                                            htmlFor="box">
                                            Total Construction Cost
                                        </motion.label>


                                        <motion.div
                                            initial={{opacity: 0, y: 100}}
                                            animate={{opacity: 1, y: 0}}
                                            transition={{delay: 0.3}}>
                                            <p className="flex gap-2 items-center text-[#005BEA] text-xl">
                                                <IndianRupee />
                                                { ConstructionCost }
                                            </p>
                                        </motion.div>
                                    </div>
                                    <div>
                                        <motion.hr
                                            initial={{opacity: 0, y: 100}}
                                            animate={{y: 0, opacity: 1}}
                                            className="border-[#6392E5]"/>
                                    </div>
                                </div>



                                <div className="grid md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 my-10 gap-6">
                                    <motion.label
                                        initial={{opacity: 0, y: 100}}
                                        animate={{opacity: 1, y: 0}}
                                        transition={{delay: 0.7}}
                                        className="grid" htmlFor="budget">
                                        <span className="mx-2">Construction Budget</span>
                                        <input type="text"
                                               value={formData.construction_budget}
                                               onChange={(ev) => { setFormData({ ...formData, construction_budget: ev.target.value }) }}
                                               className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                               placeholder="Enter the Construction Budget" />
                                    </motion.label>

                                    <motion.label
                                        initial={{opacity: 0, y: 100}}
                                        animate={{opacity: 1, y: 0}}
                                        transition={{delay: 0.8}}
                                        className="grid" htmlFor="tank">
                                        <span className="mx-2">Septic Tank</span>
                                        <input name="text"
                                               value={formData.septic_tank}
                                               onChange={(ev) => { setFormData({ ...formData, septic_tank: ev.target.value }) }}
                                               className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                               placeholder="Enter the Amount"/>
                                    </motion.label>
                                </div>
                            </div>

                            <div className="grid md:grid lg:grid xl:grid gap-2">
                                <div className="flex justify-between items-center">
                                    <motion.label
                                        className="flex gap-x-2 items-center text-xl text-[#005BEA]"
                                        initial={{opacity: 0, y: 100}}
                                        animate={{opacity: 1, y: 0}}
                                        transition={{delay: 0.2}}
                                        htmlFor="box">
                                        Total Construction Budget
                                    </motion.label>


                                    <motion.div
                                        initial={{opacity: 0, y: 100}}
                                        animate={{opacity: 1, y: 0}}
                                        transition={{delay: 0.3}}>
                                        <p className="flex gap-2 items-center text-[#005BEA] text-xl">
                                            <IndianRupee />
                                            { ConstructionBudget }
                                        </p>
                                    </motion.div>
                                </div>
                                <div className="mb-4">
                                    <motion.hr
                                        initial={{opacity: 0, y: 100}}
                                        animate={{y: 0, opacity: 1}}
                                        className="border-[#6392E5]"/>
                                </div>
                            </div>


                            {/* Amenities */}
                            <div>
                                <motion.div
                                    initial={{opacity: 0, y: 100}}
                                    animate={{opacity: 1, y: 0}}
                                    transition={{delay: 0.1}}
                                    className="head text-xl">
                                    Amenities
                                </motion.div>
                                <div className="my-2">
                                    <motion.hr
                                        initial={{opacity: 0, y: 100}}
                                        animate={{y: 0, opacity: 1}}
                                        className="border-[#6392E5]"/>
                                </div>
                                <motion.button
                                    type="button"
                                    onClick={AddAmenitiesEntry}
                                    className="cursor-pointer flex border border-[#6392E5] bg-[#D9E1EF] text-[#005BEA] my-4 p-4 rounded gap-2"
                                    initial={{opacity: 0, y: 100}}
                                    animate={{opacity: 1, y: 0}}
                                    transition={{delay: 0.2}}>
                                    <CircleFadingPlus/>
                                    Add Items
                                </motion.button>

                                <div className="border border-[#6392E5] p-4 rounded bg-[#F1F1F1] my-4">
                                    {
                                        formData.amenities.map((item, index) => (

                                            <div key={index} className="grid grid-cols-1 gap-4">

                                                <div className="grid md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 items-center my-6 gap-6">
                                                    <motion.label
                                                        initial={{opacity: 0, y: 100}}
                                                        animate={{opacity: 1, y: 0}}
                                                        transition={{delay: 0.3}}
                                                        className="grid" htmlFor="name">
                                                        <span className="mx-2">Item Name</span>
                                                        <input type="text"
                                                               value={item.amenities_item}
                                                               onChange={(ev) => HandleAmenitiesInputChange(index, 'amenities_item', ev.target.value) }
                                                               className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                                               placeholder="Enter the Item Name" />
                                                    </motion.label>

                                                    <motion.label
                                                        initial={{opacity: 0, y: 100}}
                                                        animate={{opacity: 1, y: 0}}
                                                        transition={{delay: 0.4}}
                                                        className="grid" htmlFor="amount">
                                                        <span className="mx-2">Amount</span>
                                                        <input type="text"
                                                               value={item.amenities_amount}
                                                               onChange={(ev) => HandleAmenitiesInputChange(index, 'amenities_amount', ev.target.value) }
                                                               className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                                               placeholder="Enter the Amount" />
                                                    </motion.label>

                                                    {
                                                        formData.amenities.length > 1

                                                        &&

                                                        (
                                                            <div>
                                                                <span className="opacity-0">hello</span>
                                                                <motion.button
                                                                    type="button"
                                                                    onClick={() => RemoveAmenitiesEntry(index)}
                                                                    className="text-xl flex gap-2 items-center border border-red-400 text-red-600 bg-red-100 hover:bg-red-200 cursor-pointer p-4 rounded w-fit h-fit"
                                                                    initial={{ opacity: 0, y: 100 }}
                                                                    animate={{ opacity: 1, y: 0 }}
                                                                    transition={{ delay: 0.6 }}
                                                                >
                                                                    <Trash2 />
                                                                    <p className="hidden">
                                                                        Delete Entry
                                                                    </p>
                                                                </motion.button>
                                                            </div>

                                                        )
                                                    }

                                                </div>
                                            </div>
                                        ))
                                    }

                                </div>




                                <div className="grid md:grid lg:grid xl:grid gap-2">
                                    <div className="flex justify-between items-center">
                                        <motion.label
                                            className="flex gap-x-2 items-center text-[#005BEA] text-xl"
                                            initial={{opacity: 0, y: 100}}
                                            animate={{opacity: 1, y: 0}}
                                            transition={{delay: 0.2}}
                                            htmlFor="box">
                                            Total Amenities
                                        </motion.label>


                                        <motion.div
                                            initial={{opacity: 0, y: 100}}
                                            animate={{opacity: 1, y: 0}}
                                            transition={{delay: 0.3}}>
                                            <p className="flex gap-2 items-center text-[#005BEA] text-xl">
                                             <IndianRupee />
                                                {AmenitiesCost}
                                            </p>
                                        </motion.div>
                                    </div>
                                    <div className="mb-4">
                                        <motion.hr
                                            initial={{opacity: 0, y: 100}}
                                            animate={{y: 0, opacity: 1}}
                                            className="border-[#6392E5]"/>
                                    </div>
                                </div>
                            </div>


                            {/* Extra Charges On Construction */}
                            <div>
                                <motion.div
                                    initial={{opacity: 0, y: 100}}
                                    animate={{opacity: 1, y: 0}}
                                    transition={{delay: 0.1}}
                                    className="head text-xl">
                                    Extra Charges On Construction
                                </motion.div>
                                <div className="my-2">
                                    <motion.hr
                                        initial={{opacity: 0, y: 100}}
                                        animate={{y: 0, opacity: 1}}
                                        className="border-[#6392E5]"/>
                                </div>
                                <motion.button
                                    type="button"
                                    onClick={AddExtrasEntry}
                                    className="cursor-pointer flex gap-2 border border-[#6392E5] bg-[#D9E1EF] text-[#005BEA] my-4 p-4 rounded"
                                    initial={{opacity: 0, y: 100}}
                                    animate={{opacity: 1, y: 0}}
                                    transition={{delay: 0.2}}>
                                    <CircleFadingPlus/>
                                    Add Items
                                </motion.button>

                                <div className="border border-[#6392E5] p-4 rounded bg-[#F1F1F1] my-4">
                                    {
                                        formData.extra.map((item, index) =>

                                            (

                                                <div key={index} className="grid grid-cols-1 gap-4">

                                                    <div className="grid md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 my-6 gap-6">
                                                        <motion.label
                                                            initial={{opacity: 0, y: 100}}
                                                            animate={{opacity: 1, y: 0}}
                                                            transition={{delay: 0.3}}
                                                            className="grid" htmlFor="name">
                                                            <span className="mx-2">Item Name</span>
                                                            <input type="text"
                                                                   value={item.extra_item}
                                                                   onChange={(ev) => HandleExtraInputChange(index, 'extra_item', ev.target.value) }
                                                                   className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                                                   placeholder="Enter the Item Name" />
                                                        </motion.label>

                                                        <motion.label
                                                            initial={{opacity: 0, y: 100}}
                                                            animate={{opacity: 1, y: 0}}
                                                            transition={{delay: 0.4}}
                                                            className="grid" htmlFor="amount">
                                                            <span className="mx-2">Amount</span>
                                                            <input type="text"
                                                                   value={item.extra_amount}
                                                                   onChange={(ev) => HandleExtraInputChange(index, 'extra_amount', ev.target.value) }
                                                                   className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                                                   placeholder="Enter the Amount" />
                                                        </motion.label>

                                                        {
                                                            formData.extra.length > 1

                                                            &&

                                                            (
                                                                <div>
                                                                    <span className="opacity-0">hello</span>
                                                                    <motion.button
                                                                        type="button"
                                                                        onClick={() => RemoveExtraEntry(index)}
                                                                        className="text-xl flex gap-2 items-center border border-red-400 text-red-600 bg-red-100 hover:bg-red-200 cursor-pointer p-4 rounded w-fit h-fit"
                                                                        initial={{ opacity: 0, y: 100 }}
                                                                        animate={{ opacity: 1, y: 0 }}
                                                                        transition={{ delay: 0.6 }}
                                                                    >
                                                                        <Trash2 />
                                                                        <p className="hidden">
                                                                            Delete Entry
                                                                        </p>
                                                                    </motion.button>
                                                                </div>
                                                            )
                                                        }

                                                    </div>
                                                </div>

                                            ))

                                    }
                                </div>



                                <div className="grid md:grid lg:grid xl:grid gap-2">
                                    <div className="flex justify-between items-center">
                                        <motion.label
                                            className="flex gap-x-2 items-center text-[#005BEA] text-xl"
                                            initial={{opacity: 0, y: 100}}
                                            animate={{opacity: 1, y: 0}}
                                            transition={{delay: 0.2}}
                                            htmlFor="box">
                                            Total Extra Charges
                                        </motion.label>


                                        <motion.div
                                            initial={{opacity: 0, y: 100}}
                                            animate={{opacity: 1, y: 0}}
                                            transition={{delay: 0.3}}>
                                            <p className="flex gap-2 items-center text-[#005BEA] text-xl">
                                                <IndianRupee />
                                                    {ExtraCharges}
                                            </p>
                                        </motion.div>
                                    </div>
                                    <div className="mb-4">
                                        <motion.hr
                                            initial={{opacity: 0, y: 100}}
                                            animate={{y: 0, opacity: 1}}
                                            className="border-[#6392E5]"/>
                                    </div>
                                </div>
                            </div>


                            {/* Document Charges */}
                            <div>
                                <motion.div
                                    initial={{opacity: 0, y: 100}}
                                    animate={{opacity: 1, y: 0}}
                                    transition={{delay: 0.1}}
                                    className="head text-xl">
                                    Document Charges
                                </motion.div>
                                <div className="my-2">
                                    <motion.hr
                                        initial={{opacity: 0, y: 100}}
                                        animate={{y: 0, opacity: 1}}
                                        className="border-[#6392E5]"/>
                                </div>
                                <motion.button
                                    type="button"
                                    onClick={AddDocEntry}
                                    className="cursor-pointer flex gap-2 border border-[#6392E5] bg-[#D9E1EF] text-[#005BEA] my-4 p-4 rounded"
                                    initial={{opacity: 0, y: 100}}
                                    animate={{opacity: 1, y: 0}}
                                    transition={{delay: 0.2}}>
                                    <CircleFadingPlus/>
                                    Add Items
                                </motion.button>

                                <div className="border border-[#6392E5] p-4 rounded bg-[#F1F1F1] my-4">
                                    {
                                        formData.doc.map((item, index) =>

                                            (

                                                <div key={index} className="grid grid-cols-1 gap-4">

                                                    <div className="grid md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 my-6 gap-6">
                                                        <motion.label
                                                            initial={{opacity: 0, y: 100}}
                                                            animate={{opacity: 1, y: 0}}
                                                            transition={{delay: 0.3}}
                                                            className="grid" htmlFor="name">
                                                            <span className="mx-2">Item Name</span>
                                                            <input type="text"
                                                                   value={item.doc_item}
                                                                   onChange={(ev) => HandleDocInputChange(index, 'doc_item', ev.target.value) }
                                                                   className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                                                   placeholder="Enter the Item Name" />
                                                        </motion.label>

                                                        <motion.label
                                                            initial={{opacity: 0, y: 100}}
                                                            animate={{opacity: 1, y: 0}}
                                                            transition={{delay: 0.4}}
                                                            className="grid" htmlFor="amount">
                                                            <span className="mx-2">Amount</span>
                                                            <input type="text"
                                                                   value={item.doc_amount}
                                                                   onChange={(ev) => HandleDocInputChange(index, 'doc_amount', ev.target.value) }
                                                                   className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                                                   placeholder="Enter the Amount" />
                                                        </motion.label>

                                                        {
                                                            formData.doc.length > 1

                                                            &&

                                                            (
                                                                <div>
                                                                    <span className="opacity-0">hello</span>
                                                                    <motion.button
                                                                        type="button"
                                                                        onClick={() => RemoveDocEntry(index)}
                                                                        className="text-xl flex gap-2 items-center border border-red-400 text-red-600 bg-red-100 hover:bg-red-200 cursor-pointer p-4 rounded w-fit h-fit"
                                                                        initial={{ opacity: 0, y: 100 }}
                                                                        animate={{ opacity: 1, y: 0 }}
                                                                        transition={{ delay: 0.6 }}
                                                                    >
                                                                        <Trash2 />
                                                                        <p className="hidden">
                                                                            Delete Entry
                                                                        </p>
                                                                    </motion.button>
                                                                </div>
                                                            )
                                                        }
                                                    </div>
                                                </div>
                                            ))
                                    }
                                </div>


                            </div>

                            <div className="grid md:grid lg:grid xl:grid gap-2">
                                <div className="flex justify-between items-center">
                                    <motion.label
                                        className="flex gap-x-2 items-center text-[#005BEA] text-xl"
                                        initial={{opacity: 0, y: 100}}
                                        animate={{opacity: 1, y: 0}}
                                        transition={{delay: 0.2}}
                                        htmlFor="box">
                                        Total Document Charges
                                    </motion.label>


                                    <motion.div
                                        initial={{opacity: 0, y: 100}}
                                        animate={{opacity: 1, y: 0}}
                                        transition={{delay: 0.3}}>
                                        <p className="flex gap-2 items-center text-[#005BEA] text-xl">
                                            <IndianRupee />
                                                {DocCharges}
                                        </p>
                                    </motion.div>
                                </div>
                                <div className="mb-4">
                                    <motion.hr
                                        initial={{opacity: 0, y: 100}}
                                        animate={{y: 0, opacity: 1}}
                                        className="border-[#6392E5]"/>
                                </div>
                            </div>




                            {/* Others */}

                            <div>
                                <motion.div
                                    initial={{opacity: 0, y: 100}}
                                    animate={{opacity: 1, y: 0}}
                                    transition={{delay: 0.1}}
                                    className="head text-xl">
                                    Project Cost
                                </motion.div>
                                <div className="my-2">
                                    <motion.hr
                                        initial={{opacity: 0, y: 100}}
                                        animate={{y: 0, opacity: 1}}
                                        className="border-[#6392E5]"/>
                                </div>

                                <div className="grid md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 my-6 gap-6">
                                    <motion.label
                                        initial={{opacity: 0, y: 100}}
                                        animate={{opacity: 1, y: 0}}
                                        transition={{delay: 0.1}}
                                        className="grid" htmlFor="cost">
                                        <span className="mx-2">Plot Cost</span>
                                        <input type="number"
                                               readOnly={true}
                                               value={TotalPlotCost}
                                               onChange={(ev) => setFormData({ ...formData, plot_cost: ev.target.value}) }
                                               className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                               placeholder="Enter the Plot Cost" />
                                    </motion.label>

                                    <motion.label
                                        initial={{opacity: 0, y: 100}}
                                        animate={{opacity: 1, y: 0}}
                                        transition={{delay: 0.2}}
                                        className="grid" htmlFor="cost">
                                        <span className="mx-2">Plot Sqft</span>
                                        <input type="number"
                                               readOnly={true}
                                               value={formData.plot_sqft}
                                               onChange={(ev) => setFormData({ ...formData, plot_sqft: ev.target.value }) }
                                               className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                               placeholder="Enter the Plot Sqft" />
                                    </motion.label>
                                </div>

                                <div className="grid md:grid lg:grid xl:grid gap-2">
                                    <div className="flex justify-between items-center py-4">
                                        <motion.label
                                            className="flex gap-x-2 items-center text-[#005BEA] text-xl"
                                            initial={{opacity: 0, y: 100}}
                                            animate={{opacity: 1, y: 0}}
                                            transition={{delay: 0.1}}
                                            htmlFor="box">
                                            Avg Rate of construction
                                        </motion.label>
                                        <motion.div
                                            initial={{opacity: 0, y: 100}}
                                            animate={{opacity: 1, y: 0}}
                                            transition={{delay: 0.2}}
                                            className="py-2">
                                            <p className="flex gap-3 items-cemter text-[#005BEA] text-xl">
                                                <IndianRupee />
                                                {AvgROC}
                                            </p>
                                        </motion.div>
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <motion.hr
                                        initial={{opacity: 0, y: 100}}
                                        animate={{y: 0, opacity: 1}}
                                        className="border-[#6392E5]"/>
                                </div>
                            </div>

                            {/* Tax Charges */}
                            <div>
                                <motion.div
                                    initial={{opacity: 0, y: 100}}
                                    animate={{opacity: 1, y: 0}}
                                    transition={{delay: 0.1}}
                                    className="head text-xl">
                                    Tax Charges
                                </motion.div>
                                <div className="my-2">
                                    <motion.hr
                                        initial={{opacity: 0, y: 100}}
                                        animate={{y: 0, opacity: 1}}
                                        className="border-[#6392E5]"/>
                                </div>

                                <div className="grid md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1 my-6 gap-6">
                                    <motion.label
                                        initial={{opacity: 0, y: 100}}
                                        animate={{opacity: 1, y: 0}}
                                        transition={{delay: 0.2}}
                                        className="grid" htmlFor="amount">
                                        <span className="mx-2">SGST</span>
                                        <div className="flex gap-4">
                                            <input type="number"
                                                   min="0"
                                                   max="100"
                                                   value={formData.s_gst_percent}
                                                   onChange={(ev) => setFormData({ ...formData, s_gst_percent: ev.target.value }) }
                                                   className="outline outline-[#BABABA] w-30 focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                                   placeholder="%" />
                                            <input type="number"
                                                   min="0"
                                                   max="100"
                                                   readOnly={true}
                                                   value={formData.s_gst_amount}
                                                   onChange={(ev) => setFormData({ ...formData, s_gst_amount: ev.target.value }) }
                                                   className="outline outline-[#BABABA] w-40 focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                                   placeholder="Amount" />
                                        </div>
                                    </motion.label>

                                    <motion.label
                                        initial={{opacity: 0, y: 100}}
                                        animate={{opacity: 1, y: 0}}
                                        transition={{delay: 0.3}}
                                        className="grid" htmlFor="amount">
                                        <span className="mx-2">CGST</span>
                                        <div className="flex gap-4">
                                            <input type="number"
                                                   min="0"
                                                   max="100"
                                                   value={formData.c_gst_percent}
                                                   onChange={(ev) => setFormData({ ...formData, c_gst_percent: ev.target.value }) }
                                                   className="outline outline-[#BABABA] w-30 focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                                   placeholder="%" />
                                            <input type="number"
                                                   min="0"
                                                   max="100"
                                                   readOnly={true}
                                                   value={formData.c_gst_amount}
                                                   onChange={(ev) => setFormData({ ...formData, c_gst_amount: ev.target.value }) }
                                                   className="outline outline-[#BABABA] w-40 focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                                   placeholder="Amount" />
                                        </div>
                                    </motion.label>

                                    <motion.label
                                        initial={{opacity: 0, y: 100}}
                                        animate={{opacity: 1, y: 0}}
                                        transition={{delay: 0.4}}
                                        className="grid" htmlFor="amount">
                                        <span className="mx-2">IGST</span>
                                        <div className="flex gap-4">
                                            <input type="number"
                                                   min="0"
                                                   max="100"
                                                   value={formData.i_gst_percent}
                                                   onChange={(ev) => setFormData({ ...formData, i_gst_percent: ev.target.value }) }
                                                   className="outline outline-[#BABABA] w-30 focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                                   placeholder="%" />
                                            <input type="number"
                                                   min="0"
                                                   max="100"
                                                   readOnly={true}
                                                   value={formData.i_gst_amount}
                                                   onChange={(ev) => setFormData({ ...formData, i_gst_amount: ev.target.value }) }
                                                   className="outline outline-[#BABABA] w-40 focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                                   placeholder="Amount" />
                                        </div>
                                    </motion.label>
                                </div>

                                <div className="grid md:grid lg:grid xl:grid gap-2">
                                    <div className="flex justify-between items-center py-4">
                                        <motion.label
                                            className="flex gap-x-2 items-center text-[#005BEA] text-xl"
                                            initial={{opacity: 0, y: 100}}
                                            animate={{opacity: 1, y: 0}}
                                            transition={{delay: 0.1}}
                                            htmlFor="box">
                                            Total GST (SGST + CGST + IGST)
                                        </motion.label>
                                        <motion.div
                                            initial={{opacity: 0, y: 100}}
                                            animate={{opacity: 1, y: 0}}
                                            transition={{delay: 0.2}}>
                                             <span className="flex gap-2 items-center text-[#005BEA] py-4">
                                            <IndianRupee />
                                                 { TotalTaxCharges }
                                        </span>
                                        </motion.div>
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <motion.hr
                                        initial={{opacity: 0, y: 100}}
                                        animate={{y: 0, opacity: 1}}
                                        className="border-[#6392E5]"/>
                                </div>
                            </div>


                            {/* Overall Project Cost */}
                            <div>
                                <motion.div
                                    initial={{opacity: 0, y: 100}}
                                    animate={{opacity: 1, y: 0}}
                                    transition={{delay: 0.1}}
                                    className="head text-xl">
                                    Overall Project Cost
                                </motion.div>
                                <div className="my-2">
                                    <motion.hr
                                        initial={{opacity: 0, y: 100}}
                                        animate={{y: 0, opacity: 1}}
                                        className="border-[#6392E5]"/>
                                </div>

                                <div className="grid md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 my-6 gap-6">
                                    <motion.label
                                        initial={{opacity: 0, y: 100}}
                                        animate={{opacity: 1, y: 0}}
                                        transition={{delay: 0.1}}
                                        className="grid" htmlFor="remarks">
                                        <span className="mx-2">Remarks</span>
                                        <input type="text"
                                               value={formData.project_remarks}
                                               onChange={(ev) => setFormData({ ...formData, project_remarks: ev.target.value }) }
                                               className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                               placeholder="Enter Any Remarks" />
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
                                            Total Project Cost Before Tax
                                        </motion.label>


                                        <motion.div
                                            initial={{opacity: 0, y: 100}}
                                            animate={{opacity: 1, y: 0}}
                                            transition={{delay: 0.3}}>
                                    <span className="flex gap-2 items-center text-[#005BEA] py-4">
                                        <IndianRupee/>
                                        { TotalProjectCost }
                                    </span>
                                        </motion.div>
                                    </div>
                                </div>

                                <div className="mb-4">
                                    <motion.hr
                                        initial={{opacity: 0, y: 100}}
                                        animate={{y: 0, opacity: 1}}
                                        className="border-[#6392E5]"/>
                                </div>
                            </div>


                            {/* Calculation Basis */}
                            <div>
                                <motion.div
                                    className="head text-[#005BEA] py-2 text-xl"
                                    initial={{opacity: 0, y: 100}}
                                    animate={{opacity: 1, y: 0}}
                                    transition={{delay: 0.1}}>
                                    Calculation Basis
                                </motion.div>
                                <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 justify-center items-center xl:divide-x-2 divide-[#6392E5] gap-10 my-4">
                                    <div className="grid grid-cols-2 lg:pr-14 xl:pr-14 gap-4">
                                        <div>
                                            <motion.p
                                                initial={{opacity: 0, y: 100}}
                                                animate={{opacity: 1, y: 0}}
                                                transition={{delay: 0.2}}
                                                className="border border-[#707070] text-center rounded p-4 my-4">
                                                Total Construction Cost
                                            </motion.p>
                                            <motion.p
                                                initial={{opacity: 0, y: 100}}
                                                animate={{opacity: 1, y: 0}}
                                                transition={{delay: 0.3}}
                                                className="border border-[#707070] text-center rounded p-4 my-4">
                                                Total Construction Budget
                                            </motion.p>
                                            <motion.p
                                                initial={{opacity: 0, y: 100}}
                                                animate={{opacity: 1, y: 0}}
                                                transition={{delay: 0.4}}
                                                className="border border-[#707070] text-center rounded p-4 my-4">
                                                Total Amenities
                                            </motion.p>
                                            <motion.p
                                                initial={{opacity: 0, y: 100}}
                                                animate={{opacity: 1, y: 0}}
                                                transition={{delay: 0.5}}
                                                className="border border-[#707070] text-center rounded p-4 my-4">
                                                Total Extra Charges
                                            </motion.p>
                                            <motion.p
                                                initial={{opacity: 0, y: 100}}
                                                animate={{opacity: 1, y: 0}}
                                                transition={{delay: 0.6}}
                                                className="border border-[#707070] text-center rounded p-4 my-4">
                                                Total Document Charges
                                            </motion.p>
                                            <motion.p
                                                initial={{opacity: 0, y: 100}}
                                                animate={{opacity: 1, y: 0}}
                                                transition={{delay: 0.7}}
                                                className="border border-[#707070] text-center rounded p-4 my-4">
                                                Avg Rate of construction
                                            </motion.p>
                                            <motion.p
                                                initial={{opacity: 0, y: 100}}
                                                animate={{opacity: 1, y: 0}}
                                                transition={{delay: 0.8}}
                                                className="border border-[#707070] text-center rounded p-4 my-4">
                                                Total GST (SGST + CGST + IGST)
                                            </motion.p>
                                        </div>

                                        <div className="text-center">
                                            <motion.div
                                                initial={{opacity: 0, y: 100}}
                                                animate={{opacity: 1, y: 0}}
                                                transition={{delay: 1.0}}
                                                className="border border-[#707070] flex gap-2  text-[#005BEA] rounded p-4 my-4">
                                                    <IndianRupee />
                                                    { ConstructionCost }
                                            </motion.div>
                                            <motion.div
                                                initial={{opacity: 0, y: 100}}
                                                animate={{opacity: 1, y: 0}}
                                                transition={{delay: 1.1}}
                                                className="border border-[#707070] flex gap-2  text-[#005BEA] rounded p-4 my-4">
                                                    <IndianRupee />
                                                    { ConstructionBudget }
                                            </motion.div>
                                            <motion.p
                                                initial={{opacity: 0, y: 100}}
                                                animate={{opacity: 1, y: 0}}
                                                transition={{delay: 1.2}}
                                                className="border border-[#707070] flex gap-2  text-[#005BEA] rounded p-4 my-4">
                                                    <IndianRupee />
                                                    {AmenitiesCost}
                                            </motion.p>
                                            <motion.p
                                                initial={{opacity: 0, y: 100}}
                                                animate={{opacity: 1, y: 0}}
                                                transition={{delay: 1.3}}
                                                className="border border-[#707070] flex gap-2  text-[#005BEA] rounded p-4 my-4">
                                                    <IndianRupee />
                                                    {ExtraCharges}
                                            </motion.p>
                                            <motion.p
                                                initial={{opacity: 0, y: 100}}
                                                animate={{opacity: 1, y: 0}}
                                                transition={{delay: 1.4}}
                                                className="border border-[#707070] flex gap-2  text-[#005BEA] rounded p-4 my-4">
                                                    <IndianRupee />
                                                    {DocCharges}
                                            </motion.p>
                                            <motion.p
                                                initial={{opacity: 0, y: 100}}
                                                animate={{opacity: 1, y: 0}}
                                                transition={{delay: 1.5}}
                                                className="border border-[#707070] flex gap-2  text-[#005BEA] rounded p-4 my-4">
                                                    <IndianRupee />
                                                    {AvgROC}
                                            </motion.p>
                                            <motion.p
                                                initial={{opacity: 0, y: 100}}
                                                animate={{opacity: 1, y: 0}}
                                                transition={{delay: 1.6}}
                                                className="border border-[#707070] flex gap-2  text-[#005BEA] rounded p-4 my-4">
                                                     <IndianRupee />
                                                    { TotalTaxCharges }
                                            </motion.p>
                                        </div>
                                    </div>

                                    <motion.div
                                        initial={{opacity: 0, y: 100}}
                                        animate={{opacity: 1, y: 0}}
                                        transition={{delay: 1.7}}
                                        className="h-100 flex flex-col justify-center items-center text-xl">
                                        Total Project Cost After Tax <br/>
                                        <span className="flex gap-2 items-center text-[#005BEA]">
                                            <IndianRupee/>
                                            { TotalProjectCostAfterTax }
                                        </span>
                                    </motion.div>
                                </div>
                                <div className="grid md:grid lg:grid xl:grid gap-2 my-6">
                                    <div className="grid md:flex lg:flex xl:flex justify-between items-center text-xl border border-[#6392E5] rounded p-4">
                                        <motion.label
                                            className="flex gap-2 p-2"
                                            initial={{opacity: 0, y: 100}}
                                            animate={{opacity: 1, y: 0}}
                                            transition={{delay: 0.8 }}
                                            htmlFor="box">
                                            <span className="text-[#005BEA]">Avg Rate of construction</span>
                                            <p>
                                                = Total Budget / Build-up Area Sqft <br/>
                                            </p>
                                        </motion.label>
                                    </div>
                                    <div className="grid md:flex lg:flex xl:flex justify-between items-center text-xl border border-[#6392E5] rounded p-4">
                                        <motion.label
                                            className="flex gap-2 p-2"
                                            initial={{opacity: 0, y: 100}}
                                            animate={{opacity: 1, y: 0}}
                                            transition={{delay: 0.8 }}
                                            htmlFor="box">
                                            <span className="text-[#005BEA]">Total Project Cost</span>
                                            <p>
                                                = Total Construction Budget + Total Plot Cost + Total Amenities
                                                Cost + Total Document Charges + Total Extra Charges
                                            </p>
                                        </motion.label>
                                    </div>
                                </div>


                                {/* CheckBox */}
                                <div className="grid md:grid lg:grid xl:grid justify-start items-center gap-2 py-4">
                                    <motion.label className="flex gap-x-2 items-center"
                                                  initial={{opacity: 0, y: 100}}
                                                  animate={{opacity: 1, y: 0}}
                                                  transition={{delay: 0.3}}
                                                  htmlFor="box">
                                        <input checked={checked}
                                               onChange={(ev) => setChecked(ev.target.checked)}
                                               className="accent-[#005BEA]" type="checkbox"/>
                                        Check the inputs whether you have entered valid details
                                    </motion.label>

                                    <div className="grid justify-start items-start py-2">

                                        {

                                            loading

                                            ?

                                                (
                                                    <div className="grid justify-center items-center my-10">
                                                        <Loader />
                                                    </div>
                                                )

                                            :

                                                (

                                                    <motion.button
                                                        type="submit"
                                                        className="flex gap-2 items-center cursor-pointer text-xl border border-[#6392E5] bg-[#D9E1EF] text-[#005BEA] hover:bg-[#C9D8F3] px-4 py-2 w-fit rounded"
                                                        initial={{opacity: 0, y: 100}}
                                                        animate={{opacity: 1, y: 0}}
                                                        transition={{delay: 0.3}}
                                                        disabled={loading}>

                                                        <CircleFadingPlus />
                                                        Create Project

                                                    </motion.button>

                                                )


                                        }

                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default CreateNewProject;