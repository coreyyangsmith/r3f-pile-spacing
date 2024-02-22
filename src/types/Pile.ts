/*
Date: 2024-02-21
Author: Corey Yang-Smith
File: Pile.ts
Type: Type Definition

Description:
This is a Type Definition for the Pile object.
It is a core object in the Pile Visualization.
*/

// Imports
import { Nullable } from './Generics.ts';
import { IHelix } from '../types/Helix.ts';

export interface IPile {
    id: number;
    length: number;
    diameter: number;
    radius: number;
    batterAngle: number;
    helices: Array<IHelix> | null;
}

export interface IPiles {
    piles: Array<IPile>;
}

export type PileContextType = {
    piles: IPile[];
    setPiles: (piles: Array<IPile>) => void;
}

export type setPiles = (piles: Array<IPile>) => void;