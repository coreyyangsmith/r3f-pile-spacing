/*
Date: 2024-03-05
Author: Corey Yang-Smith
File: Selection.ts
Type: Type Definition

Description:
This is a Type Definition for the Selection object.
It is a core object in the Pile Visualization.
*/

export interface ISelection {
    // General Settings
    selectedPile: number | null;
    selectedHelix: number | null;

    setSelectedPile: (value: number | null) => void;
    setSelectedHelix: (value: number | null) => void;
}

export type SelectionContextType = {
    selection: ISelection;
    setSelection: (selection: ISelection) => void;
}

export type setSelection = (selection: ISelection) => void;