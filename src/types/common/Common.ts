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
}

export interface IOrientation extends IPosition {
    rotation: number;
}

export interface IPosition {
    x: number;
    y: number;
    z: number;
}