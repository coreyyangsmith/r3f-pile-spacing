/*
Date: 2024-02-21
Author: Corey Yang-Smith
File: useSelection.tsx
Type: React Hook

Description:
This is a react hook for the Context API SelectionContext.
*/

// Imports
import { useContext } from "react";
import { SelectionContext } from "../context/SelectionContext";

export const useSelection = () => {
    try {
        const context = useContext(SelectionContext)
        if (context !== null && context !== undefined) {
            return context;
        } else {
            throw new Error('useSelection must be used within a SelectionProvider');
        }
    }
    catch (e) {
        console.log(e);
    }

}