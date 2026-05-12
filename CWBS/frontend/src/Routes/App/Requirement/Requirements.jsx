// Import Modules
import {motion} from "motion/react";
import { BadgeIndianRupee, Send,} from 'lucide-react';
import { NavLink, Routes, Route} from "react-router-dom";

// Import Hooks
import { useUser } from "../../../Hooks/useUser.js";

// Import Routes
import RequirementStatus from "../Requirement/RequirementStatus.jsx";

const Requirements = () => {

    const { user } = useUser();

    const person = {
        name: user.user,
        role: user.role,
    };


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
                  <form className="grid gap-4">
                      <div className="grid md:grid-cols-1 xl:grid-cols-3 gap-10">
                          <motion.label
                              initial={{opacity: 0, y: 100}}
                              animate={{opacity: 1, y: 0}}
                              transition={{delay: 0.1}}
                              className="grid" htmlFor="date">
                              <span className="mx-2">Daily Activity Type</span>
                              <input type="text"
                                     disabled={true}
                                     className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4 my-2"
                                     placeholder="Enter the type" required/>
                          </motion.label>
                      </div>

                      <div className="py-2">
                          <div className="grid md:flex lg:flex xl:flex gap-2">
                              <div className="flex justify-center items-center w-full">
                                  <motion.div  className="grid" initial={{ opacity: 0, y: 100 }}
                                               animate={{ y: 0, opacity: 1 }}
                                               transition={{delay: 0.1 }}>
                                      <NavLink to="/app-area/requirements/requirement_status"
                                               className={({ isActive }) => isActive ? "flex gap-2 justify-center items-center text-xl text-[#005BEA] border border-[#6392E5] bg-[#C9D8F3] rounded-full p-4" : "flex gap-2 justify-center items-center text-xl text-[#005BEA] border border-[#6392E5] bg-[#D9E1EF] hover:bg-[#C9D8F3] px-6 py-2 rounded"}>
                                          <BadgeIndianRupee />
                                          Requirement Status
                                      </NavLink>
                                  </motion.div>
                              </div>
                          </div>

                          <div>
                              <Routes>
                                  <Route path="/requirement_status" element={<RequirementStatus />} />
                              </Routes>
                          </div>
                      </div>
                  </form>
              </div>
            </section>
        </div>
    );
};

export default Requirements;