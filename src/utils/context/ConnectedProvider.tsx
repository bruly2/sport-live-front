import { createContext, useCallback, useState, ReactNode } from "react";

interface ConnectedContextProps {
    connected: boolean;
    logout: () => void;
    setConnected: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ConnectedContext = createContext<ConnectedContextProps>(
    {} as ConnectedContextProps
);

interface ConnectedProviderProps {
    children: ReactNode;
}

const deleteCookie = (name: string) => {
    document.cookie =
        name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
};

const ConnectedProvider: React.FC<ConnectedProviderProps> = ({ children }) => {
    const [connected, setConnected] = useState<boolean>(false);

    const logout = useCallback(() => {
        deleteCookie("token");
        setConnected(false);
    }, []);

    return (
        <ConnectedContext.Provider value={{ connected, logout, setConnected }}>
            {children}
        </ConnectedContext.Provider>
    );
};
export default ConnectedProvider;
