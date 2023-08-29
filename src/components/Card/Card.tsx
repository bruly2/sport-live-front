import "./Card.scss";
import Button from "../Button/Button";
import Message from "../Message/Message";
import Poll from "../Poll/Poll";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useCallback, FC } from "react";

type IProps = {
    title: string;
    img: string;
    id: number;
};

export const Card: FC<IProps> = ({ title, img, id }) => {
    const [showBigCard, setShowBigCard] = useState<boolean>(false);

    // ! BUG SCROLL HAUT DE PAGE EN MOBILE

    // Affiche la Card en grand + scroll en haut de page pour le mobile
    const handleCard = useCallback(() => {
        setShowBigCard(true);
        // if (window.innerWidth < 768) {
        //     window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
        // }
    }, []);

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
                    onClick={handleCard}
                    layoutId={id}
                >
                    <Button className={"btn-primary"}>{title}</Button>
                </motion.div>
            ) : (
                <AnimatePresence>
                    <motion.div
                        style={{ flexGrow: 10 }}
                        role="dialog"
                        className="card card-open card-mobile"
                        layoutId={id}
                    >
                        {/* Ouverture de la CARD ID 1 = Message */}
                        {id === 1 ? (
                            <Message
                                closeBigCard={() => setShowBigCard(false)}
                            />
                        ) : (
                            //  Ouverture de la CARD ID 2 = Sondage
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
