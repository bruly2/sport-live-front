import "./message.scss";
import Button from "../Button/Button";
import { IoIosClose } from "react-icons/io";
import { motion } from "framer-motion";
import Authentication from "../../utils/authentication/Authentication";
import { useForm, SubmitHandler } from "react-hook-form";
import { useCallback, useEffect } from "react";

type IMessage = {
    closeBigCard: () => void;
};

interface FormData {
    messageContent: string;
}

const Message: React.FC<IMessage> = ({ closeBigCard }) => {
    // TODO vérifier les caractères espaces
    // TODO répeter l'animation à chaque fois que l'erreur est jouée

    // Form
    const {
        register,
        handleSubmit,
        watch,
        setFocus,
        formState: { errors, isSubmitSuccessful },
    } = useForm<FormData>();
    const onSubmit: SubmitHandler<FormData> = useCallback(
        (data) => console.log(data),
        []
    );

    // Focus TextArea
    useEffect(() => {
        setFocus("messageContent");
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
                        <h3>{watch("messageContent")}</h3>
                    </>
                ) : (
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <label className="hidden" htmlFor="messageContent">
                            Entrez votre message
                        </label>
                        <textarea
                            placeholder="Go spurs go !!"
                            {...register("messageContent", {
                                required: "Champs obligatoire",
                            })}
                            aria-invalid={
                                errors.messageContent ? "true" : "false"
                            }
                            onKeyDown={handleKeyDown}
                        />
                        {errors.messageContent && (
                            <motion.p
                                initial={{ x: -50 }}
                                animate={{ x: 0 }}
                                className="error-form"
                                role="alert"
                            >
                                {errors.messageContent.message}
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
