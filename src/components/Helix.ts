/*
Date: 2024-02-21
Author: Corey Yang-Smith
File: Helix.ts
Type: Class Definition

Description:
This is a Class Definition for the Helix object.
It is a core object in the Pile Visualization.
*/

export default class Helix {
    id: number
    number: number;
    firstHelixDistance: number;
    spacing: number;
    diameter: number;
    pileRef: number | null;

    constructor(
        id: number = 0,
        number: number = 0,
        firstHelixDistance: number = 1,
        spacing: number = 1,
        diameter: number = 1,
        pileRef: number | null = null) {

        this.id = id;
        this.number = number;
        this.firstHelixDistance = firstHelixDistance;
        this.spacing = spacing;
        this.diameter = diameter;
        this.pileRef = pileRef;
    }
}