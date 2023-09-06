import img404 from "../../assets/img/error-page.png";
import "./errorpage.scss";

const ErrorPage: React.FC = () => {
    return (
        <main id="error-page">
            <h1>Demi-tour&nbsp;!</h1>
            <img src={img404} className="error-img" />
        </main>
    );
};
export default ErrorPage;
