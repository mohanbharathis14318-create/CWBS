// Import Modules
import {useState} from 'react';
import {motion} from "motion/react";
import toast from "react-hot-toast";
import { Send } from 'lucide-react';
import {useNavigate} from "react-router-dom";

// Import Hooks
import { useUser } from "../../../Hooks/useUser.js";
import { useRequirement } from "../../../Hooks/useRequirement.js";

// Import Component
import Loader from "../../../components/Loader.jsx";
import ExpenseReq from "../../../components/RequirementComp/ExpenseReq.jsx";
import Loading_Screen from "../../../components/Loading_Screen.jsx";

const Requirements = () => {

    const { user } = useUser();

    const { CreateCIHTrxnReq, loading } = useRequirement();

    const navigate = useNavigate();

    const person = {
        name: user.user,
        role: user.role,
    };

    const [transaction, setTransaction] = useState("")

    const [formData, setFormData] = useState({
        daily_activity_type: "Requirement",
        requirement_type: "",

        expenseReq: {
            transaction_title: "",
            trxn_remarks: "",
            user_name: person?.name || "",
            user_designation: person?.role || "",
            payment_mode: "",
            expense_type: "",
            amount: 0,
            cash_flow_type: "Cash Given", // Cash Given / Cash Return

            // Cash Given fields
            given_date: "",
            given_sender_name: "",
            given_sender_designation: "MD",
            given_payment_mode: "",
            given_amount: 0,

            // Cash Return fields
            return_date: "",
            return_receiver_name: "",
            return_receiver_designation: "",
            return_payment_mode: "",
            total_requested_amount: 0,
            total_expensed_amount: 0,
            total_balance_amount: 0,
            total_return_amount: 0,
        }

    });

    const [checked, setChecked] = useState(false);

    const [redirect, setRedirect] = useState(false);

    async function handleSubmit(ev) {

        ev.preventDefault();

        if (!checked) {

            toast.error("Please confirm that the entered cash in hand details are valid.", {
                style: {
                    border: '1px solid #6392E5',
                    color: '#005bea',
                    background: '#f1f1f1',
                }
            });

        } else {

            const {
                daily_activity_type,
                requirement_type,
                expenseReq: {
                    transaction_title,
                    trxn_remarks,
                    user_name,
                    user_designation,
                    payment_mode,
                    expense_type,
                    amount,
                    cash_flow_type, // Cash Given / Cash Return

                    // Cash Given fields
                    given_date,
                    given_sender_name,
                    given_sender_designation,
                    given_payment_mode,
                    given_amount,

                    // Cash Return fields
                    return_date,
                    return_sender_name,
                    return_sender_designation,
                    return_payment_mode,
                    total_requested_amount,
                    total_expensed_amount,
                    total_balance_amount,
                    total_return_amount,
                }
            } = formData;

            let payload = {
                daily_activity_type,
                requirement_type,
                transaction_title,
                trxn_remarks,
                user_name,
                user_designation,
                payment_mode,
                expense_type,
                amount,
                cash_flow_type,
            };

            if (cash_flow_type === "Cash Given") {

                payload = {
                    ...payload,
                    given_date,
                    given_sender_name,
                    given_sender_designation,
                    given_payment_mode,
                    given_amount,
                };

            } else if (cash_flow_type === "Cash Return") {

                payload = {
                    ...payload,
                    return_date,
                    return_sender_name,
                    return_sender_designation,
                    return_payment_mode,
                    total_requested_amount,
                    total_expensed_amount,
                    total_balance_amount,
                    total_return_amount,
                };

            }

            const add_success = await CreateCIHTrxnReq(payload);

            if (add_success) {

                setRedirect(true);

                setTimeout(() => {

                    return navigate('/app-area/transaction_book/cih_board');

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
              <motion.div className="border border-[#A9C1EA] bg-[#F1F1F1] rounded p-4 my-4">
                  <div className="flex gap-4">
                      <div className="grid justify-center items-center bg-[#C9D8F3] text-[#005bea] rounded p-4">
                          <Send />
                      </div>
                      <div>
                          <p className="head text-xl text-[#005bea]">Requirement Request</p>
                          <p>
                              Employees can request funds for{" "}
                              <strong>expenses</strong> or <strong>projects</strong>.
                              MD will review and provide cash, UPI, or bank transfer.
                          </p>
                      </div>
                  </div>
              </motion.div>

              <div className="grid border border-[#A9C1EA] bg-[#F1F1F1] rounded p-4 my-4">
                  <motion.div
                      initial={{ opacity: 0, y: 100 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                      className="head text-xl"
                  >
                      Start a New Requirement
                  </motion.div>
                  <div className="my-2">
                      <motion.hr
                          initial={{opacity: 0, y: 100}}
                          animate={{y: 0, opacity: 1}}
                          className="border-[#6392E5]"/>
                  </div>

                  <form onSubmit={handleSubmit} className="grid gap-4">
                      <div className="grid md:grid-cols-1 xl:grid-cols-3 gap-10">
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
                      <motion.label
                          initial={{opacity: 0, y: 100}}
                          animate={{opacity: 1, y: 0}}
                          transition={{delay: 0.2}}
                          htmlFor="date">
                          <span className="mx-2">Requirements Type</span>

                          <div className="flex gap-2 border border-[#005bea] rounded p-4">
                              <motion.label
                                  initial={{opacity: 0, y: 100}}
                                  animate={{opacity: 1, y: 0}}
                                  transition={{delay: 0.3}}
                                  className="flex" htmlFor="date">
                                  <input type="radio"
                                         className="accent-[#005bea] cursor-pointer"
                                         value="Expenses"
                                         checked={transaction === "Expenses"}
                                         onChange={(ev) => {
                                             setTransaction(ev.target.value);
                                             setFormData((prev) => ({
                                                 ...prev, requirement_type: ev.target.value
                                             }))
                                         }}
                                         name="TrxnType" required/>
                                  <span className="mx-2">Expense Request</span>
                              </motion.label>
                              <motion.label
                                  initial={{opacity: 0, y: 100}}
                                  animate={{opacity: 1, y: 0}}
                                  transition={{delay: 0.3}}
                                  className="flex" htmlFor="date">
                                  <input type="radio"
                                         name="TrxnType" required/>
                                  <span className="mx-2">Summa</span>
                              </motion.label>
                          </div>
                      </motion.label>


                      <div className="py-4">

                          {

                             transaction === "Expenses"

                              &&

                              (

                                  <ExpenseReq formData={formData.expenseReq} setFormData={
                                      (updated) =>
                                      setFormData((prev) => ({
                                          ...prev,
                                          expenseReq: {
                                              ...prev.expenseReq,
                                              ...updated
                                          },
                                      }))
                                  } />

                              )

                          }


                      </div>

                      <div className="grid md:grid lg:grid xl:grid justify-between items-center">
                          <motion.label className="flex gap-x-2 items-center"
                                        initial={{ opacity: 0, y: 100 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.7 }}
                                        htmlFor="box">
                              <input type="checkbox" className="accent-[#005BEA]" checked={checked} onChange={(ev) => {
                                  setChecked(ev.target.checked)
                              }} />
                              I confirm that the entered details are correct
                          </motion.label>

                      </div>

                      {

                          loading

                          ?

                              ( <Loader /> )

                          :

                              (

                                  <motion.button
                                      type="submit"
                                      className="flex gap-2 items-center cursor-pointer text-xl border border-[#6392E5] bg-[#D9E1EF] text-[#005BEA] hover:bg-[#C9D8F3] px-4 py-2 w-fit rounded"
                                      initial={{opacity: 0, y: 100}}
                                      animate={{opacity: 1, y: 0}}
                                      transition={{delay: 0.3}}>
                                      <span className="flex gap-2 justify-center items-center">
                                            <Send />
                                            Send Request to MD
                                      </span>
                                  </motion.button>

                              )


                      }


                  </form>

              </div>
            </section>
        </div>
    );
};

export default Requirements;