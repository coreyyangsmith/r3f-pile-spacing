/*
Date: 2024-02-21
Author: Corey Yang-Smith
File: useSettings.tsx
Type: React Hook

Description:
This is a react hook for the Context API SettingsContext.
*/

// Imports
import { useContext } from "react";
import { SettingsContext } from "../context/SettingsContext";

export const useSettings = () => {
    try {
        const context = useContext(SettingsContext)
        if (context !== null && context !== undefined) {
            return context;
        } else {
            throw new Error('useSettings must be used within a SettingsProvider');
        }
    }
    catch (e) {
        console.log(e);
    }

}