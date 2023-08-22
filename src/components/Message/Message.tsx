import "./message.scss";

const Message = () => {
    return (
        <>
            <main id="message">
                <h2>
                    Surveillez l'écran du stade pouv voir votre message en
                    direct&nbsp;!
                </h2>
                <form>
                    <textarea
                        name="message-content"
                        id="message-content"
                        placeholder="Allez Monaco !!"
                    ></textarea>
                    <button type="submit" className="btn-primary-2">
                        Valider
                    </button>
                </form>
            </main>
        </>
    );
};
export default Message;
