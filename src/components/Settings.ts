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
    lockPiles: boolean;
    showFloor: boolean;
    floorColor: string;
    backgroundColor: string;

    floorAxesHelper: boolean;
    pileAxesHelper: boolean;
    helixAxesHelper: boolean;

    floorWireframe: boolean;
    pileWireframe: boolean;
    helixWireframe: boolean;

    constructor(
        lockPiles: boolean = true,
        showFloor: boolean = true,
        floorColor: string = '#121212',
        backgroundColor: string = '#121212',


        floorAxesHelper: boolean = false,
        pileAxesHelper: boolean = false,
        helixAxesHelper: boolean = false,

        floorWireframe: boolean = true,
        pileWireframe: boolean = false,
        helixWireframe: boolean = false,

    ) {
        this.lockPiles = lockPiles;
        this.showFloor = showFloor;
        this.floorColor = floorColor;
        this.backgroundColor = backgroundColor;

        this.floorAxesHelper = floorAxesHelper;
        this.pileAxesHelper = pileAxesHelper;
        this.helixAxesHelper = helixAxesHelper;

        this.floorWireframe = floorWireframe;
        this.pileWireframe = pileWireframe;
        this.helixWireframe = helixWireframe;
    }
}
