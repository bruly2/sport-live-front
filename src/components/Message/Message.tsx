/* eslint-disable react-hooks/exhaustive-deps */
import "./message.scss";
import { useCallback, useEffect, useContext } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import {
    getCookieString,
    getCookieNumber,
} from "../../utils/authentication/Authentication";
import Authentication from "../../utils/authentication/Authentication";
import { MessageContext } from "../../utils/context/MessageProvider";
import { motion } from "framer-motion";
import Button from "../Button/Button";
import { IoIosClose } from "react-icons/io";

type IMessage = {
    closeBigCard: () => void;
};

interface FormData {
    content: string;
    user_id: number;
}

const Message: React.FC<IMessage> = ({ closeBigCard }) => {
    // TODO vérifier les caractères espaces vides avant d'envoyer le form
    const { displayMessage, setDisplayMessage, allMessagesFetch } =
        useContext(MessageContext);
    const token: string | null = getCookieString("token");
    // parseInt pour corriger erreur TS
    const user_id: number = parseInt(getCookieNumber("user_id") || "0", 10);

    // Form
    const {
        register,
        handleSubmit,
        watch,
        setFocus,
        formState: { errors, isSubmitSuccessful },
    } = useForm<FormData>();

    // TODO Fetch en useEffect ?
    const onSubmit: SubmitHandler<FormData> = useCallback(async (data) => {
        try {
            const response: Response = await fetch(
                `${import.meta.env.VITE_API_BASE_URL}/messages`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify(data),
                }
            );
            if (response.ok) {
                setDisplayMessage(displayMessage);
                allMessagesFetch();
            }
        } catch (error) {
            console.error("❌ Erreur :" + error);
        }
    }, []);

    // Focus TextArea
    useEffect(() => {
        setFocus("content");
    }, [setFocus]);

    // Entrée envoi le form + Esc ferme la card
    const handleKeyDown = useCallback(
        (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
            if (e.key === "Enter") {
                handleSubmit(onSubmit)();
            }
            if (e.key === "Escape") {
                closeBigCard();
            }
        },
        []
    );

    return (
        <Authentication>
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
                {isSubmitSuccessful ? (
                    <>
                        <h1>Message envoyé</h1>
                        <h3>{watch("content")}</h3>
                    </>
                ) : (
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <input
                            type="number"
                            className="hidden"
                            value={user_id}
                            {...register("user_id")}
                        />
                        <label className="hidden" htmlFor="content">
                            Entrez votre message
                        </label>
                        <textarea
                            placeholder="Go spurs go !!"
                            {...register("content", {
                                required: "Champs obligatoire",
                            })}
                            aria-invalid={errors.content ? true : false}
                            onKeyDown={handleKeyDown}
                        />
                        {errors.content && (
                            <motion.p
                                initial={{ x: -50 }}
                                animate={{ x: 0 }}
                                className="error-form"
                                role="alert"
                            >
                                {errors.content.message}
                            </motion.p>
                        )}
                        <Button type={"submit"} className={"btn-primary-2"}>
                            Valider
                        </Button>
                    </form>
                )}
            </article>
        </Authentication>
    );
};
export default Message;
