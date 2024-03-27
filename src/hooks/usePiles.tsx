/*
Date: 2024-02-21
Author: Corey Yang-Smith
File: usePiles.tsx
Type: React Hook

Description:
This is a react hook for the Context API PileContext.
*/

// Imports
import { useContext } from "react";
import { PileContext } from "../context/PileContext";

export const usePiles = () => {
    const context = useContext(PileContext)
    return context;
}