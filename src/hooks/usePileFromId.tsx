/*
Date: 2024-02-26
Author: Corey Yang-Smith
File: usePileFromId.tsx
Type: React Hook

Description:
This react hook will return a Pile Object from the PileContext given an id.
*/

// Imports
import { useContext } from "react";
import { PileContext } from "../context/PileContext";

export const usePileFromId = (id: number) => {
    const context = useContext(PileContext);
    const piles = context?.piles.piles;
    const pile = piles?.find(x => x.id === id)

    return pile ? pile : null;
}