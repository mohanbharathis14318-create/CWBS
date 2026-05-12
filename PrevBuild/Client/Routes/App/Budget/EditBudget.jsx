// Import Modules
import React, {useEffect, useState} from "react";
import { motion } from "motion/react";
import {CircleArrowLeft, CircleFadingPlus, IndianRupee, Trash2} from "lucide-react";
import {useNavigate, useParams} from "react-router-dom";

// Import Hooks
import { useBudget } from "../../../Hooks/useBudget.js";

import Loader from "../../../components/Loader.jsx";
import toast from "react-hot-toast";
import Loading_Screen from "../../../components/Loading_Screen";

const EditBudget = () => {

    const { getBudgetDetailById, updateBudget, loading } = useBudget();

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
            budget_month: "",
            budget_expenses_type: "",
            budget_particulars: "",
            budget_amount: "0",
        });

    const [checked, setChecked] = useState(false);

    const [redirect, setRedirect] = useState(false);

    // Getting id of the data
    const { id } = useParams();

    console.log("BudgetId: " + id);

    useEffect(() => {

        const fetchBudgetData = async () => {

            const budgetData = await getBudgetDetailById(id);

            if (budgetData) {

                setFormData({
                    budget_month: budgetData.budget_month || "",
                    budget_expenses_type: budgetData.budget_expenses_type || "",
                    budget_particulars: budgetData.budget_particulars || "",
                    budget_amount: budgetData.budget_amount || "0",
                });

            }

        }

        fetchBudgetData();

    }, [getBudgetDetailById, id]);

    async function HandleSubmit(ev) {

        ev.preventDefault();

        if (!checked)
        {

            toast.error("Please confirm that the entered budget details are valid.", {
                style: {
                    border: '1px solid #6392E5',
                    color: '#005bea',
                    background: '#f1f1f1',
                }
            });

        } else {

            const add_success = await updateBudget({
                id,
                budget_month: formData.budget_month,
                budget_expenses_type: formData.budget_expenses_type,
                budget_particulars: formData.budget_particulars,
                budget_amount: formData.budget_amount,
            });

            console.log(add_success);

            if (add_success)
            {
                setRedirect(true);

                setTimeout(() => {

                    return navigate('/app-area/budgets/budget_board');

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
                    <div className="flex justify-between items-center">
                        <motion.p
                            initial={{opacity: 0, y: 100}}
                            animate={{opacity: 1, y: 0}}
                            transition={{delay: 0.1}}
                            className="head text-5xl">
                            Plan to Change the Environment
                        </motion.p>

                        <motion.button initial={{ opacity: 0, y: 100 }}
                                       animate={{ y: 0, opacity: 1 }}
                                       transition={{delay: 0.3 }}
                                       onClick={() => navigate("/app-area/budgets/budget_board")}
                                       className="flex gap-2 justify-center items-center text-[#005BEA]  text-xl border border-[#6392E5] bg-[#D9E1EF] hover:bg-[#C9D8F3] p-4 rounded">
                            <CircleArrowLeft />
                            Back
                        </motion.button>
                    </div>

                    <div className="py-4">
                        <motion.hr
                            initial={{opacity: 0, y: 100}}
                            animate={{y: 0, opacity: 1}}
                            className="border-[#6392E5]"/>
                    </div>

                    <div>
                        <motion.p
                            initial={{opacity: 0, y: 100}}
                            animate={{opacity: 1, y: 0}}
                            transition={{delay: 0.1}}
                            className="head text-xl">
                            Update Budget Detail
                        </motion.p>
                    </div>


                    <form onSubmit={ HandleSubmit }>

                        <div className="grid grid-cols-1 gap-4">

                            <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-10 my-6">
                                <motion.label
                                    initial={{opacity: 0, y: 100}}
                                    animate={{opacity: 1, y: 0}}
                                    transition={{delay: 0.2}}
                                    className="grid" htmlFor="date">
                                    <span className="mx-2">Month</span>
                                    <input type="month"
                                           value={formData.budget_month}
                                           onChange={(ev) => { setFormData({ ...formData, budget_month: ev.currentTarget.value }); }}
                                           className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                           placeholder="MM-YYYY" required/>
                                </motion.label>

                                <motion.label
                                    initial={{ opacity: 0, y: 100 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 }}
                                    className="grid" htmlFor="particulars">
                                    <span className="mx-2">Expenses Type</span>
                                    <select name="Categories"
                                            value={formData.budget_expenses_type}
                                            onChange={(ev) => { setFormData({ ...formData, budget_expenses_type: ev.currentTarget.value }); }}
                                            className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                            id="" placeholder="Select Your Categories" required>
                                        <option>
                                            Select Your type
                                        </option>
                                        <option>Direct</option>
                                        <option>Indirect</option>
                                    </select>
                                </motion.label>

                                <motion.label
                                    initial={{ opacity: 0, y: 100 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.4 }}
                                    className="grid" htmlFor="particulars">
                                    <span className="mx-2">Particulars</span>
                                    <textarea
                                        value={formData.budget_particulars}
                                        onChange={(ev) => { setFormData({ ...formData, budget_particulars: ev.target.value }); }}
                                        placeholder="Enter Particulars"
                                        className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-2">
                                </textarea>
                                </motion.label>

                                <motion.label
                                    initial={{opacity: 0, y: 100}}
                                    animate={{opacity: 1, y: 0}}
                                    transition={{delay: 0.5}}
                                    className="grid" htmlFor="amount">
                                    <span className="mx-2">Amount</span>
                                    <input type="text"
                                           value={formData.budget_amount}
                                           onChange={(ev) => { setFormData({ ...formData, budget_amount: ev.currentTarget.value }); }}
                                           className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                           placeholder="Enter the Amount" required/>
                                </motion.label>
                            </div>

                        </div>


                        <div className="grid md:grid lg:grid xl:grid justify-between items-center gap-6 mt-6">

                            <motion.div
                                initial={{ opacity: 0, y: 100 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.6 }}
                                className="text-xl">
                                Total Estimated Amount: <br />
                                <span className="flex gap-2 items-center text-[#005BEA] py-4">
                                    <IndianRupee />
                                    {

                                        formData.budget_amount

                                    }
                                </span>
                            </motion.div>

                            <motion.label className="flex gap-x-2 items-center"
                                          initial={{ opacity: 0, y: 100 }}
                                          animate={{ opacity: 1, y: 0 }}
                                          transition={{ delay: 0.7 }}
                                          htmlFor="box">
                                <input checked={checked} onChange={(ev) => { setChecked(ev.target.checked) }} className="accent-[#005BEA]" type="checkbox"/>
                                Confirm all entries are valid
                            </motion.label>

                            <div className="py-2">

                                    {

                                        loading
                                            ?

                                            ( <Loader /> )

                                            :

                                            (
                                                <motion.button
                                                    type="submit"
                                                    className="grid gap-2 items-center cursor-pointer text-xl border border-[#6392E5] bg-[#D9E1EF] text-[#005BEA] hover:bg-[#C9D8F3] p-4 w-fit rounded"
                                                    initial={{opacity: 0, y: 100}}
                                                    animate={{opacity: 1, y: 0}}
                                                    transition={{delay: 0.3}}
                                                    disabled={loading}>
                                                    <span className="flex gap-2 justify-center items-center">
                                                        <CircleFadingPlus />
                                                        Add Budget
                                                    </span>
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

export default EditBudget;