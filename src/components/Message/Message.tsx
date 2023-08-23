import "./message.scss";
import { useState, useCallback, useEffect, useRef } from "react";
import Button from "../Button/Button";
import { IoIosClose } from "react-icons/io";
import { motion } from "framer-motion";

const Message = ({ closeBigCard }) => {
    // TODO vérifier les caractères espaces
    // TODO répeter l'animation à chaque fois que l'erreur est jouée

    const [textArea, setTextArea] = useState("");

    const isWriting = (e) => {
        setTextArea(e.target.value);
    };

    // Focus le form
    const textAreaElement = useRef(null);
    useEffect(() => {
        textAreaElement.current.focus();
    }, []);

    // Validation du formulaire (btn valider)
    const handleSubmit = (e) => {
        e.preventDefault();
        checkForm();
    };

    // La touche Entrée envoi le form
    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            checkForm();
        }
    };

    // Vérification form
    const [errorForm, setErrorForm] = useState("");
    const [showConfirmation, setShowConfirmation] = useState(false);
    const checkForm = useCallback(() => {
        // Form vide
        if (textArea === "") {
            return setErrorForm("Votre message est vide");
        }
        // Form trop court
        else if (textArea.length < 3) {
            return setErrorForm("Votre message est trop court");
        }

        // => Formulaire validé
        setShowConfirmation(true);
        console.log(textArea);
    }, [handleSubmit]);

    // Fermeture de la Card au clavier
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
            <article id="message">
                <Button
                    type={"button"}
                    className={"close"}
                    onClick={closeBigCard}
                    ariaLabel={"Close"}
                >
                    <span>
                        <IoIosClose />
                    </span>
                </Button>
                <h2>
                    Surveillez l'écran du stade pour voir votre message
                    affiché&nbsp;!
                </h2>

                {!showConfirmation ? (
                    <form onSubmit={handleSubmit}>
                        <textarea
                            name="message-content"
                            id="message-content"
                            ref={textAreaElement}
                            placeholder="Go Spurs Go !!"
                            value={textArea}
                            onChange={isWriting}
                            onKeyDown={handleKeyDown}
                        ></textarea>
                        <motion.p
                            animate={{ x: [-15, 15, -15] }}
                            transition={{
                                repeat: 3,
                                duration: 0.2,
                                bounce: 0.6,
                            }}
                            className="errorform"
                        >
                            {errorForm}
                        </motion.p>
                        <Button type={"submit"} className={"btn-primary-2"}>
                            Valider
                        </Button>
                    </form>
                ) : (
                    <>
                        <h1>Message envoyé</h1>
                        <h3>{textArea}</h3>
                    </>
                )}
            </article>
        </>
    );
};
export default Message;
