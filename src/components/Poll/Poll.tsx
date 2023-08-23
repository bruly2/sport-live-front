import Button from "../Button/Button";
import { IoIosClose } from "react-icons/Io";
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
            </article>
        </>
    );
};
export default Poll;
