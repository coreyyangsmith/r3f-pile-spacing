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
    setAxesHelper: (value: boolean) => void;
    setBackgroundColor: (value: string) => void;
    setLockPiles: (value: boolean) => void;

    constructor(
        backgroundColor: string = '#121212',
        axesHelper: boolean = false,
        lockPiles: boolean = true,
        setAxesHelper: (value: boolean) => void = () => { },
        setBackgroundColor: (value: string) => void = () => { },
        setLockPiles: (value: boolean) => void = () => { }
    ) {
        this.backgroundColor = backgroundColor;
        this.axesHelper = axesHelper;
        this.lockPiles = lockPiles;
        this.setAxesHelper = setAxesHelper;
        this.setBackgroundColor = setBackgroundColor;
        this.setLockPiles = setLockPiles;
    }
}
