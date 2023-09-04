import { Navigate } from "react-router-dom";
import { ConnectedContext } from "../context/ConnectedProvider";
import { useCallback, useContext, ReactNode } from "react";

interface AuthenticationProps {
    children: ReactNode;
}

// Récupere le Cookies
export const getCookie = (name: string) => {
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.startsWith(name + "=")) {
            return cookie.substring(name.length + 1);
        }
    }
    return null;
};

const Authentication: React.FC<AuthenticationProps> = ({ children }) => {
    const { setConnected } = useContext(ConnectedContext);

    const isConnected = useCallback(() => {
        const token = getCookie("token");
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
