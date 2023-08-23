import "./button.scss";
import { motion } from "framer-motion";

const Button = ({ type, className, onClick, ariaLabel, children }) => {
    return (
        <motion.button
            type={type}
            className={className}
            aria-label={ariaLabel}
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
