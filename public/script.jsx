import { createRoot } from "react-dom/client";

function Connexion() {
    return <a href="./hub.html">Connexion</a>;
}

const domNode = document.getElementById("connexion");
const root = createRoot(domNode);
root.render(<Connexion />);
