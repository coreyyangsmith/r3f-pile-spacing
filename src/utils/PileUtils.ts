import { Piles } from '../components/Pile.ts';

export function getPileObjectFromPileId(piles: Piles, pileId: number) {
    return piles.piles[pileId];
}