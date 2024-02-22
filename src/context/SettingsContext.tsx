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
        setAxesHelper: () => { },
        setBackgroundColor: () => { },
    });

    return (
        <SettingsContext.Provider value={{ settings, setSettings }}>
            {children}
        </SettingsContext.Provider>
    )
}
