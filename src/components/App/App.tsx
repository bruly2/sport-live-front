import reactLogo from "../../assets/img/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Inscription from "../../pages/Inscription/Inscription";
import Connexion from "../../pages/Connexion/Connexion";
import Hub from "../../pages/Hub/Hub";
import Message from "../Message/Message";
import Poll from "../Poll/Poll";
import Error from "../../pages/Error/Error";

function App() {
    return (
        <>
            <Routes>
                {/* Page "/" d'index provisoire */}
                <Route path="/" element={<Hub />} />
                <Route path="/inscription" element={<Inscription />} />
                <Route path="/connexion" element={<Connexion />} />
                <Route path="/hub" element={<Hub />} />
                <Route path="/hub/message" element={<Message />} />
                <Route path="/hub/sondage" element={<Poll />} />
                <Route path="*" element={<Error />} />
            </Routes>
            <h1>Sport Live</h1>
            <div>
                <a href="https://vitejs.dev" target="_blank">
                    <img src={viteLogo} className="logo" alt="Vite logo" />
                </a>
                <a href="https://react.dev" target="_blank">
                    <img
                        src={reactLogo}
                        className="logo react"
                        alt="React logo"
                    />
                </a>
            </div>
        </>
    );
}

export default App;
