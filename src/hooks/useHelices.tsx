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
import { HelixContext } from "../context/HelixContext";

export const useHelices = () => {
    const context = useContext(HelixContext)
    return context;
}