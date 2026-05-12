// Import Modules
import { motion } from "motion/react";
import { CircleArrowLeft } from 'lucide-react';
import { Link, useNavigate } from "react-router-dom";

const ProfilePage = (props) => {

    const navigate = useNavigate();

    return (
        <div>
            <section>
                <div className="border-box border-1 border-[#6392E5] bg-[#E5E9F0]">
                        <motion.div
                            initial={{ opacity: 0, y: 100 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{delay: 0.1 }}
                            className="head text-xl p-4">
                            Personal Information
                        </motion.div>
                        <motion.hr
                            initial={{ opacity: 0, y: 100 }}
                            animate={{ y: 0, opacity: 1 }}
                            className="border-[#6392E5]"/>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 mx-10 py-4 gap-4">
                        <motion.div initial={{ opacity: 0, y: 100 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{delay: 0.2 }}>
                            <span className="text-[#005BEA]">Username</span><br/>
                            { props.username }
                        </motion.div>

                        <motion.div initial={{ opacity: 0, y: 100 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{delay: 0.3 }}>
                            <span className="text-[#005BEA]">Email Address</span><br/>
                            { props.email }
                        </motion.div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 mx-10 py-4 gap-4">
                        <motion.div
                            initial={{ opacity: 0, y: 100 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{delay: 0.4 }}>
                            <span className="text-[#005BEA]">Phone</span><br/>
                            +91 { props.phone }
                        </motion.div>

                        <motion.div initial={{ opacity: 0, y: 100 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{delay: 0.5 }}>
                            <span className="text-[#005BEA]">Designation</span><br/>
                            { props.designation }
                        </motion.div>
                    </div>
                    <motion.hr
                        initial={{ opacity: 0, y: 100 }}
                        animate={{ y: 0, opacity: 1 }}
                        className="border-[#6392E5]"/>

                    <motion.div
                        initial={{ opacity: 0, y: 100 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{delay: 0.3}}
                        className="head text-xl p-4">
                        Address
                    </motion.div>
                    <motion.hr
                        initial={{ opacity: 0, y: 100 }}
                        animate={{ y: 0, opacity: 1 }}
                        className="border-[#6392E5]"/>

                    <div className="grid grid-cols-2 mx-10 py-4 gap-4">
                        <motion.div
                            initial={{ opacity: 0, y: 100 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{delay: 0.4 }}>
                            <span className="text-[#005BEA]">Country</span><br/>
                            India
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 100 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{delay: 0.5 }}>
                            <span className="text-[#005BEA]">Full Address</span><br/>
                            No. 123, Some Street, <br/>
                            Some State, Some District.
                        </motion.div>
                    </div>
                </div>

                <motion.div className="flex gap-4 justify-end items-center my-4">
                    <motion.div initial={{ opacity: 0, y: 100 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{delay: 0.6 }}>
                        <Link to={'/Profile-edit'}
                              className="text-[#005BEA]  text-xl border border-[#6392E5] bg-[#D9E1EF] hover:bg-[#C9D8F3] p-4 rounded">
                            <i className="bi bi-pencil-square p-2"></i>
                            Edit
                        </Link>
                    </motion.div>

                    <motion.button initial={{ opacity: 0, y: 100 }}
                                   animate={{ y: 0, opacity: 1 }}
                                   transition={{delay: 0.7 }}
                                   onClick={() => navigate("/app-area")}
                            className="flex gap-2 justify-center items-center text-[#005BEA]  text-xl border border-[#6392E5] bg-[#D9E1EF] hover:bg-[#C9D8F3] p-4 rounded">
                        <CircleArrowLeft />
                        Back
                    </motion.button>
                </motion.div>
            </section>
        </div>
    );
};

export default ProfilePage;