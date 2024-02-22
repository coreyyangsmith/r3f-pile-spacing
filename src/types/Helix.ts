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

    setId: (id: number) => void;
    setNumber: (number: number) => void;
    setFirstHelixDistance: (firstHelixDistance: number) => void;
    setSpacing: (spacing: number) => void;
    setDiameter: (diameter: number) => void;
}

export interface IHelices {
    helices: IHelix[];
    pileRef: number | null;

    setHelices: (helices: Array<IHelix>) => void;
    setPileRef: (pileRef: number | null) => void;
}

export type HelixContextType = {
    helices: IHelices;
    setHelices: (helices: IHelices) => void;
}

export type setHelices = (helices: Array<IHelix>) => void;
