// Import Modules
import { motion } from 'motion/react';

const Loader = () => {
    return (
        <>
            <section className="flex items-center justify-center">
                <motion.div animate={{ opacity: [ 0, 1, 0 ] ,scale: [ 0, 1, 0 ], x: [ 100, 0 , -100 ] }}
                            transition={{ delay: 0.2, repeat: Infinity }}
                            className="w-4 h-4 bg-[#005bea] rounded">

                </motion.div>
                <motion.div animate={{ opacity: [ 0, 1, 0 ] ,scale: [ 0, 1, 0 ], x: [ 100, 0 , -100 ] }}
                            transition={{ delay: 0.4, repeat: Infinity }}
                            className="w-4 h-4 bg-[#005bea] rounded">

                </motion.div>
                <motion.div animate={{ opacity: [ 0, 1, 0 ] ,scale: [ 0, 1, 0 ], x: [ 100, 0 , -100 ] }}
                            transition={{ delay: 0.6, repeat: Infinity }}
                            className="w-4 h-4 bg-[#005bea] rounded">

                </motion.div>
            </section>
        </>
    );
};

export default Loader;