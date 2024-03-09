import { Helices } from '../components/Helix.ts';
import { Piles } from '../components/Pile.ts';

export function getPileObjectFromPileId(piles: Piles, pileId: number) {
    return piles.piles[pileId];
}

export function getHelixObjectFromPileId(helices: Helices[], pileId: number) {
    return helices.filter(helix => helix.pileRef.id === pileId);
}

export function getHelixObjectFromPileAndHelixId(
    helices: Helices[],
    pileId: number,
    helixId: number) {

    const helixGroup = helices.filter(helix => helix.pileRef && helix.pileRef.id === pileId)[0];
    const helix = helixGroup.helices.filter(helix => helix.id === helixId);

    if (helix) return helix[0];
    else return null;
}

export function getHelixGroupFromPileId(helices: Helices[], pileId: number): Helices {
    return helices.filter(helix => helix.pileRef.id === pileId)[0];
}