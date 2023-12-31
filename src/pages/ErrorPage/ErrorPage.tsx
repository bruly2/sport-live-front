import img404 from "../../assets/img/error-page.png";
import "./errorpage.scss";
import { motion } from "framer-motion";

const ErrorPage: React.FC = () => {
    return (
        <main id="error-page">
            <h1>Demi-tour&nbsp;!</h1>
            <motion.img
                src={img404}
                animate={{
                    scale: [1, 1.1, 1],
                    x: [0, -50, 0],
                    y: [0, 25, -25, 0],
                    rotate: [0, 10, -10, 0],
                }}
                transition={{ duration: 3, repeat: Infinity }}
                className="error-img"
            />
        </main>
    );
};
export default ErrorPage;
