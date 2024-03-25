/*
Date: 2024-02-26
Author: Corey Yang-Smith
File: Common.ts
Type: Class Definition

Description:
This is a Class Definition for the Common object.
It is a core object and base in the Pile Visualization.
It holds information related to all objects in the visualization.
*/

// DOCUMENTED

// Type Imports
import { ICommon, IOrientation, IPosition } from "../types/common/Common";

export default class Common implements ICommon {
    id: number;
    x: number;
    y: number;
    z: number;
    rotation: number;

    setId: (id: number) => void;
    setX: (x: number) => void;
    setY: (y: number) => void;
    setZ: (z: number) => void;
    setRotation: (rotation: number) => void;

    constructor(
        id: number = 999,
        x: number = 0,
        y: number = 0,
        z: number = 0,
        rotation: number = 0,

        setId: (id: number) => void = () => { },
        setX: (x: number) => void = () => { },
        setY: (y: number) => void = () => { },
        setZ: (z: number) => void = () => { },
        setRotation: (rotation: number) => void = () => { }
    ) {
        this.id = id;
        this.x = x;
        this.y = y;
        this.z = z;
        this.rotation = rotation;

        this.setId = setId;
        this.setX = setX;
        this.setY = setY;
        this.setZ = setZ;
        this.setRotation = setRotation;
    }
}

// class Orientation implements IOrientation {
//     x: number;
//     y: number;
//     z: number;
//     rotation: number;

//     setX: (x: number) => void;
//     setY: (y: number) => void;
//     setZ: (z: number) => void;
//     setRotation: (rotation: number) => void;

//     constructor(
//         x: number = 0,
//         y: number = 0,
//         z: number = 0,
//         rotation: number = 0,

//         setX: (x: number) => void = () => { },
//         setY: (y: number) => void = () => { },
//         setZ: (z: number) => void = () => { },
//         setRotation: (rotation: number) => void = () => { }
//     ) {
//         this.x = x;
//         this.y = y;
//         this.z = z;
//         this.rotation = rotation;

//         this.setX = setX;
//         this.setY = setY;
//         this.setZ = setZ;
//         this.setRotation = setRotation;
//     }
// }

// class Position implements IPosition {
//     x: number;
//     y: number;
//     z: number;

//     setX: (x: number) => void;
//     setY: (y: number) => void;
//     setZ: (z: number) => void;

//     constructor(
//         x: number = 0,
//         y: number = 0,
//         z: number = 0,

//         setX: (x: number) => void = () => { },
//         setY: (y: number) => void = () => { },
//         setZ: (z: number) => void = () => { }
//     ) {
//         this.x = x;
//         this.y = y;
//         this.z = z;

//         this.setX = setX;
//         this.setY = setY;
//         this.setZ = setZ;
//     }
// }