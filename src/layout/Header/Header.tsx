import { useContext } from "react";
import LogoSportLive from "../../assets/img/sport-live.png";
import "./header.scss";
import { Link } from "react-router-dom";
import { ConnectedContext } from "../../utils/context/ConnectedProvider";
import Deconnexion from "../../components/Deconnexion/Deconnexion";

const Header: React.FC = () => {
    const { connected } = useContext(ConnectedContext);

    return (
        <>
            <header>
                <nav
                    role="navigation"
                    aria-label="main navigation"
                    className={connected && "connected"}
                >
                    <div>
                        <Link to="/">
                            <img src={LogoSportLive} alt="" />
                        </Link>
                        <Link to="/">
                            <p>Sport Live</p>
                        </Link>
                    </div>
                    {connected && <Deconnexion />}
                </nav>
            </header>
        </>
    );
};

export default Header;
