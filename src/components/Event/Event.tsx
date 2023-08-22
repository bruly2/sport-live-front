import "./Event.scss";

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
        </>
    );
};

export default Event;
