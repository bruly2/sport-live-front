import { useState, useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import "./connexion.scss";
import Button from "../../components/Button/Button";
import Loader from "../../layout/Loader/Loader";
import { motion } from "framer-motion";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";

interface FormData {
    username: string;
    password: string;
}

const Connexion: React.FC = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    // FORM + FETCH
    // TODO Ajouter le catch d'erreur

    const {
        register,
        handleSubmit,
        setError,
        setFocus,
        formState: { errors },
    } = useForm<FormData>({ mode: "onTouched" });

    const onSubmit = useCallback(async (data: FormData) => {
        setIsLoading(true);
        const response = await fetch(
            `${import.meta.env.VITE_API_BASE_URL}/login_check`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            }
        );
        const result = await response.json();
        if (response.status === 200) {
            console.log(`Connexion réussie !! 🥳🥳`);
            localStorage.setItem("token", result.token);
            setIsLoading(false);
            navigate("/hub");
        } else {
            setIsLoading(false);
            setError("root.serverError", {
                type: "server",
                message:
                    "L'identifiant ou mot de passe sont incorrects, merci de vous reconnecter",
            });
        }
    }, []);

    // Password Visibilté
    const [passwordVisibility, setPasswordVisibility] =
        useState<boolean>(false);

    const handleVisibiltyPassword = () => {
        setPasswordVisibility(!passwordVisibility);
    };

    //  Focus
    useEffect(() => {
        setFocus("username");
    }, [setFocus]);

    // Animation Erreurs
    const animateError = {
        initial: { x: -50 },
        animate: { x: 0 },
    };

    return (
        <>
            <h1>Connexion</h1>
            <h2>Participer à votre événement</h2>

            <main id="connexion">
                <motion.form
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="connexion"
                    onSubmit={handleSubmit(onSubmit)}
                    noValidate
                >
                    {isLoading ? (
                        <motion.div
                            className="loading"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                        >
                            <h2>Connexion en cours...</h2>
                            <Loader />
                        </motion.div>
                    ) : (
                        <div>
                            {errors.root?.serverError && (
                                <motion.p
                                    variants={animateError}
                                    initial="initial"
                                    animate="animate"
                                    className="error-form server"
                                >
                                    {errors.root.serverError.message}
                                </motion.p>
                            )}

                            {/* PSEUDO */}

                            <label className="hidden" htmlFor="username">
                                Email
                            </label>
                            <input
                                type="email"
                                aria-invalid={
                                    errors.username ? "true" : "false"
                                }
                                placeholder="Adresse email"
                                {...register("username", {
                                    required: "Champs obligatoire",
                                    pattern: {
                                        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                        message: "Adresse email invalide",
                                    },
                                })}
                            />
                            {errors.username && (
                                <motion.span
                                    variants={animateError}
                                    initial="initial"
                                    animate="animate"
                                    className="error-form"
                                    role="alert"
                                >
                                    {errors.username.message}
                                </motion.span>
                            )}

                            {/* MOT DE PASSE */}
                            <fieldset>
                                <label className="hidden" htmlFor="password">
                                    Mot de passe
                                </label>
                                <input
                                    type={
                                        passwordVisibility ? "text" : "password"
                                    }
                                    placeholder="Mot de passe"
                                    aria-invalid={
                                        errors.password ? "true" : "false"
                                    }
                                    {...register("password", {
                                        required: "Mot de passe obligatoire",
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

                            <Button type={"submit"} className={"btn-primary-2"}>
                                Se connecter
                            </Button>
                        </div>
                    )}
                </motion.form>
                <aside>
                    <h3>Pas encore de compte&nbsp;?</h3>
                    <Link to="/inscription">
                        <Button className={"btn-secondary"} type={"button"}>
                            Créer un compte
                        </Button>
                    </Link>
                </aside>
            </main>
        </>
    );
};
export default Connexion;
