import { useContext } from "react";
import { ConnectedContext } from "../../utils/context/ConnectedProvider";
import LogoSportLive from "../../assets/img/sport-live.png";
import Deconnexion from "../../components/Deconnexion/Deconnexion";
import "./header.scss";

const Header: React.FC = () => {
    const { connected } = useContext(ConnectedContext);

    return (
        <>
            <header>
                <nav
                    role="navigation"
                    aria-label="main navigation"
                    className={connected ? "connected" : ""}
                    // Erreur TS avec le ternaire dessous
                    // className={connected && "connected"}
                >
                    <div>
                        <a href="/accueil.html">
                            <img src={LogoSportLive} alt="" />
                        </a>
                        <a href="/accueil.html">
                            <p>Sport Live</p>
                        </a>
                    </div>
                    {connected && <Deconnexion />}
                </nav>
            </header>
        </>
    );
};

export default Header;
