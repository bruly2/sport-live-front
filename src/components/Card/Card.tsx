import { Link } from "react-router-dom";
import "./Card.scss";

export const Card = () => {
  return (
    <>
      <section>
        <div className="card">
          <Link to="/hub/sondage">
            <figure>
              <img src="" alt="" />
            </figure>
            <h2>Sondage</h2>
          </Link>
        </div>

        <div className="card">
        <Link to="/hub/Message">
          <figure>
            <img src="" alt="" />
          </figure>
          <h2>Message</h2>
          </Link>
        </div>
      </section>
    </>
  );
};
