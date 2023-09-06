/* eslint-disable react-refresh/only-export-components */
import { Navigate } from "react-router-dom";
import { ConnectedContext } from "../context/ConnectedProvider";
import { useCallback, useContext, ReactNode } from "react";

interface AuthenticationProps {
    children: ReactNode;
}

// Récupere les Cookies en les décomposant et nettoyant la variable
export const getCookieString = (name: string) => {
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();

        if (cookie.startsWith(name + "=")) {
            return cookie.substring(name.length + 1);
        }
    }
    return null;
};
export const getCookieNumber = (name: string) => {
    const cookies = document.cookie.split("; ");
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].split("=");
        if (cookie[0] === name) {
            return cookie[1];
        }
    }
    return null;
};

const Authentication: React.FC<AuthenticationProps> = ({ children }) => {
    const { setConnected } = useContext(ConnectedContext);

    const isConnected = useCallback(() => {
        const token = getCookieString("token");
        return !!token;
    }, []);

    if (isConnected()) {
        setConnected(true);
        return <>{children};</>;
    } else {
        setConnected(false);
        return <Navigate to="/connexion" />;
    }
};
export default Authentication;
