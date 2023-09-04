/* eslint-disable react-hooks/exhaustive-deps */
import "./pollelement.scss";
import { useState, useEffect } from "react";
import { getCookieString } from "../../utils/authentication/Authentication";
import { useForm, SubmitHandler } from "react-hook-form";
import Loader from "../../layout/Loader/Loader";
import { motion } from "framer-motion";
import Button from "../Button/Button";
import LoaderText from "../../layout/Loader/LoaderText";

interface IAnswers {
    id: number;
    content: string;
    ranking: number;
}

type Inputs = {
    answerId: number;
};

const PollElement: React.FC = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [displayAnswersPoll, setDisplayAnswersPoll] = useState<IAnswers[]>(
        []
    );
    const [sommeRankings, setSommeRankings] = useState<number>(0);
    const token = getCookieString("token");

    useEffect(() => {
        allAnswersFetch();
    }, []);

    // FETCH Réponses
    const allAnswersFetch = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(
                `${import.meta.env.VITE_API_BASE_URL}/polls/1/answers`,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            const resultAnswer = await response.json();
            setDisplayAnswersPoll(resultAnswer.answers);
            // Calcul %
            const sumRankings = calcPoll(resultAnswer.answers);
            setSommeRankings(sumRankings);
            setIsLoading(false);
        } catch (error) {
            console.error("❌ Erreur Réponses :" + error);
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
        formState: { isSubmitting, isSubmitSuccessful },
    } = useForm<Inputs>();
    // TODO Fetch useEffect ou useCallback
    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        try {
            const response = await fetch(
                `${import.meta.env.VITE_API_BASE_URL}/answers/${
                    data.answerId
                }/increment`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify(data),
                }
            );
            if (response.ok) {
                return allAnswersFetch();
            }
        } catch (error) {
            console.error("❌ Erreur " + error);
        }
    };

    return (
        <>
            {/* 1. Formulaire initial 🔽 */}
            {!isSubmitSuccessful ? (
                isLoading ? (
                    <Loader />
                ) : (
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <fieldset>
                            {displayAnswersPoll.map((answer) => (
                                <motion.label
                                    // transition={{ delay: `0.${answer.id}` }}
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.98 }}
                                    key={answer.id}
                                >
                                    <motion.input
                                        type="radio"
                                        value={answer.id}
                                        {...register("answerId")}
                                    />
                                    {answer.content}
                                </motion.label>
                            ))}
                        </fieldset>
                        {isSubmitting ? (
                            <LoaderText />
                        ) : (
                            <Button type={"submit"} className={"btn-primary-2"}>
                                Voter
                            </Button>
                        )}
                    </form>
                )
            ) : (
                // 2. Formulaire envoyé 🔽
                <form>
                    <fieldset>
                        {displayAnswersPoll.map((answer) => (
                            <>
                                <label key={answer.id} className="label-send">
                                    <motion.input
                                        type="radio"
                                        {...register("answerId")}
                                    />
                                    {answer.content}
                                    {/* Affichage des % 🔽 */}
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="poll-row"
                                    >
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{
                                                width: `${(
                                                    (answer.ranking /
                                                        sommeRankings) *
                                                    100
                                                ).toFixed(0)}%`,
                                            }}
                                            transition={{
                                                duration: 0.6,
                                                ease: "easeOut",
                                            }}
                                            className="drawbar"
                                        >
                                            .
                                        </motion.div>
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{
                                                duration: 0.6,
                                            }}
                                            className="pourcent"
                                        >
                                            {(
                                                (answer.ranking /
                                                    sommeRankings) *
                                                100
                                            ).toFixed(0)}
                                            %
                                        </motion.div>
                                    </motion.div>
                                </label>
                            </>
                        ))}
                    </fieldset>
                    <p className="total-vote">
                        {sommeRankings} vote{sommeRankings > 1 && "s"}
                    </p>
                </form>
            )}
        </>
    );
};
export default PollElement;
