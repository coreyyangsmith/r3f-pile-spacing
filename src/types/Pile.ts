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
import { IHelix } from '../types/Helix.ts';

export interface IPile {
    id: number;
    length: number;
    diameter: number;
    radius: number;
    batterAngle: number;
    position: number[];
    rotation: number;
    helices: Array<IHelix> | null;

    setId: (id: number) => void;
    setLength: (length: number) => void;
    setDiameter: (diameter: number) => void;
    setRadius: (radius: number) => void;
    setBatterAngle: (batterAngle: number) => void;
    setPosition: (position: number[]) => void;
    setRotation: (rotation: number) => void;
    setHelices: (helices: Array<IHelix>) => void;
}

export interface IPiles {
    piles: Array<IPile>;
    number: number;

    setPiles: (piles: Array<IPile>) => void;
    setNumber: (number: number) => void;
}

export type PileContextType = {
    piles: IPiles;
    setPiles: (piles: IPiles) => void;
}

export type setPiles = (piles: Array<IPile>) => void;