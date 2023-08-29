import { createContext, useCallback, useState } from "react";

interface ConnectedContextProps {
    connected: boolean;
    logout: () => void;
    setConnected: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ConnectedContext = createContext<ConnectedContextProps>();

const ConnectedProvider: React.FC = (props) => {
    const [connected, setConnected] = useState<boolean>(false);

    const logout = useCallback(() => {
        localStorage.removeItem("token");
        setConnected(false);
    }, []);

    return (
        <ConnectedContext.Provider value={{ connected, logout, setConnected }}>
            {props.children}
        </ConnectedContext.Provider>
    );
};
export default ConnectedProvider;
