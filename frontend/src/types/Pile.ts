/*
Date: 2024-02-21
Author: Corey Yang-Smith
File: Pile.ts
Type: Type Definition

Description:
This is a Type Definition for the Pile object.
It is a core object in the Pile Visualization.
*/

// DOCUMENTED

// Imports

// Types
import { ICommon } from './common/Common.ts';

// Components
import { Pile, Piles } from '../components/Pile.ts';
import { Helices } from '../components/Helix.ts';
import { Dispatch, SetStateAction } from 'react';

export interface IPile extends ICommon {
    id: number;
    length: number;
    diameter: number;
    batterAngle: number;
    helices: Helices | null;
}

export interface IPiles {
    piles: Array<Pile>;
    number: number;
    spacingRadius: number;
}

// Context
export type PileContextState = {
    piles: Piles;
}

export type PileContextValue = {
    state: PileContextState;
    setState: Dispatch<SetStateAction<PileContextState>>;
}
