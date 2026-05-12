import React, {useCallback, useEffect, useMemo, useState} from 'react';
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import {
    ArrowUpNarrowWide,
    AudioWaveform,
    Axe, BrickWall,
    ChevronUp,
    Eye,
    IdCard,
    IndianRupee,
    Kanban,
    PaintRoller,
    Pickaxe,
    Plug, InspectionPanel, Sparkle,
    SquarePen,
    SquareStack, TicketPercent,
    Trash2,
    UsersRound, X, Info, Wrench, CircleFadingPlus,
} from "lucide-react";


// Import Hooks
import { useLabour } from '../../../Hooks/useLabour.js';
import { useProject } from "../../../Hooks/useProject.js";

// Import Components
import Loader from "../../../components/Loader.jsx";
import LabourViewUI from "../../../components/labour/LabourViewUI.jsx";

const LabourBoard = () => {

    // || States -------------------------------------------------------------------------------------------------------

    // Project Selection
    const [ SelectedProject, setSelectedProject ] = useState([]);

    // Labour Selection
    const [labourData, setLabourData] = useState([]);

    // FormData
    const [formData, setFormData] = useState({
        project_name: "",
        total_mason_cost: "",
        total_centering_cost: "",
        total_plumbing_cost: "",
        total_electrical_cost: "",
        total_tiles_cost: "",
        total_carpenter_cost: "",
        total_painter_cost: "",
        total_other_cost: "",
        total_labour_cost: "",
        mason_master: {
            mason_name: "",
            mason_phone: "",
            mason_address: "",
            mason_contract: "0",
            mason_contract_amount: "0",
            mason_basement: "",
            mason_basement_amount: "0",
            mason_lintel: "",
            mason_lintel_amount: "0",
            mason_roof: "",
            mason_roof_amount: "0",
            mason_outer_plastering: "",
            mason_outer_plastering_amount: "0",
            mason_inner_plastering: "",
            mason_inner_plastering_amount: "0",
            mason_septic_tank: "",
            mason_septic_tank_amount: "0",
            mason_s_gst_percent: 0,
            mason_s_gst_amount: 0,
            mason_c_gst_percent: 0,
            mason_c_gst_amount: 0,
            mason_i_gst_percent: 0,
            mason_i_gst_amount: 0,
            mason_items: [
                {
                    mason_item_name: "",
                    mason_item_amount: "0",
                    mason_item_remarks: ""
                }
            ],
            total_mason_item_amt: 0

        },

        centering_master: {
            centering_name: "",
            centering_phone: "",
            centering_address: "",
            centering_contract: "0",
            centering_contract_amount: "0",
            footing_ground: "",
            footing_ground_amount: "0",
            plinth_beam: "",
            plinth_beam_amount: "0",
            basement_column: "",
            basement_column_amount: "0",
            outer_plastering: "",
            outer_plastering_amount: "0",
            feet_column: "",
            feet_column_amount: "0",
            lintel_beam: "",
            lintel_beam_amount: "0",
            after_lintel_column: "",
            after_lintel_column_amount: "0",
            hide_beam: "",
            hide_beam_amount: "0",
            centering_roof: "",
            centering_roof_amount: "0",
            roof_beam: "",
            roof_beam_amount: "0",
            centering_s_gst_percent: 0,
            centering_s_gst_amount: 0,
            centering_c_gst_percent: 0,
            centering_c_gst_amount: 0,
            centering_i_gst_percent: 0,
            centering_i_gst_amount: 0,
            centering_items: [
                {
                    centering_item_name: "",
                    centering_item_amount: "0",
                    centering_item_remarks: ""
                }
            ],
            total_centering_item_amt: 0
        },

        plumbing_master: {
            plumbing_name: "",
            plumbing_phone: "",
            plumbing_address: "",
            plumbing_contract: "0",
            plumbing_contract_amount: "0",
            plumbing_s_gst_percent: 0,
            plumbing_s_gst_amount: 0,
            plumbing_c_gst_percent: 0,
            plumbing_c_gst_amount: 0,
            plumbing_i_gst_percent: 0,
            plumbing_i_gst_amount: 0,
            plumbing_items: [
                {
                    plumbing_item_name: "",
                    plumbing_item_amount: "0",
                    plumbing_item_remarks: ""
                }
            ],
            total_plumbing_item_amt: 0
        },

        electrical_master: {
            electrical_name: "",
            electrical_phone: "",
            electrical_address: "",
            electrical_contract: "0",
            electrical_contract_amount: "0",
            electrical_s_gst_percent: 0,
            electrical_s_gst_amount: 0,
            electrical_c_gst_percent: 0,
            electrical_c_gst_amount: 0,
            electrical_i_gst_percent: 0,
            electrical_i_gst_amount: 0,
            electrical_items: [
                {
                    electrical_item_name: "",
                    electrical_item_amount: "0",
                    electrical_item_remarks: ""
                }
            ],
            total_electrical_item_amt: 0
        },

        tiles_master: {
            tiles_name: "",
            tiles_phone: "",
            tiles_address: "",
            tiles_contract: "0",
            tiles_contract_amount: "0",
            tiles_s_gst_percent: 0,
            tiles_s_gst_amount: 0,
            tiles_c_gst_percent: 0,
            tiles_c_gst_amount: 0,
            tiles_i_gst_percent: 0,
            tiles_i_gst_amount: 0,
            tiles_items: [
                {
                    tiles_item_name: "",
                    tiles_item_amount: "0",
                    tiles_item_remarks: ""
                }
            ],
            total_tiles_items_amt: 0
        },

        carpenter_master: {
            carpenter_name: "",
            carpenter_phone: "",
            carpenter_address: "",
            carpenter_contract: "0",
            carpenter_contract_amount: "0",
            carpenter_s_gst_percent: 0,
            carpenter_s_gst_amount: 0,
            carpenter_c_gst_percent: 0,
            carpenter_c_gst_amount: 0,
            carpenter_i_gst_percent: 0,
            carpenter_i_gst_amount: 0,
            carpenter_items: [
                {
                    carpenter_item_name: "",
                    carpenter_item_amount: "0",
                    carpenter_item_remarks: ""
                }
            ],
            total_carpenter_items_amt: 0
        },


        painter_master: {
            painter_name: "",
            painter_phone: "",
            painter_address: "",
            painter_contract: "0",
            painter_contract_amount: "0",
            painter_s_gst_percent: 0,
            painter_s_gst_amount: 0,
            painter_c_gst_percent: 0,
            painter_c_gst_amount: 0,
            painter_i_gst_percent: 0,
            painter_i_gst_amount: 0,
            painter_items: [
                {
                    painter_item_name: "",
                    painter_item_amount: "0",
                    painter_item_remarks: ""
                }
            ],
            total_painter_items_amt: 0
        },

        other_master: {
            other_name: "",
            other_phone: "",
            other_address: "",
            other_contract: "0",
            other_contract_amount: "0",
            other_s_gst_percent: 0,
            other_s_gst_amount: 0,
            other_c_gst_percent: 0,
            other_c_gst_amount: 0,
            other_i_gst_percent: 0,
            other_i_gst_amount: 0,
            other_items: [
                {
                    other_item_name: "",
                    other_item_amount: "0",
                    other_item_remarks: ""
                }
            ],
            total_other_items_amt: 0
        }

    });

    // || States -------------------------------------------------------------------------------------------------------

    // || Hooks --------------------------------------------------------------------------------------------------------

    // Project Hooks
    const {
        fetchProject,
        ProjectDataList
    } = useProject();

    // Labour Hooks
    const {
        fetchLabour,
        loading,
        LabourMaster
    } = useLabour();

    // Fetch the data
    useEffect(() => {

        // Render Project
        fetchProject();

        // Render Labour
        fetchLabour();

    }, [fetchLabour, fetchProject]);

    // || Render Data -> useEffect
    useEffect(() => {

        // Project Data Render
        setSelectedProject(Array.isArray(ProjectDataList) ? ProjectDataList : []);

        // Labour Data Render
        setLabourData(Array.from(LabourMaster) ? LabourMaster : []);

    }, [ProjectDataList, LabourMaster]);

    // || Hooks --------------------------------------------------------------------------------------------------------

    // Event Trigger ---------------------------------------------------------------------------------------------------
    const handleProjectChange = useMemo(() => {



    }, [])


    return (
        <div className="space-y-4">
            <motion.div initial={{opacity: 0, y: 100}}
                        animate={{opacity: 1, y: 0}}
                        transition={{delay: 0.2, type: "spring", stiffness: 200}}
                        className="border border-[#A9C1EA] bg-[#F1F1F1] rounded p-4">
                <div className="flex gap-4">
                    <div className="grid justify-center items-center bg-[#C9D8F3] text-[#005bea] rounded p-4">
                        <Pickaxe/>
                    </div>
                    <div>
                        <p className="head text-xl text-[#005bea]">Labour Board</p>
                        <p>
                            Empowering the workforce through justice and equality
                        </p>
                    </div>
                </div>
            </motion.div>

            <motion.div initial={{opacity: 0, y: 100}}
                        animate={{opacity: 1, y: 0}}
                        transition={{delay: 0.2, type: "spring", stiffness: 200}}
                        className="grid border border-[#A9C1EA] bg-[#F1F1F1] rounded p-4 gap-2">
                <div className="flex gap-4">
                    <div className="grid justify-center items-center bg-[#C9D8F3] text-[#005bea] rounded p-4">
                        <Kanban/>
                    </div>
                    <div>
                        <p className="head text-xl text-[#005bea]">All Project</p>
                        <p>
                            Overview of all projects with budgets, timelines, and progress
                        </p>

                    </div>
                </div>
                <div className=" border border-[#A9C1EA] bg-[#F1F1F1] rounded p-4 ">

                    <div className="grid grid-cols-2">
                        <motion.label
                            initial={{opacity: 0, y: 100}}
                            animate={{opacity: 1, y: 0}}
                            transition={{delay: 0.2}}
                            className="grid" htmlFor="type">
                            <span className="mx-2">Project Type (Site)</span>
                            <select name="type"
                                    value={formData.project_name}
                                    onChange={handleProjectChange}
                                    className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4">
                                <option value="Select Project">
                                    Select Project
                                </option>
                                {

                                    Array.isArray(labourData)

                                    &&

                                    labourData.map((item, index) => (

                                        <option key={index} value={item.project_name}>
                                            { item.project_name }
                                        </option>

                                    ))

                                }

                            </select>
                        </motion.label>
                    </div>

                </div>
            </motion.div>
            <motion.div initial={{opacity: 0, y: 100}}
                        animate={{opacity: 1, y: 0}}
                        transition={{delay: 0.2, type: "spring", stiffness: 200}}
                        className="space-y-4 border border-[#A9C1EA] bg-[#F1F1F1] rounded p-4">
                <div className="flex justify-between gap-4">

                    <div className="flex gap-2 items-center">
                        <div className="grid justify-center items-center bg-[#C9D8F3] text-[#005bea] rounded p-4">
                            <IdCard />
                        </div>
                        <div className="flex gap-4 items-center">
                            <p className="head text-xl text-[#005bea]">Labours</p>
                        </div>
                    </div>

                    {

                        SelectedProject

                        &&

                        (

                            <motion.button initial={{ opacity: 0, y: 100 }}
                                           animate={{ opacity: 1, y: 0 }}
                                           transition={{delay: 0.1, type: "spring", stiffness: 200}}
                                           title="Delete" type="button"
                                    className="flex gap-2 items-center bg-[#FEE2E2] border
                                        border-[#EF4444] text-[#991B1B] cursor-pointer px-4 rounded"
                                    onClick={ () => HandleDeleteLabour(SelectedProject?.labour_id) }
                            >
                                <Trash2 />
                                <span className="hidden">Delete</span>
                            </motion.button>

                        )

                    }


                </div>

                {


                    loading

                    ?

                        (


                            <div className="grid justify-center items-center">
                                <Loader />
                            </div>

                        )

                    :


                        !SelectedProject

                            ?

                            (

                                <p>
                                    Empty
                                </p>

                            )

                            :

                            (
                                <>
                                    <div className="grid gap-4">

                                        {/*Mason*/}
                                        <motion.div initial={{opacity: 0, y: 100}}
                                                    animate={{opacity: 1, y: 0}}
                                                    transition={{delay: 0.2, type: "spring", stiffness: 200}}
                                                    className="grid grid-cols-1 border border-[#A9C1EA] bg-[#F1F1F1] rounded p-4 gap-2">
                                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 ">
                                                <div className="flex gap-2">
                                                    <div className="flex justify-center items-center bg-[#C9D8F3] text-[#005bea] rounded p-4">
                                                        <UsersRound />
                                                    </div>
                                                    <div className="flex items-center gap-4 px-2 py-4">
                                                        <p className="head text-[#005bea] ">Mason</p>
                                                        <p className="text-xl ">
                                                            { SelectedProject?.MasonMaster?.mason_name}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="flex justify-start lg:justify-center ">
                                                    <p className="text-[#005bea] px-2 py-4">
                                                        Total Costs :
                                                    </p>
                                                    <p className="flex items-center gap-2">
                                                        <IndianRupee size={20} /> { parseFloat(SelectedProject?.total_mason_cost).toLocaleString('en-IN') }
                                                    </p>
                                                </div>
                                                <div className="grid">
                                                    <div className="flex flex-wrap gap-4 justify-start lg:justify-end items-center">
                                                        <button title="View" type="button" className="flex items-center
                                                            bg-[#FEF3C7] border border-[#F59E0B] text-[#92400E] cursor-pointer p-2 rounded transition delay-150 duration-300 ease-in-out hover:-translate-y-2 hover:scale-105"
                                                                onClick={() => OpenMasonViewModel(SelectedProject?.labour_id, SelectedProject?.MasonMaster?.mason_id)}>
                                                            <Eye />
                                                            <span className="hidden">View</span>
                                                        </button>
                                                        <button title="Edit" type="button"
                                                                className="flex gap-2 items-center
                                                        bg-[#D9E1EF] border border-[#8CAEE9] text-[#005BEA] cursor-pointer p-2 rounded transition delay-150 duration-300 ease-in-out hover:-translate-y-2 hover:scale-105"
                                                        onClick={() => OpenEditMasonModal(SelectedProject?.labour_id, SelectedProject?.MasonMaster?.mason_id)}>
                                                            <SquarePen />
                                                            <span className="hidden">Edit</span>
                                                        </button>

                                                    </div>
                                                </div>
                                            </div>
                                        </motion.div>


                                        {/*Centering*/}
                                        <motion.div initial={{opacity: 0, y: 100}}
                                                    animate={{opacity: 1, y: 0}}
                                                    transition={{delay: 0.2, type: "spring", stiffness: 200}}
                                                    className="grid grid-cols-1 border border-[#A9C1EA] bg-[#F1F1F1] rounded p-4 gap-2">
                                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 ">
                                                <div className="flex gap-2">
                                                    <div className="flex justify-center items-center bg-[#C9D8F3] text-[#005bea] rounded p-4">
                                                        <ChevronUp />
                                                    </div>
                                                    <div className="flex items-center gap-4 px-2 py-4">
                                                        <p className="head text-[#005bea] ">Centering</p>
                                                        <p className="text-xl ">
                                                            { SelectedProject?.CenteringMaster?.centering_name}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="flex justify-start lg:justify-center ">
                                                    <p className="text-[#005bea] px-2 py-4">
                                                        Total Costs :
                                                    </p>
                                                    <p className="flex items-center gap-2">
                                                        <IndianRupee size={20} /> { parseFloat(SelectedProject?.total_centering_cost).toLocaleString('en-IN') }
                                                    </p>
                                                </div>
                                                <div className="grid">
                                                    <div className="flex flex-wrap gap-4 justify-start lg:justify-end items-center">
                                                        <button title="View" type="button" className="flex items-center
                                                            bg-[#FEF3C7] border border-[#F59E0B] text-[#92400E] cursor-pointer p-2 rounded transition delay-150 duration-300 ease-in-out hover:-translate-y-2 hover:scale-105"
                                                                onClick={() => OpenCentringViewModel(SelectedProject.labour_id, SelectedProject.CenteringMaster.centering_id)}>
                                                            <Eye />
                                                            <span className="hidden">View</span>
                                                        </button>
                                                        <button title="Edit" type="button"
                                                                className="flex gap-2 items-center
                                                        bg-[#D9E1EF] border border-[#8CAEE9] text-[#005BEA] cursor-pointer p-2 rounded transition delay-150 duration-300 ease-in-out hover:-translate-y-2 hover:scale-105"
                                                                onClick={()=>OpenEditCentringModal(SelectedProject.labour_id, SelectedProject.CenteringMaster.centering_id)}>
                                                            <SquarePen />
                                                            <span className="hidden">Edit</span>
                                                        </button>

                                                    </div>
                                                </div>



                                            </div>
                                        </motion.div>
                                        {/*plumbing*/}
                                        <motion.div initial={{opacity: 0, y: 100}}
                                                    animate={{opacity: 1, y: 0}}
                                                    transition={{delay: 0.2, type: "spring", stiffness: 200}}
                                                    className="grid  grid-cols-1 border border-[#A9C1EA] bg-[#F1F1F1] rounded p-4 gap-2">
                                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 ">
                                                <div className="flex gap-2">
                                                    <div className="flex justify-center items-center bg-[#C9D8F3] text-[#005bea] rounded p-4">
                                                        <AudioWaveform />
                                                    </div>
                                                    <div className="flex items-center gap-4 px-2 py-4">
                                                        <p className="head text-[#005bea] ">Plumber</p>
                                                        <p className="text-xl ">
                                                            { SelectedProject?.PlumbingMaster?.plumbing_name}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="flex justify-start lg:justify-center ">
                                                    <p className="text-[#005bea] px-2 py-4">
                                                        Total Costs :
                                                    </p>
                                                    <p className="flex items-center gap-2">
                                                        <IndianRupee size={20} /> { parseFloat(SelectedProject?.total_plumbing_cost).toLocaleString('en-IN') }
                                                    </p>
                                                </div>
                                                <div className="grid">
                                                    <div className="flex flex-wrap gap-4 justify-start lg:justify-end items-center">
                                                        <button title="View" type="button" className="flex items-center
                                                            bg-[#FEF3C7] border border-[#F59E0B] text-[#92400E] cursor-pointer p-2 rounded transition delay-150 duration-300 ease-in-out hover:-translate-y-2 hover:scale-105"
                                                                onClick={() => OpenPlumbingViewModel(SelectedProject.labour_id, SelectedProject.PlumbingMaster.plumbing_id)}>
                                                            <Eye />
                                                            <span className="hidden">View</span>
                                                        </button>
                                                        <button title="Edit" type="button"
                                                                className="flex gap-2 items-center
                                                        bg-[#D9E1EF] border border-[#8CAEE9] text-[#005BEA] cursor-pointer p-2 rounded transition delay-150 duration-300 ease-in-out hover:-translate-y-2 hover:scale-105"
                                                                onClick={()=>OpenEditPlumbingModal(SelectedProject.labour_id, SelectedProject.PlumbingMaster.plumbing_id)}>
                                                            <SquarePen />
                                                            <span className="hidden">Edit</span>
                                                        </button>

                                                    </div>
                                                </div>


                                            </div>
                                        </motion.div>
                                        {/*Electrical*/}
                                        <motion.div initial={{opacity: 0, y: 100}}
                                                    animate={{opacity: 1, y: 0}}
                                                    transition={{delay: 0.2, type: "spring", stiffness: 200}}
                                                    className="grid  grid-cols-1 border border-[#A9C1EA] bg-[#F1F1F1] rounded p-4 gap-2">
                                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 ">
                                                <div className="flex gap-2">
                                                    <div className="flex justify-center items-center bg-[#C9D8F3] text-[#005bea] rounded p-4">
                                                        <Plug />
                                                    </div>
                                                    <div className="flex items-center gap-4 px-2 py-4">
                                                        <p className="head text-[#005bea] ">Electrician</p>
                                                        <p className="text-xl ">
                                                            { SelectedProject?.ElectricalMaster?.electrical_name}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="flex justify-start lg:justify-center ">
                                                    <p className="text-[#005bea] px-2 py-4">
                                                        Total Costs :
                                                    </p>
                                                    <p className="flex items-center gap-2">
                                                        <IndianRupee size={20} /> { parseFloat(SelectedProject?.total_electrical_cost).toLocaleString('en-IN') }
                                                    </p>
                                                </div>
                                                <div className="grid">
                                                    <div className="flex flex-wrap gap-4 justify-start lg:justify-end items-center">
                                                        <button title="View" type="button" className="flex items-center
                                                            bg-[#FEF3C7] border border-[#F59E0B] text-[#92400E] cursor-pointer p-2 rounded transition delay-150 duration-300 ease-in-out hover:-translate-y-2 hover:scale-105"
                                                                onClick={() => OpenElectricianViewModel(SelectedProject.labour_id, SelectedProject.ElectricalMaster.electrical_id)}>
                                                            <Eye />
                                                            <span className="hidden">View</span>
                                                        </button>
                                                        <button title="Edit" type="button"
                                                                className="flex gap-2 items-center
                                                        bg-[#D9E1EF] border border-[#8CAEE9] text-[#005BEA] cursor-pointer p-2 rounded transition delay-150 duration-300 ease-in-out hover:-translate-y-2 hover:scale-105"
                                                                onClick={()=>OpenEditElectricalModal(SelectedProject.labour_id, SelectedProject.electrical_id)}
                                                        >
                                                            <SquarePen />
                                                            <span className="hidden">Edit</span>
                                                        </button>

                                                    </div>
                                                </div>


                                            </div>
                                        </motion.div>
                                        {/*Tiles*/}
                                        <motion.div initial={{opacity: 0, y: 100}}
                                                    animate={{opacity: 1, y: 0}}
                                                    transition={{delay: 0.2, type: "spring", stiffness: 200}}
                                                    className="grid  grid-cols-1 border border-[#A9C1EA] bg-[#F1F1F1] rounded p-4 gap-2">
                                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 ">
                                                <div className="flex gap-2">
                                                    <div className="flex justify-center items-center bg-[#C9D8F3] text-[#005bea] rounded p-4">
                                                        <SquareStack />
                                                    </div>
                                                    <div className="flex items-center gap-4 px-2 py-4">
                                                        <p className="head text-[#005bea] ">Tiles</p>
                                                        <p className="text-xl ">
                                                            { SelectedProject?.TilesMaster?.tiles_name}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="flex justify-start lg:justify-center ">
                                                    <p className="text-[#005bea] px-2 py-4">
                                                        Total Costs :
                                                    </p>
                                                    <p className="flex items-center gap-2">
                                                        <IndianRupee size={20} /> { parseFloat(SelectedProject?.total_tiles_cost).toLocaleString('en-IN') }
                                                    </p>
                                                </div>
                                                <div className="grid">
                                                    <div className="flex flex-wrap gap-4 justify-start lg:justify-end items-center">
                                                        <button title="View" type="button" className="flex items-center
                                                            bg-[#FEF3C7] border border-[#F59E0B] text-[#92400E] cursor-pointer p-2 rounded transition delay-150 duration-300 ease-in-out hover:-translate-y-2 hover:scale-105"
                                                                onClick={() => OpenTilesViewModel(SelectedProject.labour_id, SelectedProject.TilesMaster.tiles_id)}>
                                                            <Eye />
                                                            <span className="hidden">View</span>
                                                        </button>
                                                        <button title="Edit" type="button"
                                                                className="flex gap-2 items-center
                                                        bg-[#D9E1EF] border border-[#8CAEE9] text-[#005BEA] cursor-pointer p-2 rounded transition delay-150 duration-300 ease-in-out hover:-translate-y-2 hover:scale-105"
                                                                onClick={()=>OpenEditTilesModal(SelectedProject.labour_id, SelectedProject.TilesMaster.tiles_id)}>
                                                            <SquarePen />
                                                            <span className="hidden">Edit</span>
                                                        </button>

                                                    </div>
                                                </div>


                                            </div>
                                        </motion.div>
                                        {/*Carpenter*/}
                                        <motion.div initial={{opacity: 0, y: 100}}
                                                    animate={{opacity: 1, y: 0}}
                                                    transition={{delay: 0.2, type: "spring", stiffness: 200}}
                                                    className="grid  grid-cols-1 border border-[#A9C1EA] bg-[#F1F1F1] rounded p-4 gap-2">
                                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 ">
                                                <div className="flex gap-2">
                                                    <div className="flex justify-center items-center bg-[#C9D8F3] text-[#005bea] rounded p-4">
                                                        <Axe />
                                                    </div>
                                                    <div className="flex items-center gap-4 px-2 py-4">
                                                        <p className="head text-[#005bea] ">Carpenter</p>
                                                        <p className="text-xl ">
                                                            { SelectedProject?.CarpenterMaster?.carpenter_name}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="flex justify-start lg:justify-center ">
                                                    <p className="text-[#005bea] px-2 py-4">
                                                        Total Costs :
                                                    </p>
                                                    <p className="flex items-center gap-2">
                                                        <IndianRupee size={20} /> { parseFloat(SelectedProject?.total_carpenter_cost).toLocaleString('en-IN') }
                                                    </p>
                                                </div>
                                                <div className="grid">
                                                    <div className="flex flex-wrap gap-4 justify-start lg:justify-end items-center">
                                                        <button title="View" type="button" className="flex items-center
                                                            bg-[#FEF3C7] border border-[#F59E0B] text-[#92400E] cursor-pointer p-2 rounded transition delay-150 duration-300 ease-in-out hover:-translate-y-2 hover:scale-105"
                                                                onClick={() => OpenCarpenterViewModel(SelectedProject.labour_id, SelectedProject.CarpenterMaster.carpenter_id)}>
                                                            <Eye />
                                                            <span className="hidden">View</span>
                                                        </button>
                                                        <button title="Edit" type="button"
                                                                className="flex gap-2 items-center
                                                        bg-[#D9E1EF] border border-[#8CAEE9] text-[#005BEA] cursor-pointer p-2 rounded transition delay-150 duration-300 ease-in-out hover:-translate-y-2 hover:scale-105"
                                                                onClick={()=>OpenEditCarpenterModal(SelectedProject.labour_id, SelectedProject.CarpenterMaster.carpenter_id)}>
                                                            <SquarePen />
                                                            <span className="hidden">Edit</span>
                                                        </button>

                                                    </div>
                                                </div>


                                            </div>
                                        </motion.div>
                                        {/*Painter*/}
                                        <motion.div initial={{opacity: 0, y: 100}}
                                                    animate={{opacity: 1, y: 0}}
                                                    transition={{delay: 0.2, type: "spring", stiffness: 200}}
                                                    className="grid  grid-cols-1 border border-[#A9C1EA] bg-[#F1F1F1] rounded p-4 gap-2">
                                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 ">
                                                <div className="flex gap-2">
                                                    <div className="flex justify-center items-center bg-[#C9D8F3] text-[#005bea] rounded p-4">
                                                        <PaintRoller />
                                                    </div>
                                                    <div className="flex items-center gap-4 px-2 py-4">
                                                        <p className="head text-[#005bea] ">Painter</p>
                                                        <p className="text-xl ">
                                                            { SelectedProject?.PainterMaster?.painter_name}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="flex justify-start lg:justify-center ">
                                                    <p className="text-[#005bea] px-2 py-4">
                                                        Total Costs :
                                                    </p>
                                                    <p className="flex items-center gap-2">
                                                        <IndianRupee size={20} /> { parseFloat(SelectedProject?.total_painter_cost).toLocaleString('en-IN') }
                                                    </p>
                                                </div>
                                                <div className="grid">
                                                    <div className="flex flex-wrap gap-4 justify-start lg:justify-end items-center">
                                                        <button title="View" type="button" className="flex items-center
                                                            bg-[#FEF3C7] border border-[#F59E0B] text-[#92400E] cursor-pointer p-2 rounded transition delay-150 duration-300 ease-in-out hover:-translate-y-2 hover:scale-105"
                                                                onClick={() => OpenPainterViewModel(SelectedProject.labour_id, SelectedProject.PainterMaster.painter_id)}>
                                                            <Eye />
                                                            <span className="hidden">View</span>
                                                        </button>
                                                        <button title="Edit" type="button"
                                                                className="flex gap-2 items-center
                                                        bg-[#D9E1EF] border border-[#8CAEE9] text-[#005BEA] cursor-pointer p-2 rounded transition delay-150 duration-300 ease-in-out hover:-translate-y-2 hover:scale-105"
                                                                onClick={()=>OpenEditPainterModal(SelectedProject.labour_id, SelectedProject.PainterMaster.painter_id)}>
                                                            <SquarePen />
                                                            <span className="hidden">Edit</span>
                                                        </button>

                                                    </div>
                                                </div>


                                            </div>
                                        </motion.div>
                                        {/*Other Labours*/}
                                        <motion.div initial={{opacity: 0, y: 100}}
                                                    animate={{opacity: 1, y: 0}}
                                                    transition={{delay: 0.2, type: "spring", stiffness: 200}}
                                                    className="grid  grid-cols-1 border border-[#A9C1EA] bg-[#F1F1F1] rounded p-4 gap-2">
                                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 ">
                                                <div className="flex gap-2">
                                                    <div className="flex justify-center items-center bg-[#C9D8F3] text-[#005bea] rounded p-4">
                                                        <Sparkle />
                                                    </div>
                                                    <div className="flex items-center gap-4 px-2 py-4">
                                                        <p className="head text-[#005bea] ">Other Labours</p>
                                                        <p className="text-xl ">
                                                            { SelectedProject?.OtherMaster?.other_name}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="flex justify-start lg:justify-center ">
                                                    <p className="text-[#005bea] px-2 py-4">
                                                        Total Costs :
                                                    </p>
                                                    <p className="flex items-center gap-2">
                                                        <IndianRupee size={20} /> { parseFloat(SelectedProject?.total_other_cost).toLocaleString('en-IN') }
                                                    </p>
                                                </div>
                                                <div className="grid">
                                                    <div className="flex flex-wrap gap-4 justify-start lg:justify-end items-center">
                                                        <button title="View" type="button" className="flex items-center
                                                            bg-[#FEF3C7] border border-[#F59E0B] text-[#92400E] cursor-pointer p-2 rounded transition delay-150 duration-300 ease-in-out hover:-translate-y-2 hover:scale-105"
                                                                onClick={() => OpenOtherViewModel(SelectedProject.labour_id, SelectedProject.OtherMaster.other_id)}>
                                                            <Eye />
                                                            <span className="hidden">View</span>
                                                        </button>
                                                        <button title="Edit" type="button"
                                                                className="flex gap-2 items-center
                                                        bg-[#D9E1EF] border border-[#8CAEE9] text-[#005BEA] cursor-pointer p-2 rounded transition delay-150 duration-300 ease-in-out hover:-translate-y-2 hover:scale-105"
                                                                onClick={()=>OpenEditOtherModal(SelectedProject.labour_id, SelectedProject.OtherMaster.other_id)}>
                                                            <SquarePen />
                                                            <span className="hidden">Edit</span>
                                                        </button>

                                                    </div>
                                                </div>


                                            </div>
                                        </motion.div>


                                    </div>
                                    <motion.div initial={{opacity: 0, y: 100}}
                                                animate={{opacity: 1, y: 0}}
                                                transition={{delay: 0.2, type: "spring", stiffness: 200}}
                                                className="border border-[#A9C1EA] bg-[#F1F1F1] rounded p-4">
                                        <div className="grid md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-6">
                                            <div className="flex gap-4">
                                                <p className="text-xl text-[#005bea]">Total Labours Cost :</p>
                                            </div>
                                            <motion.div
                                                initial={{opacity: 0, y: 100}}
                                                animate={{opacity: 1, y: 0}}
                                                transition={{delay: 0.3}}>
                                                <p className="flex gap-2 justify-start lg:justify-end items-center  text-xl">
                                                    <IndianRupee size={18} />

                                                    { parseFloat(SelectedProject.total_labour_cost).toLocaleString('en-IN') }

                                                </p>
                                            </motion.div>
                                        </div>
                                    </motion.div>
                                </>


                            )

                }


            </motion.div>

            {/* View Model For mason */}
            {

                isViewMasonModelOpen && selectedMasonData

                &&

                (

                    <div className="fixed inset-0 bg-[#202020]/50 flex items-center justify-center blur-20 backdrop-blur-xs z-50">
                        <motion.div initial={{ opacity: 0, x: 100, y: 100, rotate: 10 }}
                                    animate={{ opacity: 1, x: 0, y: 0, rotate: 0 }}
                                    transition={{delay: 0.2, type: "spring", stiffness: 200}} className="bg-[#F1F1F1] rounded w-11/12 h-9/10 md:w-1/2 lg:w-1/2 shadow-xl overflow-y-auto scroll-smooth">
                            <div className="sticky top-0 flex justify-between items-center bg-[#D9E1EF] rounded p-4 z-20">
                                <h2 className="flex gap-2 items-center text-xl text-[#005BEA]">
                                    <div className="flex items-center gap-2 ">
                                        <Eye />
                                    </div>
                                     Mason - {selectedMasonData.mason_name}
                                </h2>
                                <button onClick={() => setIsViewMasonModelOpen(false)} className="cursor-pointer text-gray-500 hover:text-gray-700">
                                    <X />
                                </button>
                            </div>

                            {/*Main Content*/}
                            <div className="grid gap-4 m-2">

                                <div className="grid gap-2 border-1 border-[#A9C1EA] rounded p-2">
                                    <motion.div
                                        initial={{ opacity: 0, y: 100 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{delay: 0.2, type: "spring", stiffness: 200}}
                                        className="grid justify-start item-center border border-[#A9C1EA] rounded"
                                    >
                                        <div className="flex gap-2">
                                            <div className="flex justify-center items-center bg-[#C9D8F3] text-[#005BEA] rounded px-4">
                                                <UsersRound />
                                            </div>
                                            <div className="flex items-center gap-4 px-2 py-4">
                                                <p className="text-xl text-[#005BEA]">
                                                    Mason Details
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
                                                { selectedMasonData.mason_name }
                                            </p>
                                        </div>
                                        <div className="flex gap-2 items-center">
                                            <p className=" text-[#005BEA]">
                                                Phone No :
                                            </p>
                                            <p>
                                                { selectedMasonData.mason_phone }
                                            </p>
                                        </div>

                                        <div className="flex gap-2 items-center">
                                            <p className=" text-[#005BEA]">
                                                Cost Per Sqft :
                                            </p>

                                            <p className="flex justify-center items-center">
                                                <IndianRupee size={16} />
                                                { parseFloat(selectedMasonData.mason_contract).toLocaleString('en-IN') }
                                            </p>
                                        </div>

                                        <div className="flex flex-wrap gap-2 items-center">
                                            <p className="text-[#005BEA]">
                                                Address :
                                            </p>
                                            <p>
                                                { selectedMasonData.mason_address }
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
                                            Total Mason Cost :
                                        </p>
                                        <p className="flex justify-center items-center text-md">
                                            <IndianRupee size={20} />
                                            { parseFloat(selectedMasonData.mason_contract_amount).toLocaleString('en-IN') }
                                        </p>
                                    </motion.div>
                                    <motion.div
                                        initial={{ opacity: 0, y: 100 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{delay: 0.2, type: "spring", stiffness: 200}}
                                        className="grid justify-start items-center border border-[#A9C1EA] rounded"
                                    >
                                        <div className="flex flex-cols-2 gap-2">
                                            <div className="flex justify-center items-center bg-[#C9D8F3] text-[#005BEA] rounded px-4">
                                                <BrickWall />
                                            </div>
                                            <div className="flex items-center gap-4 px-2 py-4">
                                                <p className="text-xl text-[#005BEA]">
                                                    Masonry
                                                </p>
                                            </div>
                                        </div>

                                    </motion.div>
                                    <div className="grid gap-2 border border-[#A9C1EA] rounded p-4">


                                        <div className="flex gap-2 items-center">
                                            <p className="text-[#005BEA]">
                                                 Basement :
                                            </p>
                                            <p className="">
                                                { selectedMasonData.mason_basement }
                                            </p>
                                        </div>


                                        <div className="flex gap-2 items-center">
                                            <p className=" text-[#005BEA]">
                                                Basement Amount :
                                            </p>
                                            <IndianRupee size={16} />
                                            <p className="">
                                                { parseFloat(selectedMasonData.mason_basement_amount).toLocaleString('en-IN') }
                                            </p>
                                        </div>

                                        <hr className="border border-[#A9C1EA]" />

                                        <div className="flex flex-wrap gap-2 item-center">
                                            <p className=" text-[#005BEA]">
                                                Lintel :
                                            </p>
                                            <p className="">
                                                { selectedMasonData.mason_lintel }
                                            </p>
                                        </div>

                                        <div className="flex gap-2 item-center">
                                            <p className=" text-[#005BEA]">
                                                Lintel Amount :
                                            </p>
                                            <p className="flex justify-center item-center ">
                                                <IndianRupee size={16} />
                                                { parseFloat(selectedMasonData.mason_lintel_amount).toLocaleString('en-IN') }
                                            </p>
                                        </div>

                                        <hr className="border border-[#A9C1EA]" />

                                        <div className="flex gap-2 items-center">
                                            <p className=" text-[#005BEA]">
                                                Roof :
                                            </p>
                                            <p className="">
                                                { selectedMasonData.mason_roof }
                                            </p>
                                        </div>


                                        <div className="flex gap-2 items-center">
                                            <p className=" text-[#005BEA]">
                                                Roof Amount :
                                            </p>
                                            <IndianRupee size={16} />
                                            <p className="">
                                                { parseFloat(selectedMasonData.mason_roof_amount).toLocaleString('en-IN') }
                                            </p>
                                        </div>

                                        <hr className="border border-[#A9C1EA]" />

                                        <div className="flex gap-2 item-center">
                                            <p className=" text-[#005BEA]">
                                                Outer Plastering:
                                            </p>
                                            <p className="">
                                                { selectedMasonData.mason_outer_plastering }
                                            </p>
                                        </div>

                                        <div className="flex gap-2 item-center">
                                            <p className=" text-[#005BEA]">
                                                Outer Plastering Amount:
                                            </p>
                                            <p className="flex justify-center item-center ">
                                                <IndianRupee size={16} />
                                                { parseFloat(selectedMasonData.mason_outer_plastering_amount).toLocaleString('en-IN') }
                                            </p>
                                        </div>

                                        <hr className="border border-[#A9C1EA]" />

                                        <div className="flex gap-2 items-center">
                                            <p className=" text-[#005BEA]">
                                                Inner Plastering:
                                            </p>
                                            <p className="">
                                                { selectedMasonData.mason_inner_plastering }
                                            </p>
                                        </div>

                                        <div className="flex gap-2 items-center">
                                            <p className=" text-[#005BEA]">
                                                Inner plastering Amount :
                                            </p>
                                            <IndianRupee size={16} />
                                            <p className="">
                                                { parseFloat(selectedMasonData.mason_inner_plastering_amount).toLocaleString('en-IN') }
                                            </p>
                                        </div>

                                        <hr className="border border-[#A9C1EA]" />

                                        <div className="flex gap-2 item-center">
                                            <p className=" text-[#005BEA]">
                                                Septic Tank :
                                            </p>
                                            <p className="">
                                                { selectedMasonData.mason_septic_tank }
                                            </p>
                                        </div>

                                        <div className="flex gap-2 items-center">
                                            <p className=" text-[#005BEA]">
                                                Septic Tank Amount :
                                            </p>
                                            <IndianRupee size={16} />
                                            <p className="text-md">
                                                { parseFloat(selectedMasonData.mason_septic_tank_amount).toLocaleString('en-IN') }
                                            </p>
                                        </div>
                                    </div>
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

                                            selectedMasonData?.items?.map((item, idx) => (

                                               <div key={ idx }>
                                                   <div className="flex gap-2 items-center">
                                                       <p className="text-[#005BEA]">
                                                           Name :
                                                       </p>
                                                       <p className="">
                                                           { item.mason_item_name }
                                                       </p>
                                                   </div>
                                                   <div className="flex gap-2 items-center">
                                                       <p className="text-[#005BEA]">
                                                           Remarks :
                                                       </p>
                                                       <p className="">
                                                           { item.mason_item_remarks }
                                                       </p>
                                                   </div>
                                                   <div className="flex gap-2 items-center">
                                                       <p className="text-[#005BEA]">
                                                           Amount :
                                                       </p>
                                                       <IndianRupee size={16} />
                                                       <p className="">
                                                           { parseFloat(item.mason_item_amount).toLocaleString('en-IN') }
                                                       </p>
                                                   </div>
                                                   <hr className="border border-[#A9C1EA] my-2" />
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

                                                { parseFloat(TotalMasonItem).toLocaleString('en-IN') || 0}
                                            </p>

                                        </motion.div>

                                    </div>



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
                                                    { parseFloat(selectedMasonData?.mason_s_gst_percent).toFixed(2) }%
                                                </p>
                                            </div>
                                            <div className="flex items-center">
                                                <p className="text-[#005BEA]">
                                                    SGST Amount :
                                                </p>
                                                <IndianRupee size={16} />
                                                <p>
                                                    { parseFloat(selectedMasonData?.mason_s_gst_amount).toLocaleString('en-IN') }
                                                </p>
                                            </div>

                                            <hr className="border border-[#A9C1EA] my-2" />

                                            <div className="flex items-center">
                                                <p className="text-[#005BEA]">
                                                    CGST Percent :
                                                </p>
                                                <p>
                                                    { parseFloat(selectedMasonData?.mason_c_gst_percent).toFixed(2) }%
                                                </p>
                                            </div>
                                            <div className="flex items-center">
                                                <p className="text-[#005BEA]">
                                                    CGST Amount :
                                                </p>
                                                <IndianRupee size={16} />
                                                <p>
                                                    { parseFloat(selectedMasonData?.mason_c_gst_amount).toLocaleString('en-IN') }
                                                </p>
                                            </div>

                                            <hr className="border border-[#A9C1EA] my-2" />

                                            <div className="flex items-center">
                                                <p className="text-[#005BEA]">
                                                    IGST Percent :
                                                </p>
                                                <p>
                                                    { parseFloat(selectedMasonData?.mason_i_gst_percent).toFixed(2) }%
                                                </p>
                                            </div>
                                            <div className="flex items-center">
                                                <p className="text-[#005BEA]">
                                                    IGST Amount :
                                                </p>
                                                <IndianRupee size={16} />
                                                <p>
                                                    { parseFloat(selectedMasonData?.mason_i_gst_amount).toLocaleString('en-IN') }
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
                                            Total Mason Cost After Tax :
                                        </p>
                                        <p className="flex justify-center items-center text-md">
                                            <IndianRupee size={20} />
                                            { parseFloat(SelectedProject?.total_mason_cost).toLocaleString('en-IN') }
                                        </p>
                                    </motion.div>
                                </div>
                            </div>
                        </motion.div>


                    </div>

                )

            }


            {/* View Modal For Centering */}
            {

                isViewCenteringModalOpen && selectedCentringData

                &&

                (

                    <div className="fixed inset-0 bg-[#202020]/50 flex items-center justify-center blur-20 backdrop-blur-xs z-50">
                        <motion.div initial={{ opacity: 0, x: 100, y: 100, rotate: 10 }}
                                    animate={{ opacity: 1, x: 0, y: 0, rotate: 0 }}
                                    transition={{delay: 0.2, type: "spring", stiffness: 200}} className="bg-[#F1F1F1] rounded w-11/12 h-9/10 md:w-1/2 lg:w-1/2 shadow-xl overflow-y-auto scroll-smooth">
                            <div className="sticky top-0 flex justify-between items-center bg-[#D9E1EF] rounded p-4 z-20">
                                <h2 className="flex gap-2 items-center text-xl text-[#005BEA]">
                                    <div className="flex items-center gap-2 ">
                                        <ChevronUp />
                                    </div>
                                    Centering - {selectedCentringData.centering_name}
                                </h2>
                                <button onClick={() => setIsViewCenteringModalOpen(false)} className="cursor-pointer text-gray-500 hover:text-gray-700">
                                    <X />
                                </button>
                            </div>

                            {/*Main Content*/}
                            <div className="grid gap-4 m-2">

                                <div className="grid gap-2 border-1 border-[#A9C1EA] rounded p-2">
                                    <motion.div
                                        initial={{ opacity: 0, y: 100 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{delay: 0.2, type: "spring", stiffness: 200}}
                                        className="grid justify-start item-center border border-[#A9C1EA] rounded"
                                    >
                                        <div className="flex gap-2">
                                            <div className="flex justify-center items-center bg-[#C9D8F3] text-[#005BEA] rounded px-4">
                                                <ChevronUp />
                                            </div>
                                            <div className="flex items-center gap-4 px-2 py-4">
                                                <p className="text-xl text-[#005BEA]">
                                                    Centering Details
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
                                                { selectedCentringData?.centering_name }
                                            </p>
                                        </div>
                                        <div className="flex gap-2 items-center">
                                            <p className=" text-[#005BEA]">
                                                Phone No :
                                            </p>
                                            <p>
                                                { selectedCentringData?.centering_phone }
                                            </p>
                                        </div>

                                        <div className="flex gap-2 items-center">
                                            <p className=" text-[#005BEA]">
                                                Cost Per Sqft :
                                            </p>

                                            <p className="flex justify-center items-center">
                                                <IndianRupee size={16} />
                                                { parseFloat(selectedCentringData?.centering_contract).toLocaleString('en-IN') }
                                            </p>
                                        </div>

                                        <div className="flex flex-wrap gap-2 items-center">
                                            <p className="text-[#005BEA]">
                                                Address :
                                            </p>
                                            <p>
                                                { selectedCentringData?.centering_address }
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
                                            Total Centering Cost :
                                        </p>
                                        <p className="flex justify-center items-center text-md">
                                            <IndianRupee size={20} />
                                            { parseFloat(selectedCentringData?.centering_contract_amount).toLocaleString('en-IN') }
                                        </p>
                                    </motion.div>
                                    <motion.div
                                        initial={{ opacity: 0, y: 100 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{delay: 0.2, type: "spring", stiffness: 200}}
                                        className="grid justify-start items-center border border-[#A9C1EA] rounded"
                                    >
                                        <div className="flex flex-cols-2 gap-2">
                                            <div className="flex justify-center items-center bg-[#C9D8F3] text-[#005BEA] rounded px-4">
                                                <InspectionPanel />
                                            </div>
                                            <div className="flex items-center gap-4 px-2 py-4">
                                                <p className="text-xl text-[#005BEA]">
                                                    Centering
                                                </p>
                                            </div>
                                        </div>

                                    </motion.div>
                                    <div className="grid gap-2 border border-[#A9C1EA] rounded p-4">


                                        <div className="flex gap-2 items-center">
                                            <p className="text-[#005BEA]">
                                                Footing Ground :
                                            </p>
                                            <p className="">
                                                { selectedCentringData.footing_ground}
                                            </p>
                                        </div>


                                        <div className="flex gap-2 items-center">
                                            <p className=" text-[#005BEA]">
                                                Footing Ground Amount :
                                            </p>
                                            <IndianRupee size={16} />
                                            <p className="">
                                                { parseFloat(selectedCentringData.footing_ground_amount).toLocaleString('en-IN') }
                                            </p>
                                        </div>

                                        <hr className="border border-[#A9C1EA]" />

                                        <div className="flex flex-wrap gap-2 item-center">
                                            <p className=" text-[#005BEA]">
                                                Plinth Beam :
                                            </p>
                                            <p className="">
                                                { selectedCentringData.plinth_beam }
                                            </p>
                                        </div>

                                        <div className="flex gap-2 item-center">
                                            <p className=" text-[#005BEA]">
                                                Plinth beam Amount :
                                            </p>
                                            <p className="flex justify-center item-center ">
                                                <IndianRupee size={16} />
                                                { parseFloat(selectedCentringData.plinth_beam_amount).toLocaleString('en-IN') }
                                            </p>
                                        </div>

                                        <hr className="border border-[#A9C1EA]" />

                                        <div className="flex gap-2 items-center">
                                            <p className=" text-[#005BEA]">
                                                3 Feet Basement Column :
                                            </p>
                                            <p className="">
                                                { selectedCentringData.basement_column}
                                            </p>
                                        </div>


                                        <div className="flex gap-2 items-center">
                                            <p className=" text-[#005BEA]">
                                                3 Feet Basement Column Amount :
                                            </p>
                                            <IndianRupee size={16} />
                                            <p className="">
                                                { parseFloat(selectedCentringData.basement_column_amount).toLocaleString('en-IN') }
                                            </p>
                                        </div>

                                        <hr className="border border-[#A9C1EA]" />

                                        <div className="flex gap-2 item-center">
                                            <p className=" text-[#005BEA]">
                                                Outer Plastering:
                                            </p>
                                            <p className="">
                                                { selectedCentringData.outer_plastering }
                                            </p>
                                        </div>

                                        <div className="flex gap-2 item-center">
                                            <p className=" text-[#005BEA]">
                                                Outer Plastering Amount:
                                            </p>
                                            <p className="flex justify-center item-center ">
                                                <IndianRupee size={16} />
                                                { parseFloat(selectedCentringData.outer_plastering_amount).toLocaleString('en-IN') }
                                            </p>
                                        </div>

                                        <hr className="border border-[#A9C1EA]" />

                                        <div className="flex gap-2 items-center">
                                            <p className=" text-[#005BEA]">
                                                7 Feet Column:
                                            </p>
                                            <p className="">
                                                { selectedCentringData.feet_column }
                                            </p>
                                        </div>

                                        <div className="flex gap-2 items-center">
                                            <p className=" text-[#005BEA]">
                                                7 Feet Column Amount :
                                            </p>
                                            <IndianRupee size={16} />
                                            <p className="">
                                                { parseFloat(selectedCentringData.feet_column_amount).toLocaleString('en-IN') }
                                            </p>
                                        </div>

                                        <hr className="border border-[#A9C1EA]" />

                                        <div className="flex gap-2 item-center">
                                            <p className=" text-[#005BEA]">
                                                Lintel Beam :
                                            </p>
                                            <p className="">
                                                { selectedCentringData.lintel_beam }
                                            </p>
                                        </div>

                                        <div className="flex gap-2 items-center">
                                            <p className=" text-[#005BEA]">
                                                Lintel Beam Amount :
                                            </p>
                                            <IndianRupee size={16} />
                                            <p className="text-md">
                                                { parseFloat(selectedCentringData.lintel_beam_amount).toLocaleString('en-IN') }
                                            </p>
                                        </div>

                                        <hr className="border border-[#A9C1EA]" />

                                        <div className="flex gap-2 item-center">
                                            <p className=" text-[#005BEA]">
                                                3 Feet After Lintel Column :
                                            </p>
                                            <p className="">
                                                { selectedCentringData.after_lintel_column }
                                            </p>
                                        </div>

                                        <div className="flex gap-2 items-center">
                                            <p className=" text-[#005BEA]">
                                                3 Feet After Lintel Beam Amount :
                                            </p>
                                            <IndianRupee size={16} />
                                            <p className="text-md">
                                                { parseFloat(selectedCentringData.after_lintel_column_amount).toLocaleString('en-IN') }
                                            </p>
                                        </div>

                                        <hr className="border border-[#A9C1EA]" />

                                        <div className="flex gap-2 item-center">
                                            <p className=" text-[#005BEA]">
                                                Hide Beam :
                                            </p>
                                            <p className="">
                                                { selectedCentringData.hide_beam }
                                            </p>
                                        </div>

                                        <div className="flex gap-2 items-center">
                                            <p className=" text-[#005BEA]">
                                                Hide Beam Amount :
                                            </p>
                                            <IndianRupee size={16} />
                                            <p className="text-md">
                                                { parseFloat(selectedCentringData.hide_beam_amount).toLocaleString('en-IN') }
                                            </p>
                                        </div>



                                        <hr className="border border-[#A9C1EA]" />

                                        <div className="flex gap-2 item-center">
                                            <p className=" text-[#005BEA]">
                                                Roof :
                                            </p>
                                            <p className="">
                                                { selectedCentringData.centering_roof}
                                            </p>
                                        </div>

                                        <div className="flex gap-2 items-center">
                                            <p className=" text-[#005BEA]">
                                                Roof Amount :
                                            </p>
                                            <IndianRupee size={16} />
                                            <p className="text-md">
                                                { parseFloat(selectedCentringData.centering_roof_amount).toLocaleString('en-IN') }
                                            </p>
                                        </div>

                                        <hr className="border border-[#A9C1EA]" />

                                        <div className="flex gap-2 item-center">
                                            <p className=" text-[#005BEA]">
                                                Roof Beam :
                                            </p>
                                            <p className="">
                                                { selectedCentringData.roof_beam }
                                            </p>
                                        </div>

                                        <div className="flex gap-2 items-center">
                                            <p className=" text-[#005BEA]">
                                                Roof Beam Amount :
                                            </p>
                                            <IndianRupee size={16} />
                                            <p className="text-md">
                                                { parseFloat(selectedCentringData.roof_beam_amount).toLocaleString('en-IN') || 0 }
                                            </p>
                                        </div>

                                        <hr className="border border-[#A9C1EA]" />


                                    </div>
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

                                            selectedCentringData?.items?.length > 0

                                            ?

                                            selectedCentringData?.items?.map((item, idx) => (

                                                <div key={ idx }>
                                                    <div className="flex gap-2 items-center">
                                                        <p className="text-[#005BEA]">
                                                            Name :
                                                        </p>
                                                        <p className="">
                                                            { item.centering_item_name }
                                                        </p>
                                                    </div>
                                                    <div className="flex gap-2 items-center">
                                                        <p className="text-[#005BEA]">
                                                            Remarks :
                                                        </p>
                                                        <p className="">
                                                            { item.centering_item_remarks }
                                                        </p>
                                                    </div>
                                                    <div className="flex gap-2 items-center">
                                                        <p className="text-[#005BEA]">
                                                            Amount :
                                                        </p>
                                                        <IndianRupee size={16} />
                                                        <p className="">
                                                            { parseFloat(item.centering_item_amount).toLocaleString('en-IN') || 0}
                                                        </p>
                                                    </div>
                                                    <hr className="border border-[#A9C1EA] my-2" />



                                                </div>


                                            ))


                                            :

                                                (

                                                    <div className="flex flex-col gap-2 justify-center items-center text-[#005BEA]">


                                                        <Info  />


                                                        <p>

                                                            No Extra Charges

                                                        </p>



                                                    </div>

                                                )

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

                                                { parseFloat(TotalCentringItem).toLocaleString('en-IN') || 0 }
                                            </p>

                                        </motion.div>



                                    </div>


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

                                    {/* Tax */}
                                    <div className="grid gap-2 border border-[#A9C1EA] rounded p-4">
                                        <div className="flex items-center">
                                            <p className="text-[#005BEA]">
                                                SGST Percent :
                                            </p>
                                            <p>
                                                { parseFloat(selectedCentringData?.centering_s_gst_percent).toFixed(2) }%
                                            </p>
                                        </div>
                                        <div className="flex items-center">
                                            <p className="text-[#005BEA]">
                                                SGST Amount :
                                            </p>
                                            <IndianRupee size={16} />
                                            <p>
                                                { parseFloat(selectedCentringData?.centering_s_gst_amount).toLocaleString('en-IN') }
                                            </p>
                                        </div>

                                        <hr className="border border-[#A9C1EA] my-2" />

                                        <div className="flex items-center">
                                            <p className="text-[#005BEA]">
                                                CGST Percent :
                                            </p>
                                            <p>
                                                { parseFloat(selectedCentringData?.centering_c_gst_percent).toFixed(2) }%
                                            </p>
                                        </div>
                                        <div className="flex items-center">
                                            <p className="text-[#005BEA]">
                                                CGST Amount :
                                            </p>
                                            <IndianRupee size={16} />
                                            <p>
                                                { parseFloat(selectedCentringData?.centering_c_gst_amount).toLocaleString('en-IN') }
                                            </p>
                                        </div>

                                        <hr className="border border-[#A9C1EA] my-2" />

                                        <div className="flex items-center">
                                            <p className="text-[#005BEA]">
                                                IGST Percent :
                                            </p>
                                            <p>
                                                { parseFloat(selectedCentringData?.centering_i_gst_percent).toFixed(2) }%
                                            </p>
                                        </div>
                                        <div className="flex items-center">
                                            <p className="text-[#005BEA]">
                                                IGST Amount :
                                            </p>
                                            <IndianRupee size={16} />
                                            <p>
                                                { parseFloat(selectedCentringData?.centering_i_gst_amount).toLocaleString('en-IN') }
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
                                            Total Centering Cost After Tax :
                                        </p>
                                        <p className="flex justify-center items-center text-md">
                                            <IndianRupee size={20} />
                                            { parseFloat(SelectedProject?.total_centering_cost).toLocaleString('en-IN') }
                                        </p>
                                    </motion.div>
                                </div>
                            </div>
                        </motion.div>


                    </div>

                )

            }

            {/* View Modal For Plumbing */}
            {

                isViewPlumbingModalOpen && selectedPlumbingData

                &&

                (

                    <div className="fixed inset-0 bg-[#202020]/50 flex items-center justify-center blur-20 backdrop-blur-xs z-50">
                        <motion.div initial={{ opacity: 0, x: 100, y: 100, rotate: 10 }}
                                    animate={{ opacity: 1, x: 0, y: 0, rotate: 0 }}
                                    transition={{delay: 0.2, type: "spring", stiffness: 200}} className="bg-[#F1F1F1] rounded w-11/12 h-9/10 md:w-1/2 lg:w-1/2 shadow-xl overflow-y-auto scroll-smooth">

                            <div className="sticky top-0 flex justify-between items-center bg-[#D9E1EF] rounded p-4 z-20">
                                <h2 className="flex gap-2 items-center text-xl text-[#005BEA]">
                                    <div className="flex items-center gap-2 ">
                                        <AudioWaveform />
                                    </div>
                                    Plumbing - {selectedPlumbingData.plumbing_name}
                                </h2>
                                <button onClick={() => setIsViewPlumbingModalOpen(false)} className="cursor-pointer text-gray-500 hover:text-gray-700">
                                    <X />
                                </button>
                            </div>

                            <LabourViewUI DetailsIcon={ <AudioWaveform /> }
                                          DetailsTitle={"Plumbing"}
                                          name={selectedPlumbingData.plumbing_name}
                                          phone={`+91 ${selectedPlumbingData.plumbing_phone}`}
                                          costPerSQFT={selectedPlumbingData.plumbing_contract}
                                          address={selectedPlumbingData.plumbing_address}
                                          TotalContractBFT ={selectedPlumbingData.plumbing_contract_amount}
                                          ExtraCharges={selectedPlumbingData.items}
                                          TotalExtraCharges={TotalPlumbingItem}
                                          ItemTitle={"plumbing"}
                                          SGSTPercent={selectedPlumbingData.plumbing_s_gst_percent}
                                          SGSTAmt={selectedPlumbingData.plumbing_s_gst_amount}
                                          CGSTPercent={selectedPlumbingData.plumbing_c_gst_percent}
                                          CGSTAmt={selectedPlumbingData.plumbing_c_gst_amount}
                                          IGSTPercent={selectedPlumbingData.plumbing_i_gst_percent}
                                          IGSTAmt={selectedPlumbingData.plumbing_i_gst_amount}
                                          TotalContractAFT={SelectedProject?.total_plumbing_cost}
                            />

                        </motion.div>


                    </div>

                )

            }
            {/* View Modal For Electrical */}
            {

                isViewElectricalModalOpen && selectedElectricalData

                &&

                (

                    <div className="fixed inset-0 bg-[#202020]/50 flex items-center justify-center blur-20 backdrop-blur-xs z-50">
                        <motion.div initial={{ opacity: 0, x: 100, y: 100, rotate: 10 }}
                                    animate={{ opacity: 1, x: 0, y: 0, rotate: 0 }}
                                    transition={{delay: 0.2, type: "spring", stiffness: 200}} className="bg-[#F1F1F1] rounded w-11/12 h-9/10 md:w-1/2 lg:w-1/2 shadow-xl overflow-y-auto scroll-smooth">

                            <div className="sticky top-0 flex justify-between items-center bg-[#D9E1EF] rounded p-4 z-20">
                                <h2 className="flex gap-2 items-center text-xl text-[#005BEA]">
                                    <div className="flex items-center gap-2 ">
                                        <Plug />
                                    </div>
                                    Electrician - {selectedElectricalData.electrical_name}
                                </h2>
                                <button onClick={() => setIsViewElectricalModalOpen(false)} className="cursor-pointer text-gray-500 hover:text-gray-700">
                                    <X />
                                </button>
                            </div>

                            <LabourViewUI DetailsIcon={ <Plug /> }
                                          DetailsTitle={"Electrician"}
                                          name={ selectedElectricalData.electrical_name }
                                          phone={`+91 ${selectedElectricalData.electrical_phone}`}
                                          costPerSQFT={selectedElectricalData.electrical_contract}
                                          address={selectedElectricalData.electrical_address}
                                          TotalContractBFT={selectedElectricalData.electrical_contract_amount}
                                          ExtraCharges={selectedElectricalData.items}
                                          TotalExtraCharges={TotalElectricalItem}
                                          SGSTPercent={selectedElectricalData.electrical_s_gst_percent}
                                          SGSTAmt={selectedElectricalData.electrical_s_gst_amount}
                                          CGSTPercent={selectedElectricalData.electrical_c_gst_percent}
                                          CGSTAmt={selectedElectricalData.electrical_c_gst_amount}
                                          IGSTPercent={selectedElectricalData.electrical_i_gst_percent}
                                          IGSTAmt={selectedElectricalData.electrical_i_gst_amount}
                                          TotalContractAFT={SelectedProject?.total_electrical_cost}
                            />

                        </motion.div>


                    </div>

                )

            }

            {/* View Modal For Tiles */}
            {

                isViewTilesModalOpen && selectedTilesData

                &&

                (

                    <div className="fixed inset-0 bg-[#202020]/50 flex items-center justify-center blur-20 backdrop-blur-xs z-50">
                        <motion.div initial={{ opacity: 0, x: 100, y: 100, rotate: 10 }}
                                    animate={{ opacity: 1, x: 0, y: 0, rotate: 0 }}
                                    transition={{delay: 0.2, type: "spring", stiffness: 200}} className="bg-[#F1F1F1] rounded w-11/12 h-9/10 md:w-1/2 lg:w-1/2 shadow-xl overflow-y-auto scroll-smooth">

                            <div className="sticky top-0 flex justify-between items-center bg-[#D9E1EF] rounded p-4 z-20">
                                <h2 className="flex gap-2 items-center text-xl text-[#005BEA]">
                                    <div className="flex items-center gap-2 ">
                                        <SquareStack />
                                    </div>
                                    Tiles - {selectedTilesData.tiles_name}
                                </h2>
                                <button onClick={() => setIsViewTilesModalOpen(false)} className="cursor-pointer text-gray-500 hover:text-gray-700">
                                    <X />
                                </button>
                            </div>

                            <LabourViewUI DetailsIcon={ <SquareStack /> }
                                          DetailsTitle={"Tiles"}
                                          name={ selectedTilesData.tiles_name }
                                          phone={`+91 ${selectedTilesData.tiles_phone}`}
                                          costPerSQFT={selectedTilesData.tiles_contract}
                                          address={selectedTilesData.tiles_address}
                                          TotalContractBFT={selectedTilesData.tiles_contract_amount}
                                          ExtraCharges={selectedTilesData.items}
                                          TotalExtraCharges={TotalTilesItem}
                                          SGSTPercent={selectedTilesData.tiles_s_gst_percent}
                                          SGSTAmt={selectedTilesData.tiles_s_gst_amount}
                                          CGSTPercent={selectedTilesData.tiles_c_gst_percent}
                                          CGSTAmt={selectedTilesData.tiles_c_gst_amount}
                                          IGSTPercent={selectedTilesData.tiles_i_gst_percent}
                                          IGSTAmt={selectedTilesData.tiles_i_gst_amount}
                                          TotalContractAFT={SelectedProject?.total_tiles_cost}
                            />

                        </motion.div>


                    </div>

                )

            }

            {/* View Modal For Carpenter */}
            {

                isViewCarpenterModalOpen && selectedCarpenterData

                &&

                (

                    <div className="fixed inset-0 bg-[#202020]/50 flex items-center justify-center blur-20 backdrop-blur-xs z-50">
                        <motion.div initial={{ opacity: 0, x: 100, y: 100, rotate: 10 }}
                                    animate={{ opacity: 1, x: 0, y: 0, rotate: 0 }}
                                    transition={{delay: 0.2, type: "spring", stiffness: 200}} className="bg-[#F1F1F1] rounded w-11/12 h-9/10 md:w-1/2 lg:w-1/2 shadow-xl overflow-y-auto scroll-smooth">

                            <div className="sticky top-0 flex justify-between items-center bg-[#D9E1EF] rounded p-4 z-20">
                                <h2 className="flex gap-2 items-center text-xl text-[#005BEA]">
                                    <div className="flex items-center gap-2 ">
                                        <Axe />
                                    </div>
                                    Carpenter - {selectedCarpenterData.carpenter_name}
                                </h2>
                                <button onClick={() => setIsViewCarpenterModalOpen(false)} className="cursor-pointer text-gray-500 hover:text-gray-700">
                                    <X />
                                </button>
                            </div>

                            <LabourViewUI DetailsIcon={ <Axe /> }
                                          DetailsTitle={"Carpenter"}
                                          name={ selectedCarpenterData.carpenter_name }
                                          phone={`+91 ${selectedCarpenterData.carpenter_phone}`}
                                          costPerSQFT={selectedCarpenterData.carpenter_contract}
                                          address={selectedCarpenterData.carpenter_address}
                                          TotalContractBFT={selectedCarpenterData.carpenter_contract_amount}
                                          ExtraCharges={selectedCarpenterData.items}
                                          TotalExtraCharges={TotalCarpenterItem}
                                          SGSTPercent={selectedCarpenterData.carpenter_s_gst_percent}
                                          SGSTAmt={selectedCarpenterData.carpenter_s_gst_amount}
                                          CGSTPercent={selectedCarpenterData.carpenter_c_gst_percent}
                                          CGSTAmt={selectedCarpenterData.carpenter_c_gst_amount}
                                          IGSTPercent={selectedCarpenterData.carpenter_i_gst_percent}
                                          IGSTAmt={selectedCarpenterData.carpenter_i_gst_amount}
                                          TotalContractAFT={SelectedProject?.total_carpenter_cost}
                            />

                        </motion.div>


                    </div>

                )

            }
            {/* View Modal For Painter */}
            {

                isViewPainterModalOpen && selectedPainterData

                &&

                (

                    <div className="fixed inset-0 bg-[#202020]/50 flex items-center justify-center blur-20 backdrop-blur-xs z-50">
                        <motion.div initial={{ opacity: 0, x: 100, y: 100, rotate: 10 }}
                                    animate={{ opacity: 1, x: 0, y: 0, rotate: 0 }}
                                    transition={{delay: 0.2, type: "spring", stiffness: 200}} className="bg-[#F1F1F1] rounded w-11/12 h-9/10 md:w-1/2 lg:w-1/2 shadow-xl overflow-y-auto scroll-smooth">

                            <div className="sticky top-0 flex justify-between items-center bg-[#D9E1EF] rounded p-4 z-20">
                                <h2 className="flex gap-2 items-center text-xl text-[#005BEA]">
                                    <div className="flex items-center gap-2 ">
                                        <PaintRoller />
                                    </div>
                                    Painter - {selectedPainterData.painter_name}
                                </h2>
                                <button onClick={() => setIsViewPainterModalOpen(false)} className="cursor-pointer text-gray-500 hover:text-gray-700">
                                    <X />
                                </button>
                            </div>

                            <LabourViewUI DetailsIcon={ <PaintRoller /> }
                                          DetailsTitle={"Painter"}
                                          name={ selectedPainterData.painter_name }
                                          phone={`+91 ${selectedPainterData.painter_phone}`}
                                          costPerSQFT={selectedPainterData.painter_contract}
                                          address={selectedPainterData.painter_address}
                                          TotalContractBFT={selectedPainterData.painter_contract_amount}
                                          ExtraCharges={selectedCarpenterData.items}
                                          TotalExtraCharges={TotalPainterItem}
                                          SGSTPercent={selectedPainterData.painter_s_gst_percent}
                                          SGSTAmt={selectedPainterData.painter_s_gst_amount}
                                          CGSTPercent={selectedPainterData.painter_c_gst_percent}
                                          CGSTAmt={selectedPainterData.painter_c_gst_amount}
                                          IGSTPercent={selectedPainterData.painter_i_gst_percent}
                                          IGSTAmt={selectedPainterData.painter_i_gst_amount}
                                          TotalContractAFT={SelectedProject?.total_painter_cost}
                            />

                        </motion.div>


                    </div>

                )

            }

            {/* View Modal For Other Labour */}
            {

                isViewOtherModalOpen && selectedOtherData

                &&

                (

                    <div className="fixed inset-0 bg-[#202020]/50 flex items-center justify-center blur-20 backdrop-blur-xs z-50">
                        <motion.div initial={{ opacity: 0, x: 100, y: 100, rotate: 10 }}
                                    animate={{ opacity: 1, x: 0, y: 0, rotate: 0 }}
                                    transition={{delay: 0.2, type: "spring", stiffness: 200}} className="bg-[#F1F1F1] rounded w-11/12 h-9/10 md:w-1/2 lg:w-1/2 shadow-xl overflow-y-auto scroll-smooth">

                            <div className="sticky top-0 flex justify-between items-center bg-[#D9E1EF] rounded p-4 z-20">
                                <h2 className="flex gap-2 items-center text-xl text-[#005BEA]">
                                    <div className="flex items-center gap-2 ">
                                        <Sparkle />
                                    </div>
                                    Other Labour - {selectedOtherData.other_name}
                                </h2>
                                <button onClick={() => setIsViewOtherModalOpen(false)} className="cursor-pointer text-gray-500 hover:text-gray-700">
                                    <X />
                                </button>
                            </div>

                            <LabourViewUI DetailsIcon={ <SquareStack /> }
                                          DetailsTitle={"Other Labours"}
                                          name={ selectedOtherData.other_name }
                                          phone={`+91 ${selectedOtherData.other_phone}`}
                                          costPerSQFT={selectedOtherData.other_contract}
                                          address={selectedOtherData.other_address}
                                          TotalContractBFT={selectedOtherData.other_contract_amount}
                                          ExtraCharges={selectedOtherData.items}
                                          TotalExtraCharges={TotalOtherItem}
                                          SGSTPercent={selectedOtherData.other_s_gst_percent}
                                          SGSTAmt={selectedOtherData.other_s_gst_amount}
                                          CGSTPercent={selectedOtherData.other_c_gst_percent}
                                          CGSTAmt={selectedOtherData.other_c_gst_amount}
                                          IGSTPercent={selectedOtherData.other_i_gst_percent}
                                          IGSTAmt={selectedOtherData.other_i_gst_amount}
                                          TotalContractAFT={SelectedProject?.total_other_cost}
                            />

                        </motion.div>
                    </div>

                )

            }

            {/* -- Edit Labour ----------------------------------------------------------------------------------------- */}

            {/* Edit Mason */}
            {

                isOpenEditMasonModal && selectedMasonData

                &&

                (

                    <div className="fixed inset-0 bg-[#202020]/50 flex items-center justify-center blur-20 backdrop-blur-xs z-50">
                        <motion.div initial={{ opacity: 0, x: 100, y: 100, rotate: 10 }}
                                    animate={{ opacity: 1, x: 0, y: 0, rotate: 0 }}
                                    transition={{delay: 0.2, type: "spring", stiffness: 200}} className="bg-[#F1F1F1] rounded w-11/12 h-9/10 md:w-1/2 lg:w-1/2 shadow-xl overflow-y-auto scroll-smooth">

                            <div className="sticky top-0 flex justify-between items-center bg-[#D9E1EF] rounded p-4 z-20">
                                <h2 className="flex gap-2 items-center text-xl text-[#005BEA]">
                                    <div className="flex items-center gap-2 ">
                                        <SquarePen />
                                    </div>
                                    Edit Mason - {selectedMasonData.mason_name}
                                </h2>
                                <button onClick={() => setIsOpenEditMasonModal(false)} className="cursor-pointer text-gray-500 hover:text-gray-700">
                                    <X />
                                </button>
                            </div>

                            <form className="grid border border-[#A9C1EA] p-2 m-2">
                                <div className="grid-cols-1 gap-10">
                                    <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 my-4 gap-6">
                                        <motion.label
                                            initial={{opacity: 0, y: 100}}
                                            animate={{opacity: 1, y: 0}}
                                            transition={{delay: 0.4}}
                                            className="grid" htmlFor="name">
                                            <span className="mx-2">Mason Name</span>
                                            <input
                                                type="text"
                                                value={formData.mason_master.mason_name}
                                                onChange={(e) => setFormData({...formData, mason_master: { ...formData.mason_master, mason_name: e.target.value }})}
                                                className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                                placeholder="Enter the Name"
                                            />
                                        </motion.label>
                                        <motion.label
                                            initial={{opacity: 0, y: 100}}
                                            animate={{opacity: 1, y: 0}}
                                            transition={{delay: 0.5}}
                                            className="grid" htmlFor="phone">
                                            <span className="mx-2">Phone</span>
                                            <input type="text"
                                                   value={formData.mason_master.mason_phone}
                                                   onChange={(e) => setFormData({...formData, mason_master: { ...formData.mason_master, mason_phone: e.target.value }})}
                                                   className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded  p-4"
                                                   placeholder="Enter the Phone No" />
                                        </motion.label>
                                        <motion.label
                                            initial={{opacity: 0, y: 100}}
                                            animate={{opacity: 1, y: 0}}
                                            transition={{delay: 0.6}}
                                            className="grid" htmlFor="address">
                                            <span className="mx-2">Address</span>
                                            <input type="text"
                                                   value={formData.mason_master.mason_address}
                                                   onChange={(e) =>
                                                       setFormData(
                                                           {...formData,
                                                               mason_master: { ...formData.mason_master,
                                                                   mason_address: e.target.value }})}
                                                   className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                                   placeholder="Enter the Address" />
                                        </motion.label>
                                        <motion.label
                                            initial={{opacity: 0, y: 100}}
                                            animate={{opacity: 1, y: 0}}
                                            transition={{delay: 0.7}}
                                            className="grid" htmlFor="Labour">
                                            <span className="mx-2">Mason cost per sqft</span>
                                            <input name="text"
                                                   value={formData.mason_master.mason_contract}
                                                   onChange={(e) =>
                                                       setFormData({
                                                           ...formData,
                                                           mason_master: {
                                                               ...formData.mason_master,
                                                               mason_contract: e.target.value,
                                                           },
                                                       })
                                                   }
                                                   className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                                   id="role" placeholder="Enter Per Sqft"/>
                                        </motion.label>

                                        <motion.label
                                            initial={{opacity: 0, y: 100}}
                                            animate={{opacity: 1, y: 0}}
                                            transition={{delay: 0.8}}
                                            className="grid" htmlFor="Cotract">
                                            <span className="mx-2">Total Contract Amount</span>
                                            <input name="text"
                                                   readOnly={true}
                                                   value={formData.mason_master.mason_contract_amount}
                                                   onChange={(e) =>
                                                       setFormData({...formData, mason_master: {
                                                               ...formData.mason_master,
                                                               mason_contract_amount: e.target.value
                                                           }})}
                                                   className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                                   id="role" placeholder="Enter the Amount"/>
                                        </motion.label>
                                    </div>

                                    <motion.div
                                        initial={{ opacity: 0, y: 100 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{delay: 0.2, type: "spring", stiffness: 200}}
                                        className="flex  justify-between items-center border border-[#A9C1EA] rounded p-4"
                                    >
                                        <p className="text-[#005BEA]">
                                            Total Mason Cost :
                                        </p>
                                        <p className="flex justify-center items-center text-md">
                                            <IndianRupee size={20} />
                                            { parseFloat(formData.mason_master.mason_contract_amount).toLocaleString('en-IN') }
                                        </p>
                                    </motion.div>

                                    <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1 my-6 gap-6">
                                        <motion.label
                                            initial={{opacity: 0, y: 100}}
                                            animate={{opacity: 1, y: 0}}
                                            transition={{delay: 0.9}}
                                            className="grid" htmlFor="basement">
                                            <span className="mx-2">Basement</span>
                                            <div className="grid grid-cols-1 md:flex lg:flex xl:flex gap-4">
                                                <input type="text"
                                                       value={formData.mason_master.mason_basement}
                                                       onChange={(e) => setFormData({...formData, mason_master: { ...formData.mason_master, mason_basement: e.target.value }})}
                                                       className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                                       placeholder="Enter the Remarks" />
                                                <input type="text"
                                                       value={formData.mason_master.mason_basement_amount}
                                                       onChange={(e) => setFormData({...formData, mason_master: { ...formData.mason_master, mason_basement_amount: e.target.value }})}
                                                       className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                                       placeholder="Amount" />
                                            </div>
                                        </motion.label>
                                        <motion.label
                                            initial={{opacity: 0, y: 100}}
                                            animate={{opacity: 1, y: 0}}
                                            transition={{delay: 1.0}}
                                            className="grid" htmlFor="lintel">
                                            <span className="mx-2">Lintel</span>
                                            <div className="grid grid-cols-1 md:flex lg:flex xl:flex gap-4">
                                                <input type="text"
                                                       value={formData.mason_master.mason_lintel}
                                                       onChange={(e) =>
                                                           setFormData({...formData, mason_master: { ...formData.mason_master, mason_lintel: e.target.value }})}
                                                       className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                                       placeholder="Enter the Remarks" />
                                                <input type="text"
                                                       value={formData.mason_master.mason_lintel_amount}
                                                       onChange={(e) =>
                                                           setFormData({
                                                               ...formData, mason_master: {
                                                                   ...formData.mason_master,
                                                                   mason_lintel_amount: e.target.value
                                                               }})}
                                                       className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                                       placeholder="Amount" />
                                            </div>
                                        </motion.label>
                                        <motion.label
                                            initial={{opacity: 0, y: 100}}
                                            animate={{opacity: 1, y: 0}}
                                            transition={{delay: 1.1}}
                                            className="grid" htmlFor="roof">
                                            <span className="mx-2">Roof</span>
                                            <div className="grid grid-cols-1 md:flex lg:flex xl:flex gap-4">
                                                <input type="text"
                                                       value={formData.mason_master.mason_roof}
                                                       onChange={(e) => setFormData({...formData, mason_master: { ...formData.mason_master, mason_roof: e.target.value }})}
                                                       className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                                       placeholder="Enter the Remarks" />
                                                <input type="text"
                                                       value={formData.mason_master.mason_roof_amount}
                                                       onChange={(e) => setFormData({...formData, mason_master: { ...formData.mason_master, mason_roof_amount: e.target.value }})}
                                                       className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                                       placeholder="Amount" />
                                            </div>
                                        </motion.label>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1 my-6 gap-6">
                                        <motion.label
                                            initial={{opacity: 0, y: 100}}
                                            animate={{opacity: 1, y: 0}}
                                            transition={{delay: 1.2}}
                                            className="grid" htmlFor="outer">
                                            <span className="mx-2">Outer Plastering</span>
                                            <div className="grid grid-cols-1 md:flex lg:flex xl:flex gap-4">
                                                <input type="text"
                                                       value={formData.mason_master.mason_outer_plastering}
                                                       onChange={(e) => setFormData({...formData, mason_master: { ...formData.mason_master, mason_outer_plastering: e.target.value }})}
                                                       className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                                       placeholder="Enter the Remarks" />
                                                <input type="text"
                                                       value={formData.mason_master.mason_outer_plastering_amount}
                                                       onChange={(e) => setFormData({...formData, mason_master: { ...formData.mason_master, mason_outer_plastering_amount: e.target.value }})}
                                                       className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                                       placeholder="Amount" />
                                            </div>
                                        </motion.label>
                                        <motion.label
                                            initial={{opacity: 0, y: 100}}
                                            animate={{opacity: 1, y: 0}}
                                            transition={{delay: 1.3}}
                                            className="grid" htmlFor="innerr">
                                            <span className="mx-2">Inner Plastering</span>
                                            <div className="grid grid-cols-1 md:flex lg:flex xl:flex gap-4">
                                                <input type="text"
                                                       value={formData.mason_master.mason_inner_plastering}
                                                       onChange={(e) => setFormData({...formData, mason_master: { ...formData.mason_master, mason_inner_plastering: e.target.value }})}
                                                       className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                                       placeholder="Enter the Remarks" />
                                                <input type="text"
                                                       value={formData.mason_master.mason_inner_plastering_amount}
                                                       onChange={(e) => setFormData({...formData, mason_master: { ...formData.mason_master, mason_inner_plastering_amount: e.target.value }})}
                                                       className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                                       placeholder="Amount" />
                                            </div>
                                        </motion.label>
                                        <motion.label
                                            initial={{opacity: 0, y: 100}}
                                            animate={{opacity: 1, y: 0}}
                                            transition={{delay: 1.4}}
                                            className="grid" htmlFor="tank">
                                            <span className="mx-2">Septic Tank</span>
                                            <div className="grid grid-cols-1 md:flex lg:flex xl:flex gap-4">
                                                <input type="text"
                                                       value={formData.mason_master.mason_septic_tank}
                                                       onChange={(e) => setFormData({...formData, mason_master: { ...formData.mason_master, mason_septic_tank: e.target.value }})}
                                                       className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                                       placeholder="Enter the Remarks" />
                                                <input type="text"
                                                       value={formData.mason_master.mason_septic_tank_amount}
                                                       onChange={(e) => setFormData({...formData, mason_master: { ...formData.mason_master, mason_septic_tank_amount: e.target.value }})}
                                                       className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                                       placeholder="Amount" />
                                            </div>
                                        </motion.label>
                                    </div>


                                    <div className="py-6">
                                        <motion.button
                                            type="button"
                                            onClick={AddMasonEntry}
                                            className="flex border border-[#6392E5] bg-[#D9E1EF] text-[#005BEA]  hover:bg-[#C9D8F3] hover:border-[#6392E5] my-6 p-4 cursor-pointer rounded gap-2"
                                            initial={{opacity: 0, y: 100}}
                                            animate={{opacity: 1, y: 0}}
                                            transition={{delay: 0.6}}>
                                            <CircleFadingPlus/>
                                            Add Items
                                        </motion.button>

                                        {
                                            Array.isArray(formData.mason_master.mason_items)

                                            &&

                                            formData.mason_master.mason_items.map((item, index) =>

                                                (

                                                    <div key={index} className="">
                                                        <div className="border border-[#6392E5] p-6 rounded bg-[#F1F1F1] my-2">
                                                            <div className="grid md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-3 gap-6">
                                                                <motion.label
                                                                    initial={{opacity: 0, y: 100}}
                                                                    animate={{opacity: 1, y: 0}}
                                                                    transition={{delay: 0.6}}
                                                                    className="grid" htmlFor="beam">
                                                                    <span className="mx-2">Item Name</span>
                                                                    <div className="grid grid-cols-1 md:flex lg:flex xl:flex gap-4">
                                                                        <input type="text"
                                                                               value={item.mason_item_name}
                                                                               onChange={(e) => HandleMasonInputChange(index, 'mason_item_name', e.target.value)}
                                                                               className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                                                               placeholder="Enter Item Name"
                                                                        />
                                                                        <input type="text"
                                                                               value={item.mason_item_amount}
                                                                               onChange={(e) => HandleMasonInputChange(index, 'mason_item_amount', e.target.value)}
                                                                               className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                                                               placeholder="Amount"
                                                                        />
                                                                    </div>
                                                                </motion.label>
                                                                <motion.label
                                                                    initial={{opacity: 0, y: 100}}
                                                                    animate={{opacity: 1, y: 0}}
                                                                    transition={{delay: 0.6}}
                                                                    className="grid" htmlFor="remarks">
                                                                    <span className="mx-2">Remarks</span>
                                                                    <input type="text"
                                                                           value={item.mason_item_remarks}
                                                                           onChange={(e) => HandleMasonInputChange(index, 'mason_item_remarks', e.target.value)}
                                                                           className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                                                           placeholder="Enter any Remarks" />
                                                                </motion.label>
                                                                {
                                                                    formData.mason_master.mason_items.length > 1

                                                                    &&

                                                                    (
                                                                        <div>
                                                                            <span className="opacity-0">hello</span>
                                                                            <motion.button
                                                                                type="button"
                                                                                onClick={() => RemoveMasonEntry(index)}
                                                                                className="text-xl flex gap-2 items-center border border-red-400 text-red-600 bg-red-100 hover:bg-red-200 cursor-pointer p-4 rounded w-fit h-fit"
                                                                                initial={{ opacity: 0, y: 100 }}
                                                                                animate={{ opacity: 1, y: 0 }}
                                                                                transition={{ delay: 1.0 }}
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

                                                { parseFloat(TotalMasonItem).toLocaleString('en-IN') || "0"}
                                            </p>

                                        </motion.div>
                                    </div>



                                    <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1 my-6 gap-6">
                                        <motion.label
                                            initial={{opacity: 0, y: 100}}
                                            animate={{opacity: 1, y: 0}}
                                            transition={{delay: 1.5}}
                                            className="grid" htmlFor="SGST">
                                            <span className="mx-2">SGST</span>
                                            <div className="grid grid-cols-1 md:flex lg:flex xl:flex gap-4">
                                                <input type="number"
                                                       value={formData.mason_master.mason_s_gst_percent}
                                                       onChange={(e) =>
                                                           setFormData({
                                                               ...formData, mason_master: {
                                                                   ...formData.mason_master,
                                                                   mason_s_gst_percent: e.target.value
                                                               }})}
                                                       className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                                       placeholder="%" />
                                                <input type="number"
                                                       readOnly={true}
                                                       value={formData.mason_master.mason_s_gst_amount}
                                                       onChange={(e) => setFormData({...formData, mason_master: { ...formData.mason_master, mason_s_gst_amount: e.target.value }})}
                                                       className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                                       placeholder="Amount" />
                                            </div>
                                        </motion.label>
                                        <motion.label
                                            initial={{opacity: 0, y: 100}}
                                            animate={{opacity: 1, y: 0}}
                                            transition={{delay: 1.6}}
                                            className="grid" htmlFor="CGST">
                                            <span className="mx-2">CGST</span>
                                            <div className="grid grid-cols-1 md:flex lg:flex xl:flex gap-4">
                                                <input type="number"
                                                       value={formData.mason_master.mason_c_gst_percent}
                                                       onChange={(e) => setFormData({...formData, mason_master: { ...formData.mason_master, mason_c_gst_percent: e.target.value }})}
                                                       className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                                       placeholder="%" />
                                                <input type="number"
                                                       readOnly={true}
                                                       value={formData.mason_master.mason_c_gst_amount}
                                                       onChange={(e) => setFormData({...formData, mason_master: { ...formData.mason_master, mason_c_gst_amount: e.target.value }})}
                                                       className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                                       placeholder="Amount" />
                                            </div>
                                        </motion.label>
                                        <motion.label
                                            initial={{opacity: 0, y: 100}}
                                            animate={{opacity: 1, y: 0}}
                                            transition={{delay: 1.7}}
                                            className="grid" htmlFor="IGST">
                                            <span className="mx-2">IGST</span>
                                            <div className="grid grid-cols-1 md:flex lg:flex xl:flex gap-4">
                                                <input type="number"
                                                       value={formData.mason_master.mason_i_gst_percent}
                                                       onChange={(e) => setFormData({...formData, mason_master: { ...formData.mason_master, mason_i_gst_percent: e.target.value }})}
                                                       className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                                       placeholder="%" />
                                                <input type="number"
                                                       readOnly={true}
                                                       value={formData.mason_master.mason_i_gst_amount}
                                                       onChange={(e) => setFormData({...formData, mason_master: { ...formData.mason_master, mason_i_gst_amount: e.target.value }})}
                                                       className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                                       placeholder="Amount" />
                                            </div>


                                        </motion.label>

                                        <motion.div
                                            initial={{ opacity: 0, y: 100 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{delay: 0.2, type: "spring", stiffness: 200}}
                                            className="flex  justify-between items-center border border-[#A9C1EA] rounded p-4"
                                        >
                                            <p className="text-[#005BEA]">
                                                Total Mason Cost After Tax :
                                            </p>
                                            <p className="flex justify-center items-center text-md">
                                                <IndianRupee size={20} />
                                                { parseFloat(formData.total_mason_cost).toLocaleString('en-IN') }
                                            </p>
                                        </motion.div>

                                    </div>


                                </div>
                                <div className="grid grid-cols-2 items-center justify-center gap-2">
                                    <button title="Edit" type="button"
                                            className="flex gap-2 items-center justify-center
                                                        bg-[#D9E1EF] border border-[#8CAEE9] text-[#005BEA] cursor-pointer p-2 rounded"
                                            onClick={() => OpenEditMasonModal(SelectedProject?.labour_id, SelectedProject?.MasonMaster?.mason_id)}>
                                        <span>Update</span>
                                    </button>
                                    <button title="Edit" type="button"
                                            className="flex gap-2 items-center justify-center
                                                        bg-red-100 border border-red-500 text-red-500 cursor-pointer p-2 rounded"
                                            onClick={() => setIsOpenEditMasonModal(false)}>

                                        <span>Cancel</span>
                                    </button>
                                </div>

                            </form>

                        </motion.div>
                    </div>

                )

            }

            {/* Edit Centering */}
            {

                isOpenEditCenteringModal && selectedCentringData

                &&

                (

                    <div className="fixed inset-0 bg-[#202020]/50 flex items-center justify-center blur-20 backdrop-blur-xs z-50">
                        <motion.div initial={{ opacity: 0, x: 100, y: 100, rotate: 10 }}
                                    animate={{ opacity: 1, x: 0, y: 0, rotate: 0 }}
                                    transition={{delay: 0.2, type: "spring", stiffness: 200}} className="bg-[#F1F1F1] rounded w-11/12 h-9/10 md:w-1/2 lg:w-1/2 shadow-xl overflow-y-auto scroll-smooth">

                            <div className="sticky top-0 flex justify-between items-center bg-[#D9E1EF] rounded p-4 z-20">
                                <h2 className="flex gap-2 items-center text-xl text-[#005BEA]">
                                    <div className="flex items-center gap-2 ">
                                        <SquarePen />
                                    </div>
                                    Edit Centering - {selectedCentringData.centering_name}
                                </h2>
                                <button onClick={() => setIsOpenEditCenteringModal(false)} className="cursor-pointer text-gray-500 hover:text-gray-700">
                                    <X />
                                </button>
                            </div>

                            <form className="grid border border-[#A9C1EA] p-2 m-2">
                                <div className="grid-cols-1 gap-10">
                                    <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 my-4 gap-6">
                                        <motion.label
                                            initial={{opacity: 0, y: 100}}
                                            animate={{opacity: 1, y: 0}}
                                            transition={{delay: 0.4}}
                                            className="grid" htmlFor="name">
                                            <span className="mx-2">Centering Name</span>
                                            <input
                                                type="text"
                                                value={formData.centering_master.centering_name}
                                                onChange={(e) => setFormData({...formData, centering_master: { ...formData.centering_master, centering_name: e.target.value }})}
                                                className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                                placeholder="Enter the Name"
                                            />
                                        </motion.label>
                                        <motion.label
                                            initial={{opacity: 0, y: 100}}
                                            animate={{opacity: 1, y: 0}}
                                            transition={{delay: 0.5}}
                                            className="grid" htmlFor="phone">
                                            <span className="mx-2">Phone</span>
                                            <input type="text"
                                                   value={formData.centering_master.centering_phone}
                                                   onChange={(e) => setFormData({...formData, centering_master: { ...formData.centering_master, centering_phone: e.target.value }})}
                                                   className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded  p-4"
                                                   placeholder="Enter the Phone No" />
                                        </motion.label>
                                        <motion.label
                                            initial={{opacity: 0, y: 100}}
                                            animate={{opacity: 1, y: 0}}
                                            transition={{delay: 0.6}}
                                            className="grid" htmlFor="address">
                                            <span className="mx-2">Address</span>
                                            <input type="text"
                                                   value={formData.centering_master.centering_address}
                                                   onChange={(e) =>
                                                       setFormData(
                                                           {...formData,
                                                               centering_master: { ...formData.centering_master,
                                                                   centering_address: e.target.value }})}
                                                   className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                                   placeholder="Enter the Address" />
                                        </motion.label>
                                        <motion.label
                                            initial={{opacity: 0, y: 100}}
                                            animate={{opacity: 1, y: 0}}
                                            transition={{delay: 0.7}}
                                            className="grid" htmlFor="Labour">
                                            <span className="mx-2">Centering cost per sqft</span>
                                            <input name="text"
                                                   value={formData.centering_master.centering_contract}
                                                   onChange={(e) =>
                                                       setFormData({
                                                           ...formData,
                                                           centering_master: {
                                                               ...formData.centering_master,
                                                               centering_contract: e.target.value,
                                                           },
                                                       })
                                                   }
                                                   className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                                   id="role" placeholder="Enter Per Sqft"/>
                                        </motion.label>
                                        <motion.label
                                            initial={{opacity: 0, y: 100}}
                                            animate={{opacity: 1, y: 0}}
                                            transition={{delay: 0.8}}
                                            className="grid" htmlFor="Cotract">
                                            <span className="mx-2">Total Contract Amount</span>
                                            <input name="text"
                                                   readOnly={true}
                                                   value={formData.centering_master.centering_contract_amount}
                                                   onChange={(e) =>
                                                       setFormData({...formData, centering_master: {
                                                               ...formData.centering_master,
                                                               centering_contract_amount: e.target.value
                                                           }})}
                                                   className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                                   id="role" placeholder="Enter the Amount"/>
                                        </motion.label>
                                    </div>

                                    <motion.div
                                        initial={{ opacity: 0, y: 100 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{delay: 0.2, type: "spring", stiffness: 200}}
                                        className="flex  justify-between items-center border border-[#A9C1EA] rounded p-4"
                                    >
                                        <p className="text-[#005BEA]">
                                            Total Centering Cost :
                                        </p>
                                        <p className="flex justify-center items-center text-md">
                                            <IndianRupee size={20} />
                                            { parseFloat(formData.centering_master.centering_contract_amount).toLocaleString('en-IN') }
                                        </p>
                                    </motion.div>

                                    <div className="grid md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1 my-6 gap-6">
                                        <motion.label
                                            initial={{opacity: 0, y: 100}}
                                            animate={{opacity: 1, y: 0}}
                                            transition={{delay: 0.7}}
                                            className="grid" htmlFor="ground">
                                            <span className="mx-2">Footing Ground</span>
                                            <div className="grid grid-cols-1 md:flex lg:flex xl:flex gap-4">
                                                <input type="text"
                                                       value={formData.centering_master.footing_ground}
                                                       onChange={(e) => setFormData({...formData, centering_master: { ...formData.centering_master, footing_ground: e.target.value }})}
                                                       className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                                       placeholder="Enter the Remarks" />
                                                <input type="text"
                                                       value={formData.centering_master.footing_ground_amount}
                                                       onChange={(e) => setFormData({...formData, centering_master: { ...formData.centering_master, footing_ground_amount: e.target.value }})}
                                                       className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                                       placeholder="Amount" />
                                            </div>
                                        </motion.label>
                                        <motion.label
                                            initial={{opacity: 0, y: 100}}
                                            animate={{opacity: 1, y: 0}}
                                            transition={{delay: 0.8}}
                                            className="grid" htmlFor="beam">
                                            <span className="mx-2">Plinth Beam</span>
                                            <div className="grid grid-cols-1 md:flex lg:flex xl:flex gap-4">
                                                <input type="text"
                                                       value={formData.centering_master.plinth_beam}
                                                       onChange={(e) => setFormData({...formData, centering_master: { ...formData.centering_master, plinth_beam: e.target.value }})}
                                                       className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                                       placeholder="Enter the Remarks" />
                                                <input type="text"
                                                       value={formData.centering_master.plinth_beam_amount}
                                                       onChange={(e) => setFormData({...formData, centering_master: { ...formData.centering_master, plinth_beam_amount: e.target.value }})}
                                                       className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                                       placeholder="Amount" />
                                            </div>
                                        </motion.label>
                                        <motion.label
                                            initial={{opacity: 0, y: 100}}
                                            animate={{opacity: 1, y: 0}}
                                            transition={{delay: 0.9}}
                                            className="grid" htmlFor="feet">
                                            <span className="mx-2">3 Feet Basement Column</span>
                                            <div className="grid grid-cols-1 md:flex lg:flex xl:flex gap-4">
                                                <input type="text"
                                                       value={formData.centering_master.basement_column}
                                                       onChange={(e) => setFormData({...formData, centering_master: { ...formData.centering_master,
                                                               basement_column: e.target.value }})}
                                                       className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded  p-4"
                                                       placeholder="Enter the Remarks" />
                                                <input type="text"
                                                       value={formData.centering_master.basement_column_amount}
                                                       onChange={(e) => setFormData({...formData, centering_master: { ...formData.centering_master,
                                                               basement_column_amount: e.target.value }})}
                                                       className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                                       placeholder="Amount" />
                                            </div>
                                        </motion.label>
                                        <motion.label
                                            initial={{opacity: 0, y: 100}}
                                            animate={{opacity: 1, y: 0}}
                                            transition={{delay: 1.0}}
                                            className="grid" htmlFor="outer">
                                            <span className="mx-2">Outer Plastering</span>
                                            <div className="grid grid-cols-1 md:flex lg:flex xl:flex gap-4">
                                                <input type="text"
                                                       value={formData.centering_master.outer_plastering}
                                                       onChange={(e) => setFormData({...formData, centering_master: { ...formData.centering_master, outer_plastering: e.target.value }})}
                                                       className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded  p-4"
                                                       placeholder="Enter the Remarks" />
                                                <input type="text"
                                                       value={formData.centering_master.outer_plastering_amount}
                                                       onChange={(e) => setFormData({...formData, centering_master: { ...formData.centering_master, outer_plastering_amount: e.target.value }})}
                                                       className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                                       placeholder="Amount" />
                                            </div>
                                        </motion.label>
                                    </div>

                                    <div className="grid md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1 my-6 gap-6">
                                        <motion.label
                                            initial={{opacity: 0, y: 100}}
                                            animate={{opacity: 1, y: 0}}
                                            transition={{delay: 1.1}}
                                            className="grid" htmlFor="feet">
                                            <span className="mx-2">7 Feet Column</span>
                                            <div className="grid grid-cols-1 md:flex lg:flex xl:flex gap-4">
                                                <input type="text"
                                                       value={formData.centering_master.feet_column}
                                                       onChange={(e) => setFormData({...formData, centering_master: { ...formData.centering_master, feet_column: e.target.value }})}
                                                       className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded  p-4"
                                                       placeholder="Enter the Remarks" />
                                                <input type="text"
                                                       value={formData.centering_master.feet_column_amount}
                                                       onChange={(e) => setFormData({...formData, centering_master: { ...formData.centering_master, feet_column_amount: e.target.value }})}
                                                       className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded  p-4"
                                                       placeholder="Amount" />
                                            </div>
                                        </motion.label>
                                        <motion.label
                                            initial={{opacity: 0, y: 100}}
                                            animate={{opacity: 1, y: 0}}
                                            transition={{delay: 1.2}}
                                            className="grid" htmlFor="beam">
                                            <span className="mx-2">Lintel Beam</span>
                                            <div className="grid grid-cols-1 md:flex lg:flex xl:flex gap-4">
                                                <input type="text"
                                                       value={formData.centering_master.lintel_beam}
                                                       onChange={(e) => setFormData({...formData, centering_master: { ...formData.centering_master, lintel_beam: e.target.value }})}
                                                       className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                                       placeholder="Enter the Remarks" />
                                                <input type="text"
                                                       value={formData.centering_master.lintel_beam_amount}
                                                       onChange={(e) => setFormData({...formData, centering_master: { ...formData.centering_master, lintel_beam_amount: e.target.value }})}
                                                       className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                                       placeholder="Amount" />
                                            </div>
                                        </motion.label>
                                        <motion.label
                                            initial={{opacity: 0, y: 100}}
                                            animate={{opacity: 1, y: 0}}
                                            transition={{delay: 1.3}}
                                            className="grid" htmlFor="feet">
                                            <span className="mx-2">3 Feet After Lintel Column</span>
                                            <div className="grid grid-cols-1 md:flex lg:flex xl:flex gap-4">
                                                <input type="text"
                                                       value={formData.centering_master.after_lintel_column}
                                                       onChange={(e) => setFormData({...formData, centering_master: { ...formData.centering_master, after_lintel_column: e.target.value }})}
                                                       className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                                       placeholder="Enter the Remarks" />
                                                <input type="text"
                                                       value={formData.centering_master.after_lintel_column_amount}
                                                       onChange={(e) => setFormData({...formData, centering_master: { ...formData.centering_master, after_lintel_column_amount: e.target.value }})}
                                                       className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                                       placeholder="Amount" />
                                            </div>
                                        </motion.label>
                                    </div>

                                    <div className="grid md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1 my-6 gap-6">
                                        <motion.label
                                            initial={{opacity: 0, y: 100}}
                                            animate={{opacity: 1, y: 0}}
                                            transition={{delay: 1.3}}
                                            className="grid" htmlFor="SGST">
                                            <span className="mx-2">Hide Beam</span>
                                            <div className="grid grid-cols-1 md:flex lg:flex xl:flex gap-4">
                                                <input type="text"
                                                       value={formData.centering_master.hide_beam}
                                                       onChange={(e) => setFormData({...formData, centering_master: { ...formData.centering_master, hide_beam: e.target.value }})}
                                                       className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                                       placeholder="Enter the Remarks" />
                                                <input type="text"
                                                       value={formData.centering_master.hide_beam_amount}
                                                       onChange={(e) => setFormData({...formData, centering_master: { ...formData.centering_master, hide_beam_amount: e.target.value }})}
                                                       className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                                       placeholder="Amount" />
                                            </div>
                                        </motion.label>
                                        <motion.label
                                            initial={{opacity: 0, y: 100}}
                                            animate={{opacity: 1, y: 0}}
                                            transition={{delay: 1.4}}
                                            className="grid" htmlFor="CGST">
                                            <span className="mx-2">Roof</span>
                                            <div className="grid grid-cols-1 md:flex lg:flex xl:flex gap-4">
                                                <input type="text"
                                                       value={formData.centering_master.centering_roof}
                                                       onChange={(e) => setFormData({...formData, centering_master: { ...formData.centering_master, centering_roof: e.target.value }})}
                                                       className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                                       placeholder="Enter the Remarks" />
                                                <input type="text"
                                                       value={formData.centering_master.centering_roof_amount}
                                                       onChange={(e) => setFormData({...formData, centering_master: { ...formData.centering_master, centering_roof_amount: e.target.value }})}
                                                       className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                                       placeholder="Amount" />
                                            </div>
                                        </motion.label>
                                        <motion.label
                                            initial={{opacity: 0, y: 100}}
                                            animate={{opacity: 1, y: 0}}
                                            transition={{delay: 1.5}}
                                            className="grid" htmlFor="beam">
                                            <span className="mx-2">Roof Beam</span>
                                            <div className="grid grid-cols-1 md:flex lg:flex xl:flex gap-4">
                                                <input type="text"
                                                       value={formData.centering_master.roof_beam}
                                                       onChange={(e) => setFormData(
                                                           {...formData,
                                                               centering_master: {
                                                                   ...formData.centering_master,
                                                                   roof_beam: e.target.value
                                                               }})}
                                                       className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                                       placeholder="Enter the Remarks" />
                                                <input type="text"
                                                       value={formData.centering_master.roof_beam_amount}
                                                       onChange={(e) => setFormData({...formData, centering_master: { ...formData.centering_master, roof_beam_amount: e.target.value }})}
                                                       className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                                       placeholder="Amount" />
                                            </div>
                                        </motion.label>

                                    </div>


                                    <div className="py-6">
                                        <motion.button
                                            type="button"
                                            onClick={AddCenteringEntry}
                                            className="flex border border-[#6392E5] bg-[#D9E1EF] text-[#005BEA]  hover:bg-[#C9D8F3] hover:border-[#6392E5] my-6 p-4 cursor-pointer rounded gap-2"
                                            initial={{opacity: 0, y: 100}}
                                            animate={{opacity: 1, y: 0}}
                                            transition={{delay: 0.6}}>
                                            <CircleFadingPlus/>
                                            Add Items
                                        </motion.button>

                                        {
                                            Array.isArray(formData.centering_master.centering_items)

                                            &&

                                            formData.centering_master.centering_items.map((item, index) =>

                                                (

                                                    <div key={index}>
                                                        <div className="border border-[#6392E5] p-6 rounded bg-[#F1F1F1] my-2">
                                                            <div className="grid md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-3 gap-6">
                                                                <motion.label
                                                                    initial={{opacity: 0, y: 100}}
                                                                    animate={{opacity: 1, y: 0}}
                                                                    transition={{delay: 0.6}}
                                                                    className="grid" htmlFor="beam">
                                                                    <span className="mx-2">Item Name</span>
                                                                    <div className="grid grid-cols-1 md:flex lg:flex xl:flex gap-4">
                                                                        <input type="text"
                                                                               value={item.centering_item_name}
                                                                               onChange={(e) => HandleCenteringInputChange(index, 'centering_item_name', e.target.value)}
                                                                               className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                                                               placeholder="Enter Item Name"
                                                                        />
                                                                        <input type="text"
                                                                               value={item.centering_item_amount}
                                                                               onChange={(e) => HandleCenteringInputChange(index, 'centering_item_amount', e.target.value)}
                                                                               className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                                                               placeholder="Amount"
                                                                        />
                                                                    </div>
                                                                </motion.label>
                                                                <motion.label
                                                                    initial={{opacity: 0, y: 100}}
                                                                    animate={{opacity: 1, y: 0}}
                                                                    transition={{delay: 0.6}}
                                                                    className="grid" htmlFor="remarks">
                                                                    <span className="mx-2">Remarks</span>
                                                                    <input type="text"
                                                                           value={item.centering_item_remarks}
                                                                           onChange={(e) => HandleCenteringInputChange(index, 'centering_item_remarks', e.target.value)}
                                                                           className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                                                           placeholder="Enter any Remarks" />
                                                                </motion.label>
                                                                {
                                                                    formData.centering_master.centering_items.length > 1

                                                                    &&

                                                                    (
                                                                        <div>
                                                                            <span className="opacity-0">hello</span>
                                                                            <motion.button
                                                                                type="button"
                                                                                onClick={() => RemoveCenteringEntry(index)}
                                                                                className="text-xl flex gap-2 items-center border border-red-400 text-red-600 bg-red-100 hover:bg-red-200 cursor-pointer p-4 rounded w-fit h-fit"
                                                                                initial={{ opacity: 0, y: 100 }}
                                                                                animate={{ opacity: 1, y: 0 }}
                                                                                transition={{ delay: 1.0 }}
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
                                                    </div>


                                                ))
                                        }
                                    </div>

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

                                            { parseFloat(TotalCentringItem ).toLocaleString('en-IN') || "0"}
                                        </p>

                                    </motion.div>

                                    <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1 my-6 gap-6">
                                        <motion.label
                                            initial={{opacity: 0, y: 100}}
                                            animate={{opacity: 1, y: 0}}
                                            transition={{delay: 1.5}}
                                            className="grid" htmlFor="SGST">
                                            <span className="mx-2">SGST</span>
                                            <div className="grid grid-cols-1 md:flex lg:flex xl:flex gap-4">
                                                <input type="number"
                                                       value={formData.centering_master.centering_s_gst_percent}
                                                       onChange={(e) =>
                                                           setFormData({
                                                               ...formData, centering_master: {
                                                                   ...formData.centering_master,
                                                                   centering_s_gst_percent: e.target.value
                                                               }})}
                                                       className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                                       placeholder="%" />
                                                <input type="number"
                                                       readOnly={true}
                                                       value={formData.centering_master.centering_s_gst_amount}
                                                       onChange={(e) => setFormData({...formData, centering_master: { ...formData.centering_master, centering_s_gst_amount: e.target.value }})}
                                                       className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                                       placeholder="Amount" />
                                            </div>
                                        </motion.label>
                                        <motion.label
                                            initial={{opacity: 0, y: 100}}
                                            animate={{opacity: 1, y: 0}}
                                            transition={{delay: 1.6}}
                                            className="grid" htmlFor="CGST">
                                            <span className="mx-2">CGST</span>
                                            <div className="grid grid-cols-1 md:flex lg:flex xl:flex gap-4">
                                                <input type="number"
                                                       value={formData.centering_master.centering_c_gst_percent}
                                                       onChange={(e) => setFormData({...formData,centering_master: { ...formData.centering_master ,centering_c_gst_percent: e.target.value }})}
                                                       className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                                       placeholder="%" />
                                                <input type="number"
                                                       readOnly={true}
                                                       value={formData.centering_master.centering_c_gst_amount}
                                                       onChange={(e) => setFormData({...formData, centering_master: { ...formData.centering_master, centering_c_gst_amount: e.target.value }})}
                                                       className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                                       placeholder="Amount" />
                                            </div>
                                        </motion.label>
                                        <motion.label
                                            initial={{opacity: 0, y: 100}}
                                            animate={{opacity: 1, y: 0}}
                                            transition={{delay: 1.7}}
                                            className="grid" htmlFor="IGST">
                                            <span className="mx-2">IGST</span>
                                            <div className="grid grid-cols-1 md:flex lg:flex xl:flex gap-4">
                                                <input type="number"
                                                       value={formData.centering_master.centering_i_gst_percent}
                                                       onChange={(e) => setFormData({...formData, centering_master: { ...formData.centering_master, centering_i_gst_percent: e.target.value }})}
                                                       className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                                       placeholder="%" />
                                                <input type="number"
                                                       readOnly={true}
                                                       value={formData.centering_master.centering_i_gst_amount}
                                                       onChange={(e) => setFormData({...formData, centering_master: { ...formData.centering_master, centering_i_gst_amount: e.target.value }})}
                                                       className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                                       placeholder="Amount" />
                                            </div>


                                        </motion.label>

                                        <motion.div
                                            initial={{ opacity: 0, y: 100 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{delay: 0.2, type: "spring", stiffness: 200}}
                                            className="flex  justify-between items-center border border-[#A9C1EA] rounded p-4"
                                        >
                                            <p className="text-[#005BEA]">
                                                Total Centering Cost After Tax :
                                            </p>
                                            <p className="flex justify-center items-center text-md">
                                                <IndianRupee size={20} />
                                                { parseFloat(formData.total_centering_cost).toLocaleString('en-IN') }
                                            </p>
                                        </motion.div>

                                    </div>


                                </div>
                                <div className="grid grid-cols-2 items-center justify-center gap-2">
                                    <button title="Edit" type="button"
                                            className="flex gap-2 items-center justify-center
                                                        bg-[#D9E1EF] border border-[#8CAEE9] text-[#005BEA] cursor-pointer p-2 rounded"
                                            onClick={() => OpenEditCentringModal(SelectedProject?.labour_id, SelectedProject?.CenteringMaster?.centering_id)}>
                                        <span>Update</span>
                                    </button>
                                    <button title="Edit" type="button"
                                            className="flex gap-2 items-center justify-center
                                                        bg-red-100 border border-red-500 text-red-500 cursor-pointer p-2 rounded"
                                            onClick={() => setIsOpenEditCenteringModal(false)}>

                                        <span>Cancel</span>
                                    </button>
                                </div>

                            </form>

                        </motion.div>
                    </div>

                )

            }


            {/* Edit Plumbing */}
            {

                isOpenEditPlumbingModal && selectedPlumbingData

                &&

                (
                    <div className="fixed inset-0 bg-[#202020]/50 flex items-center justify-center blur-20 backdrop-blur-xs z-50">
                        <motion.div initial={{ opacity: 0, x: 100, y: 100, rotate: 10 }}
                                    animate={{ opacity: 1, x: 0, y: 0, rotate: 0 }}
                                    transition={{delay: 0.2, type: "spring", stiffness: 200}} className="bg-[#F1F1F1] rounded w-11/12 h-9/10 md:w-1/2 lg:w-1/2 shadow-xl overflow-y-auto scroll-smooth">

                            <div className="sticky top-0 flex justify-between items-center bg-[#D9E1EF] rounded p-4 z-20">
                                <h2 className="flex gap-2 items-center text-xl text-[#005BEA]">
                                    <div className="flex items-center gap-2 ">
                                        <SquarePen />
                                    </div>
                                    Edit Plumbing - {selectedPlumbingData.plumbing_name}
                                </h2>
                                <button onClick={() => setIsOpenEditPlumbingModal(false)} className="cursor-pointer text-gray-500 hover:text-gray-700">
                                    <X />
                                </button>
                            </div>

                            <form className="grid border border-[#A9C1EA] p-2 m-2">
                                <div className="grid md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 my-6 gap-6">
                                    <motion.label
                                        initial={{opacity: 0, y: 100}}
                                        animate={{opacity: 1, y: 0}}
                                        transition={{delay: 0.2}}
                                        className="grid" htmlFor="name">
                                        <span className="mx-2">Name</span>
                                        <input type="text"
                                               value={formData.plumbing_master.plumbing_name}
                                               onChange={(e) => setFormData({...formData, plumbing_master: { ...formData.plumbing_master, plumbing_name: e.target.value }})}
                                               className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                               placeholder="Enter the Name" />
                                    </motion.label>
                                    <motion.label
                                        initial={{opacity: 0, y: 100}}
                                        animate={{opacity: 1, y: 0}}
                                        transition={{delay: 0.3}}
                                        className="grid" htmlFor="phone">
                                        <span className="mx-2">Phone</span>
                                        <input type="text"
                                               value={formData.plumbing_master.plumbing_phone}
                                               onChange={(e) => setFormData({...formData, plumbing_master: { ...formData.plumbing_master, plumbing_phone: e.target.value }})}
                                               className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                               placeholder="Enter the Phone No" />
                                    </motion.label>
                                    <motion.label
                                        initial={{opacity: 0, y: 100}}
                                        animate={{opacity: 1, y: 0}}
                                        transition={{delay: 0.4}}
                                        className="grid" htmlFor="address">
                                        <span className="mx-2">Address</span>
                                        <input type="text"
                                               value={formData.plumbing_master.plumbing_address}
                                               onChange={(e) => setFormData({...formData, plumbing_master: { ...formData.plumbing_master, plumbing_address: e.target.value }})}
                                               className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                               placeholder="Enter the Address" />
                                    </motion.label>
                                    <motion.label
                                        initial={{opacity: 0, y: 100}}
                                        animate={{opacity: 1, y: 0}}
                                        transition={{delay: 0.5}}
                                        className="grid" htmlFor="Labour">
                                        <span className="mx-2">Plumber Cost Per Sqft</span>
                                        <input name="text"
                                               value={formData.plumbing_master.plumbing_contract}
                                               onChange={(e) => setFormData({...formData, plumbing_master: { ...formData.plumbing_master, plumbing_contract: e.target.value }})}
                                               className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                               id="role" placeholder="Enter Per Sqft"/>
                                    </motion.label>
                                    <motion.label
                                        initial={{opacity: 0, y: 100}}
                                        animate={{opacity: 1, y: 0}}
                                        transition={{delay: 0.6}}
                                        className="grid" htmlFor="Cotract">
                                        <span className="mx-2">Total Contract Amount</span>
                                        <input name="text"
                                               readOnly={true}
                                               value={formData.plumbing_master.plumbing_contract_amount}
                                               onChange={(e) => setFormData({...formData, plumbing_master: { ...formData.plumbing_master, plumbing_contract_amount: e.target.value }})}
                                               className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded  p-4"
                                               id="role" placeholder="Enter the Amount"/>
                                    </motion.label>
                                </div>

                                <div className="py-6">
                                    <motion.button
                                        type="button"
                                        onClick={AddPlumbingEntry}
                                        className="flex border border-[#6392E5] bg-[#D9E1EF] text-[#005BEA]  hover:bg-[#C9D8F3] hover:border-[#6392E5] my-6 p-4 cursor-pointer rounded gap-2"
                                        initial={{opacity: 0, y: 100}}
                                        animate={{opacity: 1, y: 0}}
                                        transition={{delay: 0.6}}>
                                        <CircleFadingPlus/>
                                        Add Items
                                    </motion.button>

                                    {
                                        Array.isArray(formData.plumbing_master.plumbing_items)

                                        &&


                                        formData.plumbing_master.plumbing_items.map((item, index) =>

                                            (

                                                <div key={index}>
                                                    <div className="border border-[#6392E5] p-6 rounded bg-[#F1F1F1] my-2">
                                                        <div className="grid md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-3 gap-6">
                                                            <motion.label
                                                                initial={{opacity: 0, y: 100}}
                                                                animate={{opacity: 1, y: 0}}
                                                                transition={{delay: 0.6}}
                                                                className="grid" htmlFor="beam">
                                                                <span className="mx-2">Item Name</span>
                                                                <div className="grid grid-cols-1 md:flex lg:flex xl:flex gap-4">
                                                                    <input type="text"
                                                                           value={item.plumbing_item_name}
                                                                           onChange={(e) => HandlePlumbingInputChange(index, 'plumbing_item_name', e.target.value)}
                                                                           className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                                                           placeholder="Enter Item Name"
                                                                    />
                                                                    <input type="text"
                                                                           value={item.plumbing_item_amount}
                                                                           onChange={(e) => HandlePlumbingInputChange(index, 'plumbing_item_amount', e.target.value)}
                                                                           className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                                                           placeholder="Amount"
                                                                    />
                                                                </div>
                                                            </motion.label>
                                                            <motion.label
                                                                initial={{opacity: 0, y: 100}}
                                                                animate={{opacity: 1, y: 0}}
                                                                transition={{delay: 0.6}}
                                                                className="grid" htmlFor="remarks">
                                                                <span className="mx-2">Remarks</span>
                                                                <input type="text"
                                                                       value={item.plumbing_item_remarks}
                                                                       onChange={(e) => HandlePlumbingInputChange(index, 'plumbing_item_remarks', e.target.value)}
                                                                       className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                                                       placeholder="Enter any Remarks" />
                                                            </motion.label>
                                                            {
                                                                formData.plumbing_master.plumbing_items.length > 1

                                                                &&

                                                                (
                                                                    <div>
                                                                        <span className="opacity-0">hello</span>
                                                                        <motion.button
                                                                            type="button"
                                                                            onClick={() => RemovePlumbingEntry(index)}
                                                                            className="text-xl flex gap-2 items-center border border-red-400 text-red-600 bg-red-100 hover:bg-red-200 cursor-pointer p-4 rounded w-fit h-fit"
                                                                            initial={{ opacity: 0, y: 100 }}
                                                                            animate={{ opacity: 1, y: 0 }}
                                                                            transition={{ delay: 1.0 }}
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
                                                </div>


                                            ))
                                    }
                                </div>

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

                                        { parseFloat(TotalPlumbingItem ).toLocaleString('en-IN') || "0"}
                                    </p>

                                </motion.div>

                                <div>
                                    <div className="grid md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 my-6 gap-6">
                                        <motion.label
                                            initial={{opacity: 0, y: 100}}
                                            animate={{opacity: 1, y: 0}}
                                            transition={{delay: 0.2}}
                                            className="grid" htmlFor="name">
                                            <span className="mx-2">Name</span>
                                            <input type="text"
                                                   value={formData.plumbing_master.plumbing_name}
                                                   onChange={(e) => setFormData({...formData, plumbing_master: { ...formData.plumbing_master, plumbing_name: e.target.value }})}
                                                   className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                                   placeholder="Enter the Name" />
                                        </motion.label>
                                        <motion.label
                                            initial={{opacity: 0, y: 100}}
                                            animate={{opacity: 1, y: 0}}
                                            transition={{delay: 0.3}}
                                            className="grid" htmlFor="phone">
                                            <span className="mx-2">Phone</span>
                                            <input type="text"
                                                   value={formData.plumbing_master.plumbing_phone}
                                                   onChange={(e) => setFormData({...formData, plumbing_master: { ...formData.plumbing_master, plumbing_phone: e.target.value }})}
                                                   className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                                   placeholder="Enter the Phone No" />
                                        </motion.label>
                                        <motion.label
                                            initial={{opacity: 0, y: 100}}
                                            animate={{opacity: 1, y: 0}}
                                            transition={{delay: 0.4}}
                                            className="grid" htmlFor="address">
                                            <span className="mx-2">Address</span>
                                            <input type="text"
                                                   value={formData.plumbing_master.plumbing_address}
                                                   onChange={(e) => setFormData({...formData, plumbing_master: { ...formData.plumbing_master, plumbing_address: e.target.value }})}
                                                   className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                                   placeholder="Enter the Address" />
                                        </motion.label>
                                        <motion.label
                                            initial={{opacity: 0, y: 100}}
                                            animate={{opacity: 1, y: 0}}
                                            transition={{delay: 0.5}}
                                            className="grid" htmlFor="Labour">
                                            <span className="mx-2">Plumber Cost Per Sqft</span>
                                            <input name="text"
                                                   value={formData.plumbing_master.plumbing_contract}
                                                   onChange={(e) => setFormData({...formData, plumbing_master: { ...formData.plumbing_master, plumbing_contract: e.target.value }})}
                                                   className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                                   id="role" placeholder="Enter Per Sqft"/>
                                        </motion.label>
                                        <motion.label
                                            initial={{opacity: 0, y: 100}}
                                            animate={{opacity: 1, y: 0}}
                                            transition={{delay: 0.6}}
                                            className="grid" htmlFor="Cotract">
                                            <span className="mx-2">Total Contract Amount</span>
                                            <input name="text"
                                                   readOnly={true}
                                                   value={formData.plumbing_master.plumbing_contract_amount}
                                                   onChange={(e) => setFormData({...formData, plumbing_master: { ...formData.plumbing_master, plumbing_contract_amount: e.target.value }})}
                                                   className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded  p-4"
                                                   id="role" placeholder="Enter the Amount"/>
                                        </motion.label>
                                    </div>

                                    <div className="py-6">
                                        <motion.button
                                            type="button"
                                            onClick={AddPlumbingEntry}
                                            className="flex border border-[#6392E5] bg-[#D9E1EF] text-[#005BEA]  hover:bg-[#C9D8F3] hover:border-[#6392E5] my-6 p-4 cursor-pointer rounded gap-2"
                                            initial={{opacity: 0, y: 100}}
                                            animate={{opacity: 1, y: 0}}
                                            transition={{delay: 0.6}}>
                                            <CircleFadingPlus/>
                                            Add Items
                                        </motion.button>
                                        {

                                            formData.plumbing_master.plumbing_items.map((item, index) =>

                                                (

                                                    <div key={index} className="">
                                                        <div className="border border-[#6392E5] p-6 rounded bg-[#F1F1F1] my-2">
                                                            <div className="grid md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-3 gap-6">
                                                                <motion.label
                                                                    initial={{opacity: 0, y: 100}}
                                                                    animate={{opacity: 1, y: 0}}
                                                                    transition={{delay: 0.7}}
                                                                    className="grid" htmlFor="beam">
                                                                    <span className="mx-2">Item Name</span>
                                                                    <div className="grid grid-cols-1 md:flex lg:flex xl:flex gap-4">
                                                                        <input type="text"
                                                                               value={formData.plumbing_item_name}
                                                                               onChange={(ev) => HandlePlumbingInputChange(index, 'plumbing_item_name', ev.target.value)}
                                                                               className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                                                               placeholder="Enter Item Name"
                                                                        />
                                                                        <input type="text"
                                                                               value={formData.plumbing_item_amount}
                                                                               onChange={(ev) => HandlePlumbingInputChange(index, 'plumbing_item_amount', ev.target.value)}
                                                                               className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                                                               placeholder="Amount"
                                                                        />
                                                                    </div>
                                                                </motion.label>
                                                                <motion.label
                                                                    initial={{opacity: 0, y: 100}}
                                                                    animate={{opacity: 1, y: 0}}
                                                                    transition={{delay: 0.8}}
                                                                    className="grid" htmlFor="remarks">
                                                                    <span className="mx-2">Remarks</span>
                                                                    <input type="text"
                                                                           value={formData.plumbing_item_remarks}
                                                                           onChange={(ev) => HandlePlumbingInputChange(index, 'plumbing_item_remarks', ev.target.value)}
                                                                           className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                                                           placeholder="Enter any Remarks" />
                                                                </motion.label>
                                                                {
                                                                    formData.plumbing_master.plumbing_items.length > 1

                                                                    &&

                                                                    (
                                                                        <div>
                                                                            <span className="opacity-0">hello</span>
                                                                            <motion.button
                                                                                type="button"
                                                                                onClick={() => RemovePlumbingEntry(index)}
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
                                                    </div>


                                                ))
                                        }
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1 my-4 gap-6">
                                        <motion.label
                                            initial={{opacity: 0, y: 100}}
                                            animate={{opacity: 1, y: 0}}
                                            transition={{delay: 0.9}}
                                            className="grid" htmlFor="SGST">
                                            <span className="mx-2">SGST</span>
                                            <div className="grid grid-cols-1 md:flex lg:flex xl:flex gap-4">
                                                <input type="number"
                                                       value={formData.plumbing_master.plumbing_s_gst_percent}
                                                       onChange={(e) => setFormData({...formData, plumbing_master: { ...formData.plumbing_master, plumbing_s_gst_percent: e.target.value }})}
                                                       className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                                       placeholder="%" />
                                                <input type="number"
                                                       readOnly={true}
                                                       value={formData.plumbing_master.plumbing_s_gst_amount}
                                                       onChange={(e) => setFormData({...formData, plumbing_master: { ...formData.plumbing_master, plumbing_s_gst_amount: e.target.value }})}
                                                       className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                                       placeholder="Amount" />
                                            </div>
                                        </motion.label>
                                        <motion.label
                                            initial={{opacity: 0, y: 100}}
                                            animate={{opacity: 1, y: 0}}
                                            transition={{delay: 1.0}}
                                            className="grid" htmlFor="CGST">
                                            <span className="mx-2">CGST</span>
                                            <div className="grid grid-cols-1 md:flex lg:flex xl:flex gap-4">
                                                <input type="number"
                                                       value={formData.plumbing_master.plumbing_c_gst_percent}
                                                       onChange={(e) => setFormData({...formData, plumbing_master: { ...formData.plumbing_master, plumbing_c_gst_percent: e.target.value }})}
                                                       className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                                       placeholder="%" />
                                                <input type="number"
                                                       readOnly={true}
                                                       value={formData.plumbing_master.plumbing_c_gst_amount}
                                                       onChange={(e) => setFormData({...formData, plumbing_master: { ...formData.plumbing_master, plumbing_c_gst_amount: e.target.value }})}
                                                       className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                                       placeholder="Amount" />
                                            </div>
                                        </motion.label>
                                        <motion.label
                                            initial={{opacity: 0, y: 100}}
                                            animate={{opacity: 1, y: 0}}
                                            transition={{delay: 1.1}}
                                            className="grid" htmlFor="IGST">
                                            <span className="mx-2">IGST</span>
                                            <div className="grid grid-cols-1 md:flex lg:flex xl:flex gap-4">
                                                <input type="number"
                                                       value={formData.plumbing_master.plumbing_i_gst_percent}
                                                       onChange={(e) => setFormData({...formData, plumbing_master: { ...formData.plumbing_master, plumbing_i_gst_percent: e.target.value }})}
                                                       className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                                       placeholder="%" />
                                                <input type="number"
                                                       readOnly={true}
                                                       value={formData.plumbing_master.plumbing_i_gst_amount}
                                                       onChange={(e) => setFormData({...formData, plumbing_master: { ...formData.plumbing_master, plumbing_i_gst_amount: e.target.value }})}
                                                       className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                                       placeholder="Amount" />
                                            </div>
                                        </motion.label>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 items-center justify-center gap-2">
                                    <button title="Edit" type="button"
                                            className="flex gap-2 items-center justify-center
                                                        bg-[#D9E1EF] border border-[#8CAEE9] text-[#005BEA] cursor-pointer p-2 rounded"
                                            onClick={() => OpenEditPlumbingModal(SelectedProject?.labour_id, SelectedProject?.PlumbingMaster?.plumbing_id)}>
                                        <span>Update</span>
                                    </button>
                                    <button title="Edit" type="button"
                                            className="flex gap-2 items-center justify-center
                                                        bg-red-100 border border-red-500 text-red-500 cursor-pointer p-2 rounded"
                                            onClick={() => setIsOpenEditPlumbingModal(false)}>

                                        <span>Cancel</span>
                                    </button>
                                </div>
                            </form>


                        </motion.div>



                    </div>


                )
            }
            {/* Edit Electrician */}
            {
                isOpenEditElectricalModal && selectedElectricalData

                &&

                (

                    <div className="fixed inset-0 bg-[#202020]/50 flex items-center justify-center blur-20 backdrop-blur-xs z-50">
                        <motion.div initial={{ opacity: 0, x: 100, y: 100, rotate: 10 }}
                                    animate={{ opacity: 1, x: 0, y: 0, rotate: 0 }}
                                    transition={{delay: 0.2, type: "spring", stiffness: 200}} className="bg-[#F1F1F1] rounded w-11/12 h-9/10 md:w-1/2 lg:w-1/2 shadow-xl overflow-y-auto scroll-smooth">

                            <div className="sticky top-0 flex justify-between items-center bg-[#D9E1EF] rounded p-4 z-20">
                                <h2 className="flex gap-2 items-center text-xl text-[#005BEA]">
                                    <div className="flex items-center gap-2 ">
                                        <SquarePen />
                                    </div>
                                    Edit Electrician - {selectedElectricalData.electrical_name}
                                </h2>
                                <button onClick={() => setIsOpenEditElectricalModal(false)} className="cursor-pointer text-gray-500 hover:text-gray-700">
                                    <X />
                                </button>
                            </div>

                            <form className="grid border border-[#A9C1EA] p-2 m-2">



                                <div className="grid grid-cols-2 items-center justify-center gap-2">
                                    <button title="Edit" type="button"
                                            className="flex gap-2 items-center justify-center
                                                        bg-[#D9E1EF] border border-[#8CAEE9] text-[#005BEA] cursor-pointer p-2 rounded"
                                            onClick={() => OpenEditElectricalModal(SelectedProject?.labour_id, SelectedProject?.ElectricalMaster?.electrical_id)}>
                                        <span>Update</span>
                                    </button>
                                    <button title="Edit" type="button"
                                            className="flex gap-2 items-center justify-center
                                                        bg-red-100 border border-red-500 text-red-500 cursor-pointer p-2 rounded"
                                            onClick={() => setIsOpenEditElectricalModal(false)}>

                                        <span>Cancel</span>
                                    </button>
                                </div>
                            </form>


                        </motion.div>



                    </div>

                )
            }







            {/* -- Edit Labour ----------------------------------------------------------------------------------------- */}
    </div>
    );
};



export default LabourBoard;