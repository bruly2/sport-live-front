import Button from "../Button/Button";
import { IoIosClose } from "react-icons/io";
import PollElement from "../PollElement/PollElement";
import "./poll.scss";
import { useEffect, FC } from "react";
import Authentication from "../../utils/authentication/Authentication";

type IPoll = {
    closeBigCard: string;
};

const Poll: FC<IPoll> = ({ closeBigCard }) => {
    // Ferme la Card au clavier
    useEffect(() => {
        const close = (e: KeyboardEvent) => {
            if (e.keyCode === 27) {
                closeBigCard();
            }
        };
        window.addEventListener("keydown", close);
    }, [closeBigCard]);
    return (
        <Authentication>
            <article id="poll">
                <Button
                    type={"button"}
                    className={"close"}
                    onClick={closeBigCard}
                >
                    <span>
                        <IoIosClose />
                    </span>
                </Button>

                <h2>Posez votre question poour le sondage ?</h2>
                <ul>
                    <PollElement />
                </ul>
                <Button type={"button"} className={"btn-primary-2"}>
                    Voter
                </Button>
            </article>
        </Authentication>
    );
};
export default Poll;
