import { createContext, useCallback, useState } from "react";

export const ConnectedContext = createContext();

const ConnectedProvider = (props) => {
    const [connected, setConnected] = useState(false);

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
