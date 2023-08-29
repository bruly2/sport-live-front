import { Link } from "react-router-dom";
import "./footer.scss";

const Footer = () => {
    return (
        <footer>
            <hr />
            <nav role="navigation" aria-label="footer navigation">
                <Link to="/donnees-personnelles">Données personnelles</Link> |
                <Link to="/mentions-legales">Mentions légales</Link> |
                <Link to="/contact">Contact</Link>
                {/* Ci-dessous à supprimer */}|{" "}
                <Link to="/inscription">Inscription</Link>|{" "}
                <Link to="/connexion">Connexion</Link>
            </nav>
        </footer>
    );
};

export default Footer;
