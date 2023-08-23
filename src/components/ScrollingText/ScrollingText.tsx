import "./scrollingtext.scss";
import { useState, useRef, useEffect } from "react";
import Button from "../Button/Button";
import { motion } from "framer-motion";

const messages = [
    {
        user: "Christophe",
        content: "1er message",
    },
    {
        user: "Kévin",
        content: "2e message qui est beaucoup beaucoup beaucoup plus long",
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
    const [displayMessage, setDisplayMessage] = useState([messages[0].content]);

    // Affichage du 1er message
    const createMessage = () => {
        setDisplayMessage(messages[1].content);
    };

    const windowsSize = window.innerWidth;

    // Calcul la longueur du msg en px
    const [divMessageWidth, setDivMessageWidth] = useState(0);
    const messageElement = useRef(null);
    useEffect(() => {
        let messageSize = messageElement.current.getBoundingClientRect();
        setDivMessageWidth(Math.round(messageSize.width));
    }, [displayMessage]);

    return (
        <>
            {/* TODO Durée d'affichage des msg en fonction de la longuer */}
            <div id="scrolling">
                <motion.div
                    className="scrolling-text"
                    style={{ marginRight: `-${divMessageWidth}px` }}
                    animate={{
                        transform: `translate3d(-${
                            windowsSize + divMessageWidth
                        }px,0,0)`,
                    }}
                    transition={{ repeat: Infinity, duration: 15 }}
                    ref={messageElement}
                >
                    {displayMessage}
                </motion.div>
            </div>

            {/* Bouton provisoire à supprimer */}
            {displayMessage && (
                <div style={{ margin: "-10px 0 20px" }}>
                    <Button className={"btn-secondary"} onClick={createMessage}>
                        Afficher le 2e message
                    </Button>
                </div>
            )}
        </>
    );
};
export default ScrollingText;
