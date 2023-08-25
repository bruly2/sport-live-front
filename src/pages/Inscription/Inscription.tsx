import { useForm } from "react-hook-form";
import "./inscription.scss";
import Button from "../../components/Button/Button";

const Inscription = () => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors, isSubmitSuccessful },
    } = useForm({ mode: "onTouched" });
    const onSubmit = (data) => console.log(data.pseudo);
    return (
        <>
            <h1>Création d'un compte</h1>
            <h2>En 30 secondes seulement</h2>
            <form className="connexion" onSubmit={handleSubmit(onSubmit)}>
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
                    <span className="error-form">{errors.alias.message}</span>
                )}

                {/* PRENOM */}
                <label htmlFor="prenom">Prénom</label>
                <input
                    type="text"
                    placeholder="Prénom"
                    {...register("prenom", {
                        required: "Prénom obligatoire",
                    })}
                />
                {errors.prenom && (
                    <span className="error-form">{errors.prenom.message}</span>
                )}

                {/* NOM */}
                <label htmlFor="nom">Nom</label>
                <input
                    type="text"
                    placeholder="nom"
                    {...register("nom", {
                        required: "Nom obligatoire",
                    })}
                />
                {errors.nom && (
                    <span className="error-form">{errors.nom.message}</span>
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
                    <span className="error-form">{errors.email.message}</span>
                )}

                {/* Role 
                TODO : A compléter automatiquement */}
                <label htmlFor="role">Role</label>
                <select
                    disabled
                    {...register("role", {
                        required: "Role obligatoire",
                    })}
                >
                    <option value="user" selected>
                        User
                    </option>
                    <option value="admin">Admin</option>
                </select>

                {/* MOT DE PASSE
                TODO : Compléter la vérif password */}
                <label htmlFor="password">Mot de passe</label>
                <input
                    type="password"
                    placeholder="mot de passe"
                    {...register("password", {
                        required: "password obligatoire",
                    })}
                />
                {errors.password && (
                    <span className="error-form">
                        {errors.password.message}
                    </span>
                )}

                {/* CONFIRME MOT DE PASSE
                TODO : Compléter la vérif password */}
                <label htmlFor="passwordVerif">Confirmer le mot de passe</label>
                <input
                    type="password"
                    placeholder="Confirmer"
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
                {isSubmitSuccessful && <h1>{watch("pseudo")}</h1>}
            </form>
        </>
    );
};
export default Inscription;
