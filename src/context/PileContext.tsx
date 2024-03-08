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
import { PileContextState, PileContextValue } from '../types/Pile.ts';

// Components
import { Piles } from '../components/Pile.ts';

export const PileContext = createContext<PileContextValue | null>(null);

export const PileProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
    const [state, setState] = useState<PileContextState>({
        piles: new Piles([
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
                id: 1,
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
            2, // number
            1, // spacingRadius

            () => { },
            () => { },
            () => { },
        )
    });

    return (
        <PileContext.Provider value={{ state, setState }}>
            {children}
        </PileContext.Provider>
    );
}