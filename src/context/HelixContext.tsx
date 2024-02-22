import { createContext, useState, useContext } from 'react';

const HelixContext = createContext({});

export const HelixContextProvider = (props) => {
    const [helices, setHelices] = useState({});

    return <HelixContext.Provider value={{
        helices,
        setHelices,
    }}>
        {props.children}
    </HelixContext.Provider>
}

export const useHelices = () => {
    const context = useContext(HelixContext)
    return context;
}