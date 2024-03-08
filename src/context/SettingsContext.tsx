/*
Date: 2024-02-21
Author: Corey Yang-Smith
File: SettingsContext.ts
Type: Context Definition

Description:
This is a Context API definition for the Pile object.
It is a core object in the Pile Visualization.
*/

// Imports
import { createContext, useState, FC } from 'react'

// Types
import { SettingsContextValue, SettingsContextState } from '../types/Settings.ts'
import Settings from '../components/Settings.ts';

export const SettingsContext = createContext<SettingsContextValue | null>(null);

export const SettingsProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
    const [state, setState] = useState<SettingsContextState>({
        settings: new Settings(
            '#082c6c', //backgroundColor: string,
            true, //axesHelper: boolean,
            true, //lockPiles: boolean,
            true, //showFloor: boolean,
            '#2069e0', //floorColor: string,
            true, //floorWireframe: boolean,

            () => { }, //setAxesHelper: (value: boolean) => void,
            () => { }, //setBackgroundColor: (value: string) => void,
            () => { }, //setLockPiles: (value: boolean) => void,
            () => { }, //setShowFloor: (value: boolean) => void,
            () => { }, //setFloorColor: (value: string) => void,
            () => { } //setFloorWireframe: (value: boolean) => void
        )
    });

    return (
        <SettingsContext.Provider value={{ state, setState }}>
            {children}
        </SettingsContext.Provider>
    )
}

// TODO
//  * lockPiles: boolean - Locks the piles in place, group effect ONLY
//  * lockHelices - boolean - Locks the helices in place, group effect ONLY
//  * floor controls
//      * color, size, wireframe
//  * wireframe piles


// Some organization below, sketching out categories of the settings (object)

// PILE OBJECT (JS)


// PILE OBJECT (3D)


// PILE OBJECT (MENU)


// SETTINGS OBJECT (MENU)
// Pile Controls
// Helices Controls
// Floor Controls
// - wireframe
// - color
// - size
// Graphics Controls
// - Color
// - Skybox controls
// Debug Controls
// - show asxes helper