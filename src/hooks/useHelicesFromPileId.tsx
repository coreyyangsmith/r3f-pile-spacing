/*
Date: 2024-02-26
Author: Corey Yang-Smith
File: useHelicesFromPileId.tsx
Type: React Hook

Description:
This react hook will return a Helix Object given a Pile id.
*/

// Imports
import { useContext } from "react";
import { HelixContext } from "../context/HelixContext";

export const useHelicesFromPileId = (id: number) => {
    const context = useContext(HelixContext);
    const helices = context?.helicesCollection.helicesCollection
    const matchingHelix = helices?.find(x => x.pileRef?.id == id)
    
    return matchingHelix ? matchingHelix : null;
}