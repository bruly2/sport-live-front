import "./Inscription.scss";
import Button from "../../components/Button/Button";

const Inscription = () => {
  
  return (
    <>
      <div>
        <h1>création d'un compte utilisateur</h1>
        <p>En 30 seconde seulement</p>

        <form action="">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" />

          <label htmlFor="prenom">Prénom</label>
          <input type="text" id="prenom" name="prenom" />

          <label htmlFor="nom">Nom</label>
          <input type="text" id="nom" name="nom" />

          <label htmlFor="password">création mot de passe</label>
          <input type="password" id="password" name="password" />

          <label htmlFor="password">confirmation du mot de passe</label>
          <input type="password" id="password" name="passwor" />

          <Button type={"submit"} className={"btn-primary-2"}>
            creer mon compte
          </Button>
        </form>
      </div>
    </>
  );
};
export default Inscription;
