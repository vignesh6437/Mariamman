import { motion } from "framer-motion";

const MotionDiv = ({ children, ...props }) => {
  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeInUp}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default MotionDiv;
