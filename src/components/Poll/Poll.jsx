import Button from "../Button/Button";
import { IoIosClose } from "react-icons/io";
import PollElement from "../PollElement/PollElement";
import "./poll.scss";
import { useEffect } from "react";

const Poll = ({ closeBigCard }) => {
    // Ferme la Card au clavier
    useEffect(() => {
        const close = (e) => {
            if (e.keyCode === 27) {
                closeBigCard();
            }
        };
        window.addEventListener("keydown", close);
    }, [closeBigCard]);
    return (
        <>
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
        </>
    );
};
export default Poll;
