 import "./Connexion.scss";
import Button from "../../components/Button/Button"
const Connexion = () => {
    return (
        <>
          <div>
            <h1>Connexion</h1>
            <p>Participer à votre évènement</p>
    
            <form action="">
              
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" />
              
                <label htmlFor="password">Mot de passe</label>
                <input type="password" id="password" name="password"/>

                <Button type={"submit"} className={"btn-primary-2"}>
                            se connecter
            </Button>
            </form>
          </div>

          <div className ="form-compte">
            <p>Pas encore de compte </p>
            <Button type={"submit"} className={"btn-primary-2"}>
                            creer un compte
            </Button>
          </div>
        </>
      );
};
export default Connexion;
