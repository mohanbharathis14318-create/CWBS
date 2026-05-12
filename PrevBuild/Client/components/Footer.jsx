// Import modules
import { motion } from "motion/react"

const Footer = () => {
    return (
        <>
            <footer className="h-screen grid justifu-center items-end mx-10">
                <div>
                    <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
                                transition={{ duration: 0.5, ease: 'easeInOut' }}
                                className="flex justify-between items-center mx-2">
                        <p>
                            @2025 Namma Construction. All Rights Reserved
                        </p>
                        <p>
                            Crafted @ Pixel In | U | One
                        </p>
                    </motion.div>
                    <motion.div initial={{ y: 100, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
                                transition={{ duration: 0.6, ease: 'easeInOut' }}
                                className="h-6 bg-[#202020] rounded-t">

                    </motion.div>
                </div>
            </footer>
        </>
    );
};

export default Footer;