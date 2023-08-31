import Button from "../Button/Button";
import { IoIosClose } from "react-icons/io";
import PollElement from "../PollElement/PollElement";
import "./poll.scss";
import Authentication from "../../utils/authentication/Authentication";
import { useState, useEffect } from "react";

type PollProps = {
    closeBigCard: () => void;
};

const Poll: React.FC<PollProps> = ({ closeBigCard }) => {
    const [displayQuestionPoll, setDisplayQuestionPoll] = useState<string>(
        "Aucun sondage pour le moment"
    );

    const token: string | null = localStorage.getItem("token");

    // Init Fetch
    useEffect(() => {
        allQuestionsFetch();
    }, []);

    // FETCH Questions
    const allQuestionsFetch = async () => {
        try {
            const response = await fetch(
                `${import.meta.env.VITE_API_BASE_URL}/polls`,
                { headers: { Authorization: `bearer ${token}` } }
            );
            const resultQuestion = await response.json();
            // console.log(result);
            setDisplayQuestionPoll(resultQuestion[0].content);
        } catch (error) {
            console.error("❌ Erreur Questions ❌");
        }
    };

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

                <h2>{displayQuestionPoll}</h2>

                <ul>
                    <PollElement />
                </ul>
            </article>
        </Authentication>
    );
};
export default Poll;
