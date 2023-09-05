import { useForm } from "react-hook-form";
import "./inscription.scss";
import Button from "../../components/Button/Button";
import {Navigate} from "react-router-dom";
import { motion } from "framer-motion";
import { useState, useCallback, useEffect } from "react";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";

interface FormData {
    alias: string;
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    passwordVerif: string;
}

const Inscription: React.FC = () => {
    // FETCH
    const inscriptionFetch = async (data: FormData) => {
        try {
            const response = await fetch(
                `${import.meta.env.VITE_API_BASE_URL}/users/register`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data),
                }
            );
            if (response.ok) {
                // const result = await response.json();
                return null;
            }
        } catch (error) {
            console.error("❌ Erreur :" + error);
        }
    };

    // FORM
    const {
        register,
        handleSubmit,
        watch,
        setFocus,
        formState: { errors, isSubmitSuccessful },
    } = useForm<FormData>({ mode: "onTouched" });
    const onSubmit = useCallback((data: FormData) => {
        inscriptionFetch(data);
    }, []);

    //  Focus
    useEffect(() => {
        setFocus("alias");
    }, [setFocus]);

    // MDP Visibilté
    const [passwordVisibility, setPasswordVisibility] =
        useState<boolean>(false);

    const handleVisibiltyPassword = () => {
        setPasswordVisibility(!passwordVisibility);
    };

    // MOTION
    const xInput = {
        initial: { x: -20, opacity: 0 },
        animate: { x: 0, opacity: 1 },
    };

    const animateError = {
        initial: { x: -50 },
        animate: { x: 0 },
    };

    return (
        <>
            {isSubmitSuccessful ? (
                <main className="inscription-success">
                    {/* <h2>{watch("alias")}, votre compte est crée 🥳</h2>
                    <p>Cliquez ici pour vous connecter&nbsp;:</p>  */}
                    <Navigate to="/connexion" state={{pseudo: watch("alias")}} />
                    {/* TODO Redirection vers la page connexion */}
                </main>
            ) : (
                <main>
                    <h1>Création d'un compte</h1>
                    <h2>En 30 secondes seulement</h2>
                    <form
                        className="connexion"
                        onSubmit={handleSubmit(onSubmit)}
                        noValidate
                    >
                        {/* PSEUDO */}
                        <label className="hidden" htmlFor="alias">
                            Pseudo
                        </label>
                        <motion.input
                            variants={xInput}
                            initial="initial"
                            animate="animate"
                            transition={{ delay: 0.1 }}
                            type="text"
                            placeholder="Pseudo"
                            aria-invalid={errors.alias ? "true" : "false"}
                            {...register("alias", {
                                required: "Champs obligatoire",
                                pattern: {
                                    value: /^[A-Za-z0-9]+$/,
                                    message:
                                        "Le pseudo ne doit contenir que des lettres et/ou des chiffres",
                                },
                                minLength: {
                                    value: 3,
                                    message: "3 carateres minimum",
                                },
                            })}
                        />
                        {errors.alias && (
                            <motion.span
                                variants={animateError}
                                initial="initial"
                                animate="animate"
                                className="error-form"
                                role="alert"
                            >
                                {errors.alias.message}
                            </motion.span>
                        )}

                        {/* PRENOM */}
                        <label className="hidden" htmlFor="firstname">
                            Prénom
                        </label>
                        <motion.input
                            variants={xInput}
                            initial="initial"
                            animate="animate"
                            transition={{ delay: 0.2 }}
                            type="text"
                            aria-invalid={errors.firstname ? "true" : "false"}
                            placeholder="Prénom"
                            {...register("firstname", {
                                required: "Prénom obligatoire",
                                pattern: {
                                    value: /^[A-Za-z-]*$/,
                                    message:
                                        "Le prénom ne doit contenir que des lettres",
                                },
                            })}
                        />
                        {errors.firstname && (
                            <motion.span
                                variants={animateError}
                                initial="initial"
                                animate="animate"
                                className="error-form"
                                role="alert"
                            >
                                {errors.firstname.message}
                            </motion.span>
                        )}

                        {/* NOM */}
                        <label className="hidden" htmlFor="lastname">
                            Nom
                        </label>
                        <motion.input
                            variants={xInput}
                            initial="initial"
                            animate="animate"
                            transition={{ delay: 0.3 }}
                            type="text"
                            placeholder="Nom"
                            aria-invalid={errors.lastname ? "true" : "false"}
                            {...register("lastname", {
                                required: "Nom obligatoire",
                                pattern: {
                                    value: /^[A-Za-z-]*$/,
                                    message:
                                        "Le nom ne doit contenir que des lettres",
                                },
                            })}
                        />
                        {errors.lastname && (
                            <motion.span
                                variants={animateError}
                                initial="initial"
                                animate="animate"
                                className="error-form"
                                role="alert"
                            >
                                {errors.lastname.message}
                            </motion.span>
                        )}

                        {/* Email */}
                        <label className="hidden" htmlFor="nom">
                            Email
                        </label>
                        <motion.input
                            variants={xInput}
                            initial="initial"
                            animate="animate"
                            transition={{ delay: 0.4 }}
                            type="email"
                            placeholder="Email"
                            aria-invalid={errors.email ? "true" : "false"}
                            {...register("email", {
                                required: "Email obligatoire",
                                pattern: {
                                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                    message: "Adresse email invalide",
                                },
                            })}
                        />
                        {errors.email && (
                            <motion.span
                                variants={animateError}
                                initial="initial"
                                animate="animate"
                                className="error-form"
                                role="alert"
                            >
                                {errors.email.message}
                            </motion.span>
                        )}

                        {/* MOT DE PASSE */}
                        <fieldset>
                            <label className="hidden" htmlFor="password">
                                Mot de passe
                            </label>
                            <motion.input
                                variants={xInput}
                                initial="initial"
                                animate="animate"
                                transition={{ delay: 0.5 }}
                                type={passwordVisibility ? "text" : "password"}
                                aria-invalid={
                                    errors.password ? "true" : "false"
                                }
                                placeholder="Mot de passe"
                                {...register("password", {
                                    required: "Mot de passe obligatoire",
                                    minLength: {
                                        value: 6,
                                        message: "6 carateres minimum",
                                    },
                                    pattern: {
                                        value: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$/,
                                        message:
                                            "Majuscule, nombre et caractère spécial obligatoire",
                                    },
                                })}
                            />
                            <a
                                onClick={handleVisibiltyPassword}
                                className="password-visibilty"
                            >
                                {passwordVisibility ? (
                                    <BsEyeSlashFill />
                                ) : (
                                    <BsEyeFill />
                                )}
                            </a>
                            {errors.password && (
                                <motion.span
                                    variants={animateError}
                                    initial="initial"
                                    animate="animate"
                                    className="error-form"
                                    role="alert"
                                >
                                    {errors.password.message}
                                </motion.span>
                            )}
                        </fieldset>

                        {/* CONFIRME MOT DE PASSE */}
                        <fieldset>
                            <label className="hidden" htmlFor="passwordVerif">
                                Confirmer le mot de passe
                            </label>
                            <motion.input
                                variants={xInput}
                                initial="initial"
                                animate="animate"
                                transition={{ delay: 0.6 }}
                                type={passwordVisibility ? "text" : "password"}
                                placeholder="Confirmer votre mot de passe"
                                aria-invalid={
                                    errors.passwordVerif ? "true" : "false"
                                }
                                {...register("passwordVerif", {
                                    required: "Champs obligatoire",
                                    validate: (val) => {
                                        if (watch("password") != val) {
                                            return "Les mots de passe ne correspondent pas";
                                        }
                                    },
                                })}
                            />
                            <a
                                onClick={handleVisibiltyPassword}
                                className="password-visibilty"
                            >
                                {passwordVisibility ? (
                                    <BsEyeSlashFill />
                                ) : (
                                    <BsEyeFill />
                                )}
                            </a>
                            {errors.passwordVerif && (
                                <motion.span
                                    variants={animateError}
                                    initial="initial"
                                    animate="animate"
                                    className="error-form"
                                    role="alert"
                                >
                                    {errors.passwordVerif.message}
                                </motion.span>
                            )}
                        </fieldset>

                        <Button type={"submit"} className={"btn-primary-2"}>
                            Valider
                        </Button>
                    </form>
                </main>
            )}
        </>
    );
};
export default Inscription;
