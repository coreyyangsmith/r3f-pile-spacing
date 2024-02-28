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

    setAxesHelper: (value: boolean) => void;
    setBackgroundColor: (value: string) => void;
    setLockPiles: (value: boolean) => void;
    setShowFloor: (value: boolean) => void;
    setFloorColor: (value: string) => void;
    setFloorWireframe: (value: boolean) => void;

    constructor(
        backgroundColor: string = '#121212',
        axesHelper: boolean = false,
        lockPiles: boolean = true,
        showFloor: boolean = true,
        floorColor: string = '#121212',
        floorWireframe: boolean = true,

        setAxesHelper: (value: boolean) => void = () => { },
        setBackgroundColor: (value: string) => void = () => { },
        setLockPiles: (value: boolean) => void = () => { },
        setShowFloor: (value: boolean) => void = () => { },
        setFloorColor: (value: string) => void = () => { },
        setFloorWireframe: (value: boolean) => void = () => { }
    ) {
        this.backgroundColor = backgroundColor;
        this.axesHelper = axesHelper;
        this.lockPiles = lockPiles;
        this.showFloor = showFloor;
        this.floorColor = floorColor;
        this.floorWireframe = floorWireframe;
        this.setAxesHelper = setAxesHelper;
        this.setBackgroundColor = setBackgroundColor;
        this.setLockPiles = setLockPiles;
        this.setShowFloor = setShowFloor;
        this.setFloorColor = setFloorColor;
        this.setFloorWireframe = setFloorWireframe;
    }
}
