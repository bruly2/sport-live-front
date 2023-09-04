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
}

export const MessageContext = createContext<MessageContextProps>(
    {} as MessageContextProps
);

const MessageProvider: React.FC<MessageProviderProps> = ({ children }) => {
    const [displayMessage, setDisplayMessage] = useState<IMesssage[]>([]);

    return (
        <MessageContext.Provider value={{ displayMessage, setDisplayMessage }}>
            {children}
        </MessageContext.Provider>
    );
};
export default MessageProvider;
