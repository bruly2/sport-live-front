/* eslint-disable react-hooks/exhaustive-deps */
import "./poll.scss";
import { useState, useEffect } from "react";
import Authentication from "../../utils/authentication/Authentication";
import { getCookieString } from "../../utils/authentication/Authentication";
import PollElement from "../PollElement/PollElement";
import LoaderText from "../../layout/Loader/LoaderText";
import { motion } from "framer-motion";
import Button from "../Button/Button";
import { IoIosClose } from "react-icons/io";
import { MdOutlineNavigateNext, MdOutlineNavigateBefore } from "react-icons/md";

type PollProps = {
    closeBigCard: () => void;
};

const Poll: React.FC<PollProps> = ({ closeBigCard }) => {
    const token = getCookieString("token");
    const [displayPoll, setDisplayPoll] = useState<number>(1);
    const [nbTotalPoll, setNbTotalPoll] = useState<number>(0);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [displayQuestionPoll, setDisplayQuestionPoll] = useState<string>(
        "Aucun sondage pour le moment"
    );

    // Init Fetch
    useEffect(() => {
        allQuestionFetch();
    }, []);

    useEffect(() => {
        oneQuestionFetch();
    }, [displayPoll]);

    // Fetch nb Questions dispo pour affichage nav flechée
    const allQuestionFetch = async () => {
        try {
            const response = await fetch(
                `${import.meta.env.VITE_API_BASE_URL}/polls`,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            if (response.ok) {
                let nbPoll = await response.json();
                nbPoll = nbPoll.length;
                return setNbTotalPoll(nbPoll);
            } else {
                console.error("❌ Erreur :");
            }
        } catch (error) {
            console.error("❌ Erreur Questions :" + error);
        }
    };

    // TODO revoir l'affichage d'erreur du fetch
    // FETCH Affichage des questions
    const oneQuestionFetch = async () => {
        try {
            setIsLoading(true);
            const response = await fetch(
                `${import.meta.env.VITE_API_BASE_URL}/polls/${displayPoll}`,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            if (response.ok) {
                const resultQuestion = await response.json();
                setDisplayQuestionPoll(resultQuestion.content);
                setIsLoading(false);
            } else {
                console.error("❌ Erreur :");
                return setIsLoading(false);
            }
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
                    <>
                        <h2>{displayQuestionPoll}</h2>
                        {/* Btn précent si sup à 0 */}
                        {nbTotalPoll > 0 && displayPoll > 1 && (
                            <Button
                                type={"button"}
                                className={"arrow-nav prev"}
                                onClick={() => setDisplayPoll(displayPoll - 1)}
                            >
                                <motion.span
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                >
                                    <MdOutlineNavigateBefore />
                                </motion.span>
                            </Button>
                        )}
                        {/* Btn suivant si inf à nbTotalPoll */}
                        {nbTotalPoll > 0 && displayPoll < nbTotalPoll && (
                            <Button
                                type={"button"}
                                className={"arrow-nav next"}
                                onClick={() => setDisplayPoll(displayPoll + 1)}
                            >
                                <motion.span
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                >
                                    <MdOutlineNavigateNext />
                                </motion.span>
                            </Button>
                        )}
                    </>
                )}

                <PollElement
                    displayPoll={displayPoll}
                />
            </article>
        </Authentication>
    );
};
export default Poll;
