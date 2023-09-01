import "./pollelement.scss";
import Button from "../Button/Button";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useForm, SubmitHandler, formState } from "react-hook-form";

// TODO 2. Récup les % du sondage + faire l'affichage

interface IAnswers {
    id: number;
    content: string;
    rank: number;
}

type Inputs = {
    selectAnswer: string;
};

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

    const {
        register,
        handleSubmit,
        formState: { isSubmitSuccessful },
    } = useForm<Inputs>();
    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        console.log(data.selectAnswer);

        try {
            const response = await fetch(
                `${import.meta.env.VITE_API_BASE_URL}/answers/2/increment`,
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
            console.log(result);
        } catch (error) {
            console.error("❌ Erreur ❌");
        }
    };

    return (
        <>
            {isSubmitSuccessful ? (
                <>
                    <h1>A voté !😉</h1>
                    <form>
                        {displayAnswersPoll[0].ranking +
                            displayAnswersPoll[1].ranking +
                            displayAnswersPoll[2].ranking +
                            displayAnswersPoll[3].ranking}
                        <fieldset>
                            {displayAnswersPoll.map((answer) => (
                                <>
                                    {/* <label key={answer.id}>
                                        <motion.input
                                            type="input"
                                            key={answer.id}
                                            transition={{
                                                delay: `0.${answer.id}`,
                                            }}
                                            initial={{ y: 20, opacity: 0 }}
                                            animate={{ y: 0, opacity: 1 }}
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.98 }}
                                            value={answer.content}
                                            {...register("selectAnswer")}
                                        /> */}
                                    <p>{answer.content}</p>
                                    <p>{answer.ranking}</p>
                                    {/* </label> */}
                                </>
                            ))}
                        </fieldset>
                    </form>
                </>
            ) : (
                <form onSubmit={handleSubmit(onSubmit)}>
                    <fieldset>
                        {displayAnswersPoll.map((answer) => (
                            <>
                                <label key={answer.id}>
                                    <motion.input
                                        type="radio"
                                        key={answer.id}
                                        transition={{ delay: `0.${answer.id}` }}
                                        initial={{ y: 20, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.98 }}
                                        value={answer.content}
                                        {...register("selectAnswer")}
                                    />
                                    {answer.content}
                                </label>
                            </>
                        ))}
                    </fieldset>

                    <Button type={"submit"} className={"btn-primary-2"}>
                        Voter
                    </Button>
                </form>
            )}
        </>
    );
};
export default PollElement;
