// Import Modules
import { motion } from 'motion/react';

const Loading_Screen = () => {
    return (
        <>
            <section className="w-full h-screen flex items-center justify-center">
                <motion.div animate={{ opacity: [ 0, 1, 0 ] ,scale: [ 0, 1, 0 ], x: [ 100, 0 , -100 ] }}
                            transition={{ delay: 0.2, repeat: Infinity }}
                            className="w-20 h-20 bg-[#005bea] rounded">

                </motion.div>
                <motion.div animate={{ opacity: [ 0, 1, 0 ] ,scale: [ 0, 1, 0 ], x: [ 100, 0 , -100 ] }}
                            transition={{ delay: 0.4, repeat: Infinity }}
                            className="w-20 h-20 bg-[#005bea] rounded">

                </motion.div>
                <motion.div animate={{ opacity: [ 0, 1, 0 ] ,scale: [ 0, 1, 0 ], x: [ 100, 0 , -100 ] }}
                            transition={{ delay: 0.6, repeat: Infinity }}
                            className="w-20 h-20 bg-[#005bea] rounded">

                </motion.div>
            </section>
        </>
    );
};

export default Loading_Screen;