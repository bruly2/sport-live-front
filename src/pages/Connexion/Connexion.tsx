import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import "./connexion.scss";
import Button from "../../components/Button/Button";
import Loader from "../../layout/Loader/Loader";
import { motion } from "framer-motion";

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
        formState: { errors },
    } = useForm<FormData>({ mode: "onTouched" });

    const onSubmit = async (data: FormData) => {
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
    };

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
                            <label className="hidden" htmlFor="password">
                                Mot de passe
                            </label>
                            <input
                                type="password"
                                placeholder="Mot de passe"
                                aria-invalid={
                                    errors.password ? "true" : "false"
                                }
                                {...register("password", {
                                    required: "Mot de passe obligatoire",
                                })}
                            />
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
