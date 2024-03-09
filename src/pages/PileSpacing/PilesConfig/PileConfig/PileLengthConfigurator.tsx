/*
Date: 2024-02-29
Author: Corey Yang-Smith
File: PileLengthConfigurator.ts
Type: Data Component

Description:
This is a Data Component for individual Pile Objects.
This component configures the length for specific Piles.
*/

// Imports
import { Paper, Stack, TextField, Typography } from "@mui/material"

// Context Hooks
import { usePiles } from "../../../../hooks/usePiles"
import { useSettings } from "../../../../hooks/useSettings"

// Components
import { Pile, Piles } from "../../../../components/Pile"
import { useSelection } from "../../../../hooks/useSelection"
import { PileContextState } from "../../../../types/Pile"
import { getPileObjectFromPileId } from "../../../../utils/PileUtils"

const PileLengthConfigurator = () => {

    const piles = usePiles()
    const settings = useSettings()
    const selection = useSelection();

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newLength = parseFloat(event.target.value);
        if (newLength !== undefined && selection?.state.selection.selectedPile !== undefined) {
            if (settings?.state.settings?.lockPiles) return

            const newPileArray: Pile[] = [];

            for (let i = 0; i < piles!.state.piles.number; i++) {
                let newPile: Pile;
                if (selection.state.selection.selectedPile && i === selection.state.selection.selectedPile.id) {
                    newPile = new Pile(
                        i,
                        newLength,
                        piles?.state.piles.piles[i].diameter,
                        piles?.state.piles.piles[i].batterAngle,
                        null,
                        piles?.state.piles.piles[i].x,
                        piles?.state.piles.piles[i].y,
                        piles?.state.piles.piles[i].z,
                        piles?.state.piles.piles[i].rotation,
                    )
                } else {
                    newPile = new Pile(
                        i,
                        piles?.state.piles.piles[i].length,
                        piles?.state.piles.piles[i].diameter,
                        piles?.state.piles.piles[i].batterAngle,
                        null,
                        piles?.state.piles.piles[i].x,
                        piles?.state.piles.piles[i].y,
                        piles?.state.piles.piles[i].z,
                        piles?.state.piles.piles[i].rotation,
                    )
                }
                newPileArray.push(newPile);
            }
            const newPiles: Piles = {
                piles: newPileArray,
                number: piles?.state.piles.number as number,
                spacingRadius: piles?.state.piles.spacingRadius as number,

                addPile: () => { },
                removePile: () => { },
            }
            piles!.setState({ piles: newPiles } as PileContextState)

            // Update Selection
            const selectedPileId = selection!.state.selection.selectedPile?.id as number;
            const newSelectedPile = getPileObjectFromPileId(newPiles, selectedPileId);
            selection!.setState({
                selection: {
                    selectedPile: newSelectedPile,
                    selectedHelix: null,
                }
            });
        }
    }

    const getPileLength = () => {
        if (selection?.state.selection.selectedPile?.length) return selection?.state.selection.selectedPile?.length;
        else return ''
    }

    return (
        <Paper square={true}
            sx={{
                background: 'rgba(255,255,255,0.0)',
                width: '100%',
            }}>
            <Typography>Pile Length</Typography>
            <Stack direction='row'>
                <Typography sx={{ paddingRight: '16px' }}>Length (m)</Typography>
                <TextField
                    type='number'
                    variant="standard"
                    value={getPileLength()}
                    onChange={handleChange} />
            </Stack>
        </Paper>
    )
}

export default PileLengthConfigurator