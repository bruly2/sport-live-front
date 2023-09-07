import { getCookieString } from "../../utils/authentication/Authentication";

import {
    createContext,
    useState,
    ReactNode,
    Dispatch,
    SetStateAction,
} from "react";

export interface IMesssage {
    id?: number;
    content: string;
}

interface MessageProviderProps {
    children: ReactNode;
}

interface MessageContextProps {
    displayMessage: IMesssage[];
    setDisplayMessage: Dispatch<SetStateAction<IMesssage[]>>;
    allMessagesFetch: () => Promise<void>;
}

export const MessageContext = createContext<MessageContextProps>(
    {} as MessageContextProps
);

const MessageProvider: React.FC<MessageProviderProps> = ({ children }) => {
    const [displayMessage, setDisplayMessage] = useState<IMesssage[]>([]);
    const token = getCookieString("token");

    const allMessagesFetch = async () => {
        try {
            const response = await fetch(
                `${import.meta.env.VITE_API_BASE_URL}/messages`,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            if (response.ok) {
                const result = await response.json();
                return setDisplayMessage(result);
            }
        } catch (error) {
            console.error("❌ Erreur :" + error);
        }
    };

    return (
        <MessageContext.Provider
            value={{ displayMessage, setDisplayMessage, allMessagesFetch }}
        >
            {children}
        </MessageContext.Provider>
    );
};
export default MessageProvider;
