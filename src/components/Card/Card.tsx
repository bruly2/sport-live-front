import { Link } from "react-router-dom";
import "./Card.scss";
import Button from "../Button/Button";

export const Card = ({ title, img, link }) => {
    return (
        <>
            <Link
                to={link}
                className="card"
                style={{ backgroundImage: `url( ${img} )` }}
            >
                <Button className={"btn-primary"} content={title} />
            </Link>
        </>
    );
};

export default Card;
