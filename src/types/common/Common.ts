/*
Date: 2024-02-24
Author: Corey Yang-Smith
File: Common.ts
Type: Type Definition

Description:
These are the type definitions for Common objects.
*/

export interface ICommon {
    id: number;
    name: string;
    description: string;
}

export interface Orientation extends Position {
    position: Position;
    rotation: number;

    setPosition: (position: Position) => void;
    setRotation: (rotation: number) => void;
}

export interface Position {
    x: number;
    y: number;
    z: number;

    setX: (x: number) => void;
    setY: (y: number) => void;
    setZ: (z: number) => void;
}