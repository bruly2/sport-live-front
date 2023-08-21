import { Link } from "react-router-dom";
import "./footer.scss";

const Footer = () => {
    return (
        <footer>
            <hr />
            <nav>
                <Link to="/donnees-personnelles">Données personnelles</Link>
                <Link to="/mentions-legales">Mentions légales</Link>
                <Link to="/contact">Contact</Link>
            </nav>
        </footer>
    );
};

export default Footer;
