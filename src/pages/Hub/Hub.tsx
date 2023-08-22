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
                <Card title={"Message"} img={"/sport-live-copy.png"} />
                <Card title={"Sondage"} img={"/sport-live-copy.png"} />
            </section>
        </>
    );
};
export default Hub;
