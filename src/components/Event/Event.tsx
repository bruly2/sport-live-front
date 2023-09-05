import "./Event.scss";
import React  from "react";

type EventProps = {
    name:string;
    date: number; 
    time: number; 
    location: string;
  };
  const Event: React.FC<EventProps> = () => {
    return (
        <>
            <main id="event">
                <div>
                    <h1>{name}</h1>
                </div>

                <div className="description_event">
                    <p>
                        <span>{date}</span> - <span>{time}</span> -&nbsp;
                        <span>{location}</span>
                    </p>
                </div>
            </main>
        </>
    );
};

export default Event;
