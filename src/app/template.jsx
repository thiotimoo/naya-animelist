    "use client"
    import { motion } from "framer-motion"

    const variants = {
        hidden: { opacity: 0, x: 0, y: 50 },
        enter: { opacity: 1, x: 0, y: 0 },
    }

    export default function Template({ children }) {
        return (
            <motion.main
                variants={variants}
                initial="hidden"
                animate="enter"
                transition={{ type: "tween" }}
                className='flex flex-1 flex-col max-w-screen-lg mx-auto w-full' style={{ flex: 1 }}
            >
                {children}
            </motion.main>
        )
    }