/*
Date: 2024-02-21
Author: Corey Yang-Smith
File: Pile.ts
Type: Class Definition

Description:
This is a Class Definition for the Pile object.
It is a core object in the Pile Visualization.
*/

// Type Imports 
import { IHelix } from '../types/Helix.ts';

export default class Pile {
    id: number;
    length: number;
    diameter: number;
    radius: number;
    batterAngle: number;
    helices: Array<IHelix> | null;

    constructor(
        id: number = 999,
        length: number = 10,
        diameter: number = 1,
        radius: number = 1,
        batterAngle: number = 5,
        helices: null = null) {

        this.id = id;
        this.length = length;
        this.diameter = diameter;
        this.radius = radius;
        this.batterAngle = batterAngle;
        this.helices = helices;
    }
}