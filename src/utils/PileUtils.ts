import { Pile } from '../types/Pile.ts';
/**
 * renegeratePiles
 * @param pile: Piles - the original piles (if any) to be adjusted
 * @param arg; String - the category to be adjusted
 * @param value: number - the new value for the category
 */

// TODO: Implement regeneratePiles
export function regeneratePiles(pile: Piles, category: string, value: number) {
    // if piles length = 0, then just regenerate all
    // else, change only affected category

    const newPiles = {}
    for (let i = 0; i < number; i++) {
        newPiles[i] = new Pile(length,
            diameter,
            radius,
            batterAngle);
    }
    setPiles(newPiles)
}