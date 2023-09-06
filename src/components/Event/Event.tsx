import "./Event.scss";
import React from "react";

// type EventProps = {
//     name: string;
//     date: number;
//     time: number;
//     location: string;
// };
const Event: React.FC = () => {
    const attenteEvent = {
        event: "meeting de Paris",
        date: "29 mai 2024",
        time: "19h",
        location: "Stade Pierre Arthur",
    };
    return (
        <>
            <main id="event">
                <div>
                    <h1>{attenteEvent.event}</h1>
                </div>

                <div className="description_event">
                    <p>
                        <span>{attenteEvent.date}</span> -&nbsp;
                        <span>{attenteEvent.time}</span> -&nbsp;
                        <span>{attenteEvent.location}</span>
                    </p>
                </div>
            </main>
        </>
    );
};

export default Event;
