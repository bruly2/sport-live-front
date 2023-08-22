import { Link } from "react-router-dom";
import "./Card.scss";
import Button from "../Button/Button";
import Message from "../Message/Message";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

import styled from "styled-components";

export const Card = ({ title, img }) => {
    const [showBigCard, setShowBigCard] = useState(false);

    return (
        <>
            {!showBigCard ? (
                <div
                    style={{
                        backgroundImage: `url( ${img} )`,
                    }}
                    className="card"
                    onClick={() => setShowBigCard(true)}
                >
                    <Button className={"btn-primary"} content={title} />
                </div>
            ) : (
                <div
                    style={{ flexGrow: 10 }}
                    className="card"
                    onClick={() => setShowBigCard(false)}
                >
                    <p>test</p>
                    {/* <Message /> */}
                </div>
            )}

            {/* <motion.div
                // to={link}
                className="card"
                layoutId={id}
                style={{ backgroundImage: `url( ${img} )` }}
                onClick={() => setCardId(id)}
            >
                <Button className={"btn-primary"} content={title} />
            </motion.div> */}
            {/* <AnimatePresence>
                {cardId && (
                    <motion.div
                        layoutId={cardId}
                        onClick={() => setCardId(null)}
                        className="card open"
                    >
                        test
                    </motion.div>
                )}
            </AnimatePresence> */}
        </>
    );
};

export default Card;
