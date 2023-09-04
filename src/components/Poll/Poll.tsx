/* eslint-disable react-hooks/exhaustive-deps */
import "./poll.scss";
import { useState, useEffect } from "react";
import Authentication from "../../utils/authentication/Authentication";
import { getCookieString } from "../../utils/authentication/Authentication";
import PollElement from "../PollElement/PollElement";
import Button from "../Button/Button";
import { IoIosClose } from "react-icons/io";
import LoaderText from "../../layout/Loader/LoaderText";

type PollProps = {
    closeBigCard: () => void;
};

const Poll: React.FC<PollProps> = ({ closeBigCard }) => {
    const [displayQuestionPoll, setDisplayQuestionPoll] = useState<string>(
        "Aucun sondage pour le moment"
    );
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const token = getCookieString("token");

    // Init Fetch
    useEffect(() => {
        allQuestionsFetch();
    }, []);

    // FETCH Questions
    const allQuestionsFetch = async () => {
        try {
            setIsLoading(true);
            const response = await fetch(
                `${import.meta.env.VITE_API_BASE_URL}/polls/1`,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            const resultQuestion = await response.json();
            setDisplayQuestionPoll(resultQuestion.content);
            setIsLoading(false);
        } catch (error) {
            console.error("❌ Erreur Questions :" + error);
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

                {isLoading ? (
                    <p
                        style={{
                            height: 36,
                            textAlign: "left",
                            margin: "0 40px 20px 20px",
                        }}
                    >
                        <LoaderText />
                    </p>
                ) : (
                    <h2>{displayQuestionPoll}</h2>
                )}

                <PollElement />
            </article>
        </Authentication>
    );
};
export default Poll;
