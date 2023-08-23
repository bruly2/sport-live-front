import Button from "../Button/Button";
import { IoIosClose } from "react-icons/io";

import "./poll.scss";

const Poll = ({ closeBigCard }) => {
    return (
        <>
            <article id="poll">
                <h1>Poll</h1>
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
                    <li>choix</li>
                    <li>choix</li>
                    <li>choix</li>
                    <li>choix</li>
                </ul>
                <Button type={"button"} className={"btn-primary-2"}>
                    Voter
                </Button>
            </article>
        </>
    );
};
export default Poll;
