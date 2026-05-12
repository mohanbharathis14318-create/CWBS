// Import Modules
import { useState } from "react";
import { motion } from "motion/react";
import { CircleFadingPlus, IndianRupee, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Import Hooks
import { useBudget } from "../../../Hooks/useBudget.js";

import Loader from "../../../components/Loader.jsx";
import toast from "react-hot-toast";
import Loading_Screen from "../../../components/Loading_Screen";

const AddBudget = () => {

    const { addBudgetDetails, loading } = useBudget();

    const navigate = useNavigate();

    const [formData, setFormData] = useState([
        {
            budget_month: "",
            budget_expenses_type: "",
            budget_particulars: "",
            budget_amount: "0",
        }
    ]);

    const [checked, setChecked] = useState(false);

    const [redirect, setRedirect] = useState(false);

    // Add Entries
    function AddEntry()
    {

        setFormData([

            ...formData,
            {
                budget_month: "",
                budget_expenses_type: "",
                budget_particulars: "",
                budget_amount: "0",
            }

        ])

    }

    // Handle Individual Entries
    function HandleInputChange(index, field, value)
    {

        const update = [...formData];

        update[index][field] = value;

        setFormData(update);

    }

    // Remove Entry
    function RemoveEntry(index)
    {

        const update = [...formData];

        update.splice(index, 1);

        setFormData(update);

    }

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

            const add_success = await addBudgetDetails(formData);

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
                    <motion.div
                        initial={{opacity: 0, y: 100}}
                        animate={{opacity: 1, y: 0}}
                        transition={{delay: 0.1}}
                        className="head text-xl">
                        Budget
                    </motion.div>
                    <div className="py-4">
                        <motion.hr
                            initial={{opacity: 0, y: 100}}
                            animate={{y: 0, opacity: 1}}
                            className="border-[#6392E5]"/>
                    </div>

                    <div className="flex justify-start pb-4">
                        <motion.button
                            type="button"
                            onClick={AddEntry}
                            className="flex gap-2 items-center text-xl border border-[#6392E5] bg-[#D9E1EF] text-[#005BEA] hover:bg-[#C9D8F3] cursor-pointer px-4 py-2 rounded"
                            initial={{ opacity: 0, y: 100 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                        >
                            <CircleFadingPlus />
                            Add Item
                        </motion.button>
                    </div>
                    <form onSubmit={ HandleSubmit }>
                        {
                            formData.map((item, index) => (


                                <div key={index} className="grid grid-cols-1 gap-4 border border-[#6392E5] p-4 rounded bg-[#F1F1F1] my-4">

                                    <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-10 my-6">
                                        <motion.label
                                            initial={{opacity: 0, y: 100}}
                                            animate={{opacity: 1, y: 0}}
                                            transition={{delay: 0.2}}
                                            className="grid" htmlFor="date">
                                            <span className="mx-2">Month</span>
                                            <input type="month"
                                                   value={item.budget_month}
                                                   onChange={(ev) => HandleInputChange(index, 'budget_month', ev.target.value) }
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
                                                    value={item.budget_expenses_type}
                                                    onChange={(ev) => HandleInputChange(index, 'budget_expenses_type', ev.target.value)}
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
                                                value={item.budget_particulars}
                                                onChange={(ev) => HandleInputChange(index, 'budget_particulars', ev.target.value)}
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
                                                   value={item.budget_amount}
                                                   onChange={(ev) => HandleInputChange(index, 'budget_amount', ev.target.value)}
                                                   className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                                   placeholder="Enter the Amount" required/>
                                        </motion.label>
                                    </div>



                                    {
                                        formData.length > 1 && (
                                            <motion.button
                                                type="button"
                                                onClick={() => RemoveEntry(index)}
                                                className="text-xl flex gap-2 items-center border border-red-400 text-red-600 bg-red-100 hover:bg-red-200 cursor-pointer px-4 py-2 rounded w-fit"
                                                initial={{ opacity: 0, y: 100 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: 0.6 }}
                                            >
                                                <Trash2 />
                                                Delete Entry
                                            </motion.button>
                                        )
                                    }

                                </div>

                            ))
                        }

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
                                        formData.reduce((sum, e) => sum + parseFloat(e.budget_amount || 0), 0)
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
                                <motion.button
                                    type="submit"
                                    className="flex gap-2 items-center cursor-pointer text-xl border border-[#6392E5] bg-[#D9E1EF] text-[#005BEA] hover:bg-[#C9D8F3] px-4 py-2 w-fit rounded"
                                    initial={{opacity: 0, y: 100}}
                                    animate={{opacity: 1, y: 0}}
                                    transition={{delay: 0.3}}
                                    disabled={loading}>

                                    {

                                        loading
                                            ?

                                            ( <Loader /> )

                                            :

                                            (
                                                <span className="flex gap-2 justify-center items-center">
                                                    <CircleFadingPlus />
                                                    Add Budget
                                                </span>
                                            )

                                    }
                                </motion.button>
                            </div>
                        </div>

                    </form>
                </div>
            </section>
        </div>
    );
};

export default AddBudget;