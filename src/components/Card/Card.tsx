import "./Card.scss";
import Button from "../Button/Button";
import Message from "../Message/Message";
import Poll from "../Poll/Poll";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export const Card = ({ title, img, id }) => {
    const [showBigCard, setShowBigCard] = useState(false);

    return (
        <>
            {!showBigCard ? (
                <motion.div
                    style={{
                        backgroundImage: `url( ${img} )`,
                    }}
                    // initial={{ x: 0 }}
                    // animate={{ x: 300 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ duration: 0.2 }}
                    className="card"
                    onClick={() => setShowBigCard(true)}
                    layoutId={id}
                >
                    <Button className={"btn-primary"}>{title}</Button>
                </motion.div>
            ) : (
                <AnimatePresence>
                    <motion.div
                        style={{ flexGrow: 10 }}
                        className="card card-open card-mobile"
                        layoutId={id}
                        // onClick={() => setShowBigCard(false)}
                    >
                        {/* <`${title}` /> */}
                        {id === 1 ? (
                            <Message
                                closeBigCard={() => setShowBigCard(false)}
                            />
                        ) : (
                            id === 2 && (
                                <Poll
                                    closeBigCard={() => setShowBigCard(false)}
                                />
                            )
                        )}
                    </motion.div>
                </AnimatePresence>
            )}
        </>
    );
};

export default Card;
