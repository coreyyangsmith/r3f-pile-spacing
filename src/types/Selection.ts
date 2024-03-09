/*
Date: 2024-03-05
Author: Corey Yang-Smith
File: Selection.ts
Type: Type Definition

Description:
This is a Type Definition for the Selection object.
It is a core object in the Pile Visualization.
*/

import { Dispatch, SetStateAction } from "react";
import { Pile } from "../components/Pile";
import { Helix } from "../components/Helix";

export interface ISelection {
    // General Settings
    selectedPile: Pile | null;
    selectedHelix: Helix | null;
}

export type SelectionContextState = {
    selection: ISelection;
}

export type SelectionContextValue = {
    state: SelectionContextState
    setState: Dispatch<SetStateAction<SelectionContextState>>;
}