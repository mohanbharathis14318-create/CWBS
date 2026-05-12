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
import { useOfficeAccount } from '../../Hooks/useTransaction.js';

// Import Assets
import emptyBox from '../../assets/img/empty-box.png'

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

const OfficeExpense = () => {

    const navigate = useNavigate();

    // Get the module to fetch data
    const { fetchOfficeExpense, deleteOfficeInvestment, OfficeExpenseList } = useOfficeAccount();

    // State for Selected Month
    const [selectedMonth, setSelectedMonth] = useState("");

    const NoRowsOverlay = () => (
        <div className="text-center text-[#005BEA] py-10 text-lg">
            <p>No Data Presented on this Month.</p>
        </div>
    );

    useEffect(() => {

        fetchOfficeExpense();

    }, [fetchOfficeExpense]);

    // Filtered Budget List
    const FilteredOfficeExpenseList = useMemo(() => {

        if (!selectedMonth) return OfficeExpenseList;

        return OfficeExpenseList?.filter(officeExp => officeExp.date?.startsWith(selectedMonth))

    }, [selectedMonth, OfficeExpenseList]);

    // Total Budget Calculation
    const totalFilteredOE = useMemo(() => {

        if (!Array.isArray(FilteredOfficeExpenseList)) return 0;

        return FilteredOfficeExpenseList.reduce((acc, curr) => acc + parseFloat(curr.total_amount || 0), 0);

    }, [FilteredOfficeExpenseList]);

    // Export to Excel
    const exportToExcel = () => {

        if (!FilteredOfficeExpenseList || FilteredOfficeExpenseList.length === 0) return;

        // Prepare data rows
        const data = FilteredOfficeExpenseList.map(row => ({
            Id: row.aci_id,
            Date: row.aci_date,
            DailyActivity: row.daily_activity,
            InvestmentType: row.aci_investment_type,
            Particulars: row.aci_particulars,
            PaymentMode: row.aci_payment_mode,
            TransactionRemarks: row.aci_transaction_remarks,
            Amount: Number(row.aci_amount),
            CreatedAt: new Date(row.created_at).toLocaleString(),
        }));

        // Add total row
        data.push({
            Id: '',
            Date: '',
            DailyActivity: '',
            InvestmentType: '',
            Particulars: '',
            PaymentMode: '',
            TransactionRemarks: 'Total',
            Amount: totalFilteredOE,
            CreatedAt: '',
        });

        const worksheet = XLSX.utils.json_to_sheet(data);

        const workbook = XLSX.utils.book_new();

        XLSX.utils.book_append_sheet(workbook, worksheet, "Office Investment");

        const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });

        const fileData = new Blob([excelBuffer], { type: "application/octet-stream" });

        saveAs(fileData, `Office_Expense_Report_${selectedMonth || 'All'}.xlsx`);

    };

    // Export to PDF
    const exportToPDF = () => {

        if (!FilteredOfficeExpenseList || FilteredOfficeExpenseList.length === 0) return;

        const doc = new jsPDF({ orientation: "landscape" });

        doc.setFontSize(14);

        doc.text("Office Expense Report", 14, 20);

        const tableData = FilteredOfficeExpenseList.map((row) => [

            new Date(row.date).toLocaleDateString(),
            row.daily_activity_type,
            row.investment_type,
            row.particulars,
            row.payment_mode,
            row.transaction_remark,
            row.discount,
            row.s_gst_percent,
            row.s_gst_amount,
            row.c_gst_percent,
            row.c_gst_amount,
            row.i_gst_percent,
            row.i_gst_amount,
            `Rs ${row.total_amount}`,
        ]);

        // Add total row at the end
        tableData.push([
            '', '', '', 'Total Expense',
            `Rs ${totalFilteredOE}`,
            ''
        ]);

        autoTable(doc, {
            head: [["Date", "Daily Activity", "Expense Type", "Particulars", "Payment Mode", "Transaction Remarks", "Discount", "SGST (%)", "SGST", "CGST (%)", "CGST", "IGST (%)", "IGST", "Total Amount"]],
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

        doc.save(`Office_Expense_${selectedMonth || 'All'}.pdf`);
    };

    // Edit and Delete Btn
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const ActionBtn = params => {

        const aci_id = params.data.aci_id;

        // console.log(budget_id);

        // Delete User
        const HandleDeleteUser = useCallback(() => {

            const deleteSuccess = deleteOfficeInvestment(aci_id);

            if (deleteSuccess) return navigate(0)

        }, [aci_id])


        return (
            <div className="flex gap-4 items-center">
                <div>
                    <Link to={`/app-area/transaction_book/office_account_board/update_investment/${aci_id}`} className="flex gap-2 justify-center items-center text-[#005BEA] rounded cursor-pointer">
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
        { headerName: "ID", field: "expense_id", sortable: true, filter: true },
        { headerName: "Daily Activity", field: "daily_activity_type", sortable: true, filter: true },
        { headerName: "Date", field: "date", valueFormatter: (p) => new Date(p.value).toLocaleDateString(), sortable: true, filter: true },
        { headerName: "Particulars", field: "particulars", sortable: true, filter: true },
        { headerName: "Expense Type", field: "type", sortable: true, filter: true },
        {
            headerName: "Amount",
            field: "base_amount",
            sortable: true,
            filter: true,
            valueFormatter: (p) => new Intl.NumberFormat("en-IN", {
                style: "currency",
                currency: "INR",
                maximumFractionDigits: 2,
            }).format(p.value)

        },
        { headerName: "Payment Mode", field: "payment_mode", sortable: true, filter: true },
        { headerName: "Transaction Remarks", field: "transaction_remark", sortable: true, filter: true },
        { headerName: "SGST (%)", field: "s_gst_percent", sortable: true, filter: true },
        { headerName: "SGST", field: "s_gst_amount", sortable: true, filter: true },
        { headerName: "CGST (%)", field: "C_gst_percent", sortable: true, filter: true },
        { headerName: "CGST", field: "c_gst_amount", sortable: true, filter: true },
        { headerName: "IGST (%)", field: "i_gst_percent", sortable: true, filter: true },
        { headerName: "IGST", field: "i_gst_amount", sortable: true, filter: true },
        { headerName: "Total Amount", field: "total_amount", sortable: true, filter: true },
        { headerName: "Actions", field: "actions", cellRenderer: ActionBtn }
    ], [ActionBtn]);

    return (
        <div className="border border-[#6392E5] rounded p-4">
            <motion.div
                initial={{ opacity: 0, y: 100 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{delay: 0.1 }}
                className="head text-xl my-2">
                Office Expense Board
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

                Array.isArray(OfficeExpenseList) && OfficeExpenseList.length === 0

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
                Array.isArray(OfficeExpenseList) && OfficeExpenseList.length > 0

                &&

                (


                    <div className="my-4">
                        <AgGridReact
                            rowData={FilteredOfficeExpenseList || []}
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
                                Total Office Expense for selected month:
                            </span>
                            <span className="flex gap-2 justify-end items-center text-[#005BEA]">
                                <IndianRupee />{" "}
                                {new Intl.NumberFormat("en-IN").format(totalFilteredOE)}
                            </span>
                        </div>
                    </div>

                )
            }

        </div>
    );
};

export default OfficeExpense;


{/*<motion.div*/}
{/*    initial={{ opacity: 0, y: 100}}*/}
{/*    animate={{ opacity: 1, y: 0 }}*/}
{/*    transition={{ delay: 0.1 }}*/}
{/*    className="head text-xl">*/}
{/*    Office Expenses*/}
{/*</motion.div>*/}
{/*<div className="my-2">*/}
{/*    <motion.hr*/}
{/*        initial={{ opacity: 0, y: 100 }}*/}
{/*        animate={{ y: 0, opacity: 1 }}*/}
{/*        className="border-[#6392E5]"/>*/}
{/*</div>*/}


{/*<form onSubmit={ HandleSubmit }>*/}
{/*    <div className="grid-cols-1 gap-10">*/}
{/*        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-10 my-4">*/}
{/*            <motion.label*/}
{/*                initial={{opacity: 0, y: 100}}*/}
{/*                animate={{opacity: 1, y: 0}}*/}
{/*                transition={{delay: 0.1}}*/}
{/*                className="grid" htmlFor="date">*/}
{/*                <span className="mx-2">Daily Activity Type</span>*/}
{/*                <input type="text"*/}
{/*                       value={formData.daily_activity_type}*/}
{/*                       onChange={(ev) => { setFormData({ ...formData, daily_activity_type: ev.target.value}) }}*/}
{/*                       disabled={true}*/}
{/*                       className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4 my-2"*/}
{/*                       placeholder="Enter the type" required/>*/}
{/*            </motion.label>*/}
{/*        </div>*/}

{/*        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-10 text-[#202020] py-6">*/}
{/*            <motion.label*/}
{/*                initial={{ opacity: 0, y: 100 }}*/}
{/*                animate={{ opacity: 1, y: 0 }}*/}
{/*                transition={{ delay: 0.2 }}*/}
{/*                className="grid" htmlFor="date">*/}
{/*                <span className="mx-2">Date</span>*/}
{/*                <input type="date"*/}
{/*                       value={formData.date}*/}
{/*                       onChange={(ev) => { setFormData({ ...formData, date: ev.target.value}) }}*/}
{/*                       className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"*/}
{/*                       placeholder="DD-MM-YYYY"/>*/}
{/*            </motion.label>*/}

{/*            <motion.label*/}
{/*                initial={{ opacity: 0, y: 100 }}*/}
{/*                animate={{ opacity: 1, y: 0 }}*/}
{/*                transition={{ delay: 0.2 }}*/}
{/*                className="grid" htmlFor="date">*/}
{/*                <span className="mx-2">*/}
{/*                    Particulars*/}
{/*                </span>*/}
{/*                <input type="text"*/}
{/*                       value={formData.particulars}*/}
{/*                       onChange={(ev) => { setFormData({ ...formData, particulars: ev.target.value}) }}*/}
{/*                       className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"*/}
{/*                       placeholder="Enter Particulars"/>*/}
{/*            </motion.label>*/}

{/*            <motion.label*/}
{/*                initial={{ opacity: 0, y: 100 }}*/}
{/*                animate={{ opacity: 1, y: 0 }}*/}
{/*                transition={{ delay: 0.5 }}*/}
{/*                className="grid" htmlFor="type">*/}
{/*                <span className="mx-2">Type</span>*/}
{/*                <select name="Type"*/}
{/*                        value={formData.type}*/}
{/*                        onChange={(ev) => { setFormData({ ...formData, type: ev.target.value }) }}*/}
{/*                        className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"*/}
{/*                        placeholder="Indirect/Direct">*/}
{/*                    <option value="">*/}
{/*                        Select Your Type*/}
{/*                    </option>*/}
{/*                    <option>Direct</option>*/}
{/*                    <option>Indirect</option>*/}
{/*                </select>*/}
{/*            </motion.label>*/}

{/*            <motion.label*/}
{/*                initial={{ opacity: 0, y: 100 }}*/}
{/*                animate={{ opacity: 1, y: 0 }}*/}
{/*                transition={{ delay: 0.6 }}*/}
{/*                className="grid" htmlFor="amount">*/}
{/*                <span className="mx-2">Amount</span>*/}
{/*                <input type="text"*/}
{/*                       value={formData.base_amount}*/}
{/*                       onChange={(ev) => { setFormData({ ...formData, base_amount: ev.target.value}) }}*/}
{/*                       className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"*/}
{/*                       placeholder="Enter the Amount" required/>*/}
{/*            </motion.label>*/}

{/*            <motion.label*/}
{/*                initial={{ opacity: 0, y: 100 }}*/}
{/*                animate={{ opacity: 1, y: 0 }}*/}
{/*                transition={{ delay: 0.7 }}*/}
{/*                className="grid" htmlFor="paymentmode">*/}
{/*                <span className="mx-2">Payment Mode</span>*/}
{/*                <select name="paymentmode"*/}
{/*                        value={formData.payment_mode}*/}
{/*                        onChange={(ev) => { setFormData({ ...formData, payment_mode: ev.target.value}) }}*/}
{/*                        className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"*/}
{/*                        placeholder="Select Your Payment Mode">*/}
{/*                    <option value="">*/}
{/*                        Select Your Payment Mode*/}
{/*                    </option>*/}
{/*                    <option>UPI</option>*/}
{/*                    <option>Bank</option>*/}
{/*                    <option>Cash</option>*/}
{/*                    <option>Other</option>*/}
{/*                </select>*/}
{/*            </motion.label>*/}

{/*            <motion.label*/}
{/*                initial={{ opacity: 0, y: 100 }}*/}
{/*                animate={{ opacity: 1, y: 0 }}*/}
{/*                transition={{ delay: 0.8 }}*/}
{/*                className="grid" htmlFor="remarks">*/}
{/*                <span className="mx-2">Transaction Remarks</span>*/}
{/*                <input type="text"*/}
{/*                       value={formData.transaction_remark}*/}
{/*                       onChange={(ev) => { setFormData({ ...formData, transaction_remark: ev.target.value}) }}*/}
{/*                       className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"*/}
{/*                       placeholder="Enter the Remarks" required/>*/}
{/*            </motion.label>*/}

{/*            <motion.p*/}
{/*                initial={{ opacity: 0, y: 100 }}*/}
{/*                animate={{ opacity: 1, y: 0 }}*/}
{/*                transition={{ delay: 0.9 }}>*/}
{/*                (Please Enter the <br/>transaction ID for UPI or <br/>Bank)*/}
{/*            </motion.p>*/}
{/*        </div>*/}

{/*        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-10">*/}
{/*            <motion.label*/}
{/*                initial={{ opacity: 0, y: 100 }}*/}
{/*                animate={{ opacity: 1, y: 0 }}*/}
{/*                transition={{ delay: 1.0 }}*/}
{/*                className="grid" htmlFor="discount">*/}
{/*                <span className="mx-2">Discount</span>*/}
{/*                <input type="number"*/}
{/*                       value={formData.discount}*/}
{/*                       onChange={(ev) => { setFormData({ ...formData, discount: ev.target.value}) }}*/}
{/*                       className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"*/}
{/*                       placeholder="Enter the Discount"/>*/}
{/*            </motion.label>*/}

{/*        </div>*/}
{/*        <div className="grid my-6 gap-10">*/}
{/*            <motion.label*/}
{/*                initial={{ opacity: 0, y: 100 }}*/}
{/*                animate={{ opacity: 1, y: 0 }}*/}
{/*                transition={{ delay: 1.1 }}*/}
{/*                className="grid" htmlFor="sgst">*/}
{/*                <span className="mx-2">SGST</span>*/}
{/*                <div className="flex gap-4">*/}
{/*                    <input type="number"*/}
{/*                           value={formData.s_gst_percent}*/}
{/*                           onChange={(ev) => setFormData({ ...formData, s_gst_percent: ev.target.value }) }*/}
{/*                           className="outline outline-[#BABABA] w-30 focus:outline-2 focus:outline-[#005bea] rounded p-4"*/}
{/*                           placeholder="%"/>*/}
{/*                    <input type="text"*/}
{/*                           disabled*/}
{/*                           value={formData.s_gst_amount}*/}
{/*                           className="outline outline-[#BABABA] w-40 focus:outline-2 focus:outline-[#005bea] rounded p-4"*/}
{/*                           placeholder="Amount"/>*/}
{/*                </div>*/}
{/*            </motion.label>*/}


{/*            <motion.label*/}
{/*                initial={{ opacity: 0, y: 100 }}*/}
{/*                animate={{ opacity: 1, y: 0 }}*/}
{/*                transition={{ delay: 1.2 }}*/}
{/*                className="grid" htmlFor="cgst">*/}
{/*                <span className="mx-2">CGST</span>*/}
{/*                <div className="flex gap-4">*/}
{/*                    <input type="number"*/}
{/*                           value={formData.c_gst_percent}*/}
{/*                           onChange={(ev) => { setFormData({ ...formData, c_gst_percent: ev.target.value }) }}*/}
{/*                           className="outline outline-[#BABABA] w-30 focus:outline-2 focus:outline-[#005bea] rounded p-4"*/}
{/*                           placeholder="%"/>*/}
{/*                    <input type="text"*/}
{/*                           value={formData.c_gst_amount}*/}
{/*                           disabled*/}
{/*                           className="outline outline-[#BABABA] w-40 focus:outline-2 focus:outline-[#005bea] rounded p-4"*/}
{/*                           placeholder="Amount"/>*/}
{/*                </div>*/}
{/*            </motion.label>*/}

{/*            <motion.label*/}
{/*                initial={{ opacity: 0, y: 100 }}*/}
{/*                animate={{ opacity: 1, y: 0 }}*/}
{/*                transition={{ delay: 1.3 }}*/}
{/*                className="grid" htmlFor="igst">*/}
{/*                <span className="mx-2">IGST</span>*/}
{/*                <div className="flex gap-4">*/}
{/*                    <input type="number"*/}
{/*                           value={formData.i_gst_percent}*/}
{/*                           onChange={(ev) => { setFormData({ ...formData, i_gst_percent: ev.target.value }) }}*/}
{/*                           className="outline outline-[#BABABA] w-30 focus:outline-2 focus:outline-[#005bea] rounded p-4"*/}
{/*                           placeholder="%"/>*/}
{/*                    <input type="text"*/}
{/*                           value={formData.i_gst_amount}*/}
{/*                           disabled*/}
{/*                           className="outline outline-[#BABABA] w-40 focus:outline-2 focus:outline-[#005bea] rounded p-4"*/}
{/*                           placeholder="Amount"/>*/}
{/*                </div>*/}
{/*            </motion.label>*/}


{/*        </div>*/}

{/*        <div className="grid md:grid lg:grid xl:grid justify-between items-center gap-6 mt-6">*/}

{/*            <div className="grid gap-10 py-2">*/}
{/*                <motion.div*/}
{/*                    initial={{ opacity: 0, y: 100 }}*/}
{/*                    animate={{ opacity: 1, y: 0 }}*/}
{/*                    transition={{ delay: 0.1 }}*/}
{/*                    className="text-xl">*/}
{/*                    Total Discount: <br/>*/}
{/*                    <span className="flex gap-2 items-center text-[#005BEA] py-4">*/}
{/*                    <IndianRupee />*/}
{/*                        {*/}

{/*                            parseFloat(formData.discount || 0).toFixed(2)*/}

{/*                        }*/}
{/*                </span>*/}
{/*                </motion.div>*/}

{/*                <motion.div*/}
{/*                    initial={{ opacity: 0, y: 100 }}*/}
{/*                    animate={{ opacity: 1, y: 0 }}*/}
{/*                    transition={{ delay: 0.1 }}*/}
{/*                    className="text-xl">*/}
{/*                    Total GST (SGST + CGST + IGST): <br/>*/}
{/*                    <span className="flex gap-2 items-center text-[#005BEA] py-4">*/}
{/*                    <IndianRupee />*/}
{/*                        {*/}
{/*                            (*/}
{/*                                parseFloat(formData.s_gst_amount || 0) +*/}
{/*                                parseFloat(formData.c_gst_amount || 0) +*/}
{/*                                parseFloat(formData.i_gst_amount || 0)*/}
{/*                            ).toFixed(2)*/}
{/*                        }*/}
{/*                </span>*/}
{/*                </motion.div>*/}


{/*                <motion.div*/}
{/*                    initial={{ opacity: 0, y: 100 }}*/}
{/*                    animate={{ opacity: 1, y: 0 }}*/}
{/*                    transition={{ delay: 0.1 }}*/}
{/*                    className="text-xl">*/}
{/*                    Total Amount ((Base Amount - Discount) + SGST + CGST + IGST) <br/>*/}
{/*                    <span className="flex gap-2 items-center text-[#005BEA] py-4" title="Total = (Base Amount - Discount) + SGST + CGST + IGST">*/}
{/*                    <IndianRupee />*/}
{/*                        { formData.total_amount }*/}
{/*                </span>*/}
{/*                </motion.div>*/}
{/*            </div>*/}

{/*            <motion.label className="flex gap-x-2 items-center"*/}
{/*                          initial={{ opacity: 0, y: 100 }}*/}
{/*                          animate={{ opacity: 1, y: 0 }}*/}
{/*                          transition={{ delay: 0.2 }}*/}
{/*                          htmlFor="box">*/}
{/*                <input checked={checked}*/}
{/*                       onChange={(ev) => setChecked(ev.target.checked)}*/}
{/*                       className="accent-[#005BEA]" type="checkbox"/>*/}
{/*                Confirm all transaction Entries are valid*/}
{/*            </motion.label>*/}

{/*            <div>*/}
{/*                <motion.button type="submit"*/}
{/*                               className="flex gap-2 items-center cursor-pointer text-xl border border-[#6392E5] bg-[#D9E1EF] text-[#005BEA] hover:bg-[#C9D8F3] px-6 py-2 rounded"*/}
{/*                               initial={{opacity: 0, y: 100}}*/}
{/*                               animate={{opacity: 1, y: 0}}*/}
{/*                               transition={{delay: 0.3}}>*/}
{/*                    <Send />*/}
{/*                    Submit*/}
{/*                </motion.button>*/}
{/*            </div>*/}
{/*        </div>*/}
{/*   </div>*/}
{/*</form>*/}