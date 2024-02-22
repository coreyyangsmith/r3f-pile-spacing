/*
Date: 2024-02-21
Author: Corey Yang-Smith
File: PileContext.ts
Type: Context Definition

Description:
This is a Context API definition for the Pile object.
It is a core object in the Pile Visualization.
*/

// Imports
import { createContext, useState, FC } from 'react';

// Types
import { IPiles, PileContextType } from '../types/Pile.ts';

export const PileContext = createContext<PileContextType | null>(null);

export const PileProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
    const [piles, setPiles] = useState<IPiles>({
        piles: [
            {
                id: 0,
                length: 10,
                diameter: 1,
                radius: 2,
                batterAngle: 5,
                helices: null,

                setId: () => { },
                setLength: () => { },
                setDiameter: () => { },
                setRadius: () => { },
                setBatterAngle: () => { },
                setHelices: () => { },
            },
            {
                id: 1,
                length: 10,
                diameter: 1,
                radius: 2,
                batterAngle: 5,
                helices: null,

                setId: () => { },
                setLength: () => { },
                setDiameter: () => { },
                setRadius: () => { },
                setBatterAngle: () => { },
                setHelices: () => { },
            },
        ],
        number: 2,
        setPiles: () => { },
        setNumber: () => { },
    });

    return (
        <PileContext.Provider value={{ piles, setPiles }}>
            {children}
        </PileContext.Provider>
    );
}