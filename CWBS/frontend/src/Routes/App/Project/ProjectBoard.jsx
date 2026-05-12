// Import Modules
import React, {useCallback, useEffect, useMemo, useState, useRef} from 'react';
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import {motion} from "motion/react";
import {
    Activity,
    Calculator,
    CalendarClock,
    CircleCheckBig, CircleFadingPlus,
    ClipboardCheck,
    Clock,
    DollarSign,
    Download,
    Eye,
    FileText,
    HandCoins,
    IndianRupee,
    Info,
    Kanban,
    LandPlot,
    Loader,
    Percent,
    Pickaxe,
    SquarePen,
    Trash, Trash2,
    WavesLadder,
    X,
} from "lucide-react";

// Import Hooks
import {useProject} from "../../../Hooks/useProject.js";

const ProjectBoard = () => {

    const contentRef = useRef();

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

    const [selectedProject, setSelectedProject] = useState([]);

    const { fetchProject, updateStatus, deleteProject, updateProject, ProjectDataList } = useProject();

    // State for Modal
    const [isModalOpen, setIsModalOpen] = useState(false);

    // State for Edit Project
    const [isModalEdit, setIsModalEdit] = useState(false);

    // State to Selected Transaction
    const [selectedTransaction, setSelectedTransaction] = useState(null);

    // State to filter based onb month
    const [selectedMonthFilter, setSelectedMonthFilter] = useState('');

    // Calculation
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


    useEffect(() => {

        fetchProject();

    }, [fetchProject]);


    useEffect(() => {

        if (Array.isArray(ProjectDataList) && ProjectDataList.length > 0 && !selectedProject) {

            setSelectedProject(ProjectDataList[0]);

        }

    }, [ProjectDataList, selectedProject]);

    // Function to open the View Modal
    const openViewModal = useCallback((allProject) => {

        setSelectedTransaction(allProject);

        setIsModalOpen(true);

    }, []);


    // Function to Edit the Project
    const EditProjectModal = useCallback((allProject) => {

        setSelectedTransaction(allProject);

        setIsModalEdit(true);

    }, []);

    // Update project
    const HandleUpdateProject = async (e) => {

        e.preventDefault();

        if (!selectedTransaction) return;

        await updateProject(selectedTransaction.project_id, formData);

        await fetchProject();

        setIsModalEdit(false);
    };


    // Project Factor
    const {
        allProject,
        inLine,
        onGoing,
        completedProject,
        countInline,
        countOngoing,
        countCompleted,
        inlineprojectCost,
        ongoingCost,
        completedCost
    } = useMemo(() => {

        let AllProject,
            InlineProject,
            OnGoingProject,
            CompletedProject,
            CountInline,
            CountOngoing,
            CountCompleted,
            InlineprojectCost,
            OngoingCost,
            CompletedCost;

        AllProject = Array.isArray(ProjectDataList) ? ProjectDataList : [];

        if (selectedMonthFilter) {
            AllProject = AllProject.filter(item => {

                const SelectedMonth = item.created_at.slice(0, 7);

                // Match only by month
                return selectedMonthFilter === SelectedMonth;
            });
        }


        InlineProject = AllProject.filter(item => item.status === "Inline");

        InlineprojectCost = InlineProject.reduce((sum, item) => sum + parseFloat(item.construction_cost), 0)

        CountInline = InlineProject.length;

        // Filter Ongoing Project
        OnGoingProject = AllProject.filter(ogp => ogp.status === 'On Going');

        OngoingCost = OnGoingProject.reduce((sum, item) => sum + parseFloat(item.construction_cost), 0)

        CountOngoing = OnGoingProject.length;

        CompletedProject = AllProject.filter(ogp => ogp.status === 'Completed');

        CompletedCost = CompletedProject.reduce((sum, item) => sum + parseFloat(item.construction_cost), 0)

        CountCompleted = CompletedProject.length;

        return {
            allProject: AllProject,
            inLine: InlineProject,
            onGoing: OnGoingProject,
            completedProject: CompletedProject,
            countInline: CountInline,
            countOngoing: CountOngoing,
            countCompleted: CountCompleted,
            inlineprojectCost: InlineprojectCost,
            ongoingCost: OngoingCost,
            completedCost: CompletedCost,
        };

    }, [ProjectDataList, selectedMonthFilter]);

    const HandleStatus = useCallback(async (id, status) => {

        await updateStatus(id, status);

        fetchProject();

    }, [fetchProject, updateStatus]);

    // Calculate total
    const calculateTotal = (arr, key) => Array.isArray(arr) ? arr.reduce((sum, item) => sum + (item[key] || 0), 0) : 0;

    const totalAmenityCost = useMemo(() => calculateTotal(selectedTransaction?.amenities, 'amenities_amount'), [selectedTransaction]);
    const totalExtraCost = useMemo(() => calculateTotal(selectedTransaction?.extra, 'extra_amount'), [selectedTransaction]);
    const totalDocCost = useMemo(() => calculateTotal(selectedTransaction?.doc, 'doc_amount'), [selectedTransaction]);

    const { overAllCostBeforeTax, overAllCostAfterTax, overAllCost } = useMemo(() => {

        const beforeTax = (parseFloat(selectedTransaction?.construction_budget) + parseFloat(selectedTransaction?.septic_tank) + totalAmenityCost + totalDocCost + totalExtraCost).toLocaleString("en-IN")

        const afterTax = (parseFloat(selectedTransaction?.construction_budget) + parseFloat(selectedTransaction?.septic_tank) + totalAmenityCost + totalDocCost + totalExtraCost + parseFloat(selectedTransaction?.s_gst_amount) + parseFloat(selectedTransaction?.c_gst_amount) + parseFloat(selectedTransaction?.i_gst_amount)).toLocaleString("en-IN")

        return {
            overAllCostBeforeTax: beforeTax,
            overAllCostAfterTax: afterTax,
            overAllCost: afterTax,
        }

    }, [selectedTransaction?.c_gst_amount, selectedTransaction?.construction_budget, selectedTransaction?.i_gst_amount, selectedTransaction?.s_gst_amount, selectedTransaction?.septic_tank, totalAmenityCost, totalDocCost, totalExtraCost]);

    // || Modal Data ---------------------------------------------------------------------------------------------------

    // Edit Data Render
    useEffect(() => {

        function fetchProject()
        {

            if (selectedTransaction) {

                setFormData({
                    start_date: selectedTransaction.start_date || "",
                    end_date: selectedTransaction.end_date || "",
                    project_name: selectedTransaction.project_name || "",
                    project_area: selectedTransaction.project_area || "",
                    rate_per_sqft: selectedTransaction.rate_per_sqft || "",
                    area_sqft: selectedTransaction.area_sqft || "",
                    construction_cost: selectedTransaction.construction_cost || "",
                    construction_budget: selectedTransaction.construction_budget || "",
                    septic_tank: selectedTransaction.septic_tank || "",

                    amenities: selectedTransaction.amenities?.length
                        ? selectedTransaction.amenities
                        : [{ amenities_item: "", amenities_amount: 0 }],

                    extra: selectedTransaction.extra?.length
                        ? selectedTransaction.extra
                        : [{ extra_item: "", extra_amount: 0 }],

                    doc: selectedTransaction.doc?.length
                        ? selectedTransaction.doc
                        : [{ doc_item: "", doc_amount: 0 }],


                    s_gst_percent: selectedTransaction.s_gst_percent || "",
                    s_gst_amount: selectedTransaction.s_gst_amount || "",
                    c_gst_percent: selectedTransaction.c_gst_percent || "",
                    c_gst_amount: selectedTransaction.c_gst_amount || "",
                    i_gst_percent: selectedTransaction.i_gst_percent || "",
                    i_gst_amount: selectedTransaction.i_gst_amount || "",

                    plot_cost: selectedTransaction.plot_cost || "",
                    plot_sqft: selectedTransaction.plot_sqft || "",

                    project_remarks: selectedTransaction.project_remarks || "",
                });


            }

        }

        fetchProject();

    }, [selectedTransaction]);

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


    // -----------------------------------------------------------------------------------------------------------------

    // Delete Project
    const HandleDeleteProject = useCallback(async (id) => {

        try {

            await deleteProject(id);

            await fetchProject();

        } catch (error) {

            console.error("Failed to delete project:", error);
        }
    }, [deleteProject, fetchProject]);



    return (
        <div>
            <motion.div
                initial={{opacity: 0, y: 100}}
                animate={{opacity: 1, y: 0}}
                transition={{delay: 0.1}}
                className="border items-center border-[#A9C1EA] bg-[#F1F1F1] rounded p-4 my-4">
                <div className="flex gap-4">
                    <div className="grid justify-center items-center bg-[#C9D8F3] text-[#005bea] rounded p-4">
                        <Kanban />
                    </div>
                    <div>
                        <p className="head text-xl text-[#005bea]">
                            Project Board
                        </p>

                        <p>
                            Overview of all projects with budgets, timelines, and progress
                        </p>
                    </div>
                </div>
            </motion.div>

            <motion.div
                initial={{opacity: 0, y: 100}}
                animate={{opacity: 1, y: 0}}
                transition={{delay: 0.2}}
                className="border items-center border-[#A9C1EA] bg-[#F1F1F1] rounded p-4 my-4">
                <label className="text-[#005BEA]" htmlFor="user-filter">

                    Filter by Month:

                </label>

                <input type="month"
                       className="p-2 border border-[#6392E5] rounded-md bg-transparent text-[#202020] focus:outline-none focus:ring-2 focus:ring-[#005BEA]"
                       value={selectedMonthFilter}
                       onChange={(ev) => setSelectedMonthFilter(ev.target.value)}/>
            </motion.div>

            {/*Stack Element*/}
            <section className="grid box-border border border-[#A9C1EA] rounded p-4">
                <div className="flex justify-between">
                    <motion.div
                        initial={{opacity: 0, y: 100}}
                        animate={{opacity: 1, y: 0}}
                        transition={{delay: 0.3}}
                        className="flex head text-xl gap-2 items-center text-[#202020]">
                        <ClipboardCheck />
                        <p>
                            All Projects (<span className="text-[#005bea]">{ countInline }</span>)
                        </p>
                    </motion.div>
                    <motion.div
                        initial={{opacity: 0, y: 100}}
                        animate={{opacity: 1, y: 0}}
                        transition={{delay: 0.4}}
                        className="flex text-xl gap-2 items-center text-[#202020]">
                        <p>Overall Cost:</p>
                        <div className="flex items-center">
                            <IndianRupee className="text-[#005bea]" />
                            <p className="font-bold text-[#005bea]">
                                { inlineprojectCost.toLocaleString("en-IN") }
                            </p>
                        </div>
                    </motion.div>
                </div>
                <div className="box-border border border-[#A9C1EA] bg-[#F1F1F1] rounded p-4 my-4">

                    <div>

                        {

                            Array.isArray(inLine) && inLine?.length > 0

                                ?

                                (

                                    <div className="grid md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 py-4 gap-2">
                                        {

                                            inLine.map((item) => (

                                                <motion.div key={item.project_id} title={item.project_name}
                                                            onClick={() => setSelectedProject(item)}
                                                            initial={{opacity: 0, y: 100}}
                                                            animate={{opacity: 1, y: 0}}
                                                            transition={{delay: 0.1}}
                                                            className={`grid gap-4 cursor-pointer rounded p-4 transition-all duration-200
                                                       ${selectedProject?.project_id === item.project_id ? 'border-1 border-[#6392E5] bg-[#D9E1EF]/20' : 'border border-[#6392E5] bg-[#F1F1F1]'}`}>
                                                    <div className="flex items-center gap-2 text-xl">
                                                        <div className="bg-[#D9E1EF] rounded p-4">
                                                            <Info className="text-[#005bea]" />
                                                        </div>
                                                        <p className="text-[#202020]">
                                                            {item.project_name}
                                                        </p>
                                                    </div>

                                                    <div className="flex items-center gap-2 text-xl">
                                                        <div className="bg-[#D9E1EF] rounded p-4">
                                                            <CalendarClock className="text-[#005bea]" />
                                                        </div>

                                                        <div>
                                                            <div className="flex items-center gap-2 text-sm">
                                                                <div className="flex items-center gap-2 text-[#202020]">
                                                                    <strong>Start Date:</strong>
                                                                    { item.start_date }
                                                                </div>
                                                            </div>
                                                            <div className="flex items-center gap-2 text-sm">
                                                                <div className="flex items-center gap-2 text-[#202020]">
                                                                    <strong>End Date:</strong>
                                                                    { item.end_date }
                                                                </div>
                                                            </div>
                                                        </div>

                                                    </div>

                                                    <div className="grid grid-cols-2 gap-4">
                                                        <div className="grid gap-2 items-center bg-[#D9E1EF] text-[#202020] p-4 rounded">
                                                            <div className="flex items-center gap-2 text-[#005bea] font-bold">
                                                                <Calculator />
                                                                <p className="">Total Budget</p>
                                                            </div>
                                                            <div className="flex flex-wrap items-center gap-2 text-lg font-bold">
                                                                <IndianRupee />
                                                                <div>
                                                                    { parseFloat(item.construction_budget).toLocaleString('en-IN') }
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="grid gap-2 items-center bg-[#D9E1EF] text-[#202020] p-4 rounded">
                                                            <div className="flex items-center gap-2 text-[#005bea] font-bold">
                                                                <Calculator />
                                                                <p className="">Total Cost</p>
                                                            </div>
                                                            <div className="flex flex-wrap items-center gap-2 text-lg font-bold">
                                                                <IndianRupee />
                                                                <div>
                                                                    { parseFloat(item.construction_cost).toLocaleString('en-IN') }
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/*Button*/}
                                                    <motion.div
                                                        initial={{opacity: 0, y: 100}}
                                                        animate={{opacity: 1, y: 0}}
                                                        transition={{delay: 0.2}}
                                                        className="flex flex-wrap gap-2 justify-start items-center">
                                                        <button title="Ongoing" type="button" onClick={() => HandleStatus(item.project_id, "On Going")} className="flex gap-2 items-center bg-[#D7DAF2] border border-[#4F46E5] text-[#312E81] cursor-pointer p-2 rounded">
                                                            <Clock />
                                                            <span className="hidden">Ongoing</span>
                                                        </button>

                                                        <button title="View" type="button" onClick={() => openViewModal(item)} className="flex gap-2 items-center bg-[#FEF3C7] border border-[#F59E0B] text-[#92400E] cursor-pointer p-2 rounded">
                                                            <Eye />
                                                            <span className="hidden">View</span>
                                                        </button>

                                                        <button title="Edit" type="button" onClick={() => EditProjectModal(item)} className="flex gap-2 items-center bg-[#D9E1EF] border border-[#8CAEE9] text-[#005BEA] cursor-pointer p-2 rounded">
                                                            <SquarePen />
                                                            <span className="hidden">Edit</span>
                                                        </button>

                                                        <button title="Delete" type="button" onClick={() => HandleDeleteProject(item.project_id)}
                                                                className="flex gap-2 items-center bg-[#FEE2E2] border border-[#EF4444] text-[#991B1B] cursor-pointer p-2 rounded">
                                                            <Trash />
                                                            <span className="hidden">Delete</span>
                                                        </button>
                                                    </motion.div>
                                                </motion.div>

                                            ))

                                        }
                                    </div>

                                )

                                :

                                (

                                    <motion.div
                                        initial={{opacity: 0, y: 100}}
                                        animate={{opacity: 1, y: 0}}
                                        transition={{delay: 0.1}}
                                        className="text-center p-8 bg-[#F1F1F1]">
                                        <Info className="text-[#005BEA] mx-auto mb-4" />
                                        <p className="text-xl font-semibold text-[#005BEA]">Add a New Project</p>
                                    </motion.div>


                                )

                        }
                    </div>
                </div>

                {/*Progress Area*/}

                <motion.div
                    initial={{opacity: 0, y: 100}}
                    animate={{opacity: 1, y: 0}}
                    transition={{delay: 0.1}}
                    className="flex head text-xl gap-2 items-center mb-2">
                    <Loader />
                    Progress Area
                </motion.div>
                <div className="border border-[#A9C1EA] bg-[#F1F1F1] rounded p-4 my-2">
                    <div className="grid gap-6 py-4">
                        {/*Ongoing Project*/}
                        <div className="grid gap-4">
                            <motion.div
                                initial={{opacity: 0, y: 100}}
                                animate={{opacity: 1, y: 0}}
                                transition={{delay: 0.2}}
                                className="flex head text-xl gap-2 items-center">
                                <Clock />
                                <p>
                                    Ongoing Project (<span className="text-[#005bea]">{ countOngoing || 0 }</span>)
                                </p>
                            </motion.div>
                            <motion.div
                                initial={{opacity: 0, y: 100}}
                                animate={{opacity: 1, y: 0}}
                                transition={{delay: 0.3}}
                                className="flex text-xl gap-2 items-center text-[#202020]">
                                <p>Overall Cost:</p>
                                <div className="flex items-center">
                                    <IndianRupee className="text-[#005bea]" />
                                    <p className="font-bold text-[#005bea]">
                                        { ongoingCost.toLocaleString("en-IN") }
                                    </p>
                                </div>
                            </motion.div>

                            <div className="grid border border-[#A9C1EA] bg-[#F1F1F1] p-4 rounded">
                                <div>

                                    {

                                        Array.isArray(onGoing) && onGoing?.length > 0

                                            ?

                                            (

                                                <div className="grid md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 py-4 gap-2">
                                                    {

                                                        onGoing.map((item) => (

                                                            <motion.div key={item.project_id} title={item.project_name}
                                                                        onClick={() => setSelectedProject(item)}
                                                                        initial={{opacity: 0, y: 100}}
                                                                        animate={{opacity: 1, y: 0}}
                                                                        transition={{delay: 0.1}}
                                                                        className={`grid gap-4 cursor-pointer rounded p-4 transition-all duration-200
                                                                    ${selectedProject?.project_id === item.project_id ? 'border-1 border-[#6392E5] bg-[#D9E1EF]/20' : 'border border-[#6392E5] bg-[#F1F1F1]'}`}>
                                                                <div className="flex items-center gap-2 text-xl">
                                                                    <div className="bg-[#D9E1EF] rounded p-4">
                                                                        <Info className="text-[#005bea]" />
                                                                    </div>
                                                                    <p className="text-[#202020]">
                                                                        {item.project_name}
                                                                    </p>
                                                                </div>

                                                                <div className="flex items-center gap-2 text-xl">
                                                                    <div className="bg-[#D9E1EF] rounded p-4">
                                                                        <CalendarClock className="text-[#005bea]" />
                                                                    </div>

                                                                    <div>
                                                                        <div className="flex items-center gap-2 text-sm">
                                                                            <div className="flex items-center gap-2 text-[#202020]">
                                                                                <strong>Start Date:</strong>
                                                                                { item.start_date }
                                                                            </div>
                                                                        </div>
                                                                        <div className="flex items-center gap-2 text-sm">
                                                                            <div className="flex items-center gap-2 text-[#202020]">
                                                                                <strong>End Date:</strong>
                                                                                { item.end_date }
                                                                            </div>
                                                                        </div>
                                                                    </div>

                                                                </div>

                                                                <div className="grid grid-cols-2 gap-4">
                                                                    <div className="grid gap-2 items-center bg-[#D9E1EF] text-[#202020] p-4 rounded">
                                                                        <div className="flex items-center gap-2 text-[#005bea] font-bold">
                                                                            <Calculator />
                                                                            <p className="">Total Budget</p>
                                                                        </div>
                                                                        <div className="flex flex-wrap items-center gap-2 text-lg font-bold">
                                                                            <IndianRupee />
                                                                            <div>
                                                                                { parseFloat(item.construction_budget).toLocaleString('en-IN') }
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="grid gap-2 items-center bg-[#D9E1EF] text-[#202020] p-4 rounded">
                                                                        <div className="flex items-center gap-2 text-[#005bea] font-bold">
                                                                            <Calculator />
                                                                            <p className="">Total Cost</p>
                                                                        </div>
                                                                        <div className="flex flex-wrap items-center gap-2 text-lg font-bold">
                                                                            <IndianRupee />
                                                                            <div>
                                                                                { parseFloat(item.construction_cost).toLocaleString('en-IN') }
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                                {/*Button*/}
                                                                <motion.div
                                                                    initial={{opacity: 0, y: 100}}
                                                                    animate={{opacity: 1, y: 0}}
                                                                    transition={{delay: 0.2}}
                                                                    className="flex flex-wrap gap-2 justify-start items-center">
                                                                    <button title="Ongoing" type="button" onClick={() => HandleStatus(item.project_id, "Completed")} className="flex gap-2 items-center bg-[#D1FAE5] border border-[#10B981] text-[#065F46] cursor-pointer p-2 rounded">
                                                                        <CircleCheckBig />
                                                                        <span className="hidden">Ongoing</span>
                                                                    </button>

                                                                    <button title="Inline" type="button" onClick={() => HandleStatus(item.project_id, "Inline")} className="flex gap-2 items-center bg-[#E2F0BD] border border-[#5C7C2F] text-[#5C7C2F] cursor-pointer p-2 rounded">
                                                                        <ClipboardCheck />
                                                                        <span className="hidden">Inline</span>
                                                                    </button>

                                                                    <button title="View" type="button" onClick={() => openViewModal(item)} className="flex gap-2 items-center bg-[#FEF3C7] border border-[#F59E0B] text-[#92400E] cursor-pointer p-2 rounded">
                                                                        <Eye />
                                                                        <span className="hidden">View</span>
                                                                    </button>

                                                                    <button title="Edit" type="button" onClick={() => EditProjectModal(item)} className="flex gap-2 items-center bg-[#D9E1EF] border border-[#8CAEE9] text-[#005BEA] cursor-pointer p-2 rounded">
                                                                        <SquarePen />
                                                                        <span className="hidden">Edit</span>
                                                                    </button>

                                                                    <button title="Delete" type="button" onClick={() => HandleDeleteProject(item.project_id)}
                                                                            className="flex gap-2 items-center bg-[#FEE2E2] border border-[#EF4444] text-[#991B1B] cursor-pointer p-2 rounded">
                                                                        <Trash />
                                                                        <span className="hidden">Delete</span>
                                                                    </button>
                                                                </motion.div>
                                                            </motion.div>

                                                        ))

                                                    }
                                                </div>

                                            )

                                            :

                                            (

                                                <motion.div
                                                    initial={{opacity: 0, y: 100}}
                                                    animate={{opacity: 1, y: 0}}
                                                    transition={{delay: 0.1}}
                                                    className="text-center p-8 bg-[#F1F1F1]">
                                                    <Info className="text-[#005BEA] mx-auto mb-4" />
                                                    <p className="text-xl font-semibold text-[#005BEA]">Add a Project to Ongoing</p>
                                                </motion.div>


                                            )

                                    }
                                </div>
                            </div>
                        </div>

                        {/*Completed*/}
                        <div className="grid gap-4">
                            <motion.div
                                initial={{opacity: 0, y: 100}}
                                animate={{opacity: 1, y: 0}}
                                transition={{delay: 0.1}}
                                className="flex head text-xl gap-2 items-center">
                                <CircleCheckBig />
                                <p>
                                    Completed (<span className="text-[#005bea]">{ countCompleted || 0 }</span>)
                                </p>
                            </motion.div>
                            <motion.div
                                initial={{opacity: 0, y: 100}}
                                animate={{opacity: 1, y: 0}}
                                transition={{delay: 0.2}}
                                className="flex text-xl gap-2 items-center text-[#202020]">
                                <p>Overall Cost:</p>
                                <div className="flex items-center">
                                    <IndianRupee className="text-[#005bea]" />
                                    <p className="font-bold text-[#005bea]">
                                        { completedCost.toLocaleString("en-IN") }
                                    </p>
                                </div>
                            </motion.div>

                            <div className="w-full h-full grid border border-[#A9C1EA] bg-[#F1F1F1] p-4 rounded">
                                <div>

                                    {

                                        Array.isArray(completedProject) && completedProject?.length > 0

                                            ?

                                            (

                                                <div className="grid md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 py-4 gap-2">
                                                    {

                                                        completedProject.map((item) => (

                                                            <motion.div key={item.project_id} title={item.project_name}
                                                                        onClick={() => setSelectedProject(item)}
                                                                        initial={{opacity: 0, y: 100}}
                                                                        animate={{opacity: 1, y: 0}}
                                                                        transition={{delay: 0.1}}
                                                                        className={`grid gap-4 cursor-pointer rounded p-4 transition-all duration-200
                                                                 ${selectedProject?.project_id === item.project_id ? 'border-1 border-[#6392E5] bg-[#D9E1EF]/20' : 'border border-[#6392E5] bg-[#F1F1F1]'}`}>
                                                                <div className="flex items-center gap-2">
                                                                    <div className="bg-[#D9E1EF] rounded p-4">
                                                                        <Info className="text-[#005bea]" />
                                                                    </div>
                                                                    <div className="text-[#202020] text-xl">
                                                                        <p>
                                                                            <strong className="text-sm">Project Name</strong>
                                                                        </p>
                                                                        <p>{item.project_name}</p>
                                                                    </div>
                                                                </div>

                                                                <div className="flex items-center gap-2 text-xl">
                                                                    <div className="bg-[#D9E1EF] rounded p-4">
                                                                        <CalendarClock className="text-[#005bea]" />
                                                                    </div>

                                                                    <div>
                                                                        <div className="flex items-center gap-2 text-sm">
                                                                            <div className="flex items-center gap-2 text-[#202020]">
                                                                                <strong>Start Date:</strong>
                                                                                { item.start_date }
                                                                            </div>
                                                                        </div>
                                                                        <div className="flex items-center gap-2 text-sm">
                                                                            <div className="flex items-center gap-2 text-[#202020]">
                                                                                <strong>End Date:</strong>
                                                                                { item.end_date }
                                                                            </div>
                                                                        </div>
                                                                    </div>

                                                                </div>

                                                                <div className="grid grid-cols-2 gap-4">
                                                                    <div className="grid gap-2 items-center bg-[#D9E1EF] text-[#202020] p-4 rounded">
                                                                        <div className="flex items-center gap-2 text-[#005bea] font-bold">
                                                                            <Calculator />
                                                                            <p className="">Total Budget</p>
                                                                        </div>
                                                                        <div className="flex flex-wrap items-center gap-2 text-lg font-bold">
                                                                            <IndianRupee />
                                                                            <div>
                                                                                { parseFloat(item.construction_budget).toLocaleString('en-IN') }
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="grid gap-2 items-center bg-[#D9E1EF] text-[#202020] p-4 rounded">
                                                                        <div className="flex items-center gap-2 text-[#005bea] font-bold">
                                                                            <Calculator />
                                                                            <p className="">Total Cost</p>
                                                                        </div>
                                                                        <div className="flex flex-wrap items-center gap-2 text-lg font-bold">
                                                                            <IndianRupee />
                                                                            <div>
                                                                                { parseFloat(item.construction_cost).toLocaleString('en-IN') }
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                                {/*Button*/}
                                                                <motion.div
                                                                    initial={{opacity: 0, y: 100}}
                                                                    animate={{opacity: 1, y: 0}}
                                                                    transition={{delay: 0.2}}
                                                                    className="flex flex-wrap gap-2 justify-start items-center">
                                                                    <button title="Ongoing" type="button" onClick={() => HandleStatus(item.project_id, "On Going")} className="flex gap-2 items-center bg-[#D7DAF2] border border-[#4F46E5] text-[#312E81] cursor-pointer p-2 rounded">
                                                                        <Clock />
                                                                        <span className="hidden">Ongoing</span>
                                                                    </button>

                                                                    <button title="Inline" type="button" onClick={() => HandleStatus(item.project_id, "Inline")} className="flex gap-2 items-center bg-[#E2F0BD] border border-[#5C7C2F] text-[#5C7C2F] cursor-pointer p-2 rounded">
                                                                        <ClipboardCheck />
                                                                        <span className="hidden">Inline</span>
                                                                    </button>

                                                                    <button title="View" type="button"  onClick={() => openViewModal(item)} className="flex gap-2 items-center bg-[#FEF3C7] border border-[#F59E0B] text-[#92400E] cursor-pointer p-2 rounded">
                                                                        <Eye />
                                                                        <span className="hidden">View</span>
                                                                    </button>

                                                                    <button title="Edit" type="button" onClick={() => EditProjectModal(item)} className="flex gap-2 items-center bg-[#D9E1EF] border border-[#8CAEE9] text-[#005BEA] cursor-pointer p-2 rounded">
                                                                        <SquarePen />
                                                                        <span className="hidden">Edit</span>
                                                                    </button>

                                                                    <button title="Delete" type="button" onClick={() => HandleDeleteProject(item.project_id)}
                                                                            className="flex gap-2 items-center bg-[#FEE2E2] border border-[#EF4444] text-[#991B1B] cursor-pointer p-2 rounded">
                                                                        <Trash />
                                                                        <span className="hidden">Delete</span>
                                                                    </button>
                                                                </motion.div>
                                                            </motion.div>

                                                        ))

                                                    }
                                                </div>

                                            )

                                            :

                                            (

                                                <motion.div
                                                    initial={{opacity: 0, y: 100}}
                                                    animate={{opacity: 1, y: 0}}
                                                    transition={{delay: 0.1}}
                                                    className="text-center p-8 bg-[#F1F1F1]">
                                                    <Info className="text-[#005BEA] mx-auto mb-4" />
                                                    <p className="text-xl font-semibold text-[#005BEA]">Add a Project to Completed</p>
                                                </motion.div>


                                            )

                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                {/* View Modal */}
                {isModalOpen && selectedTransaction && (
                    <div className="fixed inset-0 bg-[#202020]/50 flex items-center justify-center z-50">
                        <div className="bg-[#F1F1F1] rounded w-11/12 h-9/10 md:w-1/2 lg:w-1/2 shadow-xl overflow-y-auto scroll-smooth">
                            <div className="sticky top-0 flex justify-between items-center bg-[#D9E1EF] rounded p-4 z-20">
                                <h2 className="flex gap-2 items-center text-xl text-[#005BEA]">
                                    <Kanban />
                                    { selectedTransaction.project_name }
                                </h2>
                                <button onClick={() => setIsModalOpen(false)} className="cursor-pointer text-gray-500 hover:text-gray-700">
                                    <X />
                                </button>
                            </div>

                            {/*Main Content*/}

                            <div className="grid p-4 gap-4">
                                <motion.div
                                    initial={{opacity: 0, y: 100}}
                                    animate={{opacity: 1, y: 0}}
                                    transition={{delay: 0.1}}>
                                    <p className="text-[#005bea] pb-2">
                                        Project TimeLine
                                    </p>
                                    <div className="flex gap-2 items-center">
                                        <div className="bg-[#D9E1EF] rounded p-4">
                                            <CalendarClock className="text-[#005bea]" />
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2 text-sm">
                                                <div className="flex items-center gap-2 text-[#202020]">
                                                    <strong>Start Date:</strong>
                                                    { selectedTransaction.start_date }
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2 text-sm">
                                                <div className="flex items-center gap-2 text-[#202020]">
                                                    <strong>End Date:</strong>
                                                    { selectedTransaction.end_date }
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>

                                <motion.div initial={{opacity: 0, y: 100}}
                                            animate={{opacity: 1, y: 0}}
                                            transition={{delay: 0.2}}>
                                    <div className="flex items-center justify-between">
                                        <p className="text-[#005bea] pb-2">
                                            Total Construction Cost
                                        </p>
                                        <p className="flex items-center font-bold text-[#005bea] pb-2">
                                            <IndianRupee size={20} />
                                            { parseFloat(selectedTransaction.construction_cost).toLocaleString('en-IN') }
                                        </p>
                                    </div>

                                    <div className="flex gap-2 items-center">
                                        <div className="bg-[#D9E1EF] rounded p-4">
                                            <LandPlot className="text-[#005bea]" />
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2 text-sm">
                                                <div className="flex items-center gap-2 text-[#202020]">
                                                    <strong>Area</strong>
                                                    { selectedTransaction.project_area }
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2 text-sm">
                                                <div className="flex items-center gap-2 text-[#202020]">
                                                    <strong>Rate Per Sqft</strong>
                                                    <span className="flex items-center">
                                                       <IndianRupee size={20} />
                                                        { parseFloat(selectedTransaction.rate_per_sqft).toLocaleString('en-IN') }
                                                   </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>

                                <motion.div
                                    initial={{opacity: 0, y: 100}}
                                    animate={{opacity: 1, y: 0}}
                                    transition={{delay: 0.3}}>
                                    <div className="flex items-center justify-between">
                                        <p className="text-[#005bea] pb-2">
                                            Total Construction Budget
                                        </p>
                                        <p className="flex items-center font-bold text-[#005bea] pb-2">
                                            <IndianRupee size={20} />
                                            {

                                                (parseFloat(selectedTransaction.construction_budget) + parseFloat(selectedTransaction.septic_tank)).toLocaleString("en-IN")

                                            }
                                        </p>
                                    </div>

                                    <div className="flex gap-2 items-center">
                                        <div className="bg-[#D9E1EF] rounded p-4">
                                            <Pickaxe className="text-[#005bea]" />
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2 text-sm">
                                                <div className="flex items-center gap-2 text-[#202020]">
                                                    <strong>Construction Budget</strong>
                                                    <span className="flex items-center">
                                                       <IndianRupee size={20} />
                                                        { parseFloat(selectedTransaction.construction_budget).toLocaleString('en-IN') }
                                                   </span>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2 text-sm">
                                                <div className="flex items-center gap-2 text-[#202020]">
                                                    <strong>Septic Tank</strong>
                                                    <span className="flex items-center">
                                                       <IndianRupee size={20} />
                                                        { parseFloat(selectedTransaction.septic_tank).toLocaleString('en-IN') }
                                                   </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>


                                {/*Average rate of construction*/}
                                <motion.div
                                    initial={{opacity: 0, y: 100}}
                                    animate={{opacity: 1, y: 0}}
                                    transition={{delay: 0.4}}>
                                    <div className="flex items-center justify-between">
                                        <p className="text-[#005bea] pb-2">
                                            Average Rate of Construction
                                        </p>
                                        <p className="flex items-center font-bold text-[#005bea] pb-2">
                                            <IndianRupee size={20} />
                                            {

                                                (parseFloat(selectedTransaction.construction_budget)) / (parseFloat(selectedTransaction.area_sqft))

                                            }
                                        </p>
                                    </div>

                                    <div className="flex gap-2 items-center">
                                        <div className="bg-[#D9E1EF] rounded p-4">
                                            <Activity className="text-[#005bea]" />
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2 text-sm">
                                                <div className="flex items-center gap-2 text-[#202020]">
                                                    <strong>Total Budget</strong>
                                                    <span className="flex items-center">
                                                       <IndianRupee size={20} />
                                                        { (parseFloat(selectedTransaction.construction_budget) + parseFloat(selectedTransaction.septic_tank)).toLocaleString('en-IN') }
                                                   </span>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2 text-sm">
                                                <div className="flex items-center gap-2 text-[#202020]">
                                                    <strong>Build up Area sqft</strong>
                                                    <span className="flex items-center">
                                                       <IndianRupee size={20} />
                                                        { parseFloat(selectedTransaction.area_sqft).toLocaleString('en-IN') }
                                                   </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>


                                {/*Amenities*/}
                                <motion.div initial={{opacity: 0, y: 100}}
                                            animate={{opacity: 1, y: 0}}
                                            transition={{delay: 0.5}}>
                                    <div className="flex items-center justify-between">
                                        <p className="text-[#005bea] pb-2">
                                            Amenities
                                        </p>
                                        <p className="flex items-center font-bold text-[#005bea] pb-2">
                                            <IndianRupee size={20} />
                                            {

                                                totalAmenityCost.toLocaleString("en-IN")

                                            }
                                        </p>
                                    </div>

                                    <div className="grid gap-2 items-center border border-[#D9E1EF] rounded p-4">

                                        {

                                            selectedTransaction.amenities.map((item, index) =>

                                                (

                                                    <div key={index} className="flex gap-2 items-center">
                                                        <div className="bg-[#D9E1EF] rounded p-4">
                                                            <WavesLadder className="text-[#005bea]" />
                                                        </div>
                                                        <div className="grid">
                                                            <div className="flex items-center gap-2 text-sm">
                                                                <div className="flex items-center gap-2 text-[#202020]">
                                                                    <strong>Name:</strong>
                                                                    <span className="flex items-center">
                                                                   {item.amenities_item}
                                                                </span>
                                                                </div>
                                                            </div>
                                                            <div className="flex items-center gap-2 text-sm">
                                                                <div className="flex items-center gap-2 text-[#202020]">
                                                                    <strong>Amount:</strong>
                                                                    <span className="flex items-center">
                                                                   <IndianRupee size={20}/>
                                                                        {parseFloat(item.amenities_amount).toLocaleString('en-IN')}
                                                                </span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                )
                                            )

                                        }
                                    </div>
                                </motion.div>


                                {/*Extra Charges*/}
                                <motion.div initial={{opacity: 0, y: 100}}
                                            animate={{opacity: 1, y: 0}}
                                            transition={{delay: 0.6}}>
                                    <div className="flex items-center justify-between">
                                        <p className="text-[#005bea] pb-2">
                                            Extra Charges on Construction
                                        </p>
                                        <p className="flex items-center font-bold text-[#005bea] pb-2">
                                            <IndianRupee size={20} />
                                            {

                                                totalExtraCost.toLocaleString("en-IN")

                                            }
                                        </p>
                                    </div>

                                    <div className="grid gap-2 items-center border border-[#D9E1EF] rounded p-4">

                                        {

                                            selectedTransaction.extra.map((item, index) =>

                                                (

                                                    <div key={index} className="flex gap-2 items-center">
                                                        <div className="bg-[#D9E1EF] rounded p-4">
                                                            <DollarSign className="text-[#005bea]" />
                                                        </div>
                                                        <div className="grid">
                                                            <div className="flex items-center gap-2 text-sm">
                                                                <div className="flex items-center gap-2 text-[#202020]">
                                                                    <strong>Name:</strong>
                                                                    <span className="flex items-center">
                                                                   {item.extra_item}
                                                                </span>
                                                                </div>
                                                            </div>
                                                            <div className="flex items-center gap-2 text-sm">
                                                                <div className="flex items-center gap-2 text-[#202020]">
                                                                    <strong>Amount:</strong>
                                                                    <span className="flex items-center">
                                                                   <IndianRupee size={20}/>
                                                                        {parseFloat(item.extra_amount).toLocaleString('en-IN')}
                                                                </span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                )
                                            )

                                        }
                                    </div>
                                </motion.div>



                                {/*Document Charges*/}
                                <motion.div initial={{opacity: 0, y: 100}}
                                            animate={{opacity: 1, y: 0}}
                                            transition={{delay: 0.6}}>
                                    <div className="flex items-center justify-between">
                                        <p className="text-[#005bea] pb-2">
                                            Document Charges
                                        </p>
                                        <p className="flex items-center font-bold text-[#005bea] pb-2">
                                            <IndianRupee size={20} />
                                            {

                                                totalDocCost.toLocaleString("en-IN")

                                            }
                                        </p>
                                    </div>

                                    <div className="grid gap-2 items-center border border-[#D9E1EF] rounded p-4">

                                        {

                                            selectedTransaction.doc.map((item, index) =>

                                                (

                                                    <div key={index} className="flex gap-2 items-center">
                                                        <div className="bg-[#D9E1EF] rounded p-4">
                                                            <FileText className="text-[#005bea]" />
                                                        </div>
                                                        <div className="grid">
                                                            <div className="flex items-center gap-2 text-sm">
                                                                <div className="flex items-center gap-2 text-[#202020]">
                                                                    <strong>Name:</strong>
                                                                    <span className="flex items-center">
                                                                   {item.doc_item}
                                                                </span>
                                                                </div>
                                                            </div>
                                                            <div className="flex items-center gap-2 text-sm">
                                                                <div className="flex items-center gap-2 text-[#202020]">
                                                                    <strong>Amount:</strong>
                                                                    <span className="flex items-center">
                                                                   <IndianRupee size={20}/>
                                                                        {parseFloat(item.doc_amount).toLocaleString('en-IN')}
                                                                </span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                )
                                            )

                                        }
                                    </div>
                                </motion.div>


                                {/*Tax Charges*/}
                                <div className="grid gap-2 items-center border border-[#D9E1EF] rounded p-4">
                                    <div>
                                        <motion.div
                                            initial={{opacity: 0, y: 100}}
                                            animate={{opacity: 1, y: 0}}
                                            transition={{delay: 0.7}}
                                            className="flex items-center justify-between">
                                            <p className="text-[#005bea] pb-2">
                                                Tax Charges
                                            </p>
                                            <p className="flex items-center font-bold text-[#005bea] pb-2">
                                                <IndianRupee size={20} />
                                                {

                                                    (parseFloat(selectedTransaction.s_gst_amount) + parseFloat(selectedTransaction.c_gst_amount) + parseFloat(selectedTransaction.i_gst_amount)).toLocaleString("en-IN")

                                                }
                                            </p>
                                        </motion.div>

                                        <motion.div
                                            initial={{opacity: 0, y: 100}}
                                            animate={{opacity: 1, y: 0}}
                                            transition={{delay: 0.8}}
                                            className="grid gap-2 items-center border border-[#D9E1EF] rounded p-4">

                                            <div className="flex gap-2 items-center">
                                                <div className="bg-[#D9E1EF] rounded p-4">
                                                    <Percent className="text-[#005bea]" />
                                                </div>
                                                <div>
                                                    <div className="flex items-center gap-2 text-sm">
                                                        <div className="flex items-center gap-2 text-[#202020]">
                                                            <strong>SGST:</strong>
                                                            <span className="flex items-center">
                                                                <IndianRupee size={20} />
                                                                { parseFloat(selectedTransaction.s_gst_amount).toLocaleString('en-IN') }
                                                                ({selectedTransaction.s_gst_percent}%)
                                                           </span>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-2 text-sm">
                                                        <div className="flex items-center gap-2 text-[#202020]">
                                                            <strong>CGST:</strong>
                                                            <span className="flex items-center">
                                                                <IndianRupee size={20} />
                                                                { parseFloat(selectedTransaction.c_gst_amount).toLocaleString('en-IN') }
                                                                ({selectedTransaction.c_gst_percent}%)
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-2 text-sm">
                                                        <div className="flex items-center gap-2 text-[#202020]">
                                                            <strong>IGST:</strong>
                                                            <span className="flex items-center">
                                                                <IndianRupee size={20} />
                                                                { parseFloat(selectedTransaction.i_gst_amount).toLocaleString('en-IN') }
                                                                ({selectedTransaction.i_gst_percent}%)
                                                           </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </motion.div>
                                    </div>


                                    {/*Overall cost*/}
                                    <motion.div
                                        initial={{opacity: 0, y: 100}}
                                        animate={{opacity: 1, y: 0}}
                                        transition={{delay: 0.9}}>
                                        <div className="grid gap-2 items-center border border-[#D9E1EF] rounded p-4">

                                            <div className="flex gap-2 items-center">
                                                <div className="bg-[#D9E1EF] rounded p-4">
                                                    <HandCoins className="text-[#005bea]" />
                                                </div>
                                                <div>
                                                    <div className="flex items-center gap-2 text-sm">
                                                        <div className="flex items-center gap-2 text-[#202020]">
                                                            <strong>Overall Cost Before Tax:</strong>
                                                            <span className="flex items-center">
                                                       <IndianRupee size={20} />
                                                                { overAllCostBeforeTax }
                                                   </span>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-2 text-sm">
                                                        <div className="flex items-center gap-2 text-[#202020]">
                                                            <strong>Overall Cost After Tax:</strong>
                                                            <span className="flex items-center">
                                                       <IndianRupee size={20} />
                                                                { overAllCostAfterTax }
                                                   </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                </div>

                                <motion.div
                                    initial={{opacity: 0, y: 100}}
                                    animate={{opacity: 1, y: 0}}
                                    transition={{delay: 1.0}}
                                    className="grid gap-2 items-center border border-[#D9E1EF] rounded p-4">
                                    <div className="flex items-center justify-between">
                                        <p className="text-[#005bea] text-xl">
                                            Overall Cost
                                        </p>
                                        <p className="flex items-center font-bold text-[#005bea] text-xl">
                                            <IndianRupee size={20} />
                                            {

                                                overAllCost

                                            }
                                        </p>
                                    </div>

                                </motion.div>

                                {/*<div className="flex justify-end items-center">*/}
                                {/*    <div className="hidden">*/}
                                {/*        hello*/}
                                {/*    </div>*/}
                                {/*    <button*/}
                                {/*        type="button"*/}
                                {/*        onClick={downloadPDF}*/}
                                {/*        className="flex gap-2 items-center cursor-pointer text-xl border border-[#6392E5] bg-[#D9E1EF] text-[#005BEA] hover:bg-[#C9D8F3] px-4 py-2 w-fit rounded">*/}
                                {/*        <Download />*/}
                                {/*        Download*/}
                                {/*    </button>*/}
                                {/*</div>*/}
                            </div>
                        </div>
                    </div>
                )}

                {/* Edit Project */}
                {isModalEdit && selectedTransaction && (
                    <div className="fixed inset-0 bg-[#202020]/50 flex items-center justify-center z-50">
                        <div className="bg-[#F1F1F1] rounded w-11/12 h-9/10 md:w-1/2 lg:w-1/2 shadow-xl overflow-y-auto scroll-smooth">
                            <div className="sticky top-0 flex justify-between items-center bg-[#D9E1EF] rounded p-4 z-20">
                                <h2 className="flex gap-2 items-center text-xl text-[#005BEA]">
                                    <Kanban />
                                    Edit - { selectedTransaction.project_name }
                                </h2>
                                <button onClick={() => setIsModalEdit(false)} className="cursor-pointer text-gray-500 hover:text-gray-700">
                                    <X />
                                </button>
                            </div>

                            {/*Main Content*/}

                            <section className="grid border border-[#A9C1EA] rounded p-4">
                                <div className="grid grid-cols-1 gap-y-2 gap-x-2">
                                    <div>
                                        <form>
                                            {/* Create a New Project */}
                                            <div className="grid-cols-1 gap-10">
                                                <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-2 my-4 gap-6">
                                                    <motion.label
                                                        initial={{opacity: 0, y: 100}}
                                                        animate={{opacity: 1, y: 0}}
                                                        transition={{delay: 0.1}}
                                                        className="grid" htmlFor="date">
                                                        <span className="mx-2">Start Date</span>
                                                        <input type="date"
                                                               value={formData.start_date}
                                                               onChange={ev => setFormData({ ...formData, start_date: ev.target.value })}
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
                                                               onChange={ev => setFormData({ ...formData, end_date: ev.target.value })}
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
                                                               onChange={ev => setFormData({ ...formData, project_name: ev.target.value })}
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
                                                               onChange={ev => setFormData({ ...formData, project_area: ev.target.value })}
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
                                                               onChange={ev => setFormData({ ...formData, rate_per_sqft: ev.target.value })}
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
                                                               onChange={ev => setFormData({ ...formData, area_sqft: ev.target.value })}
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
                                                               onChange={ev => setFormData({ ...formData, construction_budget: ev.target.value })}
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
                                                               onChange={ev => setFormData({ ...formData, septic_tank: ev.target.value })}
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

                                                                <div className="grid items-center my-2 gap-2">
                                                                    <div className="grid md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-2 items-center gap-6">
                                                                        <motion.label
                                                                            initial={{opacity: 0, y: 100}}
                                                                            animate={{opacity: 1, y: 0}}
                                                                            transition={{delay: 0.3}}
                                                                            className="grid" htmlFor="name">
                                                                            <span className="mx-2">Item Name</span>
                                                                            <input type="text"
                                                                                   value={item.amenities_item}
                                                                                   onChange={(e) =>
                                                                                       HandleAmenitiesInputChange(index, "amenities_item", e.target.value)
                                                                                   }
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
                                                                                   onChange={(e) =>
                                                                                       HandleAmenitiesInputChange(index, "amenities_amount", e.target.value)
                                                                                   }
                                                                                   className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                                                                   placeholder="Enter the Amount" />
                                                                        </motion.label>
                                                                    </div>

                                                                    {
                                                                        formData.amenities.length > 1

                                                                        &&

                                                                        (
                                                                            <div className="grid justify-end">
                                                                                <motion.button
                                                                                    type="button"
                                                                                    onClick={() => RemoveAmenitiesEntry(index)}
                                                                                    className="text-lg flex gap-2 items-center text-red-600 cursor-pointer rounded"
                                                                                    initial={{ opacity: 0, y: 100 }}
                                                                                    animate={{ opacity: 1, y: 0 }}
                                                                                    transition={{ delay: 0.6 }}
                                                                                >
                                                                                    <Trash2 size={20} />
                                                                                    <p>
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

                                                                    <div className="grid items-center my-2 gap-2">
                                                                        <div className="grid md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-2 items-center gap-6">                                                                       <motion.label
                                                                            initial={{opacity: 0, y: 100}}
                                                                            animate={{opacity: 1, y: 0}}
                                                                            transition={{delay: 0.3}}
                                                                            className="grid" htmlFor="name">
                                                                            <span className="mx-2">Item Name</span>
                                                                            <input type="text"
                                                                                   value={item.extra_item}
                                                                                   onChange={(e) =>
                                                                                       HandleExtraInputChange(index, "extra_item", e.target.value)
                                                                                   }
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
                                                                                       onChange={(e) =>
                                                                                           HandleExtraInputChange(index, "extra_amount", e.target.value)
                                                                                       }
                                                                                       className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                                                                       placeholder="Enter the Amount" />
                                                                            </motion.label>

                                                                        </div>
                                                                        {
                                                                            formData.extra.length > 1

                                                                            &&

                                                                            (
                                                                                <div className="grid justify-end">
                                                                                    <motion.button
                                                                                        type="button"
                                                                                        onClick={() => RemoveExtraEntry(index)}
                                                                                        className="text-lg flex gap-2 items-center text-red-600 cursor-pointer rounded"
                                                                                        initial={{ opacity: 0, y: 100 }}
                                                                                        animate={{ opacity: 1, y: 0 }}
                                                                                        transition={{ delay: 0.6 }}
                                                                                    >
                                                                                        <Trash2 size={20} />
                                                                                        <p>
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

                                                                    <div className="grid items-center my-2 gap-2">
                                                                        <div className="grid md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-2 items-center gap-6">
                                                                            <motion.label
                                                                                initial={{opacity: 0, y: 100}}
                                                                                animate={{opacity: 1, y: 0}}
                                                                                transition={{delay: 0.3}}
                                                                                className="grid" htmlFor="name">
                                                                                <span className="mx-2">Item Name</span>
                                                                                <input type="text"
                                                                                       value={item.doc_item}
                                                                                       onChange={(e) =>
                                                                                           HandleDocInputChange(index, "doc_item", e.target.value)
                                                                                       }
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
                                                                                       onChange={(e) =>
                                                                                           HandleDocInputChange(index, "doc_amount", e.target.value)
                                                                                       }
                                                                                       className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                                                                       placeholder="Enter the Amount" />
                                                                            </motion.label>
                                                                        </div>
                                                                        {
                                                                            formData.doc.length > 1

                                                                            &&

                                                                            (
                                                                                <div className="grid justify-end">
                                                                                    <motion.button
                                                                                        type="button"
                                                                                        onClick={() => RemoveDocEntry(index)}
                                                                                        className="text-lg flex gap-2 items-center text-red-600 cursor-pointer rounded"
                                                                                        initial={{ opacity: 0, y: 100 }}
                                                                                        animate={{ opacity: 1, y: 0 }}
                                                                                        transition={{ delay: 0.6 }}
                                                                                    >
                                                                                        <Trash2 size={20} />
                                                                                        <p>
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

                                                <div className="grid md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-2 my-6 gap-6">
                                                    <motion.label
                                                        initial={{opacity: 0, y: 100}}
                                                        animate={{opacity: 1, y: 0}}
                                                        transition={{delay: 0.1}}
                                                        className="grid" htmlFor="cost">
                                                        <span className="mx-2">Plot Cost</span>
                                                        <input type="number"
                                                               readOnly={true}
                                                               value={formData.plot_cost}
                                                               onChange={ev => setFormData({ ...formData, plot_cost: ev.target.value })}
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
                                                               onChange={ev => setFormData({ ...formData, plot_sqft: ev.target.value })}
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
                                                                   onChange={ev => setFormData({ ...formData, s_gst_percent: ev.target.value })}
                                                                   className="outline outline-[#BABABA] w-30 focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                                                   placeholder="%" />
                                                            <input type="number"
                                                                   min="0"
                                                                   max="100"
                                                                   value={formData.s_gst_amount}
                                                                   onChange={ev => setFormData({ ...formData, s_gst_amount: ev.target.value })}
                                                                   readOnly={true}
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
                                                                   onChange={ev => setFormData({ ...formData, c_gst_percent: ev.target.value })}
                                                                   className="outline outline-[#BABABA] w-30 focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                                                   placeholder="%" />
                                                            <input type="number"
                                                                   min="0"
                                                                   max="100"
                                                                   value={formData.c_gst_amount}
                                                                   onChange={ev => setFormData({ ...formData, c_gst_amount: ev.target.value })}
                                                                   readOnly={true}
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
                                                                   onChange={ev => setFormData({ ...formData, i_gst_percent: ev.target.value })}
                                                                   className="outline outline-[#BABABA] w-30 focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                                                   placeholder="%" />
                                                            <input type="number"
                                                                   min="0"
                                                                   max="100"
                                                                   readOnly={true}
                                                                   value={formData.i_gst_amount}
                                                                   onChange={ev => setFormData({ ...formData, i_gst_amount    : ev.target.value })}
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
                                                               onChange={ev => setFormData({ ...formData, project_remarks: ev.target.value })}
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
                                                            transition={{delay: 0.2 }}
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

                                                <div className="grid md:grid lg:grid xl:grid gap-2 my-6">
                                                    <div
                                                        className="grid md:flex lg:flex xl:flex justify-between items-center text-xl border border-[#6392E5] rounded p-4">
                                                        <motion.label
                                                            className="flex text-[#005BEA] gap-2"
                                                            initial={{opacity: 0, y: 100}}
                                                            animate={{opacity: 1, y: 0}}
                                                            transition={{delay: 0.4 }}
                                                            htmlFor="box">
                                                            Total Project Cost After Tax
                                                        </motion.label>


                                                        <motion.div
                                                            initial={{opacity: 0, y: 100}}
                                                            animate={{opacity: 1, y: 0}}
                                                            transition={{delay: 0.5}}>
                                                            <span className="flex gap-2 items-center text-[#005BEA] py-4">
                                                                <IndianRupee/>
                                                                { TotalProjectCostAfterTax }
                                                            </span>
                                                        </motion.div>
                                                    </div>
                                                </div>
                                            </div>


                                            {/* Calculation Basis */}
                                            <div>
                                                <div className="grid md:grid lg:grid xl:grid gap-2 my-6">
                                                    <div className="grid md:flex lg:flex xl:flex justify-between items-center text-xl border border-[#6392E5] rounded p-4">
                                                        <motion.label
                                                            className="flex gap-2 p-2"
                                                            initial={{opacity: 0, y: 100}}
                                                            animate={{opacity: 1, y: 0}}
                                                            transition={{delay: 0.6 }}
                                                            htmlFor="box">
                                                            <span className="text-[#005BEA]">Avg Rate of construction</span>
                                                            = Total Budget / Build-up Area Sqft <br/>
                                                        </motion.label>
                                                    </div>
                                                    <div className="grid md:flex lg:flex xl:flex justify-between items-center text-xl border border-[#6392E5] rounded p-4">
                                                        <motion.label
                                                            className="flex gap-2 p-2"
                                                            initial={{opacity: 0, y: 100}}
                                                            animate={{opacity: 1, y: 0}}
                                                            transition={{delay: 0.7 }}
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
                                                                  transition={{delay: 0.8}}
                                                                  htmlFor="box">
                                                        <input
                                                            className="accent-[#005BEA]" type="checkbox"/>
                                                        Check the inputs whether you have entered valid details
                                                    </motion.label>

                                                    <div className="grid justify-start items-start py-2">


                                                        <motion.button
                                                            type="submit"
                                                            onClick={HandleUpdateProject}
                                                            className="flex gap-2 items-center cursor-pointer text-xl border border-[#6392E5] bg-[#D9E1EF] text-[#005BEA] hover:bg-[#C9D8F3] px-4 py-2 w-fit rounded"
                                                            initial={{opacity: 0, y: 100}}
                                                            animate={{opacity: 1, y: 0}}
                                                            transition={{delay: 0.3}}
                                                        >

                                                            <CircleFadingPlus />
                                                            Update Project

                                                        </motion.button>


                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </section>

                        </div>
                    </div>
                )}

            </section>
        </div>
    );
};

export default ProjectBoard;