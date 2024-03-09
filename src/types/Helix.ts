/*
Date: 2024-02-21
Author: Corey Yang-Smith
File: Helix.ts
Type: Type Definition

Description:
This is a Type Definition for the Helix object.
It is a core object in the Pile Visualization.
*/

// DOCUMENTED

// Types
import { ICommon } from './common/Common.ts';

// Components
import { Pile } from '../components/Pile.ts';
import { Helices, Helix } from '../components/Helix.ts';
import { Dispatch, SetStateAction } from 'react';

export interface IHelix extends ICommon {
    id: number;
    number: number;
    diameter: number;
    thickness: number;
    rise: number;
    rotations: number;
    segsPerStep: number;
    radius: number;
}

export interface IHelices {
    helices: Helix[];
    distanceFromBottom: number
    spacing: number | string;
    pileRef: Pile | null;
}

// Context
export type HelixContextState = {
    helices: Helices[]
}

export type HelixContextValue = {
    state: HelixContextState;
    setState: Dispatch<SetStateAction<HelixContextState>>;
}