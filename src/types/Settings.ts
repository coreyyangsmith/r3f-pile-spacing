/*
Date: 2024-02-21
Author: Corey Yang-Smith
File: Settings.ts
Type: Type Definition

Description:
This is a Type Definition for the Settings object.
It is a core object in the Pile Visualization.
*/

import { Dispatch, SetStateAction } from "react";
import Settings from "../components/Settings";

export interface ISettings {
    // General Settings
    backgroundColor: string;
    axesHelper: boolean;
    lockPiles: boolean;

    // Floor Settings
    showFloor: boolean,
    floorColor: string,
    floorWireframe: boolean,
}

export type SettingsContextState = {
    settings: Settings;
}

export type SettingsContextValue = {
    state: SettingsContextState;
    setState: Dispatch<SetStateAction<SettingsContextState>>;
}