/*
Date: 2024-03-05
Author: Corey Yang-Smith
File: SelectionContext.ts
Type: Context Definition

Description:
This is a Context API definition for the User Selection.
It is a core object in the Pile Visualization.
*/

// Imports
import { createContext, useState, FC } from 'react'

// Types
import { SelectionContextState, SelectionContextValue } from '../types/Selection.ts';

export const SelectionContext = createContext<SelectionContextValue>({
    state: {
        selection: {
            selectedSection: 'Conflict',
            selectedPile: null,
            selectedHelix: null
        }
    },
    setState: () => { }
});

export const SelectionProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
    const [state, setState] = useState<SelectionContextState>({
        selection: {
            selectedSection: 'Conflict',
            selectedPile: null,
            selectedHelix: null
        }
    });

    return (
        <SelectionContext.Provider value={{ state, setState }}>
            {children}
        </SelectionContext.Provider>
    )
}