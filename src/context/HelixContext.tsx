/*
Date: 2024-02-22
Author: Corey Yang-Smith
File: HelixContext.ts
Type: Context Definition

Description:
This is a Context API definition for the Helix object.
It is a core object in the Pile Visualization.
*/

// Imports
import { createContext, useState, FC } from 'react';

// Types
import { HelixContextType, IHelices } from '../types/Helix';

export const HelixContext = createContext<HelixContextType | null>(null);

export const HelixProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
    const [helices, setHelices] = useState<IHelices>({
        helices: [
            {
                id: 0,
                number: 0,
                firstHelixDistance: 0,
                spacing: 0,
                diameter: 0,

                setId: () => { },
                setNumber: () => { },
                setFirstHelixDistance: () => { },
                setSpacing: () => { },
                setDiameter: () => { },
            },
        ],
        pileRef: null,
        setHelices: () => { },
        setPileRef: () => { },
    });

    return (
        <HelixContext.Provider value={{ helices, setHelices }}>
            {children}
        </HelixContext.Provider>
    );
}

