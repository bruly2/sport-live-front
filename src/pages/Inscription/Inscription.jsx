import { useForm } from "react-hook-form";
import "./inscription.scss";
import Button from "../../components/Button/Button";

const Inscription = () => {
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
                    <h1>Création d'un compte</h1>
                    <h2>En 30 secondes seulement</h2>
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
                                minLength: {
                                    value: 3,
                                    message: "3 carateres minium",
                                },
                            })}
                        />
                        {errors.alias && (
                            <span className="error-form">
                                {errors.alias.message}
                            </span>
                        )}

                        {/* PRENOM */}
                        <label htmlFor="firstname">Prénom</label>
                        <input
                            type="text"
                            placeholder="Prénom"
                            {...register("firstname", {
                                required: "Prénom obligatoire",
                            })}
                        />
                        {errors.firstname && (
                            <span className="error-form">
                                {errors.firstname.message}
                            </span>
                        )}

                        {/* NOM */}
                        <label htmlFor="lastname">Nom</label>
                        <input
                            type="text"
                            placeholder="nom"
                            {...register("lastname", {
                                required: "Nom obligatoire",
                            })}
                        />
                        {errors.lastname && (
                            <span className="error-form">
                                {errors.lastname.message}
                            </span>
                        )}

                        {/* Email 
                TODO : Compléter la vérif email */}
                        <label htmlFor="nom">Email</label>
                        <input
                            type="email"
                            placeholder="email"
                            {...register("email", {
                                required: "Email obligatoire",
                            })}
                        />
                        {errors.email && (
                            <span className="error-form">
                                {errors.email.message}
                            </span>
                        )}

                        {/* ROLE 
                TODO : A compléter automatiquement */}
                        <label htmlFor="role">Role</label>
                        <select
                            disabled
                            defaultValue="user"
                            {...register("role")}
                        >
                            <option value="user">User</option>
                            <option value="admin">Admin</option>
                        </select>

                        {/* MOT DE PASSE
                TODO : Compléter la vérif password */}
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

                        {/* CONFIRME MOT DE PASSE
                TODO : Compléter la vérif password */}
                        <label htmlFor="passwordVerif">
                            Confirmer le mot de passe
                        </label>
                        <input
                            type="password"
                            placeholder="Confirmer votre mot de passe"
                            {...register("passwordVerif", {
                                required: "Champs obligatoire",
                            })}
                        />
                        {errors.passwordVerif && (
                            <span className="error-form">
                                {errors.passwordVerif.message}
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
export default Inscription;
