/*
Date: 2024-02-21
Author: Corey Yang-Smith
File: Helix.ts
Type: Class Definition

Description:
This is a Class Definition for the Helix object.
It is a core object in the Pile Visualization.
*/

// Type Import
import { IHelix, IHelices } from "../types/Helix.ts"
import { Pile } from "./Pile.ts";


export class Helices implements IHelices {
    helices: Array<Helix>;
    distanceFromBottom: number;
    spacing: number | string;
    pileRef: Pile | null;

    constructor(
        helices: Array<Helix> = [],
        distanceFromBottom: number = 0,
        spacing: number | string = 0,
        pileRef: Pile | null = null,
    ) {
        this.helices = helices;
        this.distanceFromBottom = distanceFromBottom;
        this.spacing = spacing;
        this.pileRef = pileRef;
    }

    addNewHelix() {
        let newHelix: Helix;
        // If Helix Exists,
        if (this.helices.length > 0) {
            // Create New Helix
            newHelix = new Helix(
                this.helices.length,
                this.helices.length,
                this.helices[0].diameter,
                this.helices[0].thickness,
                this.helices[0].rise,
                this.helices[0].rotations,
                this.helices[0].segsPerStep,
                this.helices[0].radius,
                this.helices[0].x,
                this.helices[0].y,
                this.helices[0].z,
                this.helices[0].rotation,)
        }
        else {
            // Else Create Default Helix
            newHelix = new Helix(
                0,
                0,
                1,
                0.1,
                0.5,
                1,
                1,
                0.5,
                0,
                0,
                0,
                0,
            );
        }

        this.helices.push(newHelix);
    }
}

export class Helix implements IHelix {
    id: number
    number: number;
    diameter: number;
    thickness: number;
    rise: number;
    rotations: number;
    segsPerStep: number;
    radius: number;
    x: number;
    y: number;
    z: number;
    rotation: number;

    constructor(
        id: number = 999,
        number: number = 0,
        diameter: number = 1,
        thickness: number = 0.1,
        rise: number = 0.5,
        rotations: number = 1,
        segsPerStep: number = 1,
        radius: number = 0.5,
        x: number = 0,
        y: number = 0,
        z: number = 0,
        rotation: number = 0,
    ) {
        this.id = id;
        this.number = number;
        this.diameter = diameter;
        this.thickness = thickness;
        this.rise = rise;
        this.rotations = rotations;
        this.segsPerStep = segsPerStep;
        this.radius = radius;
        this.x = x;
        this.y = y;
        this.z = z;
        this.rotation = rotation;
    }
}