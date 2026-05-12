// Import Modules
import { Link } from "react-router-dom";
import { motion } from "motion/react"


const Auth_Btn = () => {
    return (
        <div>
            {/*Auth Btn*/}
            <div className="h-screen flex flex-col justify-center items-center">
                <motion.p initial={{ opacity: 0, y: 100 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: 0.2 }}
                          className="head text-2xl md:text-6xl lg:text-6xl">
                    Innovate Your Environment
                </motion.p>

                <motion.div initial={{ y: -100, z: 1000, opacity: 0 }} animate={{ y: 0, z: 0, opacity: 1 }} transition={{ delay: 0.4 }}
                            className="w-full border-b border-[#6392E5] mx-10 my-4">

                </motion.div>


                <div className="flex my-6">
                    <motion.div initial={{ opacity: 0, y: 100 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
                        <Link className="text-[#005BEA] text-xl border border-[#6392E5] bg-[#D9E1EF] hover:bg-[#C9D8F3] mx-2 px-6 py-4 rounded" to={'/auth/register'}>
                            Register
                        </Link>
                    </motion.div>
                    <motion.div initial={{ opacity: 0, y: 100 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}>
                        <Link className="text-[#005BEA] text-xl border border-[#6392E5] bg-[#D9E1EF] hover:bg-[#C9D8F3] mx-2 px-6 py-4 rounded" to={'/auth/login'}>
                            Login
                        </Link>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default Auth_Btn;