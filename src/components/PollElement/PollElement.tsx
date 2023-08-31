import "./pollelement.scss";
import Button from "../Button/Button";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

interface IAnswers {
    id: number;
    content: string;
    rank: number;
}

const PollElement: React.FC = () => {
    const [displayAnswersPoll, setDisplayAnswersPoll] = useState<IAnswers[]>(
        []
    );

    const token: string | null = localStorage.getItem("token");

    useEffect(() => {
        allAnswersFetch();
    }, []);

    // FETCH Réponses
    const allAnswersFetch = async () => {
        try {
            const response = await fetch(
                `${import.meta.env.VITE_API_BASE_URL}/answers`,
                { headers: { Authorization: `bearer ${token}` } }
            );
            const resultAnswer = await response.json();
            setDisplayAnswersPoll(resultAnswer);
        } catch (error) {
            console.error("❌ Erreur Réponses❌");
        }
    };
    return (
        <>
            <form>
                <fieldset>
                    {displayAnswersPoll.map((answer) => (
                        <>
                            <label
                                htmlFor="selectAnswer"
                                className="hidden"
                                key={answer.id}
                            >
                                {answer.content}
                            </label>
                            <motion.input
                                type="button"
                                key={answer.id}
                                // transition={{ delay: `0.${answer.id}` }}
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.98 }}
                                value={answer.content}
                                name="selectAnswer"
                            />
                        </>
                    ))}
                </fieldset>
            </form>

            <Button type={"button"} className={"btn-primary-2"}>
                Voter
            </Button>
        </>
    );
};
export default PollElement;
