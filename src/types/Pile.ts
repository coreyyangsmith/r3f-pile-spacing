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

export interface IPile extends ICommon {
    id: number;
    length: number;
    diameter: number;
    batterAngle: number;
    helices: Helices | null;

    setId: (id: number) => void;
    setLength: (length: number) => void;
    setDiameter: (diameter: number) => void;
    setBatterAngle: (batterAngle: number) => void;
    setHelices: (helices: Helices) => void;
}

export interface IPiles {
    piles: Array<Pile>;
    number: number;
    spacingRadius: number;

    setPiles: (piles: Array<Pile>) => void;
    setNumber: (number: number) => void;
    setSpacingRadius: (spacingRadius: number) => void;
}

export type PileContextType = {
    piles: Piles;
    setPiles: (piles: Piles) => void;
}

export type setPiles = (piles: Array<IPile>) => void;