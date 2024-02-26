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
import { Helix } from '../components/Helix.ts';

export interface IHelix extends ICommon {
    id: number;
    number: number;
    diameter: number;
    thickness: number;
    rise: number;
    rotations: number;
    segsPerStep: number;
    radius: number;

    setId: (id: number) => void;
    setNumber: (number: number) => void;
    setDiameter: (diameter: number) => void;
    setThickness: (thickness: number) => void;
    setRise: (rise: number) => void;
    setRotations: (rotations: number) => void;
    setSegsPerStep: (segsPerStep: number) => void;
    setRadius: (radius: number) => void;
}

export interface IHelices {
    helices: Helix[];
    distanceFromBottom: number
    spacing: number | string;
    pileRef: Pile | null;

    setHelices: (helices: Array<Helix>) => void;
    setDistanceFromBottom: (distanceFromBottom: number) => void;
    setSpacing: (spacing: number | string) => void;
    setPileRef: (pileRef: Pile | null) => void;
}

export type HelixContextType = {
    helices: IHelices;
    setHelices: (helices: IHelices) => void;
}

export type setHelices = (helices: Array<Helix>) => void;
