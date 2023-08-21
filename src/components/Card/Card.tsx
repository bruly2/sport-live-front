import { Link } from "react-router-dom";
import "./Card.scss";

export const Card = ({ title, img }) => {
    return (
        <>
            <Link
                // ATTENTION A RENDRE LE LIEN DYNAMIQUE AVEC LE TITLE. BACKTIPS = BUG
                to="/hub/message"
                className="card"
                style={{ backgroundImage: `url( ${img} )` }}
            >
                {/* <h2>{title}</h2> */}
                <button className="btn-primary">{title}</button>
            </Link>
        </>
    );
};

export default Card;
