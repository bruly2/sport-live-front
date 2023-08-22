import "./scrollingtext.scss";
import { useState } from "react";
import Button from "../Button/Button";

const messages = [
    {
        user: "Christophe",
        content: "1er message",
    },
    {
        user: "Kévin",
        content: "2e message",
    },
    {
        user: "Thomas",
        content: "3e message",
    },
    {
        user: "Bruno",
        content: "4e message",
    },
];

const ScrollingText = () => {
    const [displayMessage, setDisplayMessage] = useState([]);

    // Affichage du 1er message
    const createMessage = () => {
        setDisplayMessage(messages[0].content);
    };

    return (
        <>
            <div id="scrolling-text">
                <span>{displayMessage}</span>
            </div>

            {/* Bouton provisoire à supprimer */}
            {displayMessage !== [] && (
                <div style={{ margin: "-10px 0 20px" }}>
                    <Button
                        className={"btn-secondary"}
                        onClick={createMessage}
                        content={"Afficher un message"}
                    />
                </div>
            )}
        </>
    );
};
export default ScrollingText;
