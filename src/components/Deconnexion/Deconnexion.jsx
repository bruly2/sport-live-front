import Button from "../Button/Button";
import { useContext } from "react";
import { ConnectedContext } from "../../utils/context/ConnectedProvider";
import { Link } from "react-router-dom";
Link;
import Popup from "reactjs-popup";
import { IoIosClose } from "react-icons/io";
import "./deconnexion.scss";

const Deconnexion = () => {
    const { logout } = useContext(ConnectedContext);

    return (
        <>
            <Popup
                trigger={<button> Déconnexion</button>}
                position="left center"
                modal={true}
            >
                {(close) => (
                    <div>
                        <h2>
                            Etes vous sur de vouloir vous déconnecter&nbsp;?
                        </h2>
                        <Button
                            type={"button"}
                            className={"close"}
                            onClick={close}
                            ariaLabel={"Close"}
                        >
                            <span>
                                <IoIosClose />
                            </span>
                        </Button>
                        <div id="popin-deco">
                            <Button
                                type={"button"}
                                className={"btn-secondary"}
                                onClick={close}
                            >
                                Non
                            </Button>
                            <Button
                                type={"button"}
                                className={"btn-primary-2"}
                                onClick={logout}
                            >
                                <Link to="/">Oui</Link>
                            </Button>
                        </div>
                    </div>
                )}
            </Popup>
        </>
    );
};
export default Deconnexion;
