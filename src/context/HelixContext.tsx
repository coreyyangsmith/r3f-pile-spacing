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
import { HelixContextState, HelixContextValue, } from '../types/Helix';
import { usePileFromId } from '../hooks/usePileFromId';
import { Helices, Helix } from '../components/Helix';

export const HelixContext = createContext<HelixContextValue | undefined>(undefined);

export const HelixProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
    const [state, setState] = useState<HelixContextState>({
        helices: [
            new Helices(
                [new Helix(
                    0,
                    0,
                    1.25,
                    1,
                    1,
                    1,
                    128,
                    1,
                    0,
                    0,
                    0,
                    0,
                ),
                new Helix(
                    1,
                    1,
                    1.25,
                    1,
                    1,
                    1,
                    128,
                    1,
                    0,
                    0,
                    0,
                    0,
                )],
                1, // distanceFromBottom
                2.5, // spacing
                usePileFromId(0), // pileRef
            )],
    });

    return (
        <HelixContext.Provider value={{ state, setState }}>
            {children}
        </HelixContext.Provider >
    );
}

