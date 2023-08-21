import "./Event.scss";
import ScrollingText from "./ScrollingText/ScrollingText";

export const Event = () => {
    return (
        <>
            <main id="event">
                <div>
                    <h1>Evènement</h1>
                </div>

                <div className="description_event">
                    <p>
                        <span>Date</span>, <span>heure</span>,{" "}
                        <span>lieu évènement</span>
                    </p>
                </div>
            </main>
            <ScrollingText />
        </>
    );
};

export default Event;
