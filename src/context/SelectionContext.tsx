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
import { ISelection, SelectionContextType } from '../types/Selection.ts';

export const SelectionContext = createContext<SelectionContextType | null>(null);

export const SelectionProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
    const [selection, setSelection] = useState<ISelection>({
        selectedPile: null,
        selectedHelix: null,

        setSelectedPile: () => { },
        setSelectedHelix: () => { },
    });

    return (
        <SelectionContext.Provider value={{ selection, setSelection }}>
            {children}
        </SelectionContext.Provider>
    )
}