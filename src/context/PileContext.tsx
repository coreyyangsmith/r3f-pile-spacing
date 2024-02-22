// Imports
import { createContext, useState, useContext, FC } from 'react';

// Types
import { IPile, PileContextType } from '../types/Pile.ts';

export const PileContext = createContext<PileContextType | null>(null);

export const PileProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
    const [piles, setPiles] = useState<IPile[]>([
        {
            id: 0,
            length: 0,
            diameter: 0,
            radius: 0,
            batterAngle: 0,
            helices: null
        },
    ]);

    return (
        <PileContext.Provider value={{ piles, setPiles }}>
            {children}
        </PileContext.Provider>
    );
}

export const usePiles = () => {
    const context = useContext(PileContext)
    return context;
}