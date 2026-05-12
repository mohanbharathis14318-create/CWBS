//Import Modules
import { useState } from "react";
import toast from "react-hot-toast";
import { motion } from "motion/react";
import { UserPlus } from 'lucide-react';
import { Link, useNavigate } from "react-router-dom";

// Import Hooks
import { useUser } from "../../Hooks/useUser.js";

// Import Components
import Loader from "../../components/Loader.jsx";
import Loading_Screen from "../../components/Loading_Screen.jsx";

// Import Assets
import RegisterImg from '../../assets/img/register.svg'

const Register = () => {

    // Property and States
    const { register, loading } = useUser();

    const [ Redirecting, setRedirecting ] = useState(false);

    const navigate = useNavigate();

    // State for Getting Input values
    const [ formData, setFormData ] = useState({
        user_name: "",
        user_email: "",
        user_phone: "",
        user_password: "",
        confirm_password: "",
        user_designation: "",
    });

    // Handle Register
    const handleChange = async (ev) => {

        ev.preventDefault();

        // Checking the Password matches or not, then create a user
        if (formData.user_password !== formData.confirm_password)
        {

            toast.error("Passwords don't match", {
                style: {
                    border: '1px solid #6392E5',
                    color: '#005bea',
                    background: '#f1f1f1',
                }
            });


        } else {

            const register_success = await register(formData);

            if (register_success)
            {

                setRedirecting(true);

                setTimeout(() => {

                    navigate("/auth/login");

                }, 2000);

            }

        }

    };

    if (Redirecting) {
        return <Loading_Screen />
    }

    return (
        <div>
            <section className="h-screen md:h-screen lg:h-screen xl:h-screen px-10 py-4">
                <div>
                    <motion.p className="head text-5xl"
                              initial={{ opacity: 0, y: 100 }}
                              animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}>
                        Record Your Environment
                    </motion.p>
                    <motion.hr initial={{ y: 100, z: 1000, opacity: 0 }}
                               animate={{ y: 0, z: 0, opacity: 1 }}
                               className="border-b-0 border-[#707070] my-2" />
                    <motion.p className="head text-2xl"
                              initial={{ opacity: 0, y: 100 }}
                              transition={{ delay: 0.4 }}
                              animate={{ y: 0, opacity: 1 }}>

                        Create Account
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-4">
                    <div className="my-6">
                        <form onSubmit={handleChange} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-22 text-[#202020]">
                            <div className="grid gap-10">
                                <motion.label initial={{ opacity: 0, y: 100 }}
                                              animate={{ opacity: 1, y: 0 }}
                                              transition={{ delay: 0.1 }}
                                              className="grid" htmlFor="name">
                                    <span className="mx-2">Full Name</span>
                                    <input type="text"
                                           value={formData.user_name}
                                           onChange={(ev) => { setFormData({ ...formData, user_name: ev.target.value }) }}
                                           className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                           placeholder="Enter Your Name"
                                           aria-required="true"/>
                                </motion.label>
                                <motion.label initial={{ opacity: 0, y: 100 }}
                                              animate={{ opacity: 1, y: 0 }}
                                              transition={{ delay: 0.2 }}
                                              className="grid" htmlFor="phone">
                                    <span className="mx-2">Phone</span>
                                    <input type="tel"
                                           value={formData.phone}
                                           onChange={(ev) => { setFormData({ ...formData, user_phone: ev.target.value }) }}
                                           className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                           placeholder="Enter Your Phone" aria-required="true"/>
                                </motion.label>
                                <motion.label initial={{ opacity: 0, y: 100 }}
                                              animate={{ opacity: 1, y: 0 }}
                                              transition={{ delay: 0.3 }}
                                              className="grid" htmlFor="Email">
                                    <span className="mx-2">Email</span>
                                    <input type="email"
                                           value={formData.email}
                                           onChange={(ev) => { setFormData({ ...formData, user_email: ev.target.value }) }}
                                           className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                           placeholder="Enter Your Email" aria-required="true"/>
                                </motion.label>
                            </div>
                            <div className="grid gap-10">
                                <motion.label initial={{ opacity: 0, y: 100 }}
                                              animate={{ opacity: 1, y: 0 }}
                                              transition={{ delay: 0.4 }}
                                              className="grid" htmlFor="password">
                                    <span className="mx-2">Password</span>
                                    <input type="password"
                                           value={formData.password}
                                           onChange={(ev) => { setFormData({ ...formData, user_password: ev.target.value }) }}
                                           className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                           placeholder="Enter Your Name"/>
                                </motion.label>
                                <motion.label initial={{ opacity: 0, y: 100 }}
                                              animate={{ opacity: 1, y: 0 }}
                                              transition={{ delay: 0.5 }}
                                              className="grid" htmlFor="confirm password">
                                    <span className="mx-2">Confirm Password</span>
                                    <input type="password"
                                           value={formData.confirm_password}
                                           onChange={(ev) => { setFormData({ ...formData, confirm_password: ev.target.value } ) }}
                                           className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                           placeholder="Enter Your Confirm Password" aria-required="true"/>
                                </motion.label>
                                <motion.label initial={{ opacity: 0, y: 100 }}
                                              animate={{ opacity: 1, y: 0 }}
                                              transition={{ delay: 0.6 }}
                                              className="grid" htmlFor="designation">
                                    <span className="mx-2">Designation</span>
                                    <select name="designation"
                                            value={formData.user_designation}
                                            onChange={(ev) => { setFormData({ ...formData, user_designation: ev.target.value }) }}
                                            className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                            id="role" placeholder="Select Your Designation">
                                        <option value="">
                                            Select Your Designation
                                        </option>
                                        <option value="MD">MD</option>
                                        <option value="Accountant">Accountant</option>
                                        <option value="Site Supervisor">Site Supervisor</option>
                                        <option value="Other Individuals">Other Individuals</option>
                                    </select>
                                </motion.label>
                            </div>
                            <div className="grid gap-6">
                                <motion.button initial={{ opacity:0, y: 100 }}
                                              animate={{ opacity: 1, y: 0 }}
                                              transition={{ delay: 0.1 }}
                                              type="submit"
                                              disabled={loading}
                                              className="text-[#005bea] border border-[#6392E5] bg-[#D9E1EF] hover:bg-[#C9D8F3] rounded p-4">

                                    { loading ? (

                                            <Loader />

                                    ) : (
                                        <span className="flex gap-2 justify-center items-center">
                                            <UserPlus />
                                            Create Account
                                        </span>
                                    ) }

                                </motion.button>
                                <motion.p initial={{ opacity:0, y: 100 }}
                                          animate={{ opacity: 1, y: 0 }}
                                          transition={{ delay: 0.2 }}
                                          className="text-xl">
                                    <span>Already have an account?</span>
                                    <Link className="text-[#005bea]" to={'/auth/login'}>Login</Link>
                                </motion.p>
                            </div>
                        </form>
                        <div className="grid gap-4 my-4">
                            <motion.hr initial={{ y: 100, z: 1000, opacity: 0 }}
                                       animate={{ y: 0, z: 0, opacity: 1 }}
                                       className="border-[#6392E5]" />
                            <motion.p initial={{ opacity: 0, y: 100 }}
                                      animate={{ opacity: 1, y: 0 }}
                                      transition={{ delay: 0.3 }}
                                      className="text-xl text-center">
                                We collect this info to assign dashboards and track site-<br/>level activity accurately
                            </motion.p>
                        </div>
                    </div>
                    <div>
                        <motion.img className="hidden lg:block"
                                    initial={{ opacity: 0, y: 100, rotateZ: 5 }}
                                    animate={{ opacity: 1, y: 0, rotateZ: 0}}
                                    src={RegisterImg} alt="Register-img"/>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Register;