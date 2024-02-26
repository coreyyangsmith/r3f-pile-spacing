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

    setHelices: (helices: Array<IHelix>) => void;
    setDistanceFromBottom: (distanceFromBottom: number) => void;
    setSpacing: (spacing: number | string) => void;
    setPileRef: (pileRef: Pile | null) => void;

    constructor(
        helices: Array<IHelix> = [],
        distanceFromBottom: number = 0,
        spacing: number | string = 0,
        pileRef: Pile | null = null,

        setHelices: (helices: Array<IHelix>) => void = () => { },
        setDistanceFromBottom: (distanceFromBottom: number) => void = () => { },
        setSpacing: (spacing: number | string) => void = () => { },
        setPileRef: (pileRef: Pile | null) => void = () => { }
    ) {
        this.helices = helices;
        this.distanceFromBottom = distanceFromBottom;
        this.spacing = spacing;
        this.pileRef = pileRef;

        this.setHelices = setHelices;
        this.setDistanceFromBottom = setDistanceFromBottom;
        this.setSpacing = setSpacing;
        this.setPileRef = setPileRef;
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

    setId: (id: number) => void;
    setNumber: (number: number) => void;
    setDiameter: (diameter: number) => void;
    setThickness: (thickness: number) => void;
    setRise: (rise: number) => void;
    setRotations: (rotations: number) => void;
    setSegsPerStep: (segsPerStep: number) => void;
    setRadius: (radius: number) => void;
    setX: (x: number) => void;
    setY: (y: number) => void;
    setZ: (z: number) => void;
    setRotation: (rotation: number) => void;

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

        setId: (id: number) => void = () => { },
        setNumber: (number: number) => void = () => { },
        setDiameter: (diameter: number) => void = () => { },
        setThickness: (thickness: number) => void = () => { },
        setRise: (rise: number) => void = () => { },
        setRotations: (rotations: number) => void = () => { },
        setSegsPerStep: (segsPerStep: number) => void = () => { },
        setRadius: (radius: number) => void = () => { },
        setX: (x: number) => void = () => { },
        setY: (y: number) => void = () => { },
        setZ: (z: number) => void = () => { },
        setRotation: (rotation: number) => void = () => { }
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

        this.setId = setId;
        this.setNumber = setNumber;
        this.setDiameter = setDiameter;
        this.setThickness = setThickness;
        this.setRise = setRise;
        this.setRotations = setRotations;
        this.setSegsPerStep = setSegsPerStep;
        this.setRadius = setRadius;
        this.setX = setX;
        this.setY = setY;
        this.setZ = setZ;
        this.setRotation = setRotation;
    }
}