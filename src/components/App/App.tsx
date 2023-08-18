import reactLogo from "../../assets/img/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
    return (
        <>
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
