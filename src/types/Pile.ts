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
import { IHelices } from './Helix.ts';
import { ICommon, Position } from './common/Common.ts';

export interface IPile extends ICommon {
    id: number;
    length: number;
    diameter: number;
    batterAngle: number;
    helices: IHelices | null;
    position: Position;
    rotation: number;

    setId: (id: number) => void;
    setLength: (length: number) => void;
    setDiameter: (diameter: number) => void;
    setBatterAngle: (batterAngle: number) => void;
    setHelices: (helices: IHelices) => void;
    setPosition: (position: Position) => void;
    setRotation: (rotation: number) => void;
}

export interface IPiles {
    piles: Array<IPile>;
    number: number;
    spacingRadius: number;

    setPiles: (piles: Array<IPile>) => void;
    setNumber: (number: number) => void;
    setSpacingRadius: (spacingRadius: number) => void;
}

export type PileContextType = {
    piles: IPiles;
    setPiles: (piles: IPiles) => void;
}

export type setPiles = (piles: Array<IPile>) => void;