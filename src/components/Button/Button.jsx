import "./button.scss";

const Button = ({ type, className, content, onClick }) => {
    return (
        <button type={type} className={className} onClick={onClick}>
            {content}
        </button>
    );
};
export default Button;
