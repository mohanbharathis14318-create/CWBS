// Import Modules
import { motion } from "motion/react";
import { AgGridReact } from "ag-grid-react";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useCallback, useMemo } from "react";
import { SquarePen, Trash2, IndianRupee, FileSpreadsheet, FileText } from 'lucide-react'
import { AllCommunityModule, ModuleRegistry, themeQuartz } from 'ag-grid-community';

// Register all Community features
ModuleRegistry.registerModules([AllCommunityModule]);

// Import Modules for export Excel or PDF files
import * as XLSX from "xlsx";
import { saveAs } from 'file-saver';
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

// Import Hooks
import { useBudget } from "../../../Hooks/useBudget.js";

// Import Assets
import emptyBox from '../../../assets/img/empty-box.png'

// Setting Theme for Grid
const Theme = themeQuartz
    .withParams({
        accentColor: "#005BEA",
        backgroundColor: "#F1F1F1",
        borderColor: "#6392E5",
        browserColorScheme: "light",
        foregroundColor: "#202020",
        headerBackgroundColor: "#D9E1EF",
        headerFontSize: 14,
        headerTextColor: "#005BEA",
    });

const BudgetBoard = () => {

    const navigate = useNavigate();

    // Get the module to fetch data
    const { fetchBudget, deleteBudget, BudgetDataList } = useBudget();

    // State for Selected Month
    const [selectedMonth, setSelectedMonth] = useState("");

    const NoRowsOverlay = () => (
        <div className="text-center text-[#005BEA] py-10 text-lg">
            <p>No Data Presented on this Month.</p>
        </div>
    );

    useEffect(() => {

        fetchBudget();

    }, [fetchBudget]);

    // Filtered Budget List
    const FilteredBudgetList = useMemo(() => {

        if (!selectedMonth) return BudgetDataList;

        return BudgetDataList?.filter(budget => budget.budget_month?.startsWith(selectedMonth))

    }, [selectedMonth, BudgetDataList]);

    // Total Budget Calculation
    const totalFilteredBudget = useMemo(() => {

        if (!Array.isArray(FilteredBudgetList)) return 0;

        return FilteredBudgetList.reduce((acc, curr) => acc + parseFloat(curr.budget_amount || 0), 0);

    }, [FilteredBudgetList]);

    // Export to Excel
    const exportToExcel = () => {

        if (!FilteredBudgetList || FilteredBudgetList.length === 0) return;

        // Prepare data rows
        const data = FilteredBudgetList.map(row => ({
            ID: row.budget_id,
            Month: row.budget_month,
            ExpenseType: row.budget_expenses_type,
            Particulars: row.budget_particulars,
            Amount: Number(row.budget_amount),
            CreatedAt: new Date(row.created_at).toLocaleString(),
        }));

        // Add total row
        data.push({
            ID: '',
            Month: '',
            ExpenseType: '',
            Particulars: 'Total',
            Amount: totalFilteredBudget,
            CreatedAt: ''
        });

        const worksheet = XLSX.utils.json_to_sheet(data);

        const workbook = XLSX.utils.book_new();

        XLSX.utils.book_append_sheet(workbook, worksheet, "Budget");

        const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });

        const fileData = new Blob([excelBuffer], { type: "application/octet-stream" });

        saveAs(fileData, `Budget_Report_${selectedMonth || 'All'}.xlsx`);

    };

    // Export to PDF
    const exportToPDF = () => {

        if (!FilteredBudgetList || FilteredBudgetList.length === 0) return;

        const doc = new jsPDF();

        doc.setFontSize(14);

        doc.text("Budget Report", 14, 20);

        const tableData = FilteredBudgetList.map((row) => [

            row.budget_id,
            row.budget_month,
            row.budget_expenses_type,
            row.budget_particulars,
            `Rs ${row.budget_amount}`,
            new Date(row.created_at).toLocaleString(),

        ]);

        // Add total row at the end
        tableData.push([
            '', '', '', 'Total',
            `Rs ${totalFilteredBudget}`,
            ''
        ]);

        autoTable(doc, {
            head: [["ID", "Month", "Type", "Particulars", "Amount", "Created At"]],
            body: tableData,
            startY: 30,
            styles: {
                font: 'helvetica', // Font type
                fontSize: 10,      // Font size
                textColor: '#202020', // Text color
                lineColor: '#005BEA', // Border color
                lineWidth: 0.2,
            },
            headStyles: {
                fillColor: '#C9D8F3', // Header background color
                textColor: '#005BEA',    // Header text color
            },
            bodyStyles: {
                fillColor: '#F1F1F1', // Row background color
            },
        });

        doc.save(`Budget_Report_${selectedMonth || 'All'}.pdf`);
    };

    // Edit and Delete Btn
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const ActionBtn = params => {

        const budget_id = params.data.budget_id;

        // console.log(budget_id);

        // Delete User
        const HandleDeleteUser = useCallback(() => {

            const deleteSuccess = deleteBudget(budget_id);

            if (deleteSuccess) return navigate(0)

        }, [budget_id])


        return (
            <div className="flex gap-4 items-center">
                <div>
                    <Link to={`/app-area/budgets/update_budget_detail/${budget_id}`} className="flex gap-2 justify-center items-center text-[#005BEA] rounded cursor-pointer">
                        <SquarePen />
                        Edit
                    </Link>
                </div>
                <button onClick={HandleDeleteUser} className="flex gap-2 justify-center items-center text-red-500 rounded cursor-pointer">
                    <Trash2 />
                    Delete
                </button>
            </div>
        );

    };


    const columnDefs = useMemo(() => [
        { headerName: "ID", field: "budget_id", sortable: true, filter: true },
        { headerName: "Budget Month", field: "budget_month", sortable: true, filter: true },
        { headerName: "Expense Type", field: "budget_expenses_type", sortable: true, filter: true },
        { headerName: "Budget Particulars", field: "budget_particulars", sortable: true, filter: true },
        {
            headerName: "Amount",
            field: "budget_amount",
            sortable: true,
            filter: true,
            valueFormatter: (p) => new Intl.NumberFormat("en-IN", {
                    style: "currency",
                    currency: "INR",
                    maximumFractionDigits: 2,
                }).format(p.value)

        },
        { headerName: "Created At", field: "created_at", valueFormatter: (p) => new Date(p.value).toLocaleString(), sortable: true, filter: true },
        { headerName: "Actions", field: "actions", cellRenderer: ActionBtn }
    ], [ActionBtn]);

    return (
        <div className="border border-[#6392E5] rounded p-4">
            <motion.div
                initial={{ opacity: 0, y: 100 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{delay: 0.1 }}
                className="head text-xl my-2">
                Budget Board
            </motion.div>
            <motion.hr
                initial={{ opacity: 0, y: 100 }}
                animate={{ y: 0, opacity: 1 }}
                className="border-[#6392E5]"/>

            <div className="grid md:flex lg:flex xl:flex justify-end gap-4 mt-4">
                <label className="flex gap-2 items-center text-[#005BEA] font-medium">
                    Select Month:
                    <input
                        type="month"
                        value={selectedMonth}
                        onChange={(ev) => setSelectedMonth(ev.target.value)}
                        className="p-2 border border-[#6392E5] rounded"
                    />
                </label>

                <div className="grid md:grid lg:grid xl:grid grid-cols-2 gap-4">
                    <button
                        onClick={exportToExcel}
                        className="flex gap-2 items-center cursor-pointer text-xl border border-[#6392E5] bg-[#D9E1EF] text-[#005BEA] hover:bg-[#C9D8F3] px-4 py-2 w-fit rounded"
                    >
                        <FileSpreadsheet />
                        Export Excel
                    </button>
                    <button
                        onClick={exportToPDF}
                        className="flex gap-2 items-center cursor-pointer text-xl border border-[#6392E5] bg-[#D9E1EF] text-[#005BEA] hover:bg-[#C9D8F3] px-4 py-2 w-fit rounded"
                    >
                        <FileText />
                        Export PDF
                    </button>
                </div>
            </div>

            {

                Array.isArray(BudgetDataList) && BudgetDataList.length === 0

                &&

                (
                    <div className="grid gap-4 justify-center items-center tracking-widest rounded p-16 my-4">
                        <div className="grid justify-center">
                            <img className="w-60" src={emptyBox} alt="empty-box-img"/>
                        </div>
                        <div className="grid text-center gap-4">
                            <p className="text-2xl text-[#202020]">
                                Empty.........!
                            </p>
                            <p className="text-xl text-[#005BEA]">
                                Please Add the Budget Details
                            </p>
                        </div>

                    </div>
                )

            }

            {
                Array.isArray(BudgetDataList) && BudgetDataList.length > 0

                &&

                (


                    <div className="my-4">
                        <AgGridReact
                            rowData={FilteredBudgetList || []}
                            columnDefs={columnDefs}
                            pagination={true}
                            theme={Theme}
                            paginationPageSize={50}
                            paginationPageSizeSelector={[10, 20, 50, 100]}
                            domLayout='autoHeight'
                            noRowsOverlayComponent={NoRowsOverlay}
                        />
                        <div className="flex gap-2 justify-between items-center text-xl my-4">
                            <span className="text-[#202020]">
                                Total Budget for selected month:
                            </span>
                            <span className="flex gap-2 justify-end items-center text-[#005BEA]">
                                <IndianRupee />{" "}
                                {new Intl.NumberFormat("en-IN").format(totalFilteredBudget)}
                            </span>
                        </div>
                    </div>

                )
            }

        </div>
    );
};

export default BudgetBoard;