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

export const SettingsContext = createContext<SettingsContextValue>({
    state: {
        settings: {
            lockPiles: true,
            showFloor: true,
            floorColor: '#121212',
            backgroundColor: '#121212',

            floorAxesHelper: false,
            pileAxesHelper: false,
            helixAxesHelper: false,

            floorWireframe: true,
            pileWireframe: false,
            helixWireframe: false,
        }
    },
    setState: () => { }
})

export const SettingsProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
    const [state, setState] = useState<SettingsContextState>({
        settings: new Settings(
            true, //lockPiles: boolean,
            true, //showFloor: boolean,
            '#2060DF', //floorColor: string,
            '#262419', //backgroundColor: string,

            true, //axesHelper: boolean,
            false, //pileAxesHelper: boolean,
            false, //helixAxesHelper: boolean,

            true, //floorWireframe: boolean,
            false, //pileWireframe: boolean,
            false, //helixWireframe: boolean,
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