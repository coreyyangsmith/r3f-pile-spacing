/*
Date: 2024-02-21
Author: Corey Yang-Smith
File: Pile.ts
Type: Class Definition

Description:
This is a Class Definition for the Pile object.
It is a core object in the Pile Visualization.
*/

// Types
import { IPile, IPiles } from '../types/Pile.ts';

// Components
import { Helices } from './Helix.ts';

export class Piles implements IPiles {
    piles: Array<Pile>;
    number: number;
    spacingRadius: number;

    constructor(
        piles: Array<Pile> = [],
        number: number = 0,
        spacingRadius: number = 0,
    ) {
        this.piles = piles;
        this.number = number;
        this.spacingRadius = spacingRadius;
    }

    addPile(pile: Pile) {
        this.piles.push(pile);
        this.number = this.number + 1;
    }

    removePile(id: number) {
        this.number = this.number - 1;
        this.piles = this.piles.filter(pile => pile.id !== id);
    }
}

export class Pile implements IPile {
    id: number;
    length: number;
    diameter: number;
    batterAngle: number;
    helices: Helices | null;
    x: number;
    y: number;
    z: number;
    rotation: number;

    constructor(
        id: number = 999,
        length: number = 10,
        diameter: number = 1,
        batterAngle: number = 5,
        helices: Helices | null,
        x: number = 0,
        y: number = 0,
        z: number = 0,
        rotation: number = 0,
    ) {
        this.id = id;
        this.length = length;
        this.diameter = diameter;
        this.batterAngle = batterAngle;
        this.helices = helices;
        this.x = x;
        this.y = y;
        this.z = z;
        this.rotation = rotation;
    }
}