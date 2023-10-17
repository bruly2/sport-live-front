import { Link } from "react-router-dom";
import "./footer.scss";

const Footer: React.FC = () => {
    return (
        <footer>
            <hr />
            <nav role="navigation" aria-label="footer navigation">
                <span className="separator">|</span>
                <Link to="/mentions-legales">Mentions légales</Link>
                <span className="separator">|</span>
            </nav>
        </footer>
    );
};

export default Footer;
