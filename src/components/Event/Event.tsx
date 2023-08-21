import "./Event.scss";

export const Event = () => {
  return (
    <>
      <main id="event">
        <div>
          <h1>Evènement</h1>
        </div>

        <div className="description_event">
          <p>date<span>,</span></p>
          <p>heure<span>,</span></p>
          <p>lieu évènement<span>,</span></p>
        </div>

        <div className="defile_message">
          <h2>défilement des messages</h2>
        </div>
      </main>
    </>
  );
};
