/*
Date: 2024-02-21
Author: Corey Yang-Smith
File: Pile.ts
Type: Class Definition

Description:
This is a Class Definition for the Pile object.
It is a core object in the Pile Visualization.
*/

// DOCUMENTED

// Types
import { IPile, IPiles } from '../types/Pile.ts';

// Components
import { Helices } from './Helix.ts';

export class Piles implements IPiles {
    piles: Array<Pile>;
    number: number;
    spacingRadius: number;

    setPiles: (piles: Array<Pile>) => void;
    setNumber: (number: number) => void;
    setSpacingRadius: (spacingRadius: number) => void;

    constructor(
        piles: Array<Pile> = [],
        number: number = 0,
        spacingRadius: number = 0,

        setPiles: (piles: Array<Pile>) => void = () => { },
        setNumber: (number: number) => void = () => { },
        setSpacingRadius: (spacingRadius: number) => void = () => { }
    ) {
        this.piles = piles;
        this.number = number;
        this.spacingRadius = spacingRadius;

        this.setPiles = setPiles;
        this.setNumber = setNumber;
        this.setSpacingRadius = setSpacingRadius;
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

    setId: (id: number) => void;
    setLength: (length: number) => void;
    setDiameter: (diameter: number) => void;
    setBatterAngle: (batterAngle: number) => void;
    setHelices: (helices: Helices | null) => void;
    setX: (x: number) => void;
    setY: (y: number) => void;
    setZ: (z: number) => void;
    setRotation: (rotation: number) => void;

    constructor(
        id: number = 999,
        length: number = 10,
        diameter: number = 1,
        batterAngle: number = 5,
        helices: null = null,
        x: number = 0,
        y: number = 0,
        z: number = 0,
        rotation: number = 0,

        setId: (id: number) => void = () => { },
        setLength: (length: number) => void = () => { },
        setDiameter: (diameter: number) => void = () => { },
        setBatterAngle: (batterAngle: number) => void = () => { },
        setHelices: (helices: Helices | null) => void = () => { },
        setX: (x: number) => void = () => { },
        setY: (y: number) => void = () => { },
        setZ: (z: number) => void = () => { },
        setRotation: (rotation: number) => void = () => { }
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

        this.setId = setId;
        this.setLength = setLength;
        this.setDiameter = setDiameter;
        this.setBatterAngle = setBatterAngle;
        this.setHelices = setHelices;
        this.setX = setX;
        this.setY = setY;
        this.setZ = setZ;
        this.setRotation = setRotation;
    }
}