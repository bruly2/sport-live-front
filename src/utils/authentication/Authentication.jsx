import { Navigate } from "react-router-dom";
import { ConnectedContext } from "../context/ConnectedProvider";
import { useCallback, useContext } from "react";

const Authentication = ({ children }) => {
    const { setConnected } = useContext(ConnectedContext);

    const isConnected = useCallback(() => {
        let token = localStorage.getItem("token");
        return !!token;
    }, []);

    if (isConnected()) {
        setConnected(true);
        return children;
    } else {
        setConnected(false);
        return <Navigate to="/connexion" />;
    }
};
export default Authentication;
