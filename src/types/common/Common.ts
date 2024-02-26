/*
Date: 2024-02-24
Author: Corey Yang-Smith
File: Common.ts
Type: Type Definition

Description:
These are the type definitions for Common objects.
*/

export interface ICommon extends IOrientation {
    id: number;

    setId: (id: number) => void;
}

export interface IOrientation extends IPosition {
    rotation: number;

    setRotation: (rotation: number) => void;
}

export interface IPosition {
    x: number;
    y: number;
    z: number;

    setX: (x: number) => void;
    setY: (y: number) => void;
    setZ: (z: number) => void;
}