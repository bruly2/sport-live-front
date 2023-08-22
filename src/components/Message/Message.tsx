import "./message.scss";
import { useState } from "react";

const Message = () => {
    const [textArea, setTextArea] = useState("");

    const [errorForm, setErrorForm] = useState("");

    const [showConfirmation, setShowConfirmation] = useState(false);

    const handleTest = (e) => {
        setTextArea(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        checkForm();
    };

    const checkForm = () => {
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
    };

    return (
        <>
            <main id="message">
                <h2>
                    Surveillez l'écran du stade pouv voir votre message en
                    direct&nbsp;!
                </h2>

                {!showConfirmation ? (
                    <form onSubmit={handleSubmit}>
                        <textarea
                            name="message-content"
                            id="message-content"
                            placeholder="Allez Monaco !!"
                            value={textArea}
                            onChange={(e) => handleTest(e)}
                        ></textarea>
                        <p className="errorform">{errorForm}</p>
                        <button type="submit" className="btn-primary-2">
                            Valider
                        </button>
                    </form>
                ) : (
                    <h1>Message envoyé</h1>
                )}
            </main>
        </>
    );
};
export default Message;
