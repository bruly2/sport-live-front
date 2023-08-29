import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import "./connexion.scss";
import Button from "../../components/Button/Button";
import Loader from "../../layout/Loader/Loader";
import { motion } from "framer-motion";

const Connexion = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    // FORM + FETCH
    // TODO Ajouter le catch d'erreur

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors },
    } = useForm({ mode: "onTouched" });

    const onSubmit = async (data) => {
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
        // response.headers.common.Authorization = `bearer ${result.token}`;
        if (response.status === 200) {
            console.log(`Connexion réussie !! 🥳🥳 Récupération du token :`);
            console.log(result.token);
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
                                <p className="error-form server">
                                    {errors.root.serverError.message}
                                </p>
                            )}

                            {/* PSEUDO */}

                            <label htmlFor="username">Email</label>
                            <input
                                type="email"
                                placeholder="Adresse email ?"
                                {...register("username", {
                                    required: "Champs obligatoire",
                                })}
                            />
                            {errors.username && (
                                <span className="error-form">
                                    {errors.username.message}
                                </span>
                            )}

                            {/* MOT DE PASSE */}
                            <label htmlFor="password">Mot de passe</label>
                            <input
                                type="password"
                                placeholder="mot de passe"
                                {...register("password", {
                                    required: "Mot de passe obligatoire",
                                })}
                            />
                            {errors.password && (
                                <span className="error-form">
                                    {errors.password.message}
                                </span>
                            )}

                            <Button type={"submit"} className={"btn-primary-2"}>
                                Se connecter
                            </Button>
                        </div>
                    )}
                </motion.form>
                <aside>
                    <h3>Pas encore de compte&nbsp;?</h3>
                    <Button className={"btn-secondary"} type={"button"}>
                        <Link to="/inscription">Créer un compte</Link>
                    </Button>
                </aside>
            </main>
        </>
    );
};
export default Connexion;
