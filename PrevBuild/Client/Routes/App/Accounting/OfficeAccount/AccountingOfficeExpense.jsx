// Import Modules
import { motion } from "motion/react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IndianRupee, Send } from "lucide-react";

// Import Hooks
import { useBudget } from "../../../../Hooks/useBudget.js";
import { useOfficeAccount } from "../../../../Hooks/useTransaction.js";
import toast from "react-hot-toast";

// Import Components
import Loading_Screen from "../../../../components/Loading_Screen.jsx";

function AccountingOfficeExpense() {

    const [checked, setChecked] = useState(false);

    const [redirect, setRedirect] = useState(false);

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        daily_activity_type: "Office Expenses",
        date: "",
        particulars: "",
        type: "",
        base_amount: "0",
        payment_mode: "",
        transaction_remark: "",
        discount: "0",


        s_gst_percent: "0",
        s_gst_amount: "0",
        c_gst_percent: "0",
        c_gst_amount: "0",
        i_gst_percent: "0",
        i_gst_amount: "0",

        total_amount: "0",
    });

    const { fetchBudget, BudgetDataList } = useBudget();

    const { createOfficeExpense } = useOfficeAccount();

    useEffect(() => {

        fetchBudget();

        // Calculation on Tax
        const amount = parseFloat(formData.base_amount) || 0;

        const discount = parseFloat(formData.discount) || 0;


        const sgstRate = parseFloat(formData.s_gst_percent) || 0;

        const cgstRate = parseFloat(formData.c_gst_percent) || 0;

        const igstRate = parseFloat(formData.i_gst_percent) || 0;


        const discountedAmount = amount - discount;


        const sgstAmount = (discountedAmount * sgstRate) / 100;

        const cgstAmount = (discountedAmount * cgstRate) / 100;

        const igstAmount = (discountedAmount * igstRate) / 100;

        const total = discountedAmount + sgstAmount + cgstAmount + igstAmount;

        setFormData(prev => ({
            ...prev,
            s_gst_amount: sgstAmount.toFixed(2),
            c_gst_amount: cgstAmount.toFixed(2),
            i_gst_amount: igstAmount.toFixed(2),
            total_amount: total.toFixed(2),
        }));

    }, [
        fetchBudget,
        formData.base_amount,
        formData.discount,
        formData.c_gst_percent,
        formData.s_gst_amount,
        formData.i_gst_percent,
    ]);

    async function HandleSubmit(ev) {

        ev.preventDefault();

        if (!checked)
        {

            toast.error("Please confirm that the entries are valid.", {
                style: {
                    border: '1px solid #6392E5',
                    color: '#005bea',
                    background: '#f1f1f1',
                }
            });

        } else {

            const add_success = await createOfficeExpense(formData);

            if (add_success)
            {
                setRedirect(true);

                setTimeout(() => {

                    return navigate('/app-area/transaction_book/office_account_board/office_expenses_board');

                }, 2000)

            } else {

                setRedirect(false);

            }

        }

    }

    if (redirect) return <Loading_Screen />

    return (
        <>
            <div className="h-full">

                {/*Accounting Office Expenses*/}
                <section>
                    <div className="grid border border-[#A9C1EA] rounded p-4 my-4">
                        <motion.div
                            initial={{ opacity: 0, y: 100}}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="head text-xl">
                            Office Expenses
                        </motion.div>
                        <div className="my-2">
                            <motion.hr
                                initial={{ opacity: 0, y: 100 }}
                                animate={{ y: 0, opacity: 1 }}
                                className="border-[#6392E5]"/>
                        </div>


                        <form onSubmit={ HandleSubmit }>
                            <div className="grid-cols-1 gap-10">
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-10 my-4">
                                    <motion.label
                                        initial={{opacity: 0, y: 100}}
                                        animate={{opacity: 1, y: 0}}
                                        transition={{delay: 0.1}}
                                        className="grid" htmlFor="date">
                                        <span className="mx-2">Daily Activity Type</span>
                                        <input type="text"
                                               value={formData.daily_activity_type}
                                               onChange={(ev) => { setFormData({ ...formData, daily_activity_type: ev.target.value}) }}
                                               disabled={true}
                                               className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4 my-2"
                                               placeholder="Enter the type" required/>
                                    </motion.label>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-10 text-[#202020] py-6">
                                    <motion.label
                                        initial={{ opacity: 0, y: 100 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.2 }}
                                        className="grid" htmlFor="date">
                                        <span className="mx-2">Date</span>
                                        <input type="date"
                                               value={formData.date}
                                               onChange={(ev) => { setFormData({ ...formData, date: ev.target.value}) }}
                                               className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                               placeholder="DD-MM-YYYY"/>
                                    </motion.label>

                                    <motion.label
                                        initial={{ opacity: 0, y: 100 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.4 }}
                                        className="grid" htmlFor="particulars">
                                        <span className="mx-2">Particulars as on Budget</span>
                                        <select value={formData.particulars}
                                                onChange={(ev) => { setFormData({ ...formData, particulars: ev.target.value }) }}
                                                className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                                placeholder="Select Your Particular">
                                            <option value="">
                                                Select Your Particular
                                            </option>

                                            {

                                                Array.isArray(BudgetDataList) && BudgetDataList.length > 0

                                                ?

                                                    BudgetDataList?.map((item) => (

                                                        <option key={item.budget_id} value={item.budget_particulars}>
                                                            { item.budget_particulars }
                                                        </option>

                                                    ))

                                                :

                                                (

                                                    <option disabled>No Budget Data</option>

                                                )

                                            }

                                        </select>
                                    </motion.label>

                                    <motion.label
                                        initial={{ opacity: 0, y: 100 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.5 }}
                                        className="grid" htmlFor="type">
                                        <span className="mx-2">Type</span>
                                        <select name="Type"
                                                value={formData.type}
                                                onChange={(ev) => { setFormData({ ...formData, type: ev.target.value }) }}
                                                className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                                placeholder="Indirect/Direct">
                                            <option value="">
                                                Select Your Type
                                            </option>
                                            <option>Direct</option>
                                            <option>Indirect</option>
                                        </select>
                                    </motion.label>

                                    <motion.label
                                        initial={{ opacity: 0, y: 100 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.6 }}
                                        className="grid" htmlFor="amount">
                                        <span className="mx-2">Amount</span>
                                        <input type="text"
                                               value={formData.base_amount}
                                               onChange={(ev) => { setFormData({ ...formData, base_amount: ev.target.value}) }}
                                               className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                               placeholder="Enter the Amount" required/>
                                    </motion.label>

                                    <motion.label
                                        initial={{ opacity: 0, y: 100 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.7 }}
                                        className="grid" htmlFor="paymentmode">
                                        <span className="mx-2">Payment Mode</span>
                                        <select name="paymentmode"
                                                value={formData.payment_mode}
                                                onChange={(ev) => { setFormData({ ...formData, payment_mode: ev.target.value}) }}
                                                className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                                placeholder="Select Your Payment Mode">
                                            <option value="">
                                                Select Your Payment Mode
                                            </option>
                                            <option>UPI</option>
                                            <option>Bank</option>
                                            <option>Cash</option>
                                            <option>Other</option>
                                        </select>
                                    </motion.label>

                                    <motion.label
                                        initial={{ opacity: 0, y: 100 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.8 }}
                                        className="grid" htmlFor="remarks">
                                        <span className="mx-2">Transaction Remarks</span>
                                        <input type="text"
                                               value={formData.transaction_remark}
                                               onChange={(ev) => { setFormData({ ...formData, transaction_remark: ev.target.value}) }}
                                               className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                               placeholder="Enter the Remarks" required/>
                                    </motion.label>

                                    <motion.p
                                        initial={{ opacity: 0, y: 100 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.9 }}>
                                        (Please Enter the <br/>transaction ID for UPI or <br/>Bank)
                                    </motion.p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-10">
                                    <motion.label
                                        initial={{ opacity: 0, y: 100 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 1.0 }}
                                        className="grid" htmlFor="discount">
                                        <span className="mx-2">Discount</span>
                                        <input type="number"
                                               value={formData.discount}
                                               onChange={(ev) => { setFormData({ ...formData, discount: ev.target.value}) }}
                                               className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                               placeholder="Enter the Discount"/>
                                    </motion.label>

                                </div>
                                <div className="grid my-6 gap-10">
                                    <motion.label
                                        initial={{ opacity: 0, y: 100 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 1.1 }}
                                        className="grid" htmlFor="sgst">
                                        <span className="mx-2">SGST</span>
                                        <div className="flex gap-4">
                                            <input type="number"
                                                   value={formData.s_gst_percent}
                                                   onChange={(ev) => setFormData({ ...formData, s_gst_percent: ev.target.value }) }
                                                   className="outline outline-[#BABABA] w-30 focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                                   placeholder="%"/>
                                            <input type="text"
                                                   disabled
                                                   value={formData.s_gst_amount}
                                                   className="outline outline-[#BABABA] w-40 focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                                   placeholder="Amount"/>
                                        </div>
                                    </motion.label>


                                    <motion.label
                                        initial={{ opacity: 0, y: 100 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 1.2 }}
                                        className="grid" htmlFor="cgst">
                                        <span className="mx-2">CGST</span>
                                        <div className="flex gap-4">
                                            <input type="number"
                                                   value={formData.c_gst_percent}
                                                   onChange={(ev) => { setFormData({ ...formData, c_gst_percent: ev.target.value }) }}
                                                   className="outline outline-[#BABABA] w-30 focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                                   placeholder="%"/>
                                            <input type="text"
                                                   value={formData.c_gst_amount}
                                                   disabled
                                                   className="outline outline-[#BABABA] w-40 focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                                   placeholder="Amount"/>
                                        </div>
                                    </motion.label>

                                    <motion.label
                                        initial={{ opacity: 0, y: 100 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 1.3 }}
                                        className="grid" htmlFor="igst">
                                        <span className="mx-2">IGST</span>
                                        <div className="flex gap-4">
                                            <input type="number"
                                                   value={formData.i_gst_percent}
                                                   onChange={(ev) => { setFormData({ ...formData, i_gst_percent: ev.target.value }) }}
                                                   className="outline outline-[#BABABA] w-30 focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                                   placeholder="%"/>
                                            <input type="text"
                                                   value={formData.i_gst_amount}
                                                   disabled
                                                   className="outline outline-[#BABABA] w-40 focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                                   placeholder="Amount"/>
                                        </div>
                                    </motion.label>


                                </div>

                                <div className="grid md:grid lg:grid xl:grid justify-between items-center gap-6 mt-6">

                                    <div className="grid gap-10 py-2">
                                        <motion.div
                                            initial={{ opacity: 0, y: 100 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.1 }}
                                            className="text-xl">
                                            Total Discount: <br/>
                                            <span className="flex gap-2 items-center text-[#005BEA] py-4">
                                            <IndianRupee />
                                                {

                                                    parseFloat(formData.discount || 0).toFixed(2)

                                                }
                                        </span>
                                        </motion.div>

                                        <motion.div
                                            initial={{ opacity: 0, y: 100 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.1 }}
                                            className="text-xl">
                                            Total GST (SGST + CGST + IGST): <br/>
                                            <span className="flex gap-2 items-center text-[#005BEA] py-4">
                                            <IndianRupee />
                                                {
                                                    (
                                                        parseFloat(formData.s_gst_amount || 0) +
                                                        parseFloat(formData.c_gst_amount || 0) +
                                                        parseFloat(formData.i_gst_amount || 0)
                                                    ).toFixed(2)
                                                }
                                        </span>
                                        </motion.div>


                                        <motion.div
                                            initial={{ opacity: 0, y: 100 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.1 }}
                                            className="text-xl">
                                            Total Amount ((Base Amount - Discount) + SGST + CGST + IGST) <br/>
                                            <span className="flex gap-2 items-center text-[#005BEA] py-4" title="Total = (Base Amount - Discount) + SGST + CGST + IGST">
                                            <IndianRupee />
                                                { formData.total_amount }
                                        </span>
                                        </motion.div>
                                    </div>

                                    <motion.label className="flex gap-x-2 items-center"
                                                  initial={{ opacity: 0, y: 100 }}
                                                  animate={{ opacity: 1, y: 0 }}
                                                  transition={{ delay: 0.2 }}
                                                  htmlFor="box">
                                        <input checked={checked}
                                               onChange={(ev) => setChecked(ev.target.checked)}
                                               className="accent-[#005BEA]" type="checkbox"/>
                                        Confirm all transaction Entries are valid
                                    </motion.label>

                                    <div>
                                        <motion.button type="submit"
                                                       className="flex gap-2 items-center cursor-pointer text-xl border border-[#6392E5] bg-[#D9E1EF] text-[#005BEA] hover:bg-[#C9D8F3] px-6 py-2 rounded"
                                                       initial={{opacity: 0, y: 100}}
                                                       animate={{opacity: 1, y: 0}}
                                                       transition={{delay: 0.3}}>
                                            <Send />
                                            Submit
                                        </motion.button>
                                    </div>
                                </div>
                           </div>
                        </form>
                    </div>
                </section>
            </div>
        </>
    )

}

export default AccountingOfficeExpense;