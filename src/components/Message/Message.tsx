import "./message.scss";
import { useState, useCallback } from "react";
import Button from "../Button/Button";
import { IoIosClose } from "react-icons/Io";

const Message = ({ closeBigCard }) => {
    const [textArea, setTextArea] = useState("");

    const isWriting = (e) => {
        setTextArea(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        checkForm();
    };

    // Vérification form
    const [errorForm, setErrorForm] = useState("");
    const [showConfirmation, setShowConfirmation] = useState(false);
    const checkForm = useCallback(() => {
        // Form vide
        if (textArea === "") {
            return setErrorForm("Tapez votre texte pour envoyer un message");
        }
        // Form trop court
        else if (textArea.length < 3) {
            return setErrorForm("Complete ton message");
        }

        // => Formulaire validé
        setShowConfirmation(true);
        console.log(textArea);
    }, [handleSubmit]);

    return (
        <>
            <article id="message">
                <Button
                    type={"button"}
                    className={"close"}
                    onClick={closeBigCard}
                >
                    <span>
                        <IoIosClose />
                    </span>
                </Button>
                <h2>
                    Surveillez l'écran du stade pour voir votre message en
                    direct&nbsp;!
                </h2>

                {!showConfirmation ? (
                    <form onSubmit={handleSubmit}>
                        <textarea
                            name="message-content"
                            id="message-content"
                            placeholder="Go Spurs Go !!"
                            value={textArea}
                            onChange={(e) => isWriting(e)}
                        ></textarea>
                        <p className="errorform">{errorForm}</p>
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
