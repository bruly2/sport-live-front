import { useForm } from "react-hook-form";
import "./connexion.scss";
import Button from "../../components/Button/Button";

const Connexion = () => {
    // FETCH
    const inscriptionFetch = async (data) => {
        console.log(data);
        try {
            const response = await fetch(
                "http://localhost:8000/api/users/register",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data),
                }
            );
            const result = await response.json();
            console.log(
                `🥳🥳 Utilisateur : ${result.firstname} enregistré en BDD !! 🥳🥳`
            );
        } catch (error) {
            console.error("❌ Erreur ❌");
        }
    };

    // FORM
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors, isSubmitSuccessful },
    } = useForm({ mode: "onTouched" });
    const onSubmit = (data) => inscriptionFetch(data);

    return (
        <>
            {isSubmitSuccessful ? (
                <>
                    <h1>{watch("alias")}, votre compte est crée 🥳</h1>
                    <h2>TODO : Redirection vers la page de Connexion</h2>
                    {/* TODO Redirection vers la page connexion */}
                </>
            ) : (
                <>
                    <h1>Connexion</h1>
                    <h2>Participer à votre événement</h2>
                    <form
                        className="connexion"
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        {/* PSEUDO */}
                        <label htmlFor="alias">Pseudo</label>
                        <input
                            type="text"
                            placeholder="pseudo"
                            {...register("alias", {
                                required: "Champs obligatoire",
                            })}
                        />
                        {errors.alias && (
                            <span className="error-form">
                                {errors.alias.message}
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
                            Valider
                        </Button>
                    </form>
                </>
            )}
        </>
    );
};
export default Connexion;
