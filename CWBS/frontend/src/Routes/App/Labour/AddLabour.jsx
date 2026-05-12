// Import Modules
import React, {useState, useEffect, useMemo} from 'react';
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import {
    AudioWaveform, Axe,
    ChevronUp,
    CircleFadingPlus,
    Lightbulb, PaintRoller,
    Plug, Sparkle, SquareStack, Trash2,
    UsersRound,
    IndianRupee, CircleCheck
} from "lucide-react";
import toast from "react-hot-toast";

// Import Hooks
import { useProject } from "../../../Hooks/useProject.js";
import { useLabour } from "../../../Hooks/useLabour.js";

// Import Component
import Loader from "../../../components/Loader.jsx";
import Loading_Screen from "../../../components/Loading_Screen.jsx";

const AddLabour = () => {

    // Hooks Project
    const { fetchProject, ProjectDataList } = useProject();

    // Hooks Labour
    const { addLabour, loading } = useLabour();

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

    // Selecting Project
    const [selectedProject, setSelectedProject] = useState(null);

    const [checked, setChecked] = useState(false);

    const [redirect, setRedirect] = useState(false);

    const navigate = useNavigate();

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


    // Handling Project
    const handleProjectChange = (e) => {

        const selectedName = e.target.value;

        const project = ExtractProjectName.find(

            (p) => { return p.project_name === selectedName; }

        );

        console.log(project.area_sqft)

        setFormData(prev => ({
            ...prev,
            project_name: selectedName
        }));

        setSelectedProject(project || null);
    };


    // Add Items Input Functionality------------------------------------------------------------------------------------

    // Add mason Entries
    function AddMasonEntry()
    {
        setFormData(prev => ({
            ...prev,
            mason_master: {
                ...prev.mason_master,
                mason_items: [
                    ...prev.mason_master.mason_items,
                    {
                        mason_item_name: "",
                        mason_item_amount: "0",
                        mason_item_remarks: ""
                    }
                ]
            },
        }));
    }



    // Add Entries
    function AddCenteringEntry()
    {
        setFormData(prev => ({
            ...prev,
            centering_master: {
                ...prev.centering_master,
                centering_items: [
                    ...prev.centering_master.centering_items,
                    {
                        centering_item_name: "",
                        centering_item_amount: "0",
                        centering_item_remarks: ""
                    }
                ]
            },
        }));
    }


    // Plumbing
    function AddPlumbingEntry()
    {
        setFormData(prev => ({
            ...prev,
            plumbing_master: {
                ...prev.plumbing_master,
                plumbing_items: [
                    ...prev.plumbing_master.plumbing_items,
                    {
                        plumbing_item_name: "",
                        plumbing_item_amount: "0",
                        plumbing_item_remarks: ""
                    }
                ]
            },
        }));
    }

    // Electrical
    function AddElectricalEntry()
    {
        setFormData(prev => ({
            ...prev,
            electrical_master: {
                ...prev.electrical_master,
                electrical_items: [
                    ...prev.electrical_master.electrical_items,
                    {
                        electrical_item_name: "",
                        electrical_item_amount: "0",
                        electrical_item_remarks: ""
                    }
                ]
            },
        }));
    }


    // Tiles
    function AddTilesEntry()
    {
        setFormData(prev => ({
            ...prev,
            tiles_master: {
                ...prev.tiles_master,
                tiles_items: [
                    ...prev.tiles_master.tiles_items,
                    {
                        tiles_item_name: "",
                        tiles_item_amount: "0",
                        tiles_item_remarks: ""
                    }
                ]
            },
        }));
    }


    // Carpenter
    function AddCarpenterEntry()
    {
        setFormData(prev => ({
            ...prev,
            carpenter_master: {
                ...prev.carpenter_master,
                carpenter_items: [
                    ...prev.carpenter_master.carpenter_items,
                    {
                        carpenter_item_name: "",
                        carpenter_item_amount: "0",
                        carpenter_item_remarks: ""
                    }
                ]
            },
        }));
    }

    // Painter
    function AddPainterEntry()
    {
        setFormData(prev => ({
            ...prev,
            painter_master: {
                ...prev.painter_master,
                painter_items: [
                    ...prev.painter_master.painter_items,
                    {
                        painter_item_name: "",
                        painter_item_amount: "0",
                        painter_item_remarks: ""
                    }
                ]
            },
        }));
    }

    // Other
    function AddOtherEntry()
    {
        setFormData(prev => ({
            ...prev,
            other_master: {
                ...prev.other_master,
                other_items: [
                    ...prev.other_master.other_items,
                    {
                        other_item_name: "",
                        other_item_amount: "0",
                        other_item_remarks: ""
                    }
                ]
            },
        }));
    }


    // Handle Individual Entries

    // Mason
    function HandleMasonInputChange(index, field, value)
    {

        const updatemason = [...formData.mason_master.mason_items];

        updatemason[index][field] = value;

        setFormData(prev => ({
            ...prev,
            mason_master: {
                ...prev.mason_master,
                mason_items: updatemason
            }
        }));

    }

    // Centering
    function HandleCenteringInputChange(index, field, value)
    {

        const updateCentering = [...formData.centering_master.centering_items];

        updateCentering[index][field] = value;

        setFormData(prev => ({
            ...prev,
            centering_master: {
                ...prev.centering_master,
                centering_items: updateCentering
            }
        }));

    }

    // Plumbing
    function HandlePlumbingInputChange(index, field, value)
    {

        const updatePlumbing = [...formData.plumbing_master.plumbing_items];

        updatePlumbing[index][field] = value;

        setFormData(prev => ({
            ...prev,
            plumbing_master: {
                ...prev.plumbing_master,
                plumbing_items: updatePlumbing
            }
        }));

    }

    // Electrical
    function HandleElectricalInputChange(index, field, value)
    {

        const updateElectrical = [...formData.electrical_master.electrical_items];

        updateElectrical[index][field] = value;

        setFormData(prev => ({
            ...prev,
            electrical_master: {
                ...prev.electrical_master,
                electrical_items: updateElectrical
            }
        }));

    }

    // Tiles
    function HandleTilesInputChange(index, field, value)
    {

        const updateTiles = [...formData.tiles_master.tiles_items];

        updateTiles[index][field] = value;

        setFormData(prev => ({
            ...prev,
            tiles_master: {
                ...prev.tiles_master,
                tiles_items: updateTiles
            }
        }));

    }

    // Carpenter
    function HandleCarpenterInputChange(index, field, value)
    {

        const updateCarpenter = [...formData.carpenter_master.carpenter_items];

        updateCarpenter[index][field] = value;

        setFormData(prev => ({
            ...prev,
            carpenter_master: {
                ...prev.carpenter_master,
                carpenter_items: updateCarpenter
            }
        }));

    }

    // Painter
    function HandlePainterInputChange(index, field, value)
    {

        const updatePainter = [...formData.painter_master.painter_items];

        updatePainter[index][field] = value;

        setFormData(prev => ({
            ...prev,
            painter_master: {
                ...prev.painter_master,
                painter_items: updatePainter
            }
        }));

    }

    // Other
    function HandleOtherInputChange(index, field, value)
    {

        const updateOther = [...formData.other_master.other_items];

        updateOther[index][field] = value;

        setFormData(prev => ({
            ...prev,
            other_master: {
                ...prev.other_master,
                other_items: updateOther
            }
        }));

    }


    // Remove Entry


    // Mason
    function RemoveMasonEntry(index)
    {

        const updatemason = [...formData.mason_master.mason_items];

        updatemason.splice(index, 1);

        setFormData(prev => ({
            ...prev,
            mason_master: {
                ...prev.mason_master,
                mason_items: updatemason
            }
        }));

    }

    // Centering
    function RemoveCenteringEntry(index)
    {

        const updateCentering = [...formData.centering_master.centering_items];

        updateCentering.splice(index, 1);

        setFormData(prev => ({
            ...prev,
            centering_master: {
                ...prev.centering_master,
                centering_items: updateCentering
            }
        }));

    }

    // Plumbing
    function RemovePlumbingEntry(index)
    {

        const updatePlumbing = [...formData.plumbing_master.plumbing_items];

        updatePlumbing.splice(index, 1);

        setFormData(prev => ({
            ...prev,
            plumbing_master: {
                ...prev.plumbing_master,
                plumbing_items: updatePlumbing
            }
        }));

    }

    // Electrical
    function RemoveElectricalEntry(index)
    {

        const updateElectrical = [...formData.electrical_master.electrical_items];

        updateElectrical.splice(index, 1);

        setFormData(prev => ({
            ...prev,
            electrical_master: {
                ...prev.electrical_master,
                electrical_items: updateElectrical
            }
        }));

    }

    // Tiles
    function RemoveTilesEntry(index)
    {

        const updateTiles = [...formData.tiles_master.tiles_items];

        updateTiles.splice(index, 1);

        setFormData(prev => ({
            ...prev,
            tiles_master: {
                ...prev.tiles_master,
                tiles_items: updateTiles
            }
        }));

    }

    // Carpenter
    function RemoveCarpenterEntry(index)
    {

        const updateCarpenter = [...formData.carpenter_master.carpenter_items];

        updateCarpenter.splice(index, 1);

        setFormData(prev => ({
            ...prev,
            carpenter_master: {
                ...prev.carpenter_master,
                carpenter_items: updateCarpenter
            },
        }));

    }

    // Painter
    function RemovePainterEntry(index)
    {

        const updatePainter = [...formData.painter_master.painter_items];

        updatePainter.splice(index, 1);

        setFormData(prev => ({
            ...prev,
            painter_master: {
                ...prev.painter_master,
                painter_items: updatePainter
            }
        }));

    }

    // Other
    function RemoveOtherEntry(index)
    {

        const updateOther = [...formData.other_master.other_items];

        updateOther.splice(index, 1);

        setFormData(prev => ({
            ...prev,
            other_master: {
                ...prev.other_master,
                other_items: updateOther
            }
        }));

    }

    // Add Items Input Functionality------------------------------------------------------------------------------------

    // Labour calculation

    // Calculation
    const {
        TotalMasonItemCost,
        TotalMasonCost,
        MasonryAmt,
        CheckMasonMatch, // Check the contract amount is equal
        TotalMasonCostAfterTax,
        totalContractAmt,
        mason_sgstAmount,
        mason_cgstAmount,
        mason_igstAmount,

        // Centering
        TotalCenteringItemCost,
        TotalCenteringCost,
        CenteringAmt,
        CheckCenteringMatch,
        centering_sgstAmount,
        centering_cgstAmount,
        centering_igstAmount,
        TotalCenteringAfterTax,

        // Plumping
        TotalPlumbingItemCost,
        TotalPlumbingCost,
        plumbing_sgstAmount,
        plumbing_cgstAmount,
        plumbing_igstAmount,
        TotalPlumbingCostAfterTax,

        // Electrician
        TotalElectricianItemCost,
        TotalElectricianCost,
        electrician_sgstAmount,
        electrician_cgstAmount,
        electrician_igstAmount,
        TotalElectricianCostAfterTax,

        // Tiles
        TotalTilesItemsCost,
        TotalTilesCost,
        Tiles_sgstAmount,
        Tiles_cgstAmount,
        Tiles_igstAmount,
        TotalTilesCostAfterTax,

        // Carpenter
        TotalCarpenterItemCost,
        TotalCarpenterCost,
        Carpenter_sgstAmount,
        Carpenter_cgstAmount,
        Carpenter_igstAmount,
        TotalCarpenterCostAfterTax,

        // Painter
        TotalPaintingItemCost,
        TotalPaintingCost,
        Painting_sgstAmount,
        Painting_cgstAmount,
        Painting_igstAmount,
        TotalPaintingCostAfterTax,

        // Others
        TotalOtherLaboursItemsCost,
        TotalOtherLaboursCost,
        OtherLabours_sgstAmount,
        OtherLabours_cgstAmount,
        OtherLabours_igstAmount,
        TotalOtherLaboursAfterTax,

        // Total Labour Cost
        TotalLaboursCostWithTax,

    } = useMemo(() => {

        // Mason -------------------------------------------------------------------------------------------------------
        const items = formData?.mason_master?.mason_items || [];

        const totalMasonItemCost = items.reduce(
            (sum, item) => sum + parseFloat(item?.mason_item_amount || 0),
            0
        );

        const perSqftCost = parseFloat(formData?.mason_master?.mason_contract) || 0;
        const builtUpArea = parseFloat(selectedProject?.area_sqft) || 0;

        const totalContractAmt = perSqftCost * builtUpArea;

        const totalMasonCost = totalContractAmt + totalMasonItemCost;

        // Check Mason Total Contract
        const masonryAmt = parseFloat(formData?.mason_master?.mason_basement_amount)
            + parseFloat(formData?.mason_master?.mason_lintel_amount)
            + parseFloat(formData?.mason_master?.mason_roof_amount)
            + parseFloat(formData?.mason_master?.mason_outer_plastering_amount)
            + parseFloat(formData?.mason_master?.mason_inner_plastering_amount)
            + parseFloat(formData?.mason_master?.mason_septic_tank_amount);

        const checkMasonMatch = totalContractAmt === masonryAmt;

        // Assuming tax values are inside formData.mason_master
        const sgstRate = parseFloat(formData?.mason_master?.mason_s_gst_percent) || 0;
        const cgstRate = parseFloat(formData?.mason_master?.mason_c_gst_percent) || 0;
        const igstRate = parseFloat(formData?.mason_master?.mason_i_gst_percent) || 0;

        const mason_sgstAmount = (totalMasonCost * sgstRate) / 100;
        const mason_cgstAmount = (totalMasonCost * cgstRate) / 100;
        const mason_igstAmount = (totalMasonCost * igstRate) / 100;

        const totalTax = mason_sgstAmount + mason_cgstAmount + mason_igstAmount;
        const totalMasonCostAfterTax = totalMasonCost + totalTax;
        // Mason End----------------------------------------------------------------------------------------------------


        // Centering----------------------------------------------------------------------------------------------------
        const centering_items = formData?.centering_master?.centering_items || [];

        const totalCenteringItemCost = centering_items.reduce(
            (sum, item) => sum + parseFloat(item?.centering_item_amount || 0),
            0
        );

        const PerSqFt = parseFloat(formData?.centering_master?.centering_contract) || 0;


        const totalCenteringCost = PerSqFt * builtUpArea;
        const totalCenteringAMT = totalCenteringCost + totalCenteringItemCost;

        // Check Centering Total Contract
        const centeringAmt = parseFloat(formData?.centering_master?.footing_ground_amount)
            + parseFloat(formData?.centering_master?.plinth_beam_amount)
            + parseFloat(formData?.centering_master?.basement_column_amount)
            + parseFloat(formData?.centering_master?.outer_plastering_amount)
            + parseFloat(formData?.centering_master?.feet_column_amount)
            + parseFloat(formData?.centering_master?.hide_beam_amount)
            + parseFloat(formData?.centering_master?.centering_roof_amount)
            + parseFloat(formData?.centering_master?.roof_beam_amount);

        const checkCenteringMatch = totalCenteringAMT === centeringAmt;

        const centering_sgstRate = parseFloat(formData?.centering_master?.centering_s_gst_percent) || 0;
        const centering_cgstRate = parseFloat(formData?.centering_master?.centering_c_gst_percent) || 0;
        const centering_igstRate = parseFloat(formData?.centering_master?.centering_i_gst_percent) || 0;

        const centering_sgstAmount = (totalCenteringAMT * centering_sgstRate) / 100;
        const centering_cgstAmount = (totalCenteringAMT * centering_cgstRate) / 100;
        const centering_igstAmount = (totalCenteringAMT * centering_igstRate) / 100;

        const totalCenteringAfterTax = totalCenteringAMT + centering_sgstAmount + centering_cgstAmount +
            centering_igstAmount;
        // Centering End------------------------------------------------------------------------------------------------

        // plumbing-----------------------------------------------------------------------------------------------------
        const plumbing_items = formData?.plumbing_master?.plumbing_items || [];

        const totalPlumbingItemCost = plumbing_items.reduce(
            (sum, item) => sum + parseFloat(item?.plumbing_item_amount || 0),
            0
        );

        const PlumpingPerSqFt = parseFloat(formData?.plumbing_master?.plumbing_contract) || 0;

        const totalPlumbingCost = PlumpingPerSqFt * builtUpArea;
        const totalPlumbingAMT = totalPlumbingCost + totalPlumbingItemCost;

        const plumbing_sgstRate = parseFloat(formData?.plumbing_master?.plumbing_s_gst_percent) || 0;
        const plumbing_cgstRate = parseFloat(formData?.plumbing_master?.plumbing_c_gst_percent) || 0;
        const plumbing_igstRate = parseFloat(formData?.plumbing_master?.plumbing_i_gst_percent) || 0;

        const plumbing_sgstAmount = (totalPlumbingAMT * plumbing_sgstRate) / 100;
        const plumbing_cgstAmount = (totalPlumbingAMT * plumbing_cgstRate) / 100;
        const plumbing_igstAmount = (totalPlumbingAMT * plumbing_igstRate) / 100;

        const totalPlumbingCostAfterTax = totalPlumbingAMT + plumbing_sgstAmount + plumbing_cgstAmount +
            plumbing_igstAmount;
        // Plumbing End ------------------------------------------------------------------------------------------------



        // Electrician -------------------------------------------------------------------------------------------------
        const electrician_items = formData?.electrical_master?.electrical_items || [];

        const totalElectricianItemsCost = electrician_items.reduce(
            (sum, item) => sum + parseFloat(item?.electrical_item_amount || 0),
            0
        );

        const ElectricianPerSqFt = parseFloat(formData?.electrical_master?.electrical_contract) || 0;

        const totalElectricianCost = ElectricianPerSqFt * builtUpArea;
        //before tax
        const totalElectricianAmt = totalElectricianCost + totalElectricianItemsCost;


        const electrician_sgstRate = parseFloat(formData?.electrical_master?.electrical_s_gst_percent) || 0;
        const electrician_cgstRate = parseFloat(formData?.electrical_master?.electrical_c_gst_percent) || 0;
        const electrician_igstRate = parseFloat(formData?.electrical_master?.electrical_i_gst_percent) || 0;

        const electrician_sgstAmount = (totalElectricianAmt * electrician_sgstRate) / 100;
        const electrician_cgstAmount = (totalElectricianAmt * electrician_cgstRate) / 100;
        const electrician_igstAmount = (totalElectricianAmt * electrician_igstRate) / 100;

        const totalElectricianCostAfterTax =
            totalElectricianAmt + electrician_sgstAmount + electrician_cgstAmount + electrician_igstAmount;
        // Electrician End ---------------------------------------------------------------------------------------------



        // Tiles--------------------------------------------------------------------------------------------------------
        const Tiles_Items = formData?.tiles_master?.tiles_items || [];

        const totalTilesItemsCost = Tiles_Items.reduce(
            (sum, item) => sum + parseFloat(item.tiles_item_amount || 0),
            0
        );
        const TilesPerSqFt = parseFloat(formData?.tiles_master?.tiles_contract) || 0;

        const totalTilesCost = TilesPerSqFt * builtUpArea;
        // Before Tax
        const totalTilesAmt = totalTilesCost + totalTilesItemsCost;

        const Tiles_sgstRate = parseFloat(formData?.tiles_master?.tiles_s_gst_percent) || 0;
        const Tiles_cgstRate = parseFloat(formData?.tiles_master?.tiles_c_gst_percent) || 0;
        const Tiles_igstRate = parseFloat(formData?.tiles_master?.tiles_i_gst_percent) || 0;

        const Tiles_sgstAmount = (totalTilesAmt * Tiles_sgstRate) / 100;
        const Tiles_cgstAmount = (totalTilesAmt * Tiles_cgstRate) / 100;
        const Tiles_igstAmount = (totalTilesAmt * Tiles_igstRate) / 100;

        const totalTilesCostAfterTax = totalTilesAmt + Tiles_sgstAmount + Tiles_cgstAmount + Tiles_igstAmount;

        // Tiles End----------------------------------------------------------------------------------------------------


        // Carpenter----------------------------------------------------------------------------------------------------

        const Carpenter_items = formData?.carpenter_master?.carpenter_items || [];

        const totalCarpenterItemsCost = Carpenter_items.reduce(
            (sum,items)=>sum + parseFloat(items.carpenter_item_amount || 0),
            0
        );

        const CarpenterPerSqft = parseFloat(formData?.carpenter_master?.carpenter_contract) || 0 ;
        const totalCarpenterCost = CarpenterPerSqft * builtUpArea;

        const totalCarpenterAmt = totalCarpenterCost + totalCarpenterItemsCost;

        const Carpenter_sgstRate = parseFloat(formData?.carpenter_master?.carpenter_s_gst_percent) || 0;
        const Carpenter_cgstRate = parseFloat(formData?.carpenter_master?.carpenter_c_gst_percent) || 0;
        const Carpenter_igstRate = parseFloat(formData?.carpenter_master?.carpenter_i_gst_percent) || 0;

        const Carpenter_sgstAmount = ( totalCarpenterAmt * Carpenter_sgstRate ) /100;
        const Carpenter_cgstAmount = ( totalCarpenterAmt * Carpenter_cgstRate ) /100;
        const Carpenter_igstAmount = ( totalCarpenterAmt * Carpenter_igstRate ) /100;

        const totalCarpenterCostAfterTax =
            totalCarpenterAmt + Carpenter_sgstAmount + Carpenter_cgstAmount + Carpenter_igstAmount;


        // Carpenter End------------------------------------------------------------------------------------------------


        // Painter------------------------------------------------------------------------------------------------------
        const Painting_items = formData?.painter_master?.painter_items || [];

        const totalPaintingItemsCost = Painting_items.reduce(
            (sum, item) => sum + parseFloat(item.painter_item_amount || 0), 0
        );

        const PaintPerSqft = parseFloat(formData?.painter_master?.painter_contract) || 0;
        const totalPaintingCost = PaintPerSqft * builtUpArea;
        // Before Tax
        const totalPaintingAmt = totalPaintingCost + totalPaintingItemsCost;

        const Painting_sgstRate = parseFloat(formData?.painter_master?.painter_s_gst_percent) || 0;
        const Painting_cgstRate = parseFloat(formData?.painter_master?.painter_c_gst_percent) || 0;
        const Painting_igstRate = parseFloat(formData?.painter_master?.painter_i_gst_percent) || 0;

        const Painting_sgstAmount = ( totalPaintingAmt * Painting_sgstRate ) / 100;
        const Painting_cgstAmount = ( totalPaintingAmt * Painting_cgstRate ) / 100;
        const Painting_igstAmount = ( totalPaintingAmt * Painting_igstRate ) / 100;

        const totalPaintingCostAfterTax = totalPaintingAmt + Painting_sgstAmount
            + Painting_cgstAmount + Painting_igstAmount;

        // painting End-------------------------------------------------------------------------------------------------


        // Other Labours------------------------------------------------------------------------------------------------
        const Other_items = formData?.other_master?.other_items || [];
        const totalOtherLabourItemsCost = Other_items.reduce(
            (sum, item) => sum + parseFloat(item.other_item_amount || 0),0
        );

        const Other_perSqft = parseFloat(formData?.other_master?.other_contract) || 0;
        const totalOtherLabourCost = Other_perSqft * builtUpArea;
        // Before
        const totalOtherLabourAmt = totalOtherLabourCost + totalOtherLabourItemsCost;

        const OtherLabours_sgstRate = parseFloat(formData?.other_master?.other_s_gst_percent) || 0;
        const OtherLabours_cgstRate = parseFloat(formData?.other_master?.other_c_gst_percent) || 0;
        const OtherLabours_igstRate = parseFloat(formData?.other_master?.other_i_gst_percent) || 0;

        const OtherLabours_sgstAmount = ( totalOtherLabourAmt * OtherLabours_sgstRate ) / 100;
        const OtherLabours_cgstAmount = ( totalOtherLabourAmt * OtherLabours_cgstRate ) / 100;
        const OtherLabours_igstAmount = ( totalOtherLabourAmt * OtherLabours_igstRate ) / 100;

        const totalOtherLabourCostAfterTax =
            totalOtherLabourAmt + OtherLabours_sgstAmount + OtherLabours_cgstAmount + OtherLabours_igstAmount;

        // Other Labours End--------------------------------------------------------------------------------------------


        // Total Labours Cost-------------------------------------------------------------------------------------------

        const totalLaboursCostWithTax = totalMasonCostAfterTax + totalCenteringAfterTax +
            totalPlumbingCostAfterTax + totalElectricianCostAfterTax + totalTilesCostAfterTax +
            totalCarpenterCostAfterTax + totalPaintingCostAfterTax + totalOtherLabourCostAfterTax;

        return {
            // Mason
            TotalMasonItemCost: totalMasonItemCost,
            TotalMasonCost: totalMasonCost,
            MasonryAmt: masonryAmt,
            CheckMasonMatch: checkMasonMatch,
            TotalMasonCostAfterTax: totalMasonCostAfterTax,
            totalContractAmt,
            mason_sgstAmount,
            mason_cgstAmount,
            mason_igstAmount,

            // Centering
            TotalCenteringItemCost: totalCenteringItemCost,
            TotalCenteringCost: totalCenteringCost,
            CenteringAmt: centeringAmt,
            CheckCenteringMatch: checkCenteringMatch,
            centering_sgstAmount,
            centering_cgstAmount,
            centering_igstAmount,
            TotalCenteringAfterTax: totalCenteringAfterTax,

            // Plumbing
            TotalPlumbingItemCost: totalPlumbingItemCost,
            TotalPlumbingCost: totalPlumbingCost,
            plumbing_sgstAmount,
            plumbing_cgstAmount,
            plumbing_igstAmount,
            TotalPlumbingCostAfterTax: totalPlumbingCostAfterTax,

            // Electrician
            TotalElectricianItemCost: totalElectricianItemsCost,
            TotalElectricianCost: totalElectricianCost,
            electrician_sgstAmount,
            electrician_cgstAmount,
            electrician_igstAmount,
            TotalElectricianCostAfterTax : totalElectricianCostAfterTax,

            // Tiles
            TotalTilesItemsCost: totalTilesItemsCost,
            TotalTilesCost: totalTilesCost,
            Tiles_sgstAmount,
            Tiles_cgstAmount,
            Tiles_igstAmount,
            TotalTilesCostAfterTax: totalTilesCostAfterTax,

            // Carpenter
            TotalCarpenterItemCost : totalCarpenterItemsCost,
            TotalCarpenterCost: totalCarpenterCost,
            Carpenter_sgstAmount,
            Carpenter_cgstAmount,
            Carpenter_igstAmount,
            TotalCarpenterCostAfterTax: totalCarpenterCostAfterTax,

            // Painting
            TotalPaintingItemCost: totalPaintingItemsCost,
            TotalPaintingCost: totalPaintingCost,
            Painting_sgstAmount,
            Painting_cgstAmount,
            Painting_igstAmount,
            TotalPaintingCostAfterTax: totalPaintingCostAfterTax,

            // Other Labours
            TotalOtherLaboursItemsCost: totalOtherLabourItemsCost,
            TotalOtherLaboursCost: totalOtherLabourCost,
            OtherLabours_sgstAmount,
            OtherLabours_cgstAmount,
            OtherLabours_igstAmount,
            TotalOtherLaboursAfterTax: totalOtherLabourCostAfterTax,

            // Total Labours Cost
            TotalLaboursCostWithTax: totalLaboursCostWithTax,
        };




    }, [
        // Mason
        formData?.mason_master?.mason_contract,
        formData?.mason_master?.mason_items,

        formData?.mason_master?.mason_basement_amount,
        formData?.mason_master?.mason_lintel_amount,
        formData?.mason_master?.mason_septic_tank_amount,
        formData?.mason_master?.mason_roof_amount,
        formData?.mason_master?.mason_outer_plastering_amount,
        formData?.mason_master?.mason_inner_plastering_amount,

        formData?.mason_master?.mason_s_gst_percent,
        formData?.mason_master?.mason_c_gst_percent,
        formData?.mason_master?.mason_i_gst_percent,
        // Centering
        formData?.centering_master?.centering_contract,
        formData?.centering_master?.centering_items,

        formData?.centering_master?.footing_ground_amount,
        formData?.centering_master?.plinth_beam_amount,
        formData?.centering_master?.basement_column_amount,
        formData?.centering_master?.outer_plastering_amount,
        formData?.centering_master?.feet_column_amount,
        formData?.centering_master?.hide_beam_amount,
        formData?.centering_master?.centering_roof_amount,
        formData?.centering_master?.roof_beam_amount,

        formData?.centering_master?.centering_s_gst_percent,
        formData?.centering_master?.centering_c_gst_percent,
        formData?.centering_master?.centering_i_gst_percent,
        // Plumbing
        formData?.plumbing_master?.plumbing_contract,
        formData?.plumbing_master?.plumbing_items,
        formData?.plumbing_master?.plumbing_s_gst_percent,
        formData?.plumbing_master?.plumbing_c_gst_percent,
        formData?.plumbing_master?.plumbing_i_gst_percent,

        // Electrician
        formData?.electrical_master?.electrical_contract,
        formData?.electrical_master?.electrical_items,
        formData?.electrical_master?.electrical_s_gst_percent,
        formData?.electrical_master?.electrical_c_gst_percent,
        formData?.electrical_master?.electrical_i_gst_percent,

        // Tiles
        formData?.tiles_master?.tiles_contract,
        formData?.tiles_master?.tiles_items,
        formData?.tiles_master?.tiles_s_gst_percent,
        formData?.tiles_master?.tiles_c_gst_percent,
        formData?.tiles_master?.tiles_i_gst_percent,

        // Carpenter
        formData?.carpenter_master?.carpenter_contract,
        formData?.carpenter_master?.carpenter_items,
        formData?.carpenter_master?.carpenter_s_gst_percent,
        formData.carpenter_master?.carpenter_c_gst_percent,
        formData.carpenter_master?.carpenter_i_gst_percent,

        // Painter
        formData?.painter_master?.painter_contract,
        formData?.painter_master?.painter_items,
        formData?.painter_master?.painter_s_gst_percent,
        formData?.painter_master?.painter_c_gst_percent,
        formData?.painter_master?.painter_i_gst_percent,

        // Other Labours
        formData?.other_master.other_contract,
        formData?.other_master?.other_items,
        formData?.other_master?.other_s_gst_percent,
        formData?.other_master?.other_c_gst_percent,
        formData?.other_master?.other_i_gst_percent,

        // Build Up Area
        selectedProject?.area_sqft
    ]);

    useEffect(() => {

        setFormData(prev => ({
            ...prev,
            total_mason_cost: TotalMasonCostAfterTax || 0,
            total_centering_cost: TotalCenteringAfterTax || 0,
            total_plumbing_cost: TotalPlumbingCostAfterTax || 0,
            total_electrical_cost: TotalElectricianCostAfterTax || 0,
            total_tiles_cost: TotalTilesCostAfterTax || 0,
            total_carpenter_cost: TotalCarpenterCostAfterTax || 0,
            total_painter_cost: TotalPaintingCostAfterTax || 0,
            total_other_cost: TotalOtherLaboursAfterTax || 0,
            total_labour_cost: TotalLaboursCostWithTax || 0,
            mason_master: {
                ...prev.mason_master,
                mason_contract_amount: totalContractAmt.toFixed(2),
                total_mason_item_amt: TotalMasonItemCost.toFixed(2),
                mason_s_gst_amount: mason_sgstAmount.toFixed(2),
                mason_c_gst_amount: mason_cgstAmount.toFixed(2),
                mason_i_gst_amount: mason_igstAmount.toFixed(2)
            },
            centering_master: {
                ...prev.centering_master,
                centering_contract_amount: TotalCenteringCost.toFixed(2),
                total_centering_item_amt: TotalCenteringItemCost.toFixed(2),
                centering_s_gst_amount: centering_sgstAmount.toFixed(2),
                centering_c_gst_amount: centering_cgstAmount.toFixed(2),
                centering_i_gst_amount: centering_igstAmount.toFixed(2),
            },
            plumbing_master: {
                ...prev.plumbing_master,
                plumbing_contract_amount: TotalPlumbingCost.toFixed(2),
                total_plumbing_item_amt: TotalPlumbingItemCost.toFixed(2),
                plumbing_s_gst_amount: plumbing_sgstAmount.toFixed(2),
                plumbing_c_gst_amount: plumbing_cgstAmount.toFixed(2),
                plumbing_i_gst_amount: plumbing_igstAmount.toFixed(2),
            },
            electrical_master: {
                ...prev.electrical_master,
                electrical_contract_amount: TotalElectricianCost.toFixed(2),
                total_electrical_item_amt:  TotalElectricianItemCost.toFixed(2),
                electrical_s_gst_amount: electrician_sgstAmount.toFixed(2),
                electrical_c_gst_amount: electrician_cgstAmount.toFixed(2),
                electrical_i_gst_amount: electrician_igstAmount.toFixed(2),
            },
            tiles_master: {
                ...prev.tiles_master,
                tiles_contract_amount: TotalTilesCost.toFixed(2),
                total_tiles_item_amt:  TotalTilesItemsCost.toFixed(2),
                tiles_s_gst_amount: Tiles_sgstAmount.toFixed(2),
                tiles_c_gst_amount: Tiles_cgstAmount.toFixed(2),
                tiles_i_gst_amount: Tiles_igstAmount.toFixed(2),
            },
            carpenter_master: {
                ...prev.carpenter_master,
                carpenter_contract_amount: TotalCarpenterCost.toFixed(2),
                total_carpenter_items_amt: TotalCarpenterItemCost.toFixed(2),
                carpenter_s_gst_amount: Carpenter_sgstAmount.toFixed(2),
                carpenter_c_gst_amount: Carpenter_cgstAmount.toFixed(2),
                carpenter_i_gst_amount: Carpenter_igstAmount.toFixed(2),
            },
            painter_master: {
                ...prev.painter_master,
                painter_contract_amount: TotalPaintingCost.toFixed(2),
                total_painter_item_amt: TotalPaintingItemCost.toFixed(2),
                painter_s_gst_amount: Painting_sgstAmount.toFixed(2),
                painter_c_gst_amount: Painting_cgstAmount.toFixed(2),
                painter_i_gst_amount: Painting_igstAmount.toFixed(2),
            },
            other_master: {
                ...prev.other_master,
                other_contract_amount: TotalOtherLaboursCost.toFixed(2),
                total_other_items_amt: TotalOtherLaboursItemsCost.toFixed(2),
                other_s_gst_amount: OtherLabours_sgstAmount.toFixed(2),
                other_c_gst_amount: OtherLabours_cgstAmount.toFixed(2),
                other_i_gst_amount: OtherLabours_igstAmount.toFixed(2),
            }

        }));
    }, [
        // Mason
        totalContractAmt,
        TotalMasonItemCost,
        mason_sgstAmount,
        mason_cgstAmount,
        mason_igstAmount,
        setFormData,

        // Centering
        TotalCenteringCost,
        TotalCenteringItemCost,
        centering_sgstAmount,
        centering_cgstAmount,
        centering_igstAmount,

        // Plumbing
        TotalPlumbingItemCost,
        TotalPlumbingCost,
        plumbing_sgstAmount,
        plumbing_cgstAmount,
        plumbing_igstAmount,

        // Electrician
        TotalElectricianItemCost,
        TotalElectricianCost,
        electrician_sgstAmount,
        electrician_cgstAmount,
        electrician_igstAmount,

        // Tiles
        TotalTilesItemsCost,
        TotalTilesCost,
        Tiles_sgstAmount,
        Tiles_cgstAmount,
        Tiles_igstAmount,

        // Carpenter
        TotalCarpenterItemCost,
        TotalCarpenterCost,
        Carpenter_sgstAmount,
        Carpenter_cgstAmount,
        Carpenter_igstAmount,

        // Painting
        TotalPaintingItemCost,
        TotalPaintingCost,
        Painting_sgstAmount,
        Painting_cgstAmount,
        Painting_igstAmount,

        // Other Labours
        TotalOtherLaboursItemsCost,
        TotalOtherLaboursCost,
        OtherLabours_sgstAmount,
        OtherLabours_cgstAmount,
        OtherLabours_igstAmount,
    ]);

    // Handle Create Labour
    async function HandleSubmitCreateLabour(ev)
    {

        ev.preventDefault();

        if (!checked)
        {

            toast.error("Please confirm that the entered labour details are valid.", {
                style: {
                    border: '1px solid #6392E5',
                    color: '#005bea',
                    background: '#f1f1f1',
                }
            });

        } else {

            const LabourCreated = await addLabour(formData);

            if (LabourCreated)
            {

                setRedirect(true);

                setTimeout(() => {

                    return navigate('/app-area/labour/labour_board');

                })

            } else {

                setRedirect(false);

            }

        }

    }

    if (redirect) return <Loading_Screen />

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

                    <form onSubmit={HandleSubmitCreateLabour}>
                        <div className="grid items-center gap-6 py-6">

                            <div className="grid grid-cols-3 gap-6">
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
                                        <option>
                                            Select Project Type
                                        </option>
                                        {


                                            ExtractProjectName.map((item, index) => (

                                                <option key={index} value={item.project_name}>
                                                    { item.project_name }
                                                </option>

                                            ))

                                        }

                                    </select>
                                </motion.label>
                            </div>


                            <div>
                                {

                                    selectedProject

                                    ?

                                        (

                                            <div className="flex gap-2 ">
                                                <p>
                                                    Build Up Area:
                                                </p>
                                                <p className="[#005bea]">
                                                    { selectedProject.area_sqft }
                                                </p>
                                            </div>

                                        )

                                    :

                                        (

                                            <div className="flex gap-2 ">
                                                <p>
                                                    Build Up Area:
                                                </p>
                                                <p className="[#005bea]">
                                                    { 0 }
                                                </p>
                                            </div>

                                        )

                                }
                            </div>
                        </div>
                        <div className="my-2">
                            <motion.hr
                                initial={{opacity: 0, y: 100}}
                                animate={{y: 0, opacity: 1}}
                                className="border-[#6392E5]"/>
                        </div>


                        {/* mason */}
                        <motion.div
                            initial={{opacity: 0, y: 100}}
                            animate={{opacity: 1, y: 0}}
                            transition={{delay: 0.3}}
                            className="border items-center border-[#A9C1EA] bg-[#F1F1F1] rounded p-4 my-4">
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
                                <motion.label
                                    initial={{opacity: 0, y: 100}}
                                    animate={{opacity: 1, y: 0}}
                                    transition={{delay: 1.4}}
                                    className="grid">
                                    <div className="flex gap-2 items-center ">
                                        <p><span className="text-[#005bea] text-lg">Total Mason Contract Amount :</span></p>
                                        <IndianRupee size={20}/>
                                        <p className={CheckMasonMatch ? 'text-green-600 text-lg' : `text-red-400 text-lg`}>
                                            {parseFloat(MasonryAmt).toLocaleString('en-IN')}
                                        </p>
                                        <p>
                                            {
                                                CheckMasonMatch
                                                ?
                                                    (
                                                        <span className="text-green-600">

                                                            Total Contract Amount Matched
                                                        </span>
                                                    )
                                                :
                                                    (
                                                        <span className="text-red-600">
                                                            Total Contract Amount  Mismatched
                                                        </span>
                                                    )
                                            }
                                        </p>
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
                                    <p className="flex text-[#005BEA] text-xl">
                                        <IndianRupee />
                                        { parseFloat(TotalMasonCostAfterTax).toLocaleString('en-IN') || 0 }
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
                        <motion.div
                            initial={{opacity: 0, y: 100}}
                            animate={{opacity: 1, y: 0}}
                            transition={{delay: 0.1}}
                            className="border items-center border-[#A9C1EA] bg-[#F1F1F1] rounded p-4 my-4">
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
                                    transition={{delay: 0.2}}
                                    className="grid" htmlFor="name">
                                    <span className="mx-2">Name</span>
                                    <input type="text"
                                           value={formData.centering_master.centering_name}
                                           onChange={(e) => setFormData({...formData, centering_master: { ...formData.centering_master, centering_name: e.target.value }})}
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
                                           value={formData.centering_master.centering_phone}
                                           onChange={(e) => setFormData({...formData, centering_master: { ...formData.centering_master, centering_phone: e.target.value }})}
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
                                           value={formData.centering_master.centering_address}
                                           onChange={(e) => setFormData({...formData, centering_master: { ...formData.centering_master, centering_address: e.target.value }})}
                                           className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                           placeholder="Enter the Address" />
                                </motion.label>
                                <motion.label
                                    initial={{opacity: 0, y: 100}}
                                    animate={{opacity: 1, y: 0}}
                                    transition={{delay: 0.5}}
                                    className="grid" htmlFor="Labour">
                                    <span className="mx-2">Centering Cost Per Sqft</span>
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
                                    transition={{delay: 0.6}}
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
                                <motion.label
                                    initial={{opacity: 0, y: 100}}
                                    animate={{opacity: 1, y: 0}}
                                    transition={{delay: 1.4}}
                                    className="grid">
                                    <div className="flex gap-2 items-center ">
                                        <p><span className="text-[#005bea] text-lg">Total Centering Contract Amount :</span></p>
                                        <IndianRupee size={20}/>
                                        <p className={CheckCenteringMatch ? 'text-green-600 text-lg' : `text-red-400 text-lg`}>
                                            {parseFloat(CenteringAmt).toLocaleString('en-IN')}
                                        </p>
                                        <p>
                                            {
                                                CheckCenteringMatch
                                                    ?
                                                    (
                                                        <span className="text-green-600">

                                                            Total Contract Amount Matched
                                                        </span>
                                                    )
                                                    :
                                                    (
                                                        <span className="text-red-600">
                                                            Total Contract Amount  Mismatched
                                                        </span>
                                                    )
                                            }
                                        </p>
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

                                    formData.centering_master.centering_items.map((item, index) =>

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
                                                                   onChange={(e) => HandleCenteringInputChange(index,'centering_item_remarks', e.target.value)}
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
                        </div>


                        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1 my-4 gap-6">
                            <motion.label
                                initial={{opacity: 0, y: 100}}
                                animate={{opacity: 1, y: 0}}
                                transition={{delay: 1.4}}
                                className="grid" htmlFor="SGST">
                                <span className="mx-2">SGST</span>
                                <div className="grid grid-cols-1 md:flex lg:flex xl:flex gap-4">
                                    <input type="number"
                                           value={formData.centering_master.centering_s_gst_percent}
                                           onChange={(e) =>
                                               setFormData({
                                                   ...formData,
                                                   centering_master: {
                                                       ...formData.centering_master,
                                                       centering_s_gst_percent: e.target.value
                                                   }})}
                                           className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                           placeholder="%" />
                                    <input type="number"
                                           readOnly={true}
                                           value={formData.centering_master.centering_s_gst_amount}
                                           onChange={(e) => setFormData({
                                               ...formData,
                                               centering_master: {
                                                   ...formData.centering_master,
                                                   centering_s_gst_amount: e.target.value
                                               }})}
                                           className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                           placeholder="Amount" />
                                </div>
                            </motion.label>
                                <motion.label
                                    initial={{opacity: 0, y: 100}}
                                    animate={{opacity: 1, y: 0}}
                                    transition={{delay: 1.5}}
                                    className="grid" htmlFor="CGST">
                                    <span className="mx-2">CGST</span>
                                    <div className="grid grid-cols-1 md:flex lg:flex xl:flex gap-4">
                                        <input type="number"
                                               value={formData.centering_master.centering_c_gst_percent}
                                               onChange={(e) => setFormData({...formData, centering_master: { ...formData.centering_master, centering_c_gst_percent: e.target.value }})}
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
                                    transition={{delay: 1.6}}
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
                                    <p className="flex text-[#005BEA] text-xl">
                                        <IndianRupee />
                                        { parseFloat(TotalCenteringAfterTax).toLocaleString('en-IN') || 0 }

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
                        <motion.div
                            initial={{opacity: 0, y: 100}}
                            animate={{opacity: 1, y: 0}}
                            transition={{delay: 0.1}}
                            className="border items-center border-[#A9C1EA] bg-[#F1F1F1] rounded p-4 my-4">
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
                                    <p className="flex text-[#005BEA] text-xl">
                                        <IndianRupee />
                                        { parseFloat(TotalPlumbingCostAfterTax).toLocaleString('en-IN') || 0 }
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
                        <motion.div
                            initial={{opacity: 0, y: 100}}
                            animate={{opacity: 1, y: 0}}
                            transition={{delay: 0.1}}
                            className="border items-center border-[#A9C1EA] bg-[#F1F1F1] rounded p-4 my-4">
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
                                    transition={{delay: 0.2}}
                                    className="grid" htmlFor="name">
                                    <span className="mx-2">Name</span>
                                    <input type="text"
                                           value={formData.electrical_master.electrical_name}
                                           onChange={(e) => setFormData({...formData, electrical_master: { ...formData.electrical_master, electrical_name: e.target.value }})}
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
                                           value={formData.electrical_master.electrical_phone}
                                           onChange={(e) => setFormData({...formData, electrical_master: { ...formData.electrical_master, electrical_phone: e.target.value }})}
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
                                           value={formData.electrical_master.electrical_address}
                                           onChange={(e) => setFormData({...formData, electrical_master: { ...formData.electrical_master, electrical_address: e.target.value }})}
                                           className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                           placeholder="Enter the Address" />
                                </motion.label>
                                <motion.label
                                    initial={{opacity: 0, y: 100}}
                                    animate={{opacity: 1, y: 0}}
                                    transition={{delay: 0.5}}
                                    className="grid" htmlFor="Labour">
                                    <span className="mx-2">Electrician Cost Per Sqft</span>
                                    <input name="text"
                                           value={formData.electrical_master.electrical_contract}
                                           onChange={(e) => setFormData({...formData, electrical_master: { ...formData.electrical_master, electrical_contract: e.target.value }})}
                                           className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                           id="role" placeholder="Enter Per Sqft"/>
                                </motion.label>
                                <motion.label
                                    initial={{opacity: 0, y: 100}}
                                    animate={{opacity: 1, y: 0}}
                                    transition={{delay: 0.6}}
                                    className="grid" htmlFor="Contract">
                                    <span className="mx-2">Total Contract Amount</span>
                                    <input name="text"
                                           readOnly={true}
                                           value={formData.electrical_master.electrical_contract_amount}
                                           onChange={(e) => setFormData({...formData, electrical_master: { ...formData.electrical_master, electrical_contract_amount: e.target.value }})}
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
                                    transition={{delay: 0.7}}>
                                    <CircleFadingPlus/>
                                    Add Items
                                </motion.button>
                                {

                                    formData.electrical_master.electrical_items.map((item, index) =>

                                        (

                                            <div key={index} className="">
                                                <div className="border border-[#6392E5] p-6 rounded bg-[#F1F1F1] my-2">
                                                    <div className="grid md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-3 gap-6">
                                                        <motion.label
                                                            initial={{opacity: 0, y: 100}}
                                                            animate={{opacity: 1, y: 0}}
                                                            transition={{delay: 0.8}}
                                                            className="grid" htmlFor="beam">
                                                            <span className="mx-2">Item Name</span>
                                                            <div className="grid grid-cols-1 md:flex lg:flex xl:flex gap-4">
                                                                <input type="text"
                                                                       value={formData.electrical_item_name}
                                                                       onChange={(ev) => HandleElectricalInputChange(index, 'electrical_item_name', ev.target.value)}
                                                                       className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                                                       placeholder="Enter Item Name"
                                                                />
                                                                <input type="text"
                                                                       value={formData.electrical_item_amount}
                                                                       onChange={(ev) => HandleElectricalInputChange(index, 'electrical_item_amount', ev.target.value)}
                                                                       className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                                                       placeholder="Amount"
                                                                />
                                                            </div>
                                                        </motion.label>
                                                        <motion.label
                                                            initial={{opacity: 0, y: 100}}
                                                            animate={{opacity: 1, y: 0}}
                                                            transition={{delay: 0.9}}
                                                            className="grid" htmlFor="remarks">
                                                            <span className="mx-2">Remarks</span>
                                                            <input type="text"
                                                                   value={formData.electrical_item_remarks}
                                                                   onChange={(ev) => HandleElectricalInputChange(index, 'electrical_item_remarks', ev.target.value)}
                                                                   className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                                                   placeholder="Enter any Remarks" />
                                                        </motion.label>
                                                        {
                                                            formData.electrical_master.electrical_items.length > 1

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


                            <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1 my-4 gap-6">
                                <motion.label
                                    initial={{opacity: 0, y: 100}}
                                    animate={{opacity: 1, y: 0}}
                                    transition={{delay: 1.11}}
                                    className="grid" htmlFor="SGST">
                                    <span className="mx-2">SGST</span>
                                    <div className="grid grid-cols-1 md:flex lg:flex xl:flex gap-4">
                                        <input type="number"
                                               value={formData.electrical_master.electrical_s_gst_percent}
                                               onChange={(e) => setFormData({...formData, electrical_master: { ...formData.electrical_master, electrical_s_gst_percent: e.target.value }})}
                                               className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                               placeholder="%" />
                                        <input type="number"
                                               readOnly={true}
                                               value={formData.electrical_master.electrical_s_gst_amount}
                                               onChange={(e) => setFormData({...formData, electrical_master: { ...formData.electrical_master, electrical_s_gst_amount: e.target.value }})}
                                               className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                               placeholder="Amount" />
                                    </div>
                                </motion.label>
                                <motion.label
                                    initial={{opacity: 0, y: 100}}
                                    animate={{opacity: 1, y: 0}}
                                    transition={{delay: 1.12}}
                                    className="grid" htmlFor="CGST">
                                    <span className="mx-2">CGST</span>
                                    <div className="grid grid-cols-1 md:flex lg:flex xl:flex gap-4">
                                        <input type="number"
                                               value={formData.electrical_master.electrical_c_gst_percent}
                                               onChange={(e) => setFormData({...formData, electrical_master: { ...formData.electrical_master, electrical_c_gst_percent: e.target.value }})}
                                               className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                               placeholder="%" />
                                        <input type="number"
                                               readOnly={true}
                                               value={formData.electrical_master.electrical_c_gst_amount}
                                               onChange={(e) => setFormData({...formData, electrical_master: { ...formData.electrical_master, electrical_c_gst_amount: e.target.value }})}
                                               className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                               placeholder="Amount" />
                                    </div>
                                </motion.label>
                                <motion.label
                                    initial={{opacity: 0, y: 100}}
                                    animate={{opacity: 1, y: 0}}
                                    transition={{delay: 1.13}}
                                    className="grid" htmlFor="IGST">
                                    <span className="mx-2">IGST</span>
                                    <div className="grid grid-cols-1 md:flex lg:flex xl:flex gap-4">
                                        <input type="number"
                                               value={formData.electrical_master.electrical_i_gst_percent}
                                               onChange={(e) => setFormData({...formData, electrical_master: { ...formData.electrical_master, electrical_i_gst_percent: e.target.value }})}
                                               className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                               placeholder="%" />
                                        <input type="number"
                                               readOnly={true}
                                               value={formData.electrical_master.electrical_i_gst_amount}
                                               onChange={(e) => setFormData({...formData, electrical_master: { ...formData.electrical_master, electrical_i_gst_amount: e.target.value }})}
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
                                    <p className="flex text-[#005BEA] text-xl">
                                        <IndianRupee />
                                        { parseFloat(TotalElectricianCostAfterTax).toLocaleString('en-IN') }
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
                        <motion.div
                            initial={{opacity: 0, y: 100}}
                            animate={{opacity: 1, y: 0}}
                            transition={{delay: 0.1}}
                            className="border items-center border-[#A9C1EA] bg-[#F1F1F1] rounded p-4 my-4">
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
                                    transition={{delay: 0.2}}
                                    className="grid" htmlFor="name">
                                    <span className="mx-2">Name</span>
                                    <input type="text"
                                           value={formData.tiles_master.tiles_name}
                                           onChange={(e) => setFormData({...formData, tiles_master: { ...formData.tiles_master, tiles_name: e.target.value }})}
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
                                           value={formData.tiles_master.tiles_phone}
                                           onChange={(e) => setFormData({...formData, tiles_master: { ...formData.tiles_master, tiles_phone: e.target.value }})}
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
                                           value={formData.tiles_master.tiles_address}
                                           onChange={(e) => setFormData({...formData, tiles_master: { ...formData.tiles_master, tiles_address: e.target.value }})}
                                           className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                           placeholder="Enter the Address" />
                                </motion.label>
                                <motion.label
                                    initial={{opacity: 0, y: 100}}
                                    animate={{opacity: 1, y: 0}}
                                    transition={{delay: 0.5}}
                                    className="grid" htmlFor="Labour">
                                    <span className="mx-2">Tiles Cost Per Sqft</span>
                                    <input name="text"
                                           value={formData.tiles_master.tiles_contract}
                                           onChange={(e) => setFormData({...formData, tiles_master: { ...formData.tiles_master, tiles_contract: e.target.value }})}
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
                                           value={formData.tiles_master.tiles_contract_amount}
                                           onChange={(e) => setFormData({...formData, tiles_master: { ...formData.tiles_master, tiles_contract_amount: e.target.value }})}
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
                                    transition={{delay: 0.7}}>
                                    <CircleFadingPlus/>
                                    Add Items
                                </motion.button>
                                {

                                    formData.tiles_master.tiles_items.map((item, index) =>

                                        (

                                            <div key={index} className="">
                                                <div className="border border-[#6392E5] p-6 rounded bg-[#F1F1F1] my-2">
                                                    <div className="grid md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-3 gap-6">
                                                        <motion.label
                                                            initial={{opacity: 0, y: 100}}
                                                            animate={{opacity: 1, y: 0}}
                                                            transition={{delay: 0.8}}
                                                            className="grid" htmlFor="beam">
                                                            <span className="mx-2">Item Name</span>
                                                            <div className="grid grid-cols-1 md:flex lg:flex xl:flex gap-4">
                                                                <input type="text"
                                                                       value={formData.tiles_item_name}
                                                                       onChange={(ev) => HandleTilesInputChange(index, 'tiles_item_name', ev.target.value)}
                                                                       className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                                                       placeholder="Enter Item Name"
                                                                />
                                                                <input type="text"
                                                                       value={formData.tiles_item_amount}
                                                                       onChange={(ev) => HandleTilesInputChange(index, 'tiles_item_amount', ev.target.value)}
                                                                       className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                                                       placeholder="Amount"
                                                                />
                                                            </div>
                                                        </motion.label>
                                                        <motion.label
                                                            initial={{opacity: 0, y: 100}}
                                                            animate={{opacity: 1, y: 0}}
                                                            transition={{delay: 0.9}}
                                                            className="grid" htmlFor="remarks">
                                                            <span className="mx-2">Remarks</span>
                                                            <input type="text"
                                                                   value={formData.tiles_item_remarks}
                                                                   onChange={(ev) => HandleTilesInputChange(index, 'tiles_item_remarks', ev.target.value)}
                                                                   className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                                                   placeholder="Enter any Remarks" />
                                                        </motion.label>
                                                        {
                                                            formData.tiles_master.tiles_items.length > 1

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

                            <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1 my-4 gap-6">
                                <motion.label
                                    initial={{opacity: 0, y: 100}}
                                    animate={{opacity: 1, y: 0}}
                                    transition={{delay: 1.11}}
                                    className="grid" htmlFor="SGST">
                                    <span className="mx-2">SGST</span>
                                    <div className="grid grid-cols-1 md:flex lg:flex xl:flex gap-4">
                                        <input type="number"
                                               value={formData.tiles_master.tiles_s_gst_percent}
                                               onChange={(e) => setFormData({...formData, tiles_master: { ...formData.tiles_master, tiles_s_gst_percent: e.target.value }})}
                                               className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                               placeholder="%" />
                                        <input type="number"
                                               readOnly={true}
                                               value={formData.tiles_master.tiles_s_gst_amount}
                                               onChange={(e) => setFormData({...formData, tiles_master: { ...formData.tiles_master, tiles_s_gst_amount: e.target.value }})}
                                               className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                               placeholder="Amount" />
                                    </div>
                                </motion.label>
                                <motion.label
                                    initial={{opacity: 0, y: 100}}
                                    animate={{opacity: 1, y: 0}}
                                    transition={{delay: 1.12}}
                                    className="grid" htmlFor="CGST">
                                    <span className="mx-2">CGST</span>
                                    <div className="grid grid-cols-1 md:flex lg:flex xl:flex gap-4">
                                        <input type="number"
                                               value={formData.tiles_master.tiles_c_gst_percent}
                                               onChange={(e) => setFormData({...formData, tiles_master: { ...formData.tiles_master, tiles_c_gst_percent: e.target.value }})}
                                               className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                               placeholder="%" />
                                        <input type="number"
                                               readOnly={true}
                                               value={formData.tiles_master.tiles_c_gst_amount}
                                               onChange={(e) => setFormData({...formData, tiles_master: { ...formData.tiles_master, tiles_c_gst_amount: e.target.value }})}
                                               className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                               placeholder="Amount" />
                                    </div>
                                </motion.label>
                                <motion.label
                                    initial={{opacity: 0, y: 100}}
                                    animate={{opacity: 1, y: 0}}
                                    transition={{delay: 1.13}}
                                    className="grid" htmlFor="IGST">
                                    <span className="mx-2">IGST</span>
                                    <div className="grid grid-cols-1 md:flex lg:flex xl:flex gap-4">
                                        <input type="number"
                                               value={formData.tiles_master.tiles_i_gst_percent}
                                               onChange={(e) => setFormData({...formData, tiles_master: { ...formData.tiles_master, tiles_i_gst_percent: e.target.value }})}
                                               className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                               placeholder="%" />
                                        <input type="number"
                                               readOnly={true}
                                               value={formData.tiles_master.tiles_i_gst_amount}
                                               onChange={(e) => setFormData({...formData, tiles_master: { ...formData.tiles_master, tiles_i_gst_amount: e.target.value }})}
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
                                    <p className="flex text-[#005BEA] text-xl">
                                        <IndianRupee/>
                                        { parseFloat(TotalTilesCostAfterTax).toLocaleString('en-IN') }
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
                        <motion.div
                            initial={{opacity: 0, y: 100}}
                            animate={{opacity: 1, y: 0}}
                            transition={{delay: 0.1}}
                            className="border items-center border-[#A9C1EA] bg-[#F1F1F1] rounded p-4 my-4">
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
                                    transition={{delay: 0.2}}
                                    className="grid" htmlFor="name">
                                    <span className="mx-2">Name</span>
                                    <input type="text"
                                           value={formData.carpenter_master.carpenter_name}
                                           onChange={(e) => setFormData({...formData, carpenter_master: { ...formData.carpenter_master, carpenter_name: e.target.value }})}
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
                                           value={formData.carpenter_master.carpenter_phone}
                                           onChange={(e) => setFormData({...formData, carpenter_master: { ...formData.carpenter_master, carpenter_phone: e.target.value }})}
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
                                           value={formData.carpenter_master.carpenter_address}
                                           onChange={(e) => setFormData({...formData, carpenter_master: { ...formData.carpenter_master, carpenter_address: e.target.value }})}
                                           className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                           placeholder="Enter the Address" />
                                </motion.label>
                                <motion.label
                                    initial={{opacity: 0, y: 100}}
                                    animate={{opacity: 1, y: 0}}
                                    transition={{delay: 0.4}}
                                    className="grid" htmlFor="Labour">
                                    <span className="mx-2">Carpenter Cost per Sqft</span>
                                    <input name="text"
                                           value={formData.carpenter_master.carpenter_contract}
                                           onChange={(e) => setFormData({...formData, carpenter_master: { ...formData.carpenter_master, carpenter_contract: e.target.value }})}
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
                                           readOnly={true}
                                           value={formData.carpenter_master.carpenter_contract_amount}
                                           onChange={(e) => setFormData({...formData, carpenter_master: { ...formData.carpenter_master, carpenter_contract_amount: e.target.value }})}
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

                                    formData.carpenter_master.carpenter_items.map((item, index) =>

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
                                                                       onChange={(ev) => HandleCarpenterInputChange(index, 'carpenter_item_name', ev.target.value)}
                                                                       className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                                                       placeholder="Enter Item Name"
                                                                />
                                                                <input type="text"
                                                                       value={formData.carpenter_item_amount}
                                                                       onChange={(ev) => HandleCarpenterInputChange(index, 'carpenter_item_amount', ev.target.value)}
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
                                                                   onChange={(ev) => HandleCarpenterInputChange(index, 'carpenter_item_remarks', ev.target.value)}
                                                                   className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                                                   placeholder="Enter any Remarks" />
                                                        </motion.label>
                                                        {
                                                            formData.carpenter_master.carpenter_items.length > 1

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
                                    transition={{delay: 0.6}}
                                    className="grid" htmlFor="SGST">
                                    <span className="mx-2">SGST</span>
                                    <div className="grid grid-cols-1 md:flex lg:flex xl:flex gap-4">
                                        <input type="number"
                                               value={formData.carpenter_master.carpenter_s_gst_percent}
                                               onChange={(e) => setFormData(
                                                   {...formData, carpenter_master: {
                                                       ...formData.carpenter_master,
                                                           carpenter_s_gst_percent: e.target.value
                                                        }
                                                   }
                                                   )}
                                               className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                               placeholder="%" />
                                        <input type="number"
                                               readOnly={true}
                                               value={formData.carpenter_master.carpenter_s_gst_amount}
                                               onChange={(e) => setFormData({...formData, carpenter_master: { ...formData.carpenter_master, carpenter_s_gst_amount: e.target.value }})}
                                               className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                               placeholder="Amount" />
                                    </div>
                                </motion.label>
                                <motion.label
                                    initial={{opacity: 0, y: 100}}
                                    animate={{opacity: 1, y: 0}}
                                    transition={{delay: 0.7}}
                                    className="grid" htmlFor="CGST">
                                    <span className="mx-2">CGST</span>
                                    <div className="grid grid-cols-1 md:flex lg:flex xl:flex gap-4">
                                        <input type="number"
                                               value={formData.carpenter_master.carpenter_c_gst_percent}
                                            onChange={(e)=>{
                                                setFormData({
                                                    ...formData,
                                                    carpenter_master: {
                                                        ...formData.carpenter_master,
                                                        carpenter_c_gst_percent: e.target.value
                                                    }
                                                })
                                            }}
                                               className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                               placeholder="%" />
                                        <input type="number"
                                               readOnly={true}
                                               value={formData.carpenter_master.carpenter_c_gst_amount}
                                               onChange={(e)=>{
                                                   setFormData({
                                                       ...formData,
                                                       carpenter_master: {
                                                           ...formData.carpenter_master,
                                                           carpenter_c_gst_amount: e.target.value
                                                       }
                                                   })
                                               }}
                                               className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                               placeholder="Amount" />
                                    </div>
                                </motion.label>
                                <motion.label
                                    initial={{opacity: 0, y: 100}}
                                    animate={{opacity: 1, y: 0}}
                                    transition={{delay: 0.8}}
                                    className="grid" htmlFor="IGST">
                                    <span className="mx-2">IGST</span>
                                    <div className="grid grid-cols-1 md:flex lg:flex xl:flex gap-4">
                                        <input type="number"
                                               value={formData.carpenter_master.carpenter_i_gst_percent}
                                               onChange={(e) => setFormData({...formData, carpenter_master: { ...formData.carpenter_master, carpenter_i_gst_percent: e.target.value }})}
                                               className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                               placeholder="%" />
                                        <input type="number"
                                               readOnly={true}
                                               value={formData.carpenter_master.carpenter_i_gst_amount}
                                               onChange={(e) => setFormData({...formData, carpenter_master: { ...formData.carpenter_master, carpenter_i_gst_amount: e.target.value }})}
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
                                    <p className="flex text-[#005BEA] text-xl">
                                        <IndianRupee />
                                        { parseFloat(TotalCarpenterCostAfterTax).toLocaleString('en-IN') }
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
                         <motion.div
                             initial={{opacity: 0, y: 100}}
                             animate={{opacity: 1, y: 0}}
                             transition={{delay: 0.1}}
                             className="border items-center border-[#A9C1EA] bg-[#F1F1F1] rounded p-4 my-4">
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
                                    transition={{delay: 0.2}}
                                    className="grid" htmlFor="name">
                                    <span className="mx-2">Name</span>
                                    <input type="text"
                                           value={formData.painter_master.painter_name}
                                           onChange={(e) => setFormData({...formData, painter_master: { ...formData.painter_master, painter_name: e.target.value }})}
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
                                           value={formData.painter_master.painter_phone}
                                           onChange={(e) => setFormData({...formData, painter_master: { ...formData.painter_master, painter_phone: e.target.value }})}
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
                                           value={formData.painter_master.painter_address}
                                           onChange={(e) => setFormData({...formData, painter_master: { ...formData.painter_master, painter_address: e.target.value }})}
                                           className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                           placeholder="Enter the Address" />
                                </motion.label>
                                <motion.label
                                    initial={{opacity: 0, y: 100}}
                                    animate={{opacity: 1, y: 0}}
                                    transition={{delay: 0.5}}
                                    className="grid" htmlFor="Labour">
                                    <span className="mx-2">Painting Cost Per Sqft</span>
                                    <input name="text"
                                           value={formData.painter_master.painter_contract}
                                           onChange={(e) => setFormData({...formData, painter_master: { ...formData.painter_master, painter_contract: e.target.value }})}
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
                                           value={formData.painter_master.painter_contract_amount}
                                           onChange={(e) => setFormData({...formData, painter_master: { ...formData.painter_master, painter_contract_amount: e.target.value }})}
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
                                    transition={{delay: 0.7}}>
                                    <CircleFadingPlus/>
                                    Add Items
                                </motion.button>
                                {

                                    formData.painter_master.painter_items.map((item, index) =>

                                        (

                                            <div key={index} className="">
                                                <div className="border border-[#6392E5] p-6 rounded bg-[#F1F1F1] my-2">
                                                    <div className="grid md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-3 gap-6">
                                                        <motion.label
                                                            initial={{opacity: 0, y: 100}}
                                                            animate={{opacity: 1, y: 0}}
                                                            transition={{delay: 0.8}}
                                                            className="grid" htmlFor="beam">
                                                            <span className="mx-2">Item Name</span>
                                                            <div className="grid grid-cols-1 md:flex lg:flex xl:flex gap-4">
                                                                <input type="text"
                                                                       value={formData.painter_item_name}
                                                                       onChange={(ev) => HandlePainterInputChange(index, 'painter_item_name', ev.target.value)}
                                                                       className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                                                       placeholder="Enter Item Name"
                                                                />
                                                                <input type="text"
                                                                       value={formData.painter_item_amount}
                                                                       onChange={(ev) => HandlePainterInputChange(index, 'painter_item_amount', ev.target.value)}
                                                                       className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                                                       placeholder="Amount"
                                                                />
                                                            </div>
                                                        </motion.label>
                                                        <motion.label
                                                            initial={{opacity: 0, y: 100}}
                                                            animate={{opacity: 1, y: 0}}
                                                            transition={{delay: 0.9}}
                                                            className="grid" htmlFor="remarks">
                                                            <span className="mx-2">Remarks</span>
                                                            <input type="text"
                                                                   value={formData.painter_item_remarks}
                                                                   onChange={(ev) => HandlePainterInputChange(index, 'painter_item_remarks', ev.target.value)}
                                                                   className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                                                   placeholder="Enter any Remarks" />
                                                        </motion.label>
                                                        {
                                                            formData.painter_master.painter_items.length > 1

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
                                    transition={{delay: 1.0}}
                                    className="grid" htmlFor="SGST">
                                    <span className="mx-2">SGST</span>
                                    <div className="grid grid-cols-1 md:flex lg:flex xl:flex gap-4">
                                        <input type="number"
                                               value={formData.painter_master.painter_s_gst_percent}
                                               onChange={(e) => setFormData({...formData, painter_master: { ...formData.painter_master, painter_s_gst_percent: e.target.value }})}
                                               className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                               placeholder="%" />
                                        <input type="number"
                                               readOnly={true}
                                               value={formData.painter_master.painter_s_gst_amount}
                                               onChange={(e) => setFormData({...formData, painter_master: { ...formData.painter_master, painter_s_gst_amount: e.target.value }})}
                                               className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                               placeholder="Amount" />
                                    </div>
                                </motion.label>
                                <motion.label
                                    initial={{opacity: 0, y: 100}}
                                    animate={{opacity: 1, y: 0}}
                                    transition={{delay: 1.11}}
                                    className="grid" htmlFor="CGST">
                                    <span className="mx-2">CGST</span>
                                    <div className="grid grid-cols-1 md:flex lg:flex xl:flex gap-4">
                                        <input type="number"
                                               value={formData.painter_master.painter_c_gst_percent}
                                               onChange={(e) => setFormData({...formData, painter_master: { ...formData.painter_master, painter_c_gst_percent: e.target.value }})}
                                               className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                               placeholder="%" />
                                        <input type="number"
                                               readOnly={true}
                                               value={formData.painter_master.painter_c_gst_amount}
                                               onChange={(e) => setFormData({...formData, painter_master: { ...formData.painter_master, painter_c_gst_amount: e.target.value }})}
                                               className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                               placeholder="Amount" />
                                    </div>
                                </motion.label>
                                <motion.label
                                    initial={{opacity: 0, y: 100}}
                                    animate={{opacity: 1, y: 0}}
                                    transition={{delay: 1.12}}
                                    className="grid" htmlFor="IGST">
                                    <span className="mx-2">IGST</span>
                                    <div className="grid grid-cols-1 md:flex lg:flex xl:flex gap-4">
                                        <input type="number"
                                               value={formData.painter_master.painter_i_gst_percent}
                                               onChange={(e) => setFormData({...formData, painter_master: { ...formData.painter_master, painter_i_gst_percent: e.target.value }})}
                                               className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                               placeholder="%" />
                                        <input type="number"
                                               readOnly={true}
                                               value={formData.painter_master.painter_i_gst_amount}
                                               onChange={(e) => setFormData({...formData, painter_master: { ...formData.painter_master, painter_i_gst_amount: e.target.value }})}
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
                                    <p className="flex text-[#005BEA] text-xl">
                                        <IndianRupee />
                                        { parseFloat(TotalPaintingCostAfterTax).toLocaleString('en-IN') }
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
                        <motion.div
                            initial={{opacity: 0, y: 100}}
                            animate={{opacity: 1, y: 0}}
                            transition={{delay: 0.1}}
                            className="border items-center border-[#A9C1EA] bg-[#F1F1F1] rounded p-4 my-4">
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
                                    transition={{delay: 0.2}}
                                    className="grid" htmlFor="name">
                                    <span className="mx-2">Name</span>
                                    <input type="text"
                                           value={formData.other_master.other_name}
                                           onChange={(e) => setFormData({...formData, other_master: { ...formData.other_master, other_name: e.target.value }})}
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
                                           value={formData.other_master.other_phone}
                                           onChange={(e) => setFormData({...formData, other_master: { ...formData.other_master, other_phone: e.target.value }})}
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
                                           value={formData.other_master.other_address}
                                           onChange={(e) => setFormData({...formData, other_master: { ...formData.other_master, other_address: e.target.value }})}
                                           className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                           placeholder="Enter the Address" />
                                </motion.label>
                                <motion.label
                                    initial={{opacity: 0, y: 100}}
                                    animate={{opacity: 1, y: 0}}
                                    transition={{delay: 0.5}}
                                    className="grid" htmlFor="Labour">
                                    <span className="mx-2">The Labour Cost Per Sqft</span>
                                    <input name="text"
                                           value={formData.other_master.other_contract}
                                           onChange={(e) => setFormData({...formData, other_master: { ...formData.other_master, other_contract: e.target.value }})}
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
                                           value={formData.other_master.other_contract_amount}
                                           onChange={(e) => setFormData({...formData, other_master: { ...formData.other_master, other_contract_amount: e.target.value }})}
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
                                    transition={{delay: 0.7}}>
                                    <CircleFadingPlus/>
                                    Add Items
                                </motion.button>
                                {

                                    formData.other_master.other_items.map((item, index) =>

                                        (

                                            <div key={index} className="">
                                                <div className="border border-[#6392E5] p-6 rounded bg-[#F1F1F1] my-2">
                                                    <div className="grid md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-3 gap-6">
                                                        <motion.label
                                                            initial={{opacity: 0, y: 100}}
                                                            animate={{opacity: 1, y: 0}}
                                                            transition={{delay: 0.8}}
                                                            className="grid" htmlFor="beam">
                                                            <span className="mx-2">Item Name</span>
                                                            <div className="grid grid-cols-1 md:flex lg:flex xl:flex gap-4">
                                                                <input type="text"
                                                                       value={formData.other_item_name}
                                                                       onChange={(ev) => HandleOtherInputChange(index, 'other_item_name', ev.target.value)}
                                                                       className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                                                       placeholder="Enter Item Name"
                                                                />
                                                                <input type="text"
                                                                       value={formData.other_item_amount}
                                                                       onChange={(ev) => HandleOtherInputChange(index, 'other_item_amount', ev.target.value)}
                                                                       className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                                                       placeholder="Amount"
                                                                />
                                                            </div>
                                                        </motion.label>
                                                        <motion.label
                                                            initial={{opacity: 0, y: 100}}
                                                            animate={{opacity: 1, y: 0}}
                                                            transition={{delay: 0.9}}
                                                            className="grid" htmlFor="remarks">
                                                            <span className="mx-2">Remarks</span>
                                                            <input type="text"
                                                                   value={formData.other_item_remarks}
                                                                   onChange={(ev) => HandleOtherInputChange(index, 'other_item_remarks', ev.target.value)}
                                                                   className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                                                   placeholder="Enter any Remarks" />
                                                        </motion.label>
                                                        {
                                                            formData.other_master.other_items.length > 1

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


                            <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1 my-4 gap-6">
                                <motion.label
                                    initial={{opacity: 0, y: 100}}
                                    animate={{opacity: 1, y: 0}}
                                    transition={{delay: 1.11}}
                                    className="grid" htmlFor="SGST">
                                    <span className="mx-2">SGST</span>
                                    <div className="grid grid-cols-1 md:flex lg:flex xl:flex gap-4">
                                        <input type="number"
                                               value={formData.other_master.other_s_gst_percent}
                                               onChange={(e) => setFormData({...formData, other_master: { ...formData.other_master, other_s_gst_percent: e.target.value }})}
                                               className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                               placeholder="%" />
                                        <input type="number"
                                                readOnly={true}
                                               value={formData.other_master.other_s_gst_amount}
                                               onChange={(e) => setFormData({...formData, other_master: { ...formData.other_master, other_s_gst_amount: e.target.value }})}
                                               className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                               placeholder="Amount" />
                                    </div>
                                </motion.label>
                                <motion.label
                                    initial={{opacity: 0, y: 100}}
                                    animate={{opacity: 1, y: 0}}
                                    transition={{delay: 1.12}}
                                    className="grid" htmlFor="CGST">
                                    <span className="mx-2">CGST</span>
                                    <div className="grid grid-cols-1 md:flex lg:flex xl:flex gap-4">
                                        <input type="number"
                                               value={formData.other_master.other_c_gst_percent}
                                               onChange={(e) => setFormData({...formData, other_master: { ...formData.other_master, other_c_gst_percent: e.target.value }})}
                                               className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                               placeholder="%" />
                                        <input type="number"
                                               readOnly={true}
                                               value={formData.other_master.other_c_gst_amount}
                                               onChange={(e) => setFormData({...formData, other_master: { ...formData.other_master, other_c_gst_amount: e.target.value }})}
                                               className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                               placeholder="Amount" />
                                    </div>
                                </motion.label>
                                <motion.label
                                    initial={{opacity: 0, y: 100}}
                                    animate={{opacity: 1, y: 0}}
                                    transition={{delay: 1.13}}
                                    className="grid" htmlFor="IGST">
                                    <span className="mx-2">IGST</span>
                                    <div className="grid grid-cols-1 md:flex lg:flex xl:flex gap-4">
                                        <input type="number"
                                               value={formData.other_master.other_i_gst_percent}
                                               onChange={(e) => setFormData({...formData, other_master: { ...formData.other_master, other_i_gst_percent: e.target.value }})}
                                               className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                               placeholder="%" />
                                        <input type="number"
                                               readOnly={true}
                                               value={formData.other_master.other_i_gst_amount}
                                               onChange={(e) => setFormData({...formData, other_master: { ...formData.other_master, other_i_gst_amount: e.target.value }})}
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
                                    <p className="flex text-[#005BEA] text-xl">
                                        <IndianRupee />
                                        { parseFloat(TotalOtherLaboursAfterTax).toLocaleString('en-IN') }
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
                                    <motion.p
                                        initial={{opacity: 0, y: 100}}
                                        animate={{opacity: 1, y: 0}}
                                        transition={{delay: 0.8}}
                                        className="border border-[#707070] text-center rounded p-4 my-4">
                                        Other Labours
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
                                        { parseFloat(TotalMasonCostAfterTax).toLocaleString('en-IN') }
                                    </motion.p>
                                    <motion.p
                                        initial={{opacity: 0, y: 100}}
                                        animate={{opacity: 1, y: 0}}
                                        transition={{delay: 1.1}}
                                        className="border border-[#707070] text-center rounded p-4 my-4">
                                        { parseFloat(TotalCenteringAfterTax).toLocaleString('en-IN') }
                                    </motion.p>
                                    <motion.p
                                        initial={{opacity: 0, y: 100}}
                                        animate={{opacity: 1, y: 0}}
                                        transition={{delay: 1.2}}
                                        className="border border-[#707070] text-center rounded p-4 my-4">
                                        { parseFloat(TotalPlumbingCostAfterTax).toLocaleString('en-IN') }
                                    </motion.p>
                                    <motion.p
                                        initial={{opacity: 0, y: 100}}
                                        animate={{opacity: 1, y: 0}}
                                        transition={{delay: 1.3}}
                                        className="border border-[#707070] text-center rounded p-4 my-4">
                                        { parseFloat(TotalElectricianCostAfterTax).toLocaleString('en-IN') }
                                    </motion.p>
                                    <motion.p
                                        initial={{opacity: 0, y: 100}}
                                        animate={{opacity: 1, y: 0}}
                                        transition={{delay: 1.4}}
                                        className="border border-[#707070] text-center rounded p-4 my-4">
                                        { parseFloat(TotalTilesCostAfterTax).toLocaleString('en-IN') }
                                    </motion.p>
                                    <motion.p
                                        initial={{opacity: 0, y: 100}}
                                        animate={{opacity: 1, y: 0}}
                                        transition={{delay: 1.5}}
                                        className="border border-[#707070] text-center rounded p-4 my-4">
                                        { parseFloat(TotalCarpenterCostAfterTax).toLocaleString('en-IN') }
                                    </motion.p>
                                    <motion.p
                                        initial={{opacity: 0, y: 100}}
                                        animate={{opacity: 1, y: 0}}
                                        transition={{delay: 1.6}}
                                        className="border border-[#707070] text-center rounded p-4 my-4">
                                        { parseFloat(TotalPaintingCostAfterTax).toLocaleString('en-IN') }
                                    </motion.p>
                                    <motion.p
                                        initial={{opacity: 0, y: 100}}
                                        animate={{opacity: 1, y: 0}}
                                        transition={{delay: 0.8}}
                                        className="border border-[#707070] text-center rounded p-4 my-4">
                                        { parseFloat(TotalOtherLaboursAfterTax).toLocaleString('en-IN') }
                                    </motion.p>
                                </div>
                            </div>

                            <motion.div
                                initial={{opacity: 0, y: 100}}
                                animate={{opacity: 1, y: 0}}
                                transition={{delay: 1.7}}
                                className="h-100 flex flex-col justify-center items-center text-xl">
                                Total Labour Cost <br/>
                                <span className="flex text-[#005BEA]">
                                    <IndianRupee />
                                    { parseFloat(TotalLaboursCostWithTax).toLocaleString('en-IN') }
                                </span>
                            </motion.div>
                        </div>


                        <div className="grid md:grid lg:grid xl:grid justify-between items-center gap-2 py-4">
                            <motion.label className="flex gap-x-2 items-center"
                                          initial={{opacity: 0, y: 100}}
                                          animate={{opacity: 1, y: 0}}
                                          transition={{delay: 0.2}}
                                          htmlFor="box">
                                <input className="accent-[#005BEA]" type="checkbox" checked={checked} onChange={ev => setChecked(ev.target.checked)}/>
                                Check the inputs whether you have entered valid details
                            </motion.label>


                            <div className="py-2">

                                {

                                    loading

                                    ?

                                        (

                                            <div className="my-4">
                                                <Loader />
                                            </div>

                                        )

                                    :

                                        (

                                            <motion.button type="submit"
                                                           className="flex gap-2 items-center cursor-pointer text-xl border border-[#6392E5] bg-[#D9E1EF] text-[#005BEA] hover:bg-[#C9D8F3] px-6 py-2 rounded"
                                                           initial={{opacity: 0, y: 100}}
                                                           animate={{opacity: 1, y: 0}}
                                                           transition={{delay: 0.3}}>
                                                <Lightbulb />
                                                Create
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

export default AddLabour;