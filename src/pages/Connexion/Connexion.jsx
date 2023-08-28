import { useForm } from "react-hook-form";
// import { useNavigate } from "react-router-dom";
import "./connexion.scss";
import Button from "../../components/Button/Button";
import Loader from "../../layout/Loader/Loader";
import { useState } from "react";

const Connexion = () => {
    // const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);

    // FORM + FETCH
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isSubmitSuccessful },
    } = useForm({ mode: "onTouched" });

    const onSubmit = async (data) => {
        const response = await fetch("http://localhost:8000/api/login_check", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        const result = await response.json();
        if (response.status === 200) {
            setIsLoading(true);
            console.log(`Connexion réussie !! 🥳🥳 Récupération du token :`);
            console.log(result.token);
            localStorage.setItem("token", result.token);
            setIsLoading(false);
        } else {
            setError("root.serverError", {
                type: "server",
                message:
                    "Mauvais identifiant ou mot de passe, merci de vous reconnectez",
            });
        }
    };

    return (
        <>
            {isSubmitSuccessful ? (
                <>
                    {/* TODO Redirection vers le hub */}
                    {/* {navigate("/connexion")} */}
                    <h1>TODO : Redirection vers le HUB</h1>
                </>
            ) : (
                <>
                    <h1>Connexion</h1>
                    <h2>Participer à votre événement</h2>

                    {isLoading ? (
                        <Loader />
                    ) : (
                        <form
                            className="connexion"
                            onSubmit={handleSubmit(onSubmit)}
                        >
                            {errors.root?.serverError && (
                                <p className="error-form server">
                                    {errors.root.serverError.message}
                                </p>
                            )}

                            {/* PSEUDO */}

                            <label htmlFor="username">Pseudo</label>
                            <input
                                type="text"
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
                        </form>
                    )}
                </>
            )}
        </>
    );
};
export default Connexion;
