/*
Date: 2024-02-21
Author: Corey Yang-Smith
File: PileContext.ts
Type: Context Definition

Description:
This is a Context API definition for the Pile object.
It is a core object in the Pile Visualization.
This file also defines the default generation from context
*/

// Imports
import { createContext, useState, FC } from 'react';

// Types
import { PileContextType } from '../types/Pile.ts';

// Components
import { Piles } from '../components/Pile.ts';
import { useHelicesFromPileId } from '../hooks/useHelicesFromPileId.tsx';

export const PileContext = createContext<PileContextType | null>(null);

export const PileProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
    const [piles, setPiles] = useState<Piles>({
        piles: [
            {
                id: 0,
                length: 10,
                diameter: 1,
                batterAngle: 5,
                helices: null,
                x: 0,
                y: 0,
                z: 0,
                rotation: 0,

                setId: () => { },
                setLength: () => { },
                setDiameter: () => { },
                setBatterAngle: () => { },
                setHelices: () => { },
                setX: () => { },
                setY: () => { },
                setZ: () => { },
                setRotation: () => { },
            },
            {
                id: 0,
                length: 10,
                diameter: 1,
                batterAngle: 5,
                helices: null,
                x: -1,
                y: -1,
                z: -1,
                rotation: 0,

                setId: () => { },
                setLength: () => { },
                setDiameter: () => { },
                setBatterAngle: () => { },
                setHelices: () => { },
                setX: () => { },
                setY: () => { },
                setZ: () => { },
                setRotation: () => { },
            },
        ],
        number: 2,
        spacingRadius: 1,

        setPiles: () => { },
        setNumber: () => { },
        setSpacingRadius: () => { },
    });

    return (
        <PileContext.Provider value={{ piles, setPiles }}>
            {children}
        </PileContext.Provider>
    );
}