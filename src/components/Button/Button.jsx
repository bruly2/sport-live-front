import "./button.scss";
import { motion } from "framer-motion";

const Button = ({ type, className, onClick, children }) => {
    return (
        <motion.button
            type={type}
            className={className}
            onClick={onClick}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.3 }}
        >
            {children}
        </motion.button>
    );
};
export default Button;
