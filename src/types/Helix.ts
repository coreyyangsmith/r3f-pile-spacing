/*
Date: 2024-02-21
Author: Corey Yang-Smith
File: Helix.ts
Type: Type Definition

Description:
This is a Type Definition for the Helix object.
It is a core object in the Pile Visualization.
*/

export interface IHelix {
    id: number;
    number: number;
    firstHelixDistance: number;
    spacing: number;
    diameter: number;
    pileRef: number | null;
}

export interface IHelices {
    helices: Array<IHelix>;
    pileRef: number | null;
}

export type HelixContextType = {
    helices: IHelix[];
    setHelices: (helices: Array<IHelix>) => void;
}

export type setHelices = (helices: Array<IHelix>) => void;
