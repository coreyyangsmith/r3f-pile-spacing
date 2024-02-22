import { createContext, useState, useContext } from 'react';

const PileContext = createContext({});

export const PileContextProvider = (props) => {
    const [piles, setPiles] = useState({});

    return <PileContext.Provider value={{
        piles,
        setPiles,
    }}>
        {props.children}
    </PileContext.Provider>
}

export const usePiles = () => {
    const context = useContext(PileContext)
    return context;
}