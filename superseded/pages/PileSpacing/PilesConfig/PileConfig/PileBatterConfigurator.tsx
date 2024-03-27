/*
Date: 2024-02-29
Author: Corey Yang-Smith
File: PileBatterConfigurator.ts
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

const PileBatterConfigurator = () => {

    const piles = usePiles()
    const settings = useSettings()
    const selection = useSelection();

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newBatterAngle = parseFloat(event.target.value);
        if (newBatterAngle !== undefined && selection) {
            if (settings?.state.settings.lockPiles) return

            const newPileArray: Pile[] = [];

            for (let i = 0; i < piles!.state.piles.number; i++) {
                let newPile: Pile;
                if (i === selection.state.selection.selectedPile?.id) {
                    newPile = new Pile(
                        i,
                        piles?.state.piles.piles[i].length,
                        piles?.state.piles.piles[i].diameter,
                        newBatterAngle,
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

            // Update Piles
            const newPiles: Piles = {
                piles: newPileArray,
                number: piles?.state.piles.number as number,
                spacingRadius: piles?.state.piles.spacingRadius as number,

                addPile: () => { },
                removePile: () => { }

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

    const getPileBatter = () => {
        if (selection?.state.selection.selectedPile?.batterAngle) return selection?.state.selection.selectedPile?.batterAngle;
        else return ''
    }

    return (
        <Paper square={true}
            sx={{
                background: 'rgba(255,255,255,0.0)',
                width: '100%',
            }}>
            <Typography>Batter Angle</Typography>
            <Stack direction='row'>
                <Typography sx={{ paddingRight: '16px' }}>Batter Angle (deg)</Typography>
                <TextField
                    type='number'
                    variant="standard"
                    value={getPileBatter()}
                    onChange={handleChange} />
            </Stack>
        </Paper>
    )
}

export default PileBatterConfigurator