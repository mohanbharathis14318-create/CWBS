// Import Modules
import React, { useState, useEffect } from 'react';
import {motion} from "motion/react";
import {
    AudioWaveform, Axe,
    ChevronUp,
    CircleFadingPlus,
    Lightbulb, PaintRoller,
    Plug, Sparkle, SquareStack, Trash2,
    UsersRound
} from "lucide-react";

// Import Hooks
import { useProject } from "../../../Hooks/useProject.js";

const AddLabour = () => {

    // Hooks Project
    const { fetchProject, ProjectDataList } = useProject();

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
        mason_master: [
            {
                mason_name: "",
                mason_phone: "",
                mason_address: "",
                mason_contract: "",
                mason_contract_amount: "",
                mason_basement: "",
                mason_basement_amount: "",
                mason_lintel: "",
                mason_lintel_amount: "",
                mason_roof: "",
                mason_roof_amount: "",
                mason_outer_plastering: "",
                mason_outer_plastering_amount: "",
                mason_inner_plastering: "",
                mason_inner_plastering_amount: "",
                mason_septic_tank: "",
                mason_septic_tank_amount: "",
                mason_s_gst_percent: "",
                mason_s_gst_amount: "",
                mason_c_gst_percent: "",
                mason_c_gst_amount: "",
                mason_i_gst_percent: "",
                mason_i_gst_amount: ""
            }
        ],


        centering_master: [
            {
                centering_name: "",
                centering_phone: "",
                centering_address: "",
                centering_contract: "",
                centering_contract_amount: "",
                footing_ground: "",
                footing_ground_amount: "",
                plinth_beam: "",
                plinth_beam_amount: "",
                basement_column: "",
                basement_column_amount: "",
                outer_plastering: "",
                outer_plastering_amount: "",
                feet_column: "",
                feet_column_amount: "",
                lintel_beam: "",
                lintel_beam_amount: "",
                after_lintel_column: "",
                after_lintel_column_amount: "",
                hide_beam: "",
                hide_beam_amount: "",
                centering_roof: "",
                centering_roof_amount: "",
                roof_beam: "",
                roof_beam_amount: "",
                centering_s_gst_percent: "",
                centering_s_gst_amount: "",
                centering_c_gst_percent: "",
                centering_c_gst_amount: "",
                centering_i_gst_percent: "",
                centering_i_gst_amount: "",
                centering_items: [
                    {
                        centering_item_name: "",
                        centering_item_amount: "",
                        centering_item_remarks: ""
                    }
                ]
            }
        ],

        plumbing_master: [
            {
                plumbing_name: "",
                plumbing_phone: "",
                plumbing_address: "",
                plumbing_contract: "",
                plumbing_contract_amount: "",
                plumbing_s_gst_percent: "",
                plumbing_s_gst_amount: "",
                plumbing_c_gst_percent: "",
                plumbing_c_gst_amount: "",
                plumbing_i_gst_percent: "",
                plumbing_i_gst_amount: "",
                plumbing_items: [
                    {
                        plumbing_item_name: "",
                        plumbing_item_amount: "",
                        plumbing_item_remarks: ""
                    }
                ]
            }
        ],

        electrical_master: [
            {
                electrical_name: "",
                electrical_phone: "",
                electrical_address: "",
                electrical_contract: "",
                electrical_contract_amount: "",
                electrical_s_gst_percent: "",
                electrical_s_gst_amount: "",
                electrical_c_gst_percent: "",
                electrical_c_gst_amount: "",
                electrical_i_gst_percent: "",
                electrical_i_gst_amount: "",
                electrical_items: [
                    {
                        electrical_item_name: "",
                        electrical_item_amount: "",
                        electrical_item_remarks: ""
                    }
                ]
            }
        ],

        tiles_master: [
            {
                tiles_name: "",
                tiles_phone: "",
                tiles_address: "",
                tiles_contract: "",
                tiles_contract_amount: "",
                tiles_s_gst_percent: "",
                tiles_s_gst_amount: "",
                tiles_c_gst_percent: "",
                tiles_c_gst_amount: "",
                tiles_i_gst_percent: "",
                tiles_i_gst_amount: "",
                tiles_items: [
                    {
                        tiles_item_name: "",
                        tiles_item_amount: "",
                        tiles_item_remarks: ""
                    }
                ]
            }
        ],

        carpenter_master: [
            {
                carpenter_name: "",
                carpenter_phone: "",
                carpenter_address: "",
                carpenter_contract: "",
                carpenter_contract_amount: "",
                carpenter_s_gst_percent: "",
                carpenter_s_gst_amount: "",
                carpenter_c_gst_percent: "",
                carpenter_c_gst_amount: "",
                carpenter_i_gst_percent: "",
                carpenter_i_gst_amount: "",
                carpenter_items: [
                    {
                        carpenter_item_name: "",
                        carpenter_item_amount: "",
                        carpenter_item_remarks: ""
                    }
                ]
            }
        ],


        painter_master: [
            {
                painter_name: "",
                painter_phone: "",
                painter_address: "",
                painter_contract: "",
                painter_contract_amount: "",
                painter_s_gst_percent: "",
                painter_s_gst_amount: "",
                painter_c_gst_percent: "",
                painter_c_gst_amount: "",
                painter_i_gst_percent: "",
                painter_i_gst_amount: "",
                painter_items: [
                    {
                        painter_item_name: "",
                        painter_item_amount: "",
                        painter_item_remarks: ""
                    }
                ]
            }
        ],

        other_master: [
            {
                other_name: "",
                other_phone: "",
                other_address: "",
                other_contract: "",
                other_contract_amount: "",
                other_s_gst_percent: "",
                other_s_gst_amount: "",
                other_c_gst_percent: "",
                other_c_gst_amount: "",
                other_i_gst_percent: "",
                other_i_gst_amount: "",
                other_items: [
                    {
                        other_item_name: "",
                        other_item_amount: "",
                        other_item_remarks: ""
                    }
                ]
            }
        ]

    });

    // Add Entries
    function AddCenteringEntry()
    {
        setFormData(prev => ({
            ...prev,
            centering_master: [
                ...prev.centering_master,
                {
                    centering_item: "",
                    centering_item_amount: "0",
                    centering_item_remarks: ""

                }

            ],
        }));
    }

    // Plumbing
    function AddPlumbingEntry()
    {
        setFormData(prev => ({
            ...prev,
            plumbing_master: [
                ...prev.plumbing_master,
                {
                    plumbing_item: "",
                    plumbing_item_amount: "0",
                    plumbing_item_remarks: ""

                }

            ],
        }));
    }

    // Electrical
    function AddElectricalEntry()
    {
        setFormData(prev => ({
            ...prev,
            electrical_master: [
                ...prev.electrical_master,
                {
                    electrical_item: "",
                    electrical_item_amount: "0",
                    electrical_item_remarks: ""

                }

            ],
        }));
    }


    // Tiles
    function AddTilesEntry()
    {
        setFormData(prev => ({
            ...prev,
            tiles_master: [
                ...prev.tiles_master,
                {
                    tiles_item: "",
                    tiles_item_amount: "0",
                    tiles_item_remarks: ""

                }

            ],
        }));
    }


    // Carpenter
    function AddCarpenterEntry()
    {
        setFormData(prev => ({
            ...prev,
            carpenter_master: [
                ...prev.carpenter_master,
                {
                    carpenter_item: "",
                    carpenter_item_amount: "0",
                    carpenter_item_remarks: ""

                }

            ],
        }));
    }

    // Painter
    function AddPainterEntry()
    {
        setFormData(prev => ({
            ...prev,
            painter_master: [
                ...prev.painter_master,
                {
                    painter_item: "",
                    painter_item_amount: "0",
                    painter_item_remarks: ""

                }

            ],
        }));
    }


    // Other
    function AddOtherEntry()
    {
        setFormData(prev => ({
            ...prev,
            other_master: [
                ...prev.other_master,
                {
                    other_item: "",
                    other_item_amount: "0",
                    other_item_remarks: ""

                }

            ],
        }));
    }


    // Handle Individual Entries
    function HandleCenteringInputChange(index, field, value)
    {

        const updateCentering = [...formData.centering_master];

        updateCentering[index][field] = value;

        setFormData(prev => ({
            ...prev,
            centering_master: updateCentering,
        }));

    }

    // Plumbing
    function HandlePlumbingInputChange(index, field, value)
    {

        const updatePlumbing = [...formData.plumbing_master];

        updatePlumbing[index][field] = value;

        setFormData(prev => ({
            ...prev,
            plumbing_master: updatePlumbing,
        }));

    }

    // Electrical
    function HandleElectricalInputChange(index, field, value)
    {

        const updateElectrical = [...formData.electrical_master];

        updateElectrical[index][field] = value;

        setFormData(prev => ({
            ...prev,
            electrical_master: updateElectrical,
        }));

    }

    // Tiles
    function HandleTilesInputChange(index, field, value)
    {

        const updateTiles = [...formData.tiles_master];

        updateTiles[index][field] = value;

        setFormData(prev => ({
            ...prev,
            tiles_master: updateTiles,
        }));

    }

    // Carpenter
    function HandleCarpenterInputChange(index, field, value)
    {

        const updateCarpenter = [...formData.carpenter_master];

        updateCarpenter[index][field] = value;

        setFormData(prev => ({
            ...prev,
            carpenter_master: updateCarpenter,
        }));

    }

    // Painter
    function HandlePainterInputChange(index, field, value)
    {

        const updatePainter = [...formData.painter_master];

        updatePainter[index][field] = value;

        setFormData(prev => ({
            ...prev,
            painter_master: updatePainter,
        }));

    }

    // Other
    function HandleOtherInputChange(index, field, value)
    {

        const updateOther = [...formData.other_master];

        updateOther[index][field] = value;

        setFormData(prev => ({
            ...prev,
            other_master: updateOther,
        }));

    }


    // Remove Entry
    function RemoveCenteringEntry(index)
    {

        const update = [...formData.centering_master];

        update.splice(index, 1);

        setFormData(prev => ({
            ...prev,
            centering_master: update,
        }));

    }

    // Plumbing
    function RemovePlumbingEntry(index)
    {

        const update = [...formData.plumbing_master];

        update.splice(index, 1);

        setFormData(prev => ({
            ...prev,
            plumbing_master: update,
        }));

    }

    // Electrical
    function RemoveElectricalEntry(index)
    {

        const update = [...formData.electrical_master];

        update.splice(index, 1);

        setFormData(prev => ({
            ...prev,
            electrical_master: update,
        }));

    }

    // Tiles
    function RemoveTilesEntry(index)
    {

        const update = [...formData.tiles_master];

        update.splice(index, 1);

        setFormData(prev => ({
            ...prev,
            tiles_master: update,
        }));

    }

    // Carpenter
    function RemoveCarpenterEntry(index)
    {

        const update = [...formData.carpenter_master];

        update.splice(index, 1);

        setFormData(prev => ({
            ...prev,
            carpenter_master: update,
        }));

    }

    // Painter
    function RemovePainterEntry(index)
    {

        const update = [...formData.painter_master];

        update.splice(index, 1);

        setFormData(prev => ({
            ...prev,
            painter_master: update,
        }));

    }

    // Other
    function RemoveOtherEntry(index)
    {

        const update = [...formData.other_master];

        update.splice(index, 1);

        setFormData(prev => ({
            ...prev,
            other_master: update,
        }));

    }

    // Render Project Data
    useEffect(() => {

        fetchProject();

    }, [fetchProject]);

    // Project Data
    const ProjectData = Array.isArray(ProjectDataList) ? ProjectDataList : [];

    // Extract Project name
    const ExtractProjectName = ProjectData.filter(item => {
        if (item.status === "Inline" || item.status === "On Going")
        {
            return item.project_name;
        }
    });

    console.log(ExtractProjectName);

    return (
        <div>
            <section className="grid box-border border border-[#A9C1EA] rounded p-4">
                <div className="grid grid-cols-1 gap-y-2 gap-x-2">
                    <div>
                        <motion.div
                            initial={{opacity: 0, y: 100}}
                            animate={{opacity: 1, y: 0}}
                            transition={{delay: 0.1}}
                            className="head text-xl">
                            Add Labour to Project Site
                        </motion.div>
                        <div className="my-2">
                            <motion.hr
                                initial={{opacity: 0, y: 100}}
                                animate={{y: 0, opacity: 1}}
                                className="border-[#6392E5]"/>
                        </div>
                    </div>

                    <form>
                        <div className="grid grid-cols-3 gap-6 py-6">
                            <motion.label
                                initial={{opacity: 0, y: 100}}
                                animate={{opacity: 1, y: 0}}
                                transition={{delay: 0.1}}
                                className="grid" htmlFor="type">
                                <span className="mx-2">Project Type (Site)</span>
                                <select name="type"
                                        className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4">
                                    <option>
                                        Select Project Type
                                    </option>
                                    {


                                        ExtractProjectName.map((item, index) => (

                                            <option key={index}>
                                                { item.project_name }
                                            </option>

                                        ))

                                    }

                                </select>
                            </motion.label>
                        </div>
                        <div className="my-2">
                            <motion.hr
                                initial={{opacity: 0, y: 100}}
                                animate={{y: 0, opacity: 1}}
                                className="border-[#6392E5]"/>
                        </div>


                        {/* mason */}
                        <motion.div className="border items-center border-[#A9C1EA] bg-[#F1F1F1] rounded p-4 my-4">
                            <div className="flex gap-4">
                                <div className="grid justify-center items-center bg-[#C9D8F3] text-[#005bea] rounded p-4">
                                    <UsersRound />
                                </div>
                                <div>
                                    <p className="head text-xl text-[#005bea]">
                                        Mason
                                    </p>

                                    <p>
                                        A skilled artisan specializing in the construction of structures from masonry materials
                                    </p>
                                </div>
                            </div>
                        </motion.div>

                        <div className="grid-cols-1 gap-10">
                            <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 my-4 gap-6">
                                <motion.label
                                    initial={{opacity: 0, y: 100}}
                                    animate={{opacity: 1, y: 0}}
                                    transition={{delay: 0.1}}
                                    className="grid" htmlFor="name">
                                    <span className="mx-2">Mason Name</span>
                                    <input
                                        type="text"
                                        value={formData.mason_master[0].mason_name}
                                        onChange={(e) => setFormData({...formData, mason_master: [{ ...formData.mason_master[0], mason_name: e.target.value }]})}
                                        className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                        placeholder="Enter the Name"
                                    />
                                </motion.label>
                                <motion.label
                                    initial={{opacity: 0, y: 100}}
                                    animate={{opacity: 1, y: 0}}
                                    transition={{delay: 0.2}}
                                    className="grid" htmlFor="phone">
                                    <span className="mx-2">Phone</span>
                                    <input type="text"
                                           value={formData.mason_master[0].mason_phone}
                                           onChange={(e) => setFormData({...formData, mason_master: [{ ...formData.mason_master[0], mason_phone: e.target.value }]})}
                                           className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded  p-4"
                                           placeholder="Enter the Phone No" />
                                </motion.label>
                                <motion.label
                                    initial={{opacity: 0, y: 100}}
                                    animate={{opacity: 1, y: 0}}
                                    transition={{delay: 0.3}}
                                    className="grid" htmlFor="address">
                                    <span className="mx-2">Address</span>
                                    <input type="text"
                                           value={formData.mason_master[0].mason_address}
                                           onChange={(e) => setFormData({...formData, mason_master: [{ ...formData.mason_master[0], mason_address: e.target.value }]})}
                                           className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                           placeholder="Enter the Address" />
                                </motion.label>
                                <motion.label
                                    initial={{opacity: 0, y: 100}}
                                    animate={{opacity: 1, y: 0}}
                                    transition={{delay: 0.4}}
                                    className="grid" htmlFor="Labour">
                                    <span className="mx-2">Total Mason Contract</span>
                                    <input name="text"
                                           value={formData.mason_master[0].mason_contract}
                                           onChange={(e) => setFormData({...formData, mason_master: [{ ...formData.mason_master[0], mason_contract: e.target.value }]})}
                                           className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                           id="role" placeholder="Enter Per Sqft"/>
                                </motion.label>
                                <motion.label
                                    initial={{opacity: 0, y: 100}}
                                    animate={{opacity: 1, y: 0}}
                                    transition={{delay: 0.5}}
                                    className="grid" htmlFor="Cotract">
                                    <span className="mx-2">Total Contract Amount</span>
                                    <input name="text"
                                            value={formData.mason_master[0].mason_contract_amount}
                                            onChange={(e) => setFormData({...formData, mason_master: [{ ...formData.mason_master[0], mason_contract_amount: e.target.value }]})}
                                            className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                            id="role" placeholder="Enter the Amount"/>
                                </motion.label>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1 my-6 gap-6">
                                <motion.label
                                    initial={{opacity: 0, y: 100}}
                                    animate={{opacity: 1, y: 0}}
                                    transition={{delay: 0.6}}
                                    className="grid" htmlFor="basement">
                                    <span className="mx-2">Basement</span>
                                    <div className="grid grid-cols-1 md:flex lg:flex xl:flex gap-4">
                                        <input type="text"
                                               value={formData.mason_master[0].mason_basement}
                                               onChange={(e) => setFormData({...formData, mason_master: [{ ...formData.mason_master[0], mason_basement: e.target.value }]})}
                                               className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                               placeholder="Enter the Remarks" />
                                        <input type="text"
                                               value={formData.mason_master[0].mason_basement_amount}
                                               onChange={(e) => setFormData({...formData, mason_master: [{ ...formData.mason_master[0], mason_basement_amount: e.target.value }]})}
                                               className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                               placeholder="Amount" />
                                    </div>
                                </motion.label>
                                <motion.label
                                    initial={{opacity: 0, y: 100}}
                                    animate={{opacity: 1, y: 0}}
                                    transition={{delay: 0.7}}
                                    className="grid" htmlFor="lintel">
                                    <span className="mx-2">Lintel</span>
                                    <div className="grid grid-cols-1 md:flex lg:flex xl:flex gap-4">
                                        <input type="text"
                                               value={formData.mason_master[0].mason_lintel}
                                               onChange={(e) => setFormData({...formData, mason_master: [{ ...formData.mason_master[0], mason_lintel: e.target.value }]})}
                                               className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                               placeholder="Enter the Remarks" />
                                        <input type="text"
                                               value={formData.mason_master[0].mason_lintel_amount}
                                               onChange={(e) => setFormData({...formData, mason_master: [{ ...formData.mason_master[0], mason_lintel_amount: e.target.value }]})}
                                               className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                               placeholder="Amount" />
                                    </div>
                                </motion.label>
                                <motion.label
                                    initial={{opacity: 0, y: 100}}
                                    animate={{opacity: 1, y: 0}}
                                    transition={{delay: 0.8}}
                                    className="grid" htmlFor="roof">
                                    <span className="mx-2">Roof</span>
                                    <div className="grid grid-cols-1 md:flex lg:flex xl:flex gap-4">
                                        <input type="text"
                                               value={formData.mason_master[0].mason_roof}
                                               onChange={(e) => setFormData({...formData, mason_master: [{ ...formData.mason_master[0], mason_roof: e.target.value }]})}
                                               className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                               placeholder="Enter the Remarks" />
                                        <input type="text"
                                               value={formData.mason_master[0].mason_roof_amount}
                                               onChange={(e) => setFormData({...formData, mason_master: [{ ...formData.mason_master[0], mason_roof_amount: e.target.value }]})}
                                               className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                               placeholder="Amount" />
                                    </div>
                                </motion.label>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1 my-6 gap-6">
                                <motion.label
                                    initial={{opacity: 0, y: 100}}
                                    animate={{opacity: 1, y: 0}}
                                    transition={{delay: 0.9}}
                                    className="grid" htmlFor="outer">
                                    <span className="mx-2">Outer Plastering</span>
                                    <div className="grid grid-cols-1 md:flex lg:flex xl:flex gap-4">
                                        <input type="text"
                                               value={formData.mason_master[0].mason_outer_plastering}
                                               onChange={(e) => setFormData({...formData, mason_master: [{ ...formData.mason_master[0], mason_outer_plastering: e.target.value }]})}
                                               className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                               placeholder="Enter the Remarks" />
                                        <input type="text"
                                               value={formData.mason_master[0].mason_outer_plastering_amount}
                                               onChange={(e) => setFormData({...formData, mason_master: [{ ...formData.mason_master[0], mason_outer_plastering_amount: e.target.value }]})}
                                               className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                               placeholder="Amount" />
                                    </div>
                                </motion.label>
                                <motion.label
                                    initial={{opacity: 0, y: 100}}
                                    animate={{opacity: 1, y: 0}}
                                    transition={{delay: 1.0}}
                                    className="grid" htmlFor="innerr">
                                    <span className="mx-2">Inner Plastering</span>
                                    <div className="grid grid-cols-1 md:flex lg:flex xl:flex gap-4">
                                        <input type="text"
                                               value={formData.mason_master[0].mason_inner_plastering}
                                               onChange={(e) => setFormData({...formData, mason_master: [{ ...formData.mason_master[0], mason_inner_plastering: e.target.value }]})}
                                               className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                               placeholder="Enter the Remarks" />
                                        <input type="text"
                                               value={formData.mason_master[0].mason_inner_plastering_amount}
                                               onChange={(e) => setFormData({...formData, mason_master: [{ ...formData.mason_master[0], mason_inner_plastering_amount: e.target.value }]})}
                                               className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                               placeholder="Amount" />
                                    </div>
                                </motion.label>
                                <motion.label
                                    initial={{opacity: 0, y: 100}}
                                    animate={{opacity: 1, y: 0}}
                                    transition={{delay: 1.1}}
                                    className="grid" htmlFor="tank">
                                    <span className="mx-2">Septic Tank</span>
                                    <div className="grid grid-cols-1 md:flex lg:flex xl:flex gap-4">
                                        <input type="text"
                                               value={formData.mason_master[0].mason_septic_tank}
                                               onChange={(e) => setFormData({...formData, mason_master: [{ ...formData.mason_master[0], mason_septic_tank: e.target.value }]})}
                                               className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                               placeholder="Enter the Remarks" />
                                        <input type="text"
                                               value={formData.mason_master[0].mason_septic_tank_amount}
                                               onChange={(e) => setFormData({...formData, mason_master: [{ ...formData.mason_master[0], mason_septic_tank_amount: e.target.value }]})}
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
                                    className="grid" htmlFor="SGST">
                                    <span className="mx-2">SGST</span>
                                    <div className="grid grid-cols-1 md:flex lg:flex xl:flex gap-4">
                                        <input type="text"
                                               value={formData.mason_master[0].mason_s_gst_amount}
                                               onChange={(e) => setFormData({...formData, mason_master: [{ ...formData.mason_master[0], mason_s_gst_percent: e.target.value }]})}
                                               className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                               placeholder="%" />
                                        <input type="text"
                                               value={formData.mason_master[0].mason_s_gst_amount}
                                               onChange={(e) => setFormData({...formData, mason_master: [{ ...formData.mason_master[0], mason_s_gst_amount: e.target.value }]})}
                                               className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                               placeholder="Amount" />
                                    </div>
                                </motion.label>
                                <motion.label
                                    initial={{opacity: 0, y: 100}}
                                    animate={{opacity: 1, y: 0}}
                                    transition={{delay: 1.3}}
                                    className="grid" htmlFor="CGST">
                                    <span className="mx-2">CGST</span>
                                    <div className="grid grid-cols-1 md:flex lg:flex xl:flex gap-4">
                                        <input type="text"
                                               value={formData.mason_master[0].mason_c_gst_percent}
                                               onChange={(e) => setFormData({...formData, mason_master: [{ ...formData.mason_master[0], mason_c_gst_percent: e.target.value }]})}
                                               className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                               placeholder="%" />
                                        <input type="text"
                                               value={formData.mason_master[0].mason_c_gst_amount}
                                               onChange={(e) => setFormData({...formData, mason_master: [{ ...formData.mason_master[0], mason_c_gst_amount: e.target.value }]})}
                                               className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                               placeholder="Amount" />
                                    </div>
                                </motion.label>
                                <motion.label
                                    initial={{opacity: 0, y: 100}}
                                    animate={{opacity: 1, y: 0}}
                                    transition={{delay: 1.4}}
                                    className="grid" htmlFor="IGST">
                                    <span className="mx-2">IGST</span>
                                    <div className="grid grid-cols-1 md:flex lg:flex xl:flex gap-4">
                                        <input type="text"
                                               value={formData.mason_master[0].mason_i_gst_percent}
                                               onChange={(e) => setFormData({...formData, mason_master: [{ ...formData.mason_master[0], mason_i_gst_percent: e.target.value }]})}
                                               className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                               placeholder="%" />
                                        <input type="text"
                                               value={formData.mason_master[0].mason_i_gst_amount}
                                               onChange={(e) => setFormData({...formData, mason_master: [{ ...formData.mason_master[0], mason_i_gst_amount: e.target.value }]})}
                                               className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                               placeholder="Amount" />
                                    </div>
                                </motion.label>
                            </div>
                        </div>


                        <div className="grid md:grid lg:grid xl:grid gap-2 py-4">
                            <div className="flex justify-between items-center">
                                <motion.label
                                    className="flex gap-x-2 items-center"
                                    initial={{opacity: 0, y: 100}}
                                    animate={{opacity: 1, y: 0}}
                                    transition={{delay: 0.2}}
                                    htmlFor="box">
                                    Total Contract Amount for Mason
                                </motion.label>

                                <motion.div
                                    initial={{opacity: 0, y: 100}}
                                    animate={{opacity: 1, y: 0}}
                                    transition={{delay: 0.3}}>
                                    <p className="text-[#005BEA] text-xl">
                                        Some Number in Rupee
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

                        {/* Centering */}
                        <motion.div className="border items-center border-[#A9C1EA] bg-[#F1F1F1] rounded p-4 my-4">
                            <div className="flex gap-4">
                                <div className="grid justify-center items-center bg-[#C9D8F3] text-[#005bea] rounded p-4">
                                    <ChevronUp />
                                </div>
                                <div>
                                    <p className="head text-xl text-[#005bea]">
                                        Centering
                                    </p>

                                    <p>
                                        A technique used to find the middle point or position of an object, text, or a layout
                                    </p>
                                </div>
                            </div>
                        </motion.div>


                        <div className="grid-cols-1 gap-10">
                            <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 my-6 gap-6">
                                <motion.label
                                    initial={{opacity: 0, y: 100}}
                                    animate={{opacity: 1, y: 0}}
                                    transition={{delay: 0.1}}
                                    className="grid" htmlFor="name">
                                    <span className="mx-2">Name</span>
                                    <input type="text"
                                           value={formData.centering_master[0].centering_name}
                                           onChange={(e) => setFormData({...formData, centering_master: [{ ...formData.centering_master[0], centering_name: e.target.value }]})}
                                           className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                           placeholder="Enter the Name" />
                                </motion.label>
                                <motion.label
                                    initial={{opacity: 0, y: 100}}
                                    animate={{opacity: 1, y: 0}}
                                    transition={{delay: 0.2}}
                                    className="grid" htmlFor="phone">
                                    <span className="mx-2">Phone</span>
                                    <input type="text"
                                           value={formData.centering_master[0].centering_phone}
                                           onChange={(e) => setFormData({...formData, centering_master: [{ ...formData.centering_master[0], centering_phone: e.target.value }]})}
                                           className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                           placeholder="Enter the Phone No" />
                                </motion.label>
                                <motion.label
                                    initial={{opacity: 0, y: 100}}
                                    animate={{opacity: 1, y: 0}}
                                    transition={{delay: 0.3}}
                                    className="grid" htmlFor="address">
                                    <span className="mx-2">Address</span>
                                    <input type="text"
                                           value={formData.centering_master[0].centering_address}
                                           onChange={(e) => setFormData({...formData, centering_master: [{ ...formData.centering_master[0], centering_address: e.target.value }]})}
                                           className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                           placeholder="Enter the Address" />
                                </motion.label>
                                <motion.label
                                    initial={{opacity: 0, y: 100}}
                                    animate={{opacity: 1, y: 0}}
                                    transition={{delay: 0.4}}
                                    className="grid" htmlFor="Labour">
                                    <span className="mx-2">Total Centering Contract</span>
                                    <input name="text"
                                           value={formData.centering_master[0].centering_contract}
                                           onChange={(e) => setFormData({...formData, centering_master: [{ ...formData.centering_master[0], centering_contract: e.target.value }]})}
                                           className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                           id="role" placeholder="Enter Per Sqft"/>
                                </motion.label>
                                <motion.label
                                    initial={{opacity: 0, y: 100}}
                                    animate={{opacity: 1, y: 0}}
                                    transition={{delay: 0.5}}
                                    className="grid" htmlFor="Cotract">
                                    <span className="mx-2">Total Contract Amount</span>
                                    <input name="text"
                                           value={formData.centering_master[0].centering_contract_amount}
                                           onChange={(e) => setFormData({...formData, centering_master: [{ ...formData.centering_master[0], centering_contract_amount: e.target.value }]})}
                                           className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                           id="role" placeholder="Enter the Amount"/>
                                </motion.label>
                            </div>

                            <div className="grid md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1 my-6 gap-6">
                                <motion.label
                                    initial={{opacity: 0, y: 100}}
                                    animate={{opacity: 1, y: 0}}
                                    transition={{delay: 0.6}}
                                    className="grid" htmlFor="ground">
                                    <span className="mx-2">Footing Ground</span>
                                    <div className="grid grid-cols-1 md:flex lg:flex xl:flex gap-4">
                                        <input type="text"
                                               value={formData.centering_master[0].footing_ground}
                                               onChange={(e) => setFormData({...formData, centering_master: [{ ...formData.centering_master[0], footing_ground: e.target.value }]})}
                                               className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                               placeholder="Enter the Remarks" />
                                        <input type="text"
                                               value={formData.centering_master[0].footing_ground_amount}
                                               onChange={(e) => setFormData({...formData, centering_master: [{ ...formData.centering_master[0], footing_ground_amount: e.target.value }]})}
                                               className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                               placeholder="Amount" />
                                    </div>
                                </motion.label>
                                <motion.label
                                    initial={{opacity: 0, y: 100}}
                                    animate={{opacity: 1, y: 0}}
                                    transition={{delay: 0.7}}
                                    className="grid" htmlFor="beam">
                                    <span className="mx-2">Plinth Beam</span>
                                    <div className="grid grid-cols-1 md:flex lg:flex xl:flex gap-4">
                                        <input type="text"
                                               value={formData.centering_master[0].plinth_beam}
                                               onChange={(e) => setFormData({...formData, centering_master: [{ ...formData.centering_master[0], plinth_beam: e.target.value }]})}
                                               className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                               placeholder="Enter the Remarks" />
                                        <input type="text"
                                               value={formData.centering_master[0].plinth_beam_amount}
                                               onChange={(e) => setFormData({...formData, centering_master: [{ ...formData.centering_master[0], plinth_beam_amount: e.target.value }]})}
                                               className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                               placeholder="Amount" />
                                    </div>
                                </motion.label>
                                <motion.label
                                    initial={{opacity: 0, y: 100}}
                                    animate={{opacity: 1, y: 0}}
                                    transition={{delay: 0.8}}
                                    className="grid" htmlFor="feet">
                                    <span className="mx-2">3 Feet Basement Column</span>
                                    <div className="grid grid-cols-1 md:flex lg:flex xl:flex gap-4">
                                        <input type="text"
                                               value={formData.centering_master[0].plinth_beam_amount}
                                               onChange={(e) => setFormData({...formData, centering_master: [{ ...formData.centering_master[0], plinth_beam_amount: e.target.value }]})}
                                               className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded  p-4"
                                               placeholder="Enter the Remarks" />
                                        <input type="text"
                                               value={formData.centering_master[0].plinth_beam_amount}
                                               onChange={(e) => setFormData({...formData, centering_master: [{ ...formData.centering_master[0], plinth_beam_amount: e.target.value }]})}
                                               className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                               placeholder="Amount" />
                                    </div>
                                </motion.label>
                                <motion.label
                                    initial={{opacity: 0, y: 100}}
                                    animate={{opacity: 1, y: 0}}
                                    transition={{delay: 0.9}}
                                    className="grid" htmlFor="outer">
                                    <span className="mx-2">Outer Plastering</span>
                                    <div className="grid grid-cols-1 md:flex lg:flex xl:flex gap-4">
                                        <input type="text"
                                               value={formData.centering_master[0].outer_plastering}
                                               onChange={(e) => setFormData({...formData, centering_master: [{ ...formData.centering_master[0], outer_plastering: e.target.value }]})}
                                               className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded  p-4"
                                               placeholder="Enter the Remarks" />
                                        <input type="text"
                                               value={formData.centering_master[0].outer_plastering_amount}
                                               onChange={(e) => setFormData({...formData, centering_master: [{ ...formData.centering_master[0], outer_plastering_amount: e.target.value }]})}
                                               className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                               placeholder="Amount" />
                                    </div>
                                </motion.label>
                            </div>

                            <div className="grid md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1 my-6 gap-6">
                                <motion.label
                                    initial={{opacity: 0, y: 100}}
                                    animate={{opacity: 1, y: 0}}
                                    transition={{delay: 1.0}}
                                    className="grid" htmlFor="feet">
                                    <span className="mx-2">7 Feet Column</span>
                                    <div className="grid grid-cols-1 md:flex lg:flex xl:flex gap-4">
                                        <input type="text"
                                               value={formData.centering_master[0].feet_column}
                                               onChange={(e) => setFormData({...formData, centering_master: [{ ...formData.centering_master[0], feet_column: e.target.value }]})}
                                               className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded  p-4"
                                               placeholder="Enter the Remarks" />
                                        <input type="text"
                                               value={formData.centering_master[0].feet_column_amount}
                                               onChange={(e) => setFormData({...formData, centering_master: [{ ...formData.centering_master[0], feet_column_amount: e.target.value }]})}
                                               className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded  p-4"
                                               placeholder="Amount" />
                                    </div>
                                </motion.label>
                                <motion.label
                                    initial={{opacity: 0, y: 100}}
                                    animate={{opacity: 1, y: 0}}
                                    transition={{delay: 1.1}}
                                    className="grid" htmlFor="beam">
                                    <span className="mx-2">Lintel Beam</span>
                                    <div className="grid grid-cols-1 md:flex lg:flex xl:flex gap-4">
                                        <input type="text"
                                               value={formData.centering_master[0].lintel_beam}
                                               onChange={(e) => setFormData({...formData, centering_master: [{ ...formData.centering_master[0], lintel_beam: e.target.value }]})}
                                               className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                               placeholder="Enter the Remarks" />
                                        <input type="text"
                                               value={formData.centering_master[0].lintel_beam_amount}
                                               onChange={(e) => setFormData({...formData, centering_master: [{ ...formData.centering_master[0], lintel_beam_amount: e.target.value }]})}
                                               className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                               placeholder="Amount" />
                                    </div>
                                </motion.label>
                                <motion.label
                                    initial={{opacity: 0, y: 100}}
                                    animate={{opacity: 1, y: 0}}
                                    transition={{delay: 1.2}}
                                    className="grid" htmlFor="feet">
                                    <span className="mx-2">3 Feet After Lintel Column</span>
                                    <div className="grid grid-cols-1 md:flex lg:flex xl:flex gap-4">
                                        <input type="text"
                                               value={formData.centering_master[0].after_lintel_column}
                                               onChange={(e) => setFormData({...formData, centering_master: [{ ...formData.centering_master[0], after_lintel_column: e.target.value }]})}
                                               className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                               placeholder="Enter the Remarks" />
                                        <input type="text"
                                               value={formData.centering_master[0].after_lintel_column_amount}
                                               onChange={(e) => setFormData({...formData, centering_master: [{ ...formData.centering_master[0], after_lintel_column_amount: e.target.value }]})}
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
                                               value={formData.centering_master[0].hide_beam}
                                               onChange={(e) => setFormData({...formData, centering_master: [{ ...formData.centering_master[0], hide_beam: e.target.value }]})}
                                               className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                               placeholder="Enter the Remarks" />
                                        <input type="text"
                                               value={formData.centering_master[0].hide_beam_amount}
                                               onChange={(e) => setFormData({...formData, centering_master: [{ ...formData.centering_master[0], hide_beam_amount: e.target.value }]})}
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
                                               value={formData.centering_master[0].centering_roof}
                                               onChange={(e) => setFormData({...formData, centering_master: [{ ...formData.centering_master[0], centering_roof: e.target.value }]})}
                                               className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                               placeholder="Enter the Remarks" />
                                        <input type="text"
                                               value={formData.centering_master[0].centering_roof_amount}
                                               onChange={(e) => setFormData({...formData, centering_master: [{ ...formData.centering_master[0], centering_roof_amount: e.target.value }]})}
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
                                               value={formData.centering_master[0].roof_beam}
                                               onChange={(e) => setFormData({...formData, centering_master: [{ ...formData.centering_master[0], roof_beam: e.target.value }]})}
                                               className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                               placeholder="Enter the Remarks" />
                                        <input type="text"
                                               value={formData.centering_master[0].roof_beam_amount}
                                               onChange={(e) => setFormData({...formData, centering_master: [{ ...formData.centering_master[0], roof_beam_amount: e.target.value }]})}
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

                                    formData.centering_master.map((item, index) =>

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
                                                                       value={formData.centering_item_name}
                                                                       onChange={(ev) => HandleCenteringInputChange(...formData, 'centering_item_name', ev.target.value)}
                                                                       className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                                                       placeholder="Enter Item Name"
                                                                />
                                                                <input type="text"
                                                                       value={formData.centering_item_amount}
                                                                       onChange={(ev) => HandleCenteringInputChange(...formData, 'centering_item_amount', ev.target.value)}
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
                                                                   value={formData.centering_item_remarks}
                                                                   onChange={(ev) => HandleCenteringInputChange(...formData, 'centering_item_remarks', ev.target.value)}
                                                                   className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                                                   placeholder="Enter any Remarks" />
                                                        </motion.label>
                                                    {
                                                        formData.centering_master.length > 1

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
                            </div>


                        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1 my-4 gap-6">
                                <motion.label
                                    initial={{opacity: 0, y: 100}}
                                    animate={{opacity: 1, y: 0}}
                                    transition={{delay: 1.9}}
                                    className="grid" htmlFor="SGST">
                                    <span className="mx-2">SGST</span>
                                    <div className="grid grid-cols-1 md:flex lg:flex xl:flex gap-4">
                                        <input type="text"
                                               value={formData.centering_master[0].centering_s_gst_percent}
                                               onChange={(e) => setFormData({...formData, centering_master: [{ ...formData.centering_master[0], centering_s_gst_percent: e.target.value }]})}
                                               className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                               placeholder="%" />
                                        <input type="text"
                                               value={formData.centering_master[0].centering_s_gst_amount}
                                               onChange={(e) => setFormData({...formData, centering_master: [{ ...formData.centering_master[0], centering_s_gst_amount: e.target.value }]})}
                                               className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                               placeholder="Amount" />
                                    </div>
                                </motion.label>
                                <motion.label
                                    initial={{opacity: 0, y: 100}}
                                    animate={{opacity: 1, y: 0}}
                                    transition={{delay: 2.0}}
                                    className="grid" htmlFor="CGST">
                                    <span className="mx-2">CGST</span>
                                    <div className="grid grid-cols-1 md:flex lg:flex xl:flex gap-4">
                                        <input type="text"
                                               value={formData.centering_master[0].centering_c_gst_percent}
                                               onChange={(e) => setFormData({...formData, centering_master: [{ ...formData.centering_master[0], centering_c_gst_percent: e.target.value }]})}
                                               className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                               placeholder="%" />
                                        <input type="text"
                                               value={formData.centering_master[0].centering_c_gst_amount}
                                               onChange={(e) => setFormData({...formData, centering_master: [{ ...formData.centering_master[0], centering_c_gst_amount: e.target.value }]})}
                                               className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                               placeholder="Amount" />
                                    </div>
                                </motion.label>
                                <motion.label
                                    initial={{opacity: 0, y: 100}}
                                    animate={{opacity: 1, y: 0}}
                                    transition={{delay: 2.1}}
                                    className="grid" htmlFor="IGST">
                                    <span className="mx-2">IGST</span>
                                    <div className="grid grid-cols-1 md:flex lg:flex xl:flex gap-4">
                                        <input type="text"
                                               value={formData.centering_master[0].centering_i_gst_percent}
                                               onChange={(e) => setFormData({...formData, centering_master: [{ ...formData.centering_master[0], centering_i_gst_percent: e.target.value }]})}
                                               className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                               placeholder="%" />
                                        <input type="text"
                                               value={formData.centering_master[0].centering_i_gst_amount}
                                               onChange={(e) => setFormData({...formData, centering_master: [{ ...formData.centering_master[0], centering_i_gst_amount: e.target.value }]})}
                                               className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                               placeholder="Amount" />
                                    </div>
                                </motion.label>
                        </div>

                        <div className="grid md:grid lg:grid xl:grid gap-2 py-4">
                            <div className="flex justify-between items-center">
                                <motion.label
                                    className="flex gap-x-2 items-center"
                                    initial={{opacity: 0, y: 100}}
                                    animate={{opacity: 1, y: 0}}
                                    transition={{delay: 0.2}}
                                    htmlFor="box">
                                    Total Contract Amount for Centering
                                </motion.label>

                                <motion.div
                                    initial={{opacity: 0, y: 100}}
                                    animate={{opacity: 1, y: 0}}
                                    transition={{delay: 0.3}}>
                                    <p className="text-[#005BEA] text-xl">
                                        Some Number in Rupee
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


                        {/* Plumbing */}
                        <motion.div className="border items-center border-[#A9C1EA] bg-[#F1F1F1] rounded p-4 my-4">
                            <div className="flex gap-4">
                                <div className="grid justify-center items-center bg-[#C9D8F3] text-[#005bea] rounded p-4">
                                    <AudioWaveform />
                                </div>
                                <div>
                                    <p className="head text-xl text-[#005bea]">
                                        Plumbing
                                    </p>

                                    <p>
                                        The system of pipes, tanks, and fixtures for the distribution of water
                                    </p>
                                </div>
                            </div>
                        </motion.div>

                        <div>
                            <div className="grid md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 my-6 gap-6">
                                <motion.label
                                    initial={{opacity: 0, y: 100}}
                                    animate={{opacity: 1, y: 0}}
                                    transition={{delay: 0.1}}
                                    className="grid" htmlFor="name">
                                    <span className="mx-2">Name</span>
                                    <input type="text"
                                           value={formData.plumbing_master[0].plumbing_name}
                                           onChange={(e) => setFormData({...formData, plumbing_master: [{ ...formData.plumbing_master[0], plumbing_name: e.target.value }]})}
                                           className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                           placeholder="Enter the Name" />
                                </motion.label>
                                <motion.label
                                    initial={{opacity: 0, y: 100}}
                                    animate={{opacity: 1, y: 0}}
                                    transition={{delay: 0.2}}
                                    className="grid" htmlFor="phone">
                                    <span className="mx-2">Phone</span>
                                    <input type="text"
                                           value={formData.plumbing_master[0].plumbing_phone}
                                           onChange={(e) => setFormData({...formData, plumbing_master: [{ ...formData.plumbing_master[0], plumbing_phone: e.target.value }]})}
                                           className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                           placeholder="Enter the Phone No" />
                                </motion.label>
                                <motion.label
                                    initial={{opacity: 0, y: 100}}
                                    animate={{opacity: 1, y: 0}}
                                    transition={{delay: 0.3}}
                                    className="grid" htmlFor="address">
                                    <span className="mx-2">Address</span>
                                    <input type="text"
                                           value={formData.plumbing_master[0].plumbing_address}
                                           onChange={(e) => setFormData({...formData, plumbing_master: [{ ...formData.plumbing_master[0], plumbing_address: e.target.value }]})}
                                           className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                           placeholder="Enter the Address" />
                                </motion.label>
                                <motion.label
                                    initial={{opacity: 0, y: 100}}
                                    animate={{opacity: 1, y: 0}}
                                    transition={{delay: 0.4}}
                                    className="grid" htmlFor="Labour">
                                    <span className="mx-2">Total Plumbing Contract</span>
                                    <input name="text"
                                           value={formData.plumbing_master[0].plumbing_contract}
                                           onChange={(e) => setFormData({...formData, plumbing_master: [{ ...formData.plumbing_master[0], plumbing_contract: e.target.value }]})}
                                           className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                           id="role" placeholder="Enter Per Sqft"/>
                                </motion.label>
                                <motion.label
                                    initial={{opacity: 0, y: 100}}
                                    animate={{opacity: 1, y: 0}}
                                    transition={{delay: 0.5}}
                                    className="grid" htmlFor="Cotract">
                                    <span className="mx-2">Total Contract Amount</span>
                                    <input name="text"
                                           value={formData.plumbing_master[0].plumbing_contract_amount}
                                           onChange={(e) => setFormData({...formData, plumbing_master: [{ ...formData.plumbing_master[0], plumbing_contract_amount: e.target.value }]})}
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

                                    formData.plumbing_master.map((item, index) =>

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
                                                                       value={formData.plumbing_item_name}
                                                                       onChange={(ev) => HandlePlumbingInputChange(...formData, 'plumbing_item_name', ev.target.value)}
                                                                       className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                                                       placeholder="Enter Item Name"
                                                                />
                                                                <input type="text"
                                                                       value={formData.plumbing_item_amount}
                                                                       onChange={(ev) => HandlePlumbingInputChange(...formData, 'plumbing_item_amount', ev.target.value)}
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
                                                                   value={formData.plumbing_item_remarks}
                                                                   onChange={(ev) => HandlePlumbingInputChange(...formData, 'plumbing_item_remarks', ev.target.value)}
                                                                   className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                                                   placeholder="Enter any Remarks" />
                                                        </motion.label>
                                                        {
                                                            formData.plumbing_master.length > 1

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
                                        <input type="text"
                                               value={formData.plumbing_master[0].plumbing_s_gst_percent}
                                               onChange={(e) => setFormData({...formData, plumbing_master: [{ ...formData.plumbing_master[0], plumbing_s_gst_percent: e.target.value }]})}
                                               className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                               placeholder="%" />
                                        <input type="text"
                                               value={formData.plumbing_master[0].plumbing_s_gst_amount}
                                               onChange={(e) => setFormData({...formData, plumbing_master: [{ ...formData.plumbing_master[0], plumbing_s_gst_amount: e.target.value }]})}
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
                                        <input type="text"
                                               value={formData.plumbing_master[0].plumbing_c_gst_percent}
                                               onChange={(e) => setFormData({...formData, plumbing_master: [{ ...formData.plumbing_master[0], plumbing_c_gst_percent: e.target.value }]})}
                                               className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                               placeholder="%" />
                                        <input type="text"
                                               value={formData.plumbing_master[0].plumbing_c_gst_amount}
                                               onChange={(e) => setFormData({...formData, plumbing_master: [{ ...formData.plumbing_master[0], plumbing_c_gst_amount: e.target.value }]})}
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
                                        <input type="text"
                                               value={formData.plumbing_master[0].plumbing_i_gst_percent}
                                               onChange={(e) => setFormData({...formData, plumbing_master: [{ ...formData.plumbing_master[0], plumbing_i_gst_percent: e.target.value }]})}
                                               className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                               placeholder="%" />
                                        <input type="text"
                                               value={formData.plumbing_master[0].plumbing_i_gst_amount}
                                               onChange={(e) => setFormData({...formData, plumbing_master: [{ ...formData.plumbing_master[0], plumbing_i_gst_amount: e.target.value }]})}
                                               className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                               placeholder="Amount" />
                                    </div>
                                </motion.label>
                            </div>
                        </div>

                        <div className="grid md:grid lg:grid xl:grid gap-2 py-4">
                            <div className="flex justify-between items-center">
                                <motion.label
                                    className="flex gap-x-2 items-center"
                                    initial={{opacity: 0, y: 100}}
                                    animate={{opacity: 1, y: 0}}
                                    transition={{delay: 0.2}}
                                    htmlFor="box">
                                    Total Contract Amount for Plumbing
                                </motion.label>


                                <motion.div
                                    initial={{opacity: 0, y: 100}}
                                    animate={{opacity: 1, y: 0}}
                                    transition={{delay: 0.3}}>
                                    <p className="text-[#005BEA] text-xl">
                                        Some Number in Rupee
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


                        {/* Electrical Labour Creation */}
                        <motion.div className="border items-center border-[#A9C1EA] bg-[#F1F1F1] rounded p-4 my-4">
                            <div className="flex gap-4">
                                <div className="grid justify-center items-center bg-[#C9D8F3] text-[#005bea] rounded p-4">
                                    <Plug />
                                </div>
                                <div>
                                    <p className="head text-xl text-[#005bea]">
                                        Electrical Labour Creation
                                    </p>

                                    <p>
                                        Digging or drilling into walls, floors, or ceilings to create space for electrical components
                                    </p>
                                </div>
                            </div>
                        </motion.div>

                        <div>
                            <div className="grid md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 my-4 gap-6">
                                <motion.label
                                    initial={{opacity: 0, y: 100}}
                                    animate={{opacity: 1, y: 0}}
                                    transition={{delay: 0.1}}
                                    className="grid" htmlFor="name">
                                    <span className="mx-2">Name</span>
                                    <input type="text"
                                           value={formData.electrical_master[0].electrical_name}
                                           onChange={(e) => setFormData({...formData, electrical_master: [{ ...formData.electrical_master[0], electrical_name: e.target.value }]})}
                                           className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                           placeholder="Enter the Name" />
                                </motion.label>
                                <motion.label
                                    initial={{opacity: 0, y: 100}}
                                    animate={{opacity: 1, y: 0}}
                                    transition={{delay: 0.2}}
                                    className="grid" htmlFor="phone">
                                    <span className="mx-2">Phone</span>
                                    <input type="text"
                                           value={formData.electrical_master[0].electrical_phone}
                                           onChange={(e) => setFormData({...formData, electrical_master: [{ ...formData.electrical_master[0], electrical_phone: e.target.value }]})}
                                           className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                           placeholder="Enter the Phone No" />
                                </motion.label>
                                <motion.label
                                    initial={{opacity: 0, y: 100}}
                                    animate={{opacity: 1, y: 0}}
                                    transition={{delay: 0.3}}
                                    className="grid" htmlFor="address">
                                    <span className="mx-2">Address</span>
                                    <input type="text"
                                           value={formData.electrical_master[0].electrical_address}
                                           onChange={(e) => setFormData({...formData, electrical_master: [{ ...formData.electrical_master[0], electrical_address: e.target.value }]})}
                                           className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                           placeholder="Enter the Address" />
                                </motion.label>
                                <motion.label
                                    initial={{opacity: 0, y: 100}}
                                    animate={{opacity: 1, y: 0}}
                                    transition={{delay: 0.4}}
                                    className="grid" htmlFor="Labour">
                                    <span className="mx-2">Total Construction Contract</span>
                                    <input name="text"
                                           value={formData.electrical_master[0].electrical_contract}
                                           onChange={(e) => setFormData({...formData, electrical_master: [{ ...formData.electrical_master[0], electrical_contract: e.target.value }]})}
                                           className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                           id="role" placeholder="Enter Per Sqft"/>
                                </motion.label>
                                <motion.label
                                    initial={{opacity: 0, y: 100}}
                                    animate={{opacity: 1, y: 0}}
                                    transition={{delay: 0.5}}
                                    className="grid" htmlFor="Contract">
                                    <span className="mx-2">Total Contract Amount</span>
                                    <input name="text"
                                           value={formData.electrical_master[0].electrical_contract_amount}
                                           onChange={(e) => setFormData({...formData, electrical_master: [{ ...formData.electrical_master[0], electrical_contract_amount: e.target.value }]})}
                                           className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                           id="role" placeholder="Enter the Amount"/>
                                </motion.label>
                            </div>


                            <div className="py-6">
                                <motion.button
                                    type="button"
                                    onClick={AddElectricalEntry}
                                    className="flex border border-[#6392E5] bg-[#D9E1EF] text-[#005BEA]  hover:bg-[#C9D8F3] hover:border-[#6392E5] my-6 p-4 cursor-pointer rounded gap-2"
                                    initial={{opacity: 0, y: 100}}
                                    animate={{opacity: 1, y: 0}}
                                    transition={{delay: 0.6}}>
                                    <CircleFadingPlus/>
                                    Add Items
                                </motion.button>
                                {

                                    formData.electrical_master.map((item, index) =>

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
                                                                       value={formData.electrical_item_name}
                                                                       onChange={(ev) => HandleElectricalInputChange(...formData, 'electrical_item_name', ev.target.value)}
                                                                       className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                                                       placeholder="Enter Item Name"
                                                                />
                                                                <input type="text"
                                                                       value={formData.electrical_item_amount}
                                                                       onChange={(ev) => HandleElectricalInputChange(...formData, 'electrical_item_amount', ev.target.value)}
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
                                                                   value={formData.electrical_item_remarks}
                                                                   onChange={(ev) => HandleElectricalInputChange(...formData, 'electrical_item_remarks', ev.target.value)}
                                                                   className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                                                   placeholder="Enter any Remarks" />
                                                        </motion.label>
                                                        {
                                                            formData.electrical_master.length > 1

                                                            &&

                                                            (
                                                                <div>
                                                                    <span className="opacity-0">hello</span>
                                                                    <motion.button
                                                                        type="button"
                                                                        onClick={() => RemoveElectricalEntry(index)}
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
                                        <input type="text"
                                               value={formData.electrical_master[0].electrical_s_gst_percent}
                                               onChange={(e) => setFormData({...formData, electrical_master: [{ ...formData.electrical_master[0], electrical_s_gst_percent: e.target.value }]})}
                                               className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                               placeholder="%" />
                                        <input type="text"
                                               value={formData.electrical_master[0].electrical_s_gst_amount}
                                               onChange={(e) => setFormData({...formData, electrical_master: [{ ...formData.electrical_master[0], electrical_s_gst_amount: e.target.value }]})}
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
                                        <input type="text"
                                               value={formData.electrical_master[0].electrical_c_gst_percent}
                                               onChange={(e) => setFormData({...formData, electrical_master: [{ ...formData.electrical_master[0], electrical_c_gst_percent: e.target.value }]})}
                                               className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                               placeholder="%" />
                                        <input type="text"
                                               value={formData.electrical_master[0].electrical_c_gst_amount}
                                               onChange={(e) => setFormData({...formData, electrical_master: [{ ...formData.electrical_master[0], electrical_c_gst_amount: e.target.value }]})}
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
                                        <input type="text"
                                               value={formData.electrical_master[0].electrical_i_gst_percent}
                                               onChange={(e) => setFormData({...formData, electrical_master: [{ ...formData.electrical_master[0], electrical_i_gst_percent: e.target.value }]})}
                                               className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                               placeholder="%" />
                                        <input type="text"
                                               value={formData.electrical_master[0].electrical_i_gst_amount}
                                               onChange={(e) => setFormData({...formData, electrical_master: [{ ...formData.electrical_master[0], electrical_i_gst_amount: e.target.value }]})}
                                               className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                               placeholder="Amount" />
                                    </div>
                                </motion.label>
                            </div>
                        </div>

                        <div className="grid md:grid lg:grid xl:grid gap-2 py-4">
                            <div className="flex justify-between items-center">
                                <motion.label
                                    className="flex gap-x-2 items-center"
                                    initial={{opacity: 0, y: 100}}
                                    animate={{opacity: 1, y: 0}}
                                    transition={{delay: 0.2}}
                                    htmlFor="box">
                                    Total Amount for Electrical Labour Creation
                                </motion.label>


                                <motion.div
                                    initial={{opacity: 0, y: 100}}
                                    animate={{opacity: 1, y: 0}}
                                    transition={{delay: 0.3}}>
                                    <p className="text-[#005BEA] text-xl">
                                        Some Number in Rupee
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


                        {/* Tiles Labour */}
                        <motion.div className="border items-center border-[#A9C1EA] bg-[#F1F1F1] rounded p-4 my-4">
                            <div className="flex gap-4">
                                <div className="grid justify-center items-center bg-[#C9D8F3] text-[#005bea] rounded p-4">
                                    <SquareStack />
                                </div>
                                <div>
                                    <p className="head text-xl text-[#005bea]">
                                        Tiles Labour
                                    </p>

                                    <p>
                                        Laying and grouting tiles on floors, walls, and other surfaces to create a finished covering
                                    </p>
                                </div>
                            </div>
                        </motion.div>

                        <div>
                            <div className="grid md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 my-6 gap-6">
                                <motion.label
                                    initial={{opacity: 0, y: 100}}
                                    animate={{opacity: 1, y: 0}}
                                    transition={{delay: 0.1}}
                                    className="grid" htmlFor="name">
                                    <span className="mx-2">Name</span>
                                    <input type="text"
                                           value={formData.tiles_master[0].tiles_name}
                                           onChange={(e) => setFormData({...formData, tiles_master: [{ ...formData.tiles_master[0], tiles_name: e.target.value }]})}
                                           className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                           placeholder="Enter the Name" />
                                </motion.label>
                                <motion.label
                                    initial={{opacity: 0, y: 100}}
                                    animate={{opacity: 1, y: 0}}
                                    transition={{delay: 0.2}}
                                    className="grid" htmlFor="phone">
                                    <span className="mx-2">Phone</span>
                                    <input type="text"
                                           value={formData.tiles_master[0].tiles_phone}
                                           onChange={(e) => setFormData({...formData, tiles_master: [{ ...formData.tiles_master[0], tiles_phone: e.target.value }]})}
                                           className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                           placeholder="Enter the Phone No" />
                                </motion.label>
                                <motion.label
                                    initial={{opacity: 0, y: 100}}
                                    animate={{opacity: 1, y: 0}}
                                    transition={{delay: 0.3}}
                                    className="grid" htmlFor="address">
                                    <span className="mx-2">Address</span>
                                    <input type="text"
                                           value={formData.tiles_master[0].tiles_address}
                                           onChange={(e) => setFormData({...formData, tiles_master: [{ ...formData.tiles_master[0], tiles_address: e.target.value }]})}
                                           className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                           placeholder="Enter the Address" />
                                </motion.label>
                                <motion.label
                                    initial={{opacity: 0, y: 100}}
                                    animate={{opacity: 1, y: 0}}
                                    transition={{delay: 0.4}}
                                    className="grid" htmlFor="Labour">
                                    <span className="mx-2">Total Construction Contract</span>
                                    <input name="text"
                                           value={formData.tiles_master[0].tiles_contract}
                                           onChange={(e) => setFormData({...formData, tiles_master: [{ ...formData.tiles_master[0], tiles_contract: e.target.value }]})}
                                           className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                           id="role" placeholder="Enter Per Sqft"/>
                                </motion.label>
                                <motion.label
                                    initial={{opacity: 0, y: 100}}
                                    animate={{opacity: 1, y: 0}}
                                    transition={{delay: 0.5}}
                                    className="grid" htmlFor="Cotract">
                                    <span className="mx-2">Total Contract Amount</span>
                                    <input name="text"
                                           value={formData.tiles_master[0].tiles_contract_amount}
                                           onChange={(e) => setFormData({...formData, tiles_master: [{ ...formData.tiles_master[0], tiles_contract_amount: e.target.value }]})}
                                           className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                           id="role" placeholder="Enter the Amount"/>
                                </motion.label>
                            </div>


                            <div className="py-6">
                                <motion.button
                                    type="button"
                                    onClick={AddTilesEntry}
                                    className="flex border border-[#6392E5] bg-[#D9E1EF] text-[#005BEA]  hover:bg-[#C9D8F3] hover:border-[#6392E5] my-6 p-4 cursor-pointer rounded gap-2"
                                    initial={{opacity: 0, y: 100}}
                                    animate={{opacity: 1, y: 0}}
                                    transition={{delay: 0.6}}>
                                    <CircleFadingPlus/>
                                    Add Items
                                </motion.button>
                                {

                                    formData.tiles_master.map((item, index) =>

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
                                                                       value={formData.tiles_item_name}
                                                                       onChange={(ev) => HandleTilesInputChange(...formData, 'tiles_item_name', ev.target.value)}
                                                                       className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                                                       placeholder="Enter Item Name"
                                                                />
                                                                <input type="text"
                                                                       value={formData.tiles_item_amount}
                                                                       onChange={(ev) => HandleTilesInputChange(...formData, 'tiles_item_amount', ev.target.value)}
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
                                                                   value={formData.tiles_item_remarks}
                                                                   onChange={(ev) => HandleTilesInputChange(...formData, 'tiles_item_remarks', ev.target.value)}
                                                                   className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                                                   placeholder="Enter any Remarks" />
                                                        </motion.label>
                                                        {
                                                            formData.tiles_master.length > 1

                                                            &&

                                                            (
                                                                <div>
                                                                    <span className="opacity-0">hello</span>
                                                                    <motion.button
                                                                        type="button"
                                                                        onClick={() => RemoveTilesEntry(index)}
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
                                        <input type="text"
                                               value={formData.tiles_master[0].tiles_s_gst_percent}
                                               onChange={(e) => setFormData({...formData, tiles_master: [{ ...formData.tiles_master[0], tiles_s_gst_percent: e.target.value }]})}
                                               className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                               placeholder="%" />
                                        <input type="text"
                                               value={formData.tiles_master[0].tiles_s_gst_amount}
                                               onChange={(e) => setFormData({...formData, tiles_master: [{ ...formData.tiles_master[0], tiles_s_gst_amount: e.target.value }]})}
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
                                        <input type="text"
                                               value={formData.tiles_master[0].tiles_c_gst_percent}
                                               onChange={(e) => setFormData({...formData, tiles_master: [{ ...formData.tiles_master[0], tiles_c_gst_percent: e.target.value }]})}
                                               className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                               placeholder="%" />
                                        <input type="text"
                                               value={formData.tiles_master[0].tiles_c_gst_amount}
                                               onChange={(e) => setFormData({...formData, tiles_master: [{ ...formData.tiles_master[0], tiles_c_gst_amount: e.target.value }]})}
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
                                        <input type="text"
                                               value={formData.tiles_master[0].tiles_i_gst_percent}
                                               onChange={(e) => setFormData({...formData, tiles_master: [{ ...formData.tiles_master[0], tiles_i_gst_percent: e.target.value }]})}
                                               className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                               placeholder="%" />
                                        <input type="text"
                                               value={formData.tiles_master[0].tiles_i_gst_amount}
                                               onChange={(e) => setFormData({...formData, tiles_master: [{ ...formData.tiles_master[0], tiles_i_gst_amount: e.target.value }]})}
                                               className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                               placeholder="Amount" />
                                    </div>
                                </motion.label>
                            </div>
                        </div>

                        <div className="grid md:grid lg:grid xl:grid gap-2 py-4">
                            <div className="flex justify-between items-center">
                                <motion.label
                                    className="flex gap-x-2 items-center"
                                    initial={{opacity: 0, y: 100}}
                                    animate={{opacity: 1, y: 0}}
                                    transition={{delay: 0.2}}
                                    htmlFor="box">
                                    Total Contract Amount for Tiles Labour
                                </motion.label>


                                <motion.div
                                    initial={{opacity: 0, y: 100}}
                                    animate={{opacity: 1, y: 0}}
                                    transition={{delay: 0.3}}>
                                    <p className="text-[#005BEA] text-xl">
                                        Some Number in Rupee
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


                        {/* Carpenter */}
                        <motion.div className="border items-center border-[#A9C1EA] bg-[#F1F1F1] rounded p-4 my-4">
                            <div className="flex gap-4">
                                <div className="grid justify-center items-center bg-[#C9D8F3] text-[#005bea] rounded p-4">
                                    <Axe />
                                </div>
                                <div>
                                    <p className="head text-xl text-[#005bea]">
                                        Carpenter
                                    </p>

                                    <p>
                                        A worker who cuts, shapes, and installs wood to build or repair structures and other objects
                                    </p>
                                </div>
                            </div>
                        </motion.div>

                        <div>
                            <div className="grid md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 my-4 gap-6">
                                <motion.label
                                    initial={{opacity: 0, y: 100}}
                                    animate={{opacity: 1, y: 0}}
                                    transition={{delay: 0.1}}
                                    className="grid" htmlFor="name">
                                    <span className="mx-2">Name</span>
                                    <input type="text"
                                           value={formData.carpenter_master[0].carpenter_name}
                                           onChange={(e) => setFormData({...formData, carpenter_master: [{ ...formData.carpenter_master[0], carpenter_name: e.target.value }]})}
                                           className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                           placeholder="Enter the Name" />
                                </motion.label>
                                <motion.label
                                    initial={{opacity: 0, y: 100}}
                                    animate={{opacity: 1, y: 0}}
                                    transition={{delay: 0.2}}
                                    className="grid" htmlFor="phone">
                                    <span className="mx-2">Phone</span>
                                    <input type="text"
                                           value={formData.carpenter_master[0].carpenter_phone}
                                           onChange={(e) => setFormData({...formData, carpenter_master: [{ ...formData.carpenter_master[0], carpenter_phone: e.target.value }]})}
                                           className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                           placeholder="Enter the Phone No" />
                                </motion.label>
                                <motion.label
                                    initial={{opacity: 0, y: 100}}
                                    animate={{opacity: 1, y: 0}}
                                    transition={{delay: 0.3}}
                                    className="grid" htmlFor="address">
                                    <span className="mx-2">Address</span>
                                    <input type="text"
                                           value={formData.carpenter_master[0].carpenter_address}
                                           onChange={(e) => setFormData({...formData, carpenter_master: [{ ...formData.carpenter_master[0], carpenter_address: e.target.value }]})}
                                           className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                           placeholder="Enter the Address" />
                                </motion.label>
                                <motion.label
                                    initial={{opacity: 0, y: 100}}
                                    animate={{opacity: 1, y: 0}}
                                    transition={{delay: 0.4}}
                                    className="grid" htmlFor="Labour">
                                    <span className="mx-2">Total Construction Contract</span>
                                    <input name="text"
                                           value={formData.carpenter_master[0].carpenter_contract}
                                           onChange={(e) => setFormData({...formData, carpenter_master: [{ ...formData.carpenter_master[0], carpenter_contract: e.target.value }]})}
                                           className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                           id="role" placeholder="Enter Per Sqft"/>
                                </motion.label>
                                <motion.label
                                    initial={{opacity: 0, y: 100}}
                                    animate={{opacity: 1, y: 0}}
                                    transition={{delay: 0.5}}
                                    className="grid" htmlFor="Cotract">
                                    <span className="mx-2">Total Contract Amount</span>
                                    <input name="text"
                                           value={formData.carpenter_master[0].carpenter_contract_amount}
                                           onChange={(e) => setFormData({...formData, carpenter_master: [{ ...formData.carpenter_master[0], carpenter_contract_amount: e.target.value }]})}
                                           className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                           id="role" placeholder="Enter the Amount"/>
                                </motion.label>
                            </div>


                            <div className="py-6">
                                <motion.button
                                    type="button"
                                    onClick={AddCarpenterEntry}
                                    className="flex border border-[#6392E5] bg-[#D9E1EF] text-[#005BEA]  hover:bg-[#C9D8F3] hover:border-[#6392E5] my-6 p-4 cursor-pointer rounded gap-2"
                                    initial={{opacity: 0, y: 100}}
                                    animate={{opacity: 1, y: 0}}
                                    transition={{delay: 0.6}}>
                                    <CircleFadingPlus/>
                                    Add Items
                                </motion.button>
                                {

                                    formData.carpenter_master.map((item, index) =>

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
                                                                       value={formData.carpenter_item_name}
                                                                       onChange={(ev) => HandleCarpenterInputChange(...formData, 'carpenter_item_name', ev.target.value)}
                                                                       className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                                                       placeholder="Enter Item Name"
                                                                />
                                                                <input type="text"
                                                                       value={formData.carpenter_item_amount}
                                                                       onChange={(ev) => HandleCarpenterInputChange(...formData, 'carpenter_item_amount', ev.target.value)}
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
                                                                   value={formData.carpenter_item_remarks}
                                                                   onChange={(ev) => HandleCarpenterInputChange(...formData, 'carpenter_item_remarks', ev.target.value)}
                                                                   className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                                                   placeholder="Enter any Remarks" />
                                                        </motion.label>
                                                        {
                                                            formData.carpenter_master.length > 1

                                                            &&

                                                            (
                                                                <div>
                                                                    <span className="opacity-0">hello</span>
                                                                    <motion.button
                                                                        type="button"
                                                                        onClick={() => RemoveCarpenterEntry(index)}
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
                                        <input type="text"
                                               value={formData.carpenter_master[0].carpenter_s_gst_percent}
                                               onChange={(e) => setFormData({...formData, carpenter_master: [{ ...formData.carpenter_master[0], carpenter_s_gst_percent: e.target.value }]})}
                                               className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                               placeholder="%" />
                                        <input type="text"
                                               value={formData.carpenter_master[0].carpenter_s_gst_amount}
                                               onChange={(e) => setFormData({...formData, carpenter_master: [{ ...formData.carpenter_master[0], carpenter_s_gst_amount: e.target.value }]})}
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
                                        <input type="text"
                                               value={formData.carpenter_master[0].carpenter_c_gst_percent}
                                               onChange={(e) => setFormData({...formData, carpenter_master: [{ ...formData.carpenter_master[0], carpenter_c_gst_percent: e.target.value }]})}
                                               className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                               placeholder="%" />
                                        <input type="text"
                                               value={formData.carpenter_master[0].carpenter_c_gst_amount}
                                               onChange={(e) => setFormData({...formData, carpenter_master: [{ ...formData.carpenter_master[0], carpenter_c_gst_amount: e.target.value }]})}
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
                                        <input type="text"
                                               value={formData.carpenter_master[0].carpenter_i_gst_percent}
                                               onChange={(e) => setFormData({...formData, carpenter_master: [{ ...formData.carpenter_master[0], carpenter_i_gst_percent: e.target.value }]})}
                                               className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                               placeholder="%" />
                                        <input type="text"
                                               value={formData.carpenter_master[0].carpenter_i_gst_amount}
                                               onChange={(e) => setFormData({...formData, carpenter_master: [{ ...formData.carpenter_master[0], carpenter_i_gst_amount: e.target.value }]})}
                                               className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                               placeholder="Amount" />
                                    </div>
                                </motion.label>
                            </div>
                        </div>

                        <div className="grid md:grid lg:grid xl:grid gap-2 py-4">
                            <div className="flex justify-between items-center">
                                <motion.label
                                    className="flex gap-x-2 items-center"
                                    initial={{opacity: 0, y: 100}}
                                    animate={{opacity: 1, y: 0}}
                                    transition={{delay: 0.2}}
                                    htmlFor="box">
                                    Total Contract Amount for Carpenter Labour
                                </motion.label>

                                <motion.div
                                    initial={{opacity: 0, y: 100}}
                                    animate={{opacity: 1, y: 0}}
                                    transition={{delay: 0.3}}>
                                    <p className="text-[#005BEA] text-xl">
                                        Some Number in Rupee
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


                        {/* Painter */}
                         <motion.div className="border items-center border-[#A9C1EA] bg-[#F1F1F1] rounded p-4 my-4">
                            <div className="flex gap-4">
                                <div className="grid justify-center items-center bg-[#C9D8F3] text-[#005bea] rounded p-4">
                                    <PaintRoller />
                                </div>
                                <div>
                                    <p className="head text-xl text-[#005bea]">
                                        Painter
                                    </p>

                                    <p>
                                        A skilled worker who applies coats of paint and other finishes to buildings and surfaces
                                    </p>
                                </div>
                            </div>
                        </motion.div>

                        <div>
                            <div className="grid md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 my-6 gap-6">
                                <motion.label
                                    initial={{opacity: 0, y: 100}}
                                    animate={{opacity: 1, y: 0}}
                                    transition={{delay: 0.1}}
                                    className="grid" htmlFor="name">
                                    <span className="mx-2">Name</span>
                                    <input type="text"
                                           value={formData.painter_master[0].painter_name}
                                           onChange={(e) => setFormData({...formData, painter_master: [{ ...formData.painter_master[0], painter_name: e.target.value }]})}
                                           className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                           placeholder="Enter the Name" />
                                </motion.label>
                                <motion.label
                                    initial={{opacity: 0, y: 100}}
                                    animate={{opacity: 1, y: 0}}
                                    transition={{delay: 0.2}}
                                    className="grid" htmlFor="phone">
                                    <span className="mx-2">Phone</span>
                                    <input type="text"
                                           value={formData.painter_master[0].painter_phone}
                                           onChange={(e) => setFormData({...formData, painter_master: [{ ...formData.painter_master[0], painter_phone: e.target.value }]})}
                                           className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                           placeholder="Enter the Phone No" />
                                </motion.label>
                                <motion.label
                                    initial={{opacity: 0, y: 100}}
                                    animate={{opacity: 1, y: 0}}
                                    transition={{delay: 0.3}}
                                    className="grid" htmlFor="address">
                                    <span className="mx-2">Address</span>
                                    <input type="text"
                                           value={formData.painter_master[0].painter_address}
                                           onChange={(e) => setFormData({...formData, painter_master: [{ ...formData.painter_master[0], painter_address: e.target.value }]})}
                                           className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                           placeholder="Enter the Address" />
                                </motion.label>
                                <motion.label
                                    initial={{opacity: 0, y: 100}}
                                    animate={{opacity: 1, y: 0}}
                                    transition={{delay: 0.4}}
                                    className="grid" htmlFor="Labour">
                                    <span className="mx-2">Total Construction Contract</span>
                                    <input name="text"
                                           value={formData.painter_master[0].painter_contract}
                                           onChange={(e) => setFormData({...formData, painter_master: [{ ...formData.painter_master[0], painter_contract: e.target.value }]})}
                                           className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                           id="role" placeholder="Enter Per Sqft"/>
                                </motion.label>
                                <motion.label
                                    initial={{opacity: 0, y: 100}}
                                    animate={{opacity: 1, y: 0}}
                                    transition={{delay: 0.5}}
                                    className="grid" htmlFor="Cotract">
                                    <span className="mx-2">Total Contract Amount</span>
                                    <input name="text"
                                           value={formData.painter_master[0].painter_contract_amount}
                                           onChange={(e) => setFormData({...formData, painter_master: [{ ...formData.painter_master[0], painter_contract_amount: e.target.value }]})}
                                           className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded  p-4"
                                           id="role" placeholder="Enter the Amount"/>
                                </motion.label>
                            </div>

                            <div className="py-6">
                                <motion.button
                                    type="button"
                                    onClick={AddPainterEntry}
                                    className="flex border border-[#6392E5] bg-[#D9E1EF] text-[#005BEA]  hover:bg-[#C9D8F3] hover:border-[#6392E5] my-6 p-4 cursor-pointer rounded gap-2"
                                    initial={{opacity: 0, y: 100}}
                                    animate={{opacity: 1, y: 0}}
                                    transition={{delay: 0.6}}>
                                    <CircleFadingPlus/>
                                    Add Items
                                </motion.button>
                                {

                                    formData.painter_master.map((item, index) =>

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
                                                                       value={formData.painter_item_name}
                                                                       onChange={(ev) => HandlePainterInputChange(...formData, 'painter_item_name', ev.target.value)}
                                                                       className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                                                       placeholder="Enter Item Name"
                                                                />
                                                                <input type="text"
                                                                       value={formData.painter_item_amount}
                                                                       onChange={(ev) => HandlePainterInputChange(...formData, 'painter_item_amount', ev.target.value)}
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
                                                                   value={formData.painter_item_remarks}
                                                                   onChange={(ev) => HandlePainterInputChange(...formData, 'painter_item_remarks', ev.target.value)}
                                                                   className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                                                   placeholder="Enter any Remarks" />
                                                        </motion.label>
                                                        {
                                                            formData.painter_master.length > 1

                                                            &&

                                                            (
                                                                <div>
                                                                    <span className="opacity-0">hello</span>
                                                                    <motion.button
                                                                        type="button"
                                                                        onClick={() => RemovePainterEntry(index)}
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
                                        <input type="text"
                                               value={formData.painter_master[0].painter_s_gst_percent}
                                               onChange={(e) => setFormData({...formData, painter_master: [{ ...formData.painter_master[0], painter_s_gst_percent: e.target.value }]})}
                                               className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                               placeholder="%" />
                                        <input type="text"
                                               value={formData.painter_master[0].painter_s_gst_amount}
                                               onChange={(e) => setFormData({...formData, painter_master: [{ ...formData.painter_master[0], painter_s_gst_amount: e.target.value }]})}
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
                                        <input type="text"
                                               value={formData.painter_master[0].painter_c_gst_percent}
                                               onChange={(e) => setFormData({...formData, painter_master: [{ ...formData.painter_master[0], painter_c_gst_percent: e.target.value }]})}
                                               className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                               placeholder="%" />
                                        <input type="text"
                                               value={formData.painter_master[0].painter_c_gst_amount}
                                               onChange={(e) => setFormData({...formData, painter_master: [{ ...formData.painter_master[0], painter_c_gst_amount: e.target.value }]})}
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
                                        <input type="text"
                                               value={formData.painter_master[0].painter_i_gst_percent}
                                               onChange={(e) => setFormData({...formData, painter_master: [{ ...formData.painter_master[0], painter_i_gst_percent: e.target.value }]})}
                                               className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                               placeholder="%" />
                                        <input type="text"
                                               value={formData.painter_master[0].painter_i_gst_amount}
                                               onChange={(e) => setFormData({...formData, painter_master: [{ ...formData.painter_master[0], painter_i_gst_amount: e.target.value }]})}
                                               className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                               placeholder="Amount" />
                                    </div>
                                </motion.label>
                            </div>
                        </div>

                        <div className="grid md:grid lg:grid xl:grid gap-2 py-4">
                            <div className="flex justify-between items-center">
                                <motion.label
                                    className="flex gap-x-2 items-center"
                                    initial={{opacity: 0, y: 100}}
                                    animate={{opacity: 1, y: 0}}
                                    transition={{delay: 0.2}}
                                    htmlFor="box">
                                    Total Contract Amount for Painter Labour
                                </motion.label>


                                <motion.div
                                    initial={{opacity: 0, y: 100}}
                                    animate={{opacity: 1, y: 0}}
                                    transition={{delay: 0.3}}>
                                    <p className="text-[#005BEA] text-xl">
                                        Some Number in Rupee
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


                        {/* Other */}
                        <motion.div className="border items-center border-[#A9C1EA] bg-[#F1F1F1] rounded p-4 my-4">
                            <div className="flex gap-4">
                                <div className="grid justify-center items-center bg-[#C9D8F3] text-[#005bea] rounded p-4">
                                    <Sparkle />
                                </div>
                                <div>
                                    <p className="head text-xl text-[#005bea]">
                                        Other Labour
                                    </p>

                                    <p>
                                        ---
                                    </p>
                                </div>
                            </div>
                        </motion.div>

                        <div>
                            <div className="grid md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 my-6 gap-6">
                                <motion.label
                                    initial={{opacity: 0, y: 100}}
                                    animate={{opacity: 1, y: 0}}
                                    transition={{delay: 0.1}}
                                    className="grid" htmlFor="name">
                                    <span className="mx-2">Name</span>
                                    <input type="text"
                                           value={formData.other_master[0].other_name}
                                           onChange={(e) => setFormData({...formData, other_master: [{ ...formData.other_master[0], other_name: e.target.value }]})}
                                           className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                           placeholder="Enter the Name" />
                                </motion.label>
                                <motion.label
                                    initial={{opacity: 0, y: 100}}
                                    animate={{opacity: 1, y: 0}}
                                    transition={{delay: 0.2}}
                                    className="grid" htmlFor="phone">
                                    <span className="mx-2">Phone</span>
                                    <input type="text"
                                           value={formData.other_master[0].other_phone}
                                           onChange={(e) => setFormData({...formData, other_master: [{ ...formData.other_master[0], other_phone: e.target.value }]})}
                                           className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                           placeholder="Enter the Phone No" />
                                </motion.label>
                                <motion.label
                                    initial={{opacity: 0, y: 100}}
                                    animate={{opacity: 1, y: 0}}
                                    transition={{delay: 0.3}}
                                    className="grid" htmlFor="address">
                                    <span className="mx-2">Address</span>
                                    <input type="text"
                                           value={formData.other_master[0].other_address}
                                           onChange={(e) => setFormData({...formData, other_master: [{ ...formData.other_master[0], other_address: e.target.value }]})}
                                           className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                           placeholder="Enter the Address" />
                                </motion.label>
                                <motion.label
                                    initial={{opacity: 0, y: 100}}
                                    animate={{opacity: 1, y: 0}}
                                    transition={{delay: 0.4}}
                                    className="grid" htmlFor="Labour">
                                    <span className="mx-2">Total Construction Contract</span>
                                    <input name="text"
                                           value={formData.other_master[0].other_contract}
                                           onChange={(e) => setFormData({...formData, other_master: [{ ...formData.other_master[0], other_contract: e.target.value }]})}
                                           className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                           id="role" placeholder="Enter Per Sqft"/>
                                </motion.label>
                                <motion.label
                                    initial={{opacity: 0, y: 100}}
                                    animate={{opacity: 1, y: 0}}
                                    transition={{delay: 0.5}}
                                    className="grid" htmlFor="Cotract">
                                    <span className="mx-2">Total Contract Amount</span>
                                    <input name="text"
                                           value={formData.other_master[0].other_contract_amounto}
                                           onChange={(e) => setFormData({...formData, other_master: [{ ...formData.other_master[0], other_contract_amounto: e.target.value }]})}
                                           className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                           id="role" placeholder="Enter the Amount"/>
                                </motion.label>
                            </div>

                            <div className="py-6">
                                <motion.button
                                    type="button"
                                    onClick={AddOtherEntry}
                                    className="flex border border-[#6392E5] bg-[#D9E1EF] text-[#005BEA]  hover:bg-[#C9D8F3] hover:border-[#6392E5] my-6 p-4 cursor-pointer rounded gap-2"
                                    initial={{opacity: 0, y: 100}}
                                    animate={{opacity: 1, y: 0}}
                                    transition={{delay: 0.6}}>
                                    <CircleFadingPlus/>
                                    Add Items
                                </motion.button>
                                {

                                    formData.other_master.map((item, index) =>

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
                                                                       value={formData.other_item_name}
                                                                       onChange={(ev) => HandleOtherInputChange(...formData, 'other_item_name', ev.target.value)}
                                                                       className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                                                       placeholder="Enter Item Name"
                                                                />
                                                                <input type="text"
                                                                       value={formData.other_item_amount}
                                                                       onChange={(ev) => HandleOtherInputChange(...formData, 'other_item_amount', ev.target.value)}
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
                                                                   value={formData.other_item_remarks}
                                                                   onChange={(ev) => HandleOtherInputChange(...formData, 'other_item_remarks', ev.target.value)}
                                                                   className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                                                   placeholder="Enter any Remarks" />
                                                        </motion.label>
                                                        {
                                                            formData.other_master.length > 1

                                                            &&

                                                            (
                                                                <div>
                                                                    <span className="opacity-0">hello</span>
                                                                    <motion.button
                                                                        type="button"
                                                                        onClick={() => RemoveOtherEntry(index)}
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
                                        <input type="text"
                                               value={formData.other_master[0].other_s_gst_percent}
                                               onChange={(e) => setFormData({...formData, other_master: [{ ...formData.other_master[0], other_s_gst_percent: e.target.value }]})}
                                               className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                               placeholder="%" />
                                        <input type="text"
                                               value={formData.other_master[0].other_s_gst_amount}
                                               onChange={(e) => setFormData({...formData, other_master: [{ ...formData.other_master[0], other_s_gst_amount: e.target.value }]})}
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
                                        <input type="text"
                                               value={formData.other_master[0].other_c_gst_percent}
                                               onChange={(e) => setFormData({...formData, other_master: [{ ...formData.other_master[0], other_c_gst_percent: e.target.value }]})}
                                               className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                               placeholder="%" />
                                        <input type="text"
                                               value={formData.other_master[0].other_c_gst_amount}
                                               onChange={(e) => setFormData({...formData, other_master: [{ ...formData.other_master[0], other_c_gst_amount: e.target.value }]})}
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
                                        <input type="text"
                                               value={formData.other_master[0].other_i_gst_percent}
                                               onChange={(e) => setFormData({...formData, other_master: [{ ...formData.other_master[0], other_i_gst_percent: e.target.value }]})}
                                               className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                               placeholder="%" />
                                        <input type="text"
                                               value={formData.other_master[0].other_i_gst_amount}
                                               onChange={(e) => setFormData({...formData, other_master: [{ ...formData.other_master[0], other_i_gst_amount: e.target.value }]})}
                                               className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                               placeholder="Amount" />
                                    </div>
                                </motion.label>
                            </div>
                        </div>

                        <div className="grid md:grid lg:grid xl:grid gap-2 py-4">
                            <div className="flex justify-between items-center">
                                <motion.label
                                    className="flex gap-x-2 items-center"
                                    initial={{opacity: 0, y: 100}}
                                    animate={{opacity: 1, y: 0}}
                                    transition={{delay: 0.2}}
                                    htmlFor="box">
                                    Total Contract Amount for Other Labour
                                </motion.label>


                                <motion.div
                                    initial={{opacity: 0, y: 100}}
                                    animate={{opacity: 1, y: 0}}
                                    transition={{delay: 0.3}}>
                                    <p className="text-[#005BEA] text-xl">
                                        Some Number in Rupee
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


                        {/* Total Labour */}
                        <div>
                            <motion.div
                                initial={{opacity: 0, y: 100}}
                                animate={{opacity: 1, y: 0}}
                                transition={{delay: 0.1}}
                                className="head text-xl text-[#005BEA] text-bold">
                                Total Labour Cost
                            </motion.div>
                            <div className="my-2">
                                <motion.hr
                                    initial={{opacity: 0, y: 100}}
                                    animate={{y: 0, opacity: 1}}
                                    className="border-[#6392E5]"/>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 justify-center items-center xl:divide-x-2 divide-[#6392E5] gap-10 my-4">
                            <div className="grid grid-cols-2 lg:pr-14 xl:pr-14 gap-4">
                                <div>
                                    <motion.p
                                        initial={{opacity: 0, y: 100}}
                                        animate={{opacity: 1, y: 0}}
                                        transition={{delay: 0.1}}
                                        className="text-[#005BEA] text-xl">
                                        Labour List
                                    </motion.p>
                                    <motion.p
                                        initial={{opacity: 0, y: 100}}
                                        animate={{opacity: 1, y: 0}}
                                        transition={{delay: 0.2}}
                                        className="border border-[#707070] text-center rounded p-4 my-4">
                                        Mason
                                    </motion.p>
                                    <motion.p
                                        initial={{opacity: 0, y: 100}}
                                        animate={{opacity: 1, y: 0}}
                                        transition={{delay: 0.3}}
                                        className="border border-[#707070] text-center rounded p-4 my-4">
                                        Centering
                                    </motion.p>
                                    <motion.p
                                        initial={{opacity: 0, y: 100}}
                                        animate={{opacity: 1, y: 0}}
                                        transition={{delay: 0.4}}
                                        className="border border-[#707070] text-center rounded p-4 my-4">
                                        Plumbing
                                    </motion.p>
                                    <motion.p
                                        initial={{opacity: 0, y: 100}}
                                        animate={{opacity: 1, y: 0}}
                                        transition={{delay: 0.5}}
                                        className="border border-[#707070] text-center rounded p-4 my-4">
                                        Electrician
                                    </motion.p>
                                    <motion.p
                                        initial={{opacity: 0, y: 100}}
                                        animate={{opacity: 1, y: 0}}
                                        transition={{delay: 0.6}}
                                        className="border border-[#707070] text-center rounded p-4 my-4">
                                        Tiles
                                    </motion.p>
                                    <motion.p
                                        initial={{opacity: 0, y: 100}}
                                        animate={{opacity: 1, y: 0}}
                                        transition={{delay: 0.7}}
                                        className="border border-[#707070] text-center rounded p-4 my-4">
                                        Carpenter
                                    </motion.p>
                                    <motion.p
                                        initial={{opacity: 0, y: 100}}
                                        animate={{opacity: 1, y: 0}}
                                        transition={{delay: 0.8}}
                                        className="border border-[#707070] text-center rounded p-4 my-4">
                                        Painter
                                    </motion.p>
                                </div>

                                <div>
                                    <motion.p
                                        initial={{opacity: 0, y: 100}}
                                        animate={{opacity: 1, y: 0}}
                                        transition={{delay: 0.9}}
                                        className="text-[#005BEA] text-xl">
                                        Total Cost
                                    </motion.p>
                                    <motion.p
                                        initial={{opacity: 0, y: 100}}
                                        animate={{opacity: 1, y: 0}}
                                        transition={{delay: 1.0}}
                                        className="border border-[#707070] text-center rounded p-4 my-4">
                                        Rupee
                                    </motion.p>
                                    <motion.p
                                        initial={{opacity: 0, y: 100}}
                                        animate={{opacity: 1, y: 0}}
                                        transition={{delay: 1.1}}
                                        className="border border-[#707070] text-center rounded p-4 my-4">
                                        Rupee
                                    </motion.p>
                                    <motion.p
                                        initial={{opacity: 0, y: 100}}
                                        animate={{opacity: 1, y: 0}}
                                        transition={{delay: 1.2}}
                                        className="border border-[#707070] text-center rounded p-4 my-4">
                                        Rupee
                                    </motion.p>
                                    <motion.p
                                        initial={{opacity: 0, y: 100}}
                                        animate={{opacity: 1, y: 0}}
                                        transition={{delay: 1.3}}
                                        className="border border-[#707070] text-center rounded p-4 my-4">
                                        Rupee
                                    </motion.p>
                                    <motion.p
                                        initial={{opacity: 0, y: 100}}
                                        animate={{opacity: 1, y: 0}}
                                        transition={{delay: 1.4}}
                                        className="border border-[#707070] text-center rounded p-4 my-4">
                                        Rupee
                                    </motion.p>
                                    <motion.p
                                        initial={{opacity: 0, y: 100}}
                                        animate={{opacity: 1, y: 0}}
                                        transition={{delay: 1.5}}
                                        className="border border-[#707070] text-center rounded p-4 my-4">
                                        Rupee
                                    </motion.p>
                                    <motion.p
                                        initial={{opacity: 0, y: 100}}
                                        animate={{opacity: 1, y: 0}}
                                        transition={{delay: 1.6}}
                                        className="border border-[#707070] text-center rounded p-4 my-4">
                                        Rupee
                                    </motion.p>
                                </div>
                            </div>

                            <motion.div
                                initial={{opacity: 0, y: 100}}
                                animate={{opacity: 1, y: 0}}
                                transition={{delay: 1.7}}
                                className="h-100 flex flex-col justify-center items-center text-xl">
                                Total Labour Cost <br/>
                                <span className="text-[#005BEA]">Some Number in Rupee</span>
                            </motion.div>
                        </div>


                        <div className="grid md:grid lg:grid xl:grid justify-between items-center gap-2 py-4">
                            <motion.label className="flex gap-x-2 items-center"
                                          initial={{opacity: 0, y: 100}}
                                          animate={{opacity: 1, y: 0}}
                                          transition={{delay: 0.2}}
                                          htmlFor="box">
                                <input className="accent-[#005BEA]" type="checkbox"/>
                                Check the inputs whether you have entered valid details
                            </motion.label>


                            <div className="py-2">
                                <motion.button type="submit"
                                               className="flex gap-2 items-center cursor-pointer text-xl border border-[#6392E5] bg-[#D9E1EF] text-[#005BEA] hover:bg-[#C9D8F3] px-6 py-2 rounded"
                                               initial={{opacity: 0, y: 100}}
                                               animate={{opacity: 1, y: 0}}
                                               transition={{delay: 0.3}}>
                                    <Lightbulb />
                                    Create
                                </motion.button>
                            </div>
                        </div>
                    </form>
                </div>
            </section>
        </div>
    );
};

export default AddLabour;