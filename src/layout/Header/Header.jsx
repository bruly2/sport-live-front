import { useContext } from "react";
import LogoSportLive from "../../assets/img/sport-live.png";
import "./header.scss";
import { Link } from "react-router-dom";
import Button from "../../components/Button/Button";
import { ConnectedContext } from "../../utils/context/ConnectedProvider";

const Header = () => {
    const { connected, logout } = useContext(ConnectedContext);

    return (
        <>
            <header>
                {connected ? (
                    <nav
                        className="connected"
                        role="navigation"
                        aria-label="main navigation"
                    >
                        <div>
                            <Link to="/">
                                <Button
                                    type={"button"}
                                    className={"btn-secondary"}
                                    onClick={logout}
                                >
                                    Déconnexion
                                </Button>
                            </Link>
                        </div>
                    </nav>
                ) : (
                    <nav role="navigation" aria-label="main navigation">
                        <div>
                            <Link to="/">
                                <img src={LogoSportLive} alt="" />
                            </Link>
                            <Link to="/">
                                <p>Sport Live</p>
                            </Link>
                        </div>
                    </nav>
                )}
            </header>
        </>
    );
};

export default Header;
