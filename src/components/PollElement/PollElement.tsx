import "./pollelement.scss";
import Button from "../Button/Button";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

// TODO 2. Récup les % du sondage + faire l'affichage

interface IAnswers {
    id: number;
    content: string;
    ranking: number;
}

type Inputs = {
    answerId: number;
};

const PollElement: React.FC = () => {
    const [displayAnswersPoll, setDisplayAnswersPoll] = useState<IAnswers[]>(
        []
    );
    const [sommeRankings, setSommeRankings] = useState<number>(0);

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
            // Calcul %
            const sumRankings = calcPoll(resultAnswer);
            setSommeRankings(sumRankings);
        } catch (error) {
            console.error("❌ Erreur Réponses❌");
        }
    };

    const calcPoll = (resultAnswer: IAnswers[]) => {
        const sumRankings = resultAnswer.reduce(
            (acc, current) => acc + current.ranking,
            0
        );
        return sumRankings;
    };

    const {
        register,
        handleSubmit,
        formState: { isSubmitSuccessful },
    } = useForm<Inputs>();
    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        // console.log(data.answerId);

        try {
            const response = await fetch(
                `${import.meta.env.VITE_API_BASE_URL}/answers/${
                    data.answerId
                }/increment`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `bearer ${token}`,
                    },
                    body: JSON.stringify(data),
                }
            );
            const result = await response.json();
            allAnswersFetch();
            // console.log(result);
        } catch (error) {
            console.error("❌ Erreur ❌");
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <fieldset>
                    {displayAnswersPoll.map((answer) => (
                        <>
                            <label key={answer.id}>
                                <motion.input
                                    type="radio"
                                    // transition={{ delay: `0.${answer.id}` }}
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.98 }}
                                    value={answer.id}
                                    {...register("answerId")}
                                    className={
                                        isSubmitSuccessful ? "hidden" : ""
                                    }
                                />
                                {answer.content}
                                {isSubmitSuccessful && (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="test"
                                    >
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{
                                                width: `${
                                                    (answer.ranking /
                                                        sommeRankings) *
                                                    100
                                                }%`,
                                            }}
                                            transition={{
                                                duration: 0.8,
                                                ease: "easeOut",
                                            }}
                                            className="test2"
                                        >
                                            {(
                                                (answer.ranking /
                                                    sommeRankings) *
                                                100
                                            ).toFixed(0)}
                                            %
                                        </motion.div>
                                    </motion.div>
                                )}
                            </label>
                        </>
                    ))}
                </fieldset>
                {!isSubmitSuccessful && (
                    <Button type={"submit"} className={"btn-primary-2"}>
                        Voter
                    </Button>
                )}
            </form>
        </>
    );
};
export default PollElement;
