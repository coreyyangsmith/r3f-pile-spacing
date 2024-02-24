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
import { IPile } from '../types/Pile.ts';

export default class Pile implements IPile {
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
    setHelices: (helices: Array<IHelix> | null) => void;

    constructor(
        id: number = 999,
        length: number = 10,
        diameter: number = 1,
        radius: number = 1,
        batterAngle: number = 5,
        position: number[] = [0, 0, 0],
        rotation: number = 0,
        helices: null = null,

        setId: (id: number) => void = () => { },
        setLength: (length: number) => void = () => { },
        setDiameter: (diameter: number) => void = () => { },
        setRadius: (radius: number) => void = () => { },
        setBatterAngle: (batterAngle: number) => void = () => { },
        setPosition: (position: number[]) => void = () => { },
        setRotation: (rotation: number) => void = () => { },
        setHelices: (helices: Array<IHelix> | null) => void = () => { }
    ) {
        this.id = id;
        this.length = length;
        this.diameter = diameter;
        this.radius = radius;
        this.batterAngle = batterAngle;
        this.position = position;
        this.rotation = rotation;
        this.helices = helices;

        this.setId = setId;
        this.setLength = setLength;
        this.setDiameter = setDiameter;
        this.setRadius = setRadius;
        this.setBatterAngle = setBatterAngle;
        this.setPosition = setPosition;
        this.setRotation = setRotation;
        this.setHelices = setHelices;
    }
}