//Import Modules
import { LogIn } from 'lucide-react';
import { motion } from "motion/react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

// Import Hooks
import { useUser } from "../../Hooks/useUser.js";

// Import Components
import Loader from "../../components/Loader.jsx";

// Import Routes

// Import Assets
import LoginImg from '../../assets/img/Login.svg'

const Login = () => {

    // State and Property
    const { login, loading, isLoggedIn } = useUser();

    const navigate = useNavigate();

    // Property and State
    const [ formData, setFormData ] = useState({
        user_email: "",
        user_phone: "",
        user_password: "",
        user_designation: "",
    });


    // Handle login
    async function handleLogin(ev) {

        ev.preventDefault();

        await login(formData);

    }

    useEffect(() => {

        if (isLoggedIn) {

            return navigate("/app-area");

        }
    }, [isLoggedIn, navigate]);

    return (
        <>
            <div>
                <section className="h-screen md:h-screen lg:h-screen xl:h-screen px-10 py-4">
                    <div>
                        <motion.p initial={{ opacity: 0, y: 100 }}
                                  animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}
                                  className="head text-4xl md:text-5xl lg:text-5xl xl:text-5xl">
                            Let's Arrange Everything First
                        </motion.p>
                        <motion.hr initial={{ y: 100, z: 1000, opacity: 0 }}
                                   animate={{ y: 0, z: 0, opacity: 1 }}
                                   className="border-b-0 border-[#707070] my-2" />
                        <motion.p initial={{ opacity: 0, y: 100 }}
                                  transition={{ delay: 0.4 }}
                                  animate={{ y: 0, opacity: 1 }}
                                  className="head text-xl md:text-2xl lg:text-2xl xl:text-2xl">
                            Login to Your Account
                        </motion.p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-4">
                        <div className="my-6">
                            <form onSubmit={handleLogin} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-22 text-[#202020]">
                                <div className="grid gap-10">
                                    <motion.label initial={{ opacity: 0, y: 100 }}
                                                  animate={{ opacity: 1, y: 0 }}
                                                  transition={{ delay: 0.1 }}
                                                  className="grid" htmlFor="Email">
                                        <span className="mx-2">Email</span>
                                        <input type="email"
                                               value={formData.user_email}
                                               onChange={(ev) => { setFormData({ ...formData, user_email: ev.target.value }) }}
                                               className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                               placeholder="Enter Your Phone" aria-required="true"/>
                                    </motion.label>
                                    <motion.label initial={{ opacity: 0, y: 100 }}
                                                  animate={{ opacity: 1, y: 0 }}
                                                  transition={{ delay: 0.2 }}
                                                  className="grid" htmlFor="phone">
                                        <span className="mx-2">Phone</span>
                                        <input type="tel"
                                               value={formData.user_phone}
                                               onChange={(ev) => { setFormData({ ...formData, user_phone: ev.target.value }) }}
                                               className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                               placeholder="Enter Your Phone" aria-required="true"/>
                                    </motion.label>
                                </div>
                                <div className="grid gap-10">
                                    <motion.label initial={{ opacity: 0, y: 100 }}
                                                  animate={{ opacity: 1, y: 0 }}
                                                  transition={{ delay: 0.3 }}
                                                  className="grid" htmlFor="password">
                                        <span className="mx-2">Password</span>
                                        <input type="password"
                                               value={formData.user_password}
                                               onChange={(ev) => { setFormData({ ...formData, user_password: ev.target.value }) }}
                                               className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                               placeholder="Enter Your Name"/>
                                    </motion.label>
                                    <motion.label initial={{ opacity: 0, y: 100 }}
                                                  animate={{ opacity: 1, y: 0 }}
                                                  transition={{ delay: 0.4 }}
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
                                    <motion.button type="submit"
                                                   initial={{ opacity:0, y: 100 }}
                                                   animate={{ opacity: 1, y: 0 }}
                                                   transition={{ delay: 0.1 }}
                                                   disabled={ loading }
                                                   className="text-[#005bea] border border-[#6392E5] bg-[#D9E1EF] hover:bg-[#C9D8F3] rounded p-4">
                                        {
                                            loading ? (

                                                <Loader />

                                            ) : (

                                                <span className="flex gap-2 justify-center items-center">
                                                    <LogIn />
                                                    Login
                                                </span>

                                            )
                                        }
                                    </motion.button>
                                    <motion.p className="text-xl"
                                              initial={{ opacity:0, y: 100 }}
                                              animate={{ opacity: 1, y: 0 }}
                                              transition={{ delay: 0.2 }}>
                                        <span>Don't have an account?</span>
                                        <Link className="text-[#005bea]" to={'/auth/register'}>
                                            Create One
                                        </Link>
                                    </motion.p>
                                </div>
                            </form>
                            <div className="grid gap-4 my-4">
                                <motion.hr initial={{ y: 100, z: 1000, opacity: 0 }}
                                           animate={{ y: 0, z: 0, opacity: 1 }} className="border-[#6392E5]" />
                                <motion.p initial={{ opacity:0, y: 100 }}
                                          animate={{ opacity: 1, y: 0 }}
                                          transition={{ delay: 0.3 }}
                                          className="text-xl text-center">
                                    Enter your email, password and designation to access your<br/>account
                                </motion.p>
                            </div>
                        </div>
                        <div>
                            <motion.img className="hidden lg:block" initial={{ opacity: 0, y: 100, rotateZ: 5 }}
                                        animate={{ opacity: 1, y: 0, rotateZ: 0}} src={LoginImg} alt="Login"/>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
};

export default Login;