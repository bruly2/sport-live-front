import Event from "../../components/Event/Event";
import Card from "../../components/Card/Card";
import ScrollingText from "../../components/ScrollingText/ScrollingText";

import "./hub.scss";

const Hub = () => {
    return (
        <>
            <Event />
            <ScrollingText />
            <section>
                <Card
                    title={"Message"}
                    img={"/sport-live-copy.png"}
                    link={"/hub/message"}
                />
                <Card
                    title={"Sondage"}
                    img={"/sport-live-copy.png"}
                    link={"/hub/sondage"}
                />
            </section>
        </>
    );
};
export default Hub;
