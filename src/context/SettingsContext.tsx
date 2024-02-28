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
import { ISettings, SettingsContextType } from '../types/Settings.ts'

export const SettingsContext = createContext<SettingsContextType | null>(null);

export const SettingsProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
    const [settings, setSettings] = useState<ISettings>({
        backgroundColor: '#121212',
        axesHelper: true,
        lockPiles: true,
        showFloor: true,
        floorColor: '#121212',
        floorWireframe: true,

        setAxesHelper: () => { },
        setBackgroundColor: () => { },
        setLockPiles: () => { },
        setShowFloor: () => { },
        setFloorColor: () => { },
        setFloorWireframe: () => { }
    });

    return (
        <SettingsContext.Provider value={{ settings, setSettings }}>
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