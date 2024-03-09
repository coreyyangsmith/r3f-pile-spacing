/*
Date: 2024-02-24
Author: Corey Yang-Smith
File: Settings.ts
Type: Class Definition

Description:
This is a Class Definition for the Settings object.
It is a core object in the Pile Visualization.
*/

// Types
import { ISettings } from "../types/Settings";

export default class Settings implements ISettings {
    backgroundColor: string;
    axesHelper: boolean;
    lockPiles: boolean;
    showFloor: boolean;
    floorColor: string;
    floorWireframe: boolean;

    constructor(
        backgroundColor: string = '#121212',
        axesHelper: boolean = false,
        lockPiles: boolean = true,
        showFloor: boolean = true,
        floorColor: string = '#121212',
        floorWireframe: boolean = true,

    ) {
        this.backgroundColor = backgroundColor;
        this.axesHelper = axesHelper;
        this.lockPiles = lockPiles;
        this.showFloor = showFloor;
        this.floorColor = floorColor;
        this.floorWireframe = floorWireframe;
    }
}
