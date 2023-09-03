import { Link } from "react-router-dom";
import "./footer.scss";

const Footer: React.FC = () => {
    return (
        <footer>
            <hr />
            <nav role="navigation" aria-label="footer navigation">
                <Link to="/donnees-personnelles">Données personnelles</Link>
                <span className="separator">|</span>
                <Link to="/mentions-legales">Mentions légales</Link>
                <span className="separator">|</span>
                <Link to="/contact">Contact</Link>
            </nav>
        </footer>
    );
};

export default Footer;
