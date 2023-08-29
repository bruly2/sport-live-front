import { useForm } from "react-hook-form";
import "./inscription.scss";
import Button from "../../components/Button/Button";
import { Link } from "react-router-dom";

const Inscription = () => {

    // FETCH
    const inscriptionFetch = async (data) => {
        try {
            const response = await fetch(
                `${import.meta.env.VITE_API_BASE_URL}/users/register`, {
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
  const onSubmit = (data) => {
    inscriptionFetch(data);
  };

  return (
    <>
      {isSubmitSuccessful ? (
        <>
          <h1>{watch("alias")}, votre compte est crée 🥳</h1>
          <p>Cliquez ici pour vous connecter</p>
          <Button className={"btn-primary-2"} type={"button"}>
            <Link to="/connexion">Connexion</Link>
          </Button>
          {/* TODO Redirection vers la page connexion */}
        </>
      ) : (
     
        <main>
          <h1>Création d'un compte</h1>
          <h2>En 30 secondes seulement</h2>
          <form className="connexion" onSubmit={handleSubmit(onSubmit)}>
            {/* PSEUDO */}
            <label htmlFor="alias">Pseudo</label>
            <input
              type="text"
              placeholder="pseudo"
              aria-invalid={errors.alias ? "true" : "false"}
              {...register("alias", {
                required: "Champs obligatoire",
                minLength: {
                  value: 3,
                  message: "3 carateres minimum",
                },
              })}
            />
            {errors.alias && (
              <span className="error-form" role="alerte">{errors.alias.message}</span>
            )}


            {/* PRENOM */}
            <label htmlFor="firstname">Prénom</label>
            <input
              type="text"
              aria-invalid={errors.firstname ? "true" : "false"}
              placeholder="Prénom"
              {...register("firstname", {
                required: "Prénom obligatoire",
                pattern: {
                  value: /^[A-Za-z\s]+$/,
                  message: "Le prénom ne doit contenir que des lettres",
                },
              })}
            />
            {errors.firstname && (
              <span className="error-form" role="alert">{errors.firstname.message}</span>
            )}

            {/* NOM */}
            <label htmlFor="lastname">Nom</label>
            <input
              type="text"
              placeholder="nom"
              aria-invalid={errors.nom ? "true" : "false"}
              {...register("lastname", {
                required: "Nom obligatoire",
                pattern: {
                  value: /^[A-Za-z\s]+$/,
                  message: "Le nom ne doit contenir que des lettres",
                },
              })}
            />
            {errors.lastname && (
              <span className="error-form" role="alert">{errors.lastname.message}</span>
            )}

            {/* Email 
                TODO : Compléter la vérif email */}
            <label htmlFor="nom">Email</label>
            <input
              type="email"
              placeholder="email"
              aria-invalid={errors.email ? "true" : "false"}
              {...register("email", {
                required: "Email obligatoire",
              })}
            />
            {errors.email && (
              <span className="error-form" role="alerte">{errors.email.message}</span>
            )}

            {/* MOT DE PASSE
                TODO : Compléter la vérif password */}
            <label htmlFor="password">Mot de passe</label>
            <input
              type="password"
              aria-invalid={errors.password ? "true" : "false"}
              placeholder="mot de passe"
              {...register("password", {
                required: "Mot de passe obligatoire",
              })}
            />
            {errors.password && (
              <span className="error-form" role="alert">{errors.password.message}</span>
            )}

            {/* CONFIRME MOT DE PASSE */}
            <label htmlFor="passwordVerif">Confirmer le mot de passe</label>
            <input
              type="password"
              placeholder="Confirmer votre mot de passe"
              aria-invalid={errors.passwordVerif ? "true" : "false"}
              {...register("passwordVerif", {
                required: "Champs obligatoire",
                validate: (val) => {
                  if (watch("password") != val) {
                    return "Les mots de passe ne correspondent pas";
                  }
                },
              })}
            />
            {errors.passwordVerif && (
              <span className="error-form" role="alert">{errors.passwordVerif.message}</span>
            )}

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
