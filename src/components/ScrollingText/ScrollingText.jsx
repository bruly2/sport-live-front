import "./scrollingtext.scss";
import { useState, useRef, useEffect, useCallback } from "react";
import Button from "../Button/Button";
import { motion } from "framer-motion";

//  TODO : Durée d'affichage des msg en fonction de la longueur du tableau

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
    const [displayMessage, setDisplayMessage] = useState(messages);

    // Affichage du 1er message
    const createMessage = useCallback(() => {
        setDisplayMessage(messages[1].content);
    }, []);

    // Calcul la longueur de l'écran en px
    const [windowSize, setWindowSize] = useState(0);
    useEffect(() => {
        const windowsWidth = window.innerWidth;
        setWindowSize(windowsWidth);
    }, []);

    // Calcul la longueur du msg en px
    const [divMessageWidth, setDivMessageWidth] = useState(0);
    const messageElement = useRef(null);
    useEffect(() => {
        let messageSize = messageElement.current.getBoundingClientRect();
        setDivMessageWidth(Math.round(messageSize.width));
    }, [displayMessage]);

    return (
        <>
            <div id="scrolling">
                <motion.div
                    className="scrolling-text"
                    style={{ marginRight: `-${divMessageWidth}px` }}
                    animate={{
                        transform: `translate3d(-${
                            windowSize + divMessageWidth
                        }px,0,0)`,
                    }}
                    transition={{
                        repeat: Infinity,
                        duration: 40,
                        ease: "linear",
                    }}
                    ref={messageElement}
                >
                    {displayMessage.map((message, key) => (
                        <span key={key}>{message.content}</span>
                    ))}
                </motion.div>
            </div>
        </>
    );
};
export default ScrollingText;
