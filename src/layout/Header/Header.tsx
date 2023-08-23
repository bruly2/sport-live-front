import { useState } from "react";
import LogoSportLive from "../../assets/img/sport-live.png";
import "./header.scss";
import { Link } from "react-router-dom";
import Button from "../../components/Button/Button";

const Header = () => {
    // VARIABLE DE CONNEXION PROVISOIRE :
    const [connected, setConnected] = useState(true);

    return (
        <>
            <header>
                {/* // BOUTON DE CONNEXION PROVISOIRE : */}
                <a
                    href="#"
                    onClick={() => {
                        setConnected(!connected);
                    }}
                >
                    Toggle provisoire de connexion
                </a>
                {connected ? (
                    //    1.NAV Visiteur
                    <nav>
                        <div>
                            <Link to="/">
                                <img src={LogoSportLive} alt="" />
                            </Link>
                            <Link to="/">
                                <p>Sport Live</p>
                            </Link>
                        </div>
                    </nav>
                ) : (
                    //    2.NAV Utilisateur
                    <nav className="connected">
                        <div>
                            <Link to="/">
                                <Button
                                    type={"button"}
                                    className={"btn-secondary"}
                                >
                                    Déconnexion
                                </Button>
                            </Link>
                        </div>
                    </nav>
                )}
            </header>
        </>
    );
};

export default Header;
