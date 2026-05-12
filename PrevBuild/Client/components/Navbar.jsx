// Import Modules
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { HomeIcon } from 'lucide-react';

const Navbar = () => {
    return (
        <div>
            <nav className="flex justify-between items-center text-2xl h-20 bg-[#E5E9F0] px-10 py-4">
                <motion.div initial={{ opacity: 0, y: -100 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} >
                    <Link to={'/'}>
                        Core<span className="text-[#005bea]">Build</span>
                    </Link>
                </motion.div>

                <motion.div initial={{ opacity: 0, y: -100 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} >
                    <Link className="flex items-center gap-2 text-[#005BEA] text-xl border border-[#6392E5] bg-[#D9E1EF] hover:bg-[#C9D8F3] p-2 rounded"
                          to={'/'}>
                        <HomeIcon />
                        Home
                    </Link>
                </motion.div>
            </nav>
        </div>
    );
};

export default Navbar;