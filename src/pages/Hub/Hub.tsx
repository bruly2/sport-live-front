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
                <Card title={"Message"} img={"/sport-live-copy.png"} id={1} />
                <Card title={"Sondage"} img={"/sport-live-copy.png"} id={2} />
            </section>
        </>
    );
};
export default Hub;
