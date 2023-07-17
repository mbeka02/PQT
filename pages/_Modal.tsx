import { motion } from "framer-motion";

//animation
const dropIn = {
  hidden: {
    y: "-100vh",
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      type: "spring",
      damping: 35,
      stiffness: 300,
    },
  },
  exit: {
    y: "-100vh",
    opacity: 0,
  },
};
const Backdrop = ({ children }: { children: React.ReactNode }) => {
  return (
    <motion.div
      onClick={(e) => e.stopPropagation}
      className="backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {children}
    </motion.div>
  );
};
const PlayerModal = ({ children }: { children: React.ReactNode }) => {
  return (
    <Backdrop>
      <motion.div
        className="   m-auto grid h-screen w-full md:h-5/6 md:w-4/5  rounded bg-white  p-4 lg:h-xxl   lg:w-1/2 z-10 relative"
        variants={dropIn}
      >
        {children}
      </motion.div>
    </Backdrop>
  );
};

export default PlayerModal;
