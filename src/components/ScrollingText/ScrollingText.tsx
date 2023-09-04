/* eslint-disable react-hooks/exhaustive-deps */
import "./scrollingtext.scss";
import { useState, useRef, useEffect, useContext } from "react";
import { motion } from "framer-motion";
import { getCookieString } from "../../utils/authentication/Authentication";
import { MessageContext, IMesssage } from "../../utils/context/MessageProvider";

//  TODO : Durée d'affichage des msg en fonction de la longueur du tableau

const ScrollingText: React.FC = () => {
    const { displayMessage, setDisplayMessage } = useContext(MessageContext);
    const token = getCookieString("token");

    useEffect(() => {
        allMessagesFetch();
    }, []);

    const allMessagesFetch = async () => {
        try {
            const response = await fetch(
                `${import.meta.env.VITE_API_BASE_URL}/messages`,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            const result = await response.json();
            setDisplayMessage(result);
        } catch (error) {
            console.error("❌ Erreur ❌");
        }
    };

    // Calcul la longueur de l'écran en px
    const [windowSize, setWindowSize] = useState<number>(0);
    useEffect(() => {
        const windowsWidth = window.innerWidth;
        setWindowSize(windowsWidth);
    }, []);

    // Calcul la longueur du msg en px
    const [divMessageWidth, setDivMessageWidth] = useState<number>(0);
    const messageElement = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const messageSize = messageElement.current?.getBoundingClientRect();
        if (messageSize) {
            setDivMessageWidth(Math.round(messageSize.width));
        }
    }, [displayMessage]);

    return (
        <>
            <motion.div id="scrolling">
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
                        duration: 30,
                        ease: "linear",
                    }}
                    ref={messageElement}
                >
                    {displayMessage.map((message: IMesssage) => (
                        <span key={message.id}>{message.content}</span>
                    ))}
                </motion.div>
            </motion.div>
        </>
    );
};
export default ScrollingText;
