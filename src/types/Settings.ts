/*
Date: 2024-02-21
Author: Corey Yang-Smith
File: Settings.ts
Type: Type Definition

Description:
This is a Type Definition for the Settings object.
It is a core object in the Pile Visualization.
*/

export interface ISettings {
    backgroundColor: string;
    axesHelper: boolean;
    setAxesHelper: (value: boolean) => void;
    setBackgroundColor: (value: string) => void;
}

export type SettingsContextType = {
    settings: ISettings;
    setSettings: (settings: ISettings) => void;
}

export type setSettings = (settings: ISettings) => void;