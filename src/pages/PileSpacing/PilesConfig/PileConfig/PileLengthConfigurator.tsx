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


// Types
type props = {
    selectedPile: number
}

const PileLengthConfigurator = (props: props) => {

    const piles = usePiles()
    const settings = useSettings()

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newLength = parseFloat(event.target.value);
        if (newLength !== undefined && piles?.piles) {
            if (settings?.settings.lockPiles) return

            const newPileArray: Pile[] = [];

            for (let i = 0; i < piles?.piles.number; i++) {
                let newPile: Pile;
                if (i === props.selectedPile) {
                    newPile = new Pile(
                        i,
                        newLength,
                        piles.piles.piles[i].diameter,
                        piles.piles.piles[i].batterAngle,
                        null,
                        piles.piles.piles[i].x,
                        piles.piles.piles[i].y,
                        piles.piles.piles[i].z,
                        piles.piles.piles[i].rotation,
                    )
                } else {
                    newPile = new Pile(
                        i,
                        piles.piles.piles[i].length,
                        piles.piles.piles[i].diameter,
                        piles.piles.piles[i].batterAngle,
                        null,
                        piles.piles.piles[i].x,
                        piles.piles.piles[i].y,
                        piles.piles.piles[i].z,
                        piles.piles.piles[i].rotation,
                    )
                }
                newPileArray.push(newPile);
            }
            const newPiles: Piles = {
                piles: newPileArray,
                number: piles.piles.number,
                spacingRadius: piles.piles.spacingRadius,

                setPiles: () => { },
                setNumber: () => { },
                setSpacingRadius: () => { }
            }
            piles.setPiles(newPiles)
        }
    }

    const getPileLength = (selectedPile: number) => {
        let length: number = 0;
        if (selectedPile !== undefined && piles?.piles) {
            length = piles?.piles.piles[selectedPile].length;
        }
        return length;
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
                    value={getPileLength(props.selectedPile)}
                    onChange={handleChange} />
            </Stack>
        </Paper>
    )
}

export default PileLengthConfigurator