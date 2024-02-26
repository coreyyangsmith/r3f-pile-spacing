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

// Type Imports 
import { IHelices } from '../types/Helix.ts';
import { IPile } from '../types/Pile.ts';
import { Position } from '../types/common/Common.ts';

export default class Pile implements IPile {
    id: number;
    length: number;
    diameter: number;
    batterAngle: number;
    helices: IHelices | null;
    position: Position;
    rotation: number;

    setId: (id: number) => void;
    setLength: (length: number) => void;
    setDiameter: (diameter: number) => void;
    setBatterAngle: (batterAngle: number) => void;
    setHelices: (helices: IHelices | null) => void;
    setPosition: (position: Position) => void;
    setRotation: (rotation: number) => void;

    constructor(
        id: number = 999,
        length: number = 10,
        diameter: number = 1,
        batterAngle: number = 5,
        helices: null = null,
        position: Position,
        rotation: number,

        setId: (id: number) => void = () => { },
        setLength: (length: number) => void = () => { },
        setDiameter: (diameter: number) => void = () => { },
        setBatterAngle: (batterAngle: number) => void = () => { },
        setHelices: (helices: IHelices | null) => void = () => { }
        setPosition: (position: Position) => void = () => { }
        setRotation: (rotation: number) => void = () => { }
    ) {
        super(this.position, this.rotation);
        this.id = id;
        this.length = length;
        this.diameter = diameter;
        this.batterAngle = batterAngle;
        this.helices = helices;

        this.setId = setId;
        this.setLength = setLength;
        this.setDiameter = setDiameter;
        this.setBatterAngle = setBatterAngle;
        this.setHelices = setHelices;
        this.position = setPosition;
        this.rotation = setRotation;
    }
}