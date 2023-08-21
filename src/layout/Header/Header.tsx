import LogoSportLive from "../../assets/img/sport-live.png";
import "./header.scss";
import { Link } from "react-router-dom";
const Header = () => {
    return (
        <>
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
        </>
    );
};

export default Header;
