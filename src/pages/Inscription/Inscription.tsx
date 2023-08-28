import "./Inscription.scss";
import Button from "../../components/Button/Button";
import { Formik, Form, ErrorMessage, Field } from "formik";
import * as Yup from "yup";

const Inscription = () => {
  const initialValues = {
    email: "",
    prenom: "",
    nom: "",
    password: "",
    alias: "",
  };

  const onSubmit = (values) => {
    console.log("onSubmit", values);
  };

  const validationSchema = Yup.object({
    email: Yup.string().required('Champs requis').email("Adresse email invalide"),
    prenom: Yup.string().required('Champs requis'),
    nom: Yup.string().required('Champs requis'),
    password: Yup.string().required('Champs requis'),
    passwordConfirmation: Yup.string().required('Champs requis'),
    alias: Yup.string().required('Champs requis'),
  });

  return (
    <div>
      <h1>Création d'un compte utilisateur</h1>
      <p>En 30 secondes seulement</p>
      <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
        {() => ( 
          <Form>
            <label htmlFor="email">Email</label>
            <Field type="text" id="email" name="email" />
            <div className="error"><ErrorMessage name="email" component="span"/></div>

            <label htmlFor="prenom">Prénom</label>
            <Field type="text" id="prenom" name="prenom" />
            <div className="error"><ErrorMessage name="prenom" component="span"/></div>

            <label htmlFor="nom">Nom</label>
            <Field type="text" id="nom" name="nom" />
            <div className="error"><ErrorMessage name="nom" component="span"/></div>

            <label htmlFor="password">Création de mot de passe</label>
            <Field type="password" id="password" name="password" />
            <div className="error"><ErrorMessage name="password" component="span"/></div>

            <label htmlFor="passwordConfirmation">Confirmation de mot de passe</label>
            <Field type="password" id="passwordConfirmation" name="passwordConfirmation" />
            <div className="error"><ErrorMessage name="passwordConfirmation" component="span"/></div>
            
            <label htmlFor="alias">spedo</label>
            <Field type="text" id="alias" name="alias" />
            <div className="error"><ErrorMessage name="alias" component="span"/></div>

            <Button type="submit" className="btn-primary-2">
              Créer mon compte
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Inscription;

