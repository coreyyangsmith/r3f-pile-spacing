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


// Types
type props = {
    selectedPile: number
}

const PileBatterConfigurator = (props: props) => {

    const piles = usePiles()
    const settings = useSettings()

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newBatterAngle = parseFloat(event.target.value);
        if (newBatterAngle !== undefined && piles?.piles) {
            if (settings?.settings.lockPiles) return

            const newPileArray: Pile[] = [];

            for (let i = 0; i < piles?.piles.number; i++) {
                let newPile: Pile;
                if (i === props.selectedPile) {
                    newPile = new Pile(
                        i,
                        piles.piles.piles[i].length,
                        piles.piles.piles[i].diameter,
                        newBatterAngle,
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

    const getPileBatter = (selectedPile: number) => {
        let batterAngle: number = 0;
        if (selectedPile !== undefined && piles?.piles) {
            batterAngle = piles?.piles.piles[selectedPile].batterAngle;
        }
        return batterAngle;
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
                    value={getPileBatter(props.selectedPile)}
                    onChange={handleChange} />
            </Stack>
        </Paper>
    )
}

export default PileBatterConfigurator