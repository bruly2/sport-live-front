import Event from "../../components/Event/Event";
import Card from "../../components/Card/Card";
import ScrollingText from "../../components/ScrollingText/ScrollingText";
import MessageJpg from "../../assets/img/message.jpg";
import SondageJpg from "../../assets/img/sondage.jpg";
import Authentication from "../../utils/authentication/Authentication";
import TransitionPage from "../../layout/TransitionPage/TransitionPage";
import MessageProvider from "../../utils/context/MessageProvider";

import "./hub.scss";

const Hub: React.FC = () => {
    return (
        <Authentication>
            <Event />
            <MessageProvider>
                <ScrollingText />
                <section>
                    <Card title={"Message"} img={MessageJpg} id={1} />
                    <Card title={"Sondage"} img={SondageJpg} id={2} />
                </section>
            </MessageProvider>
            <TransitionPage />
        </Authentication>
    );
};
export default Hub;
