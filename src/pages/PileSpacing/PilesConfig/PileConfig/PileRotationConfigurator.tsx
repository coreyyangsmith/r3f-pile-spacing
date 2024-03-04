/*
Date: 2024-02-29
Author: Corey Yang-Smith
File: PileRotationConfigurator.ts
Type: Data Component

Description:
This is a Data Component for individual Pile Objects.
This component configures the rotation for specific Piles.
*/

// Imports
import { Paper, Stack, TextField, Typography } from "@mui/material"

// Context Hooks
import { usePiles } from "../../../../hooks/usePiles"
import { useSettings } from "../../../../hooks/useSettings"

// Components
import { Pile } from "../../../../components/Pile"

// Types 
type props = {
    selectedPile: number
}

const PileRotationConfigurator = (props: props) => {

    const piles = usePiles()
    const settings = useSettings()

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newRotation = parseFloat(event.target.value) * (Math.PI / 180);
        if (newRotation !== undefined && piles?.piles) {
            if (settings?.settings.lockPiles) return

            const newPileArray: Pile[] = [];

            for (let i = 0; i < piles?.piles.number; i++) {
                let newPile: Pile;
                if (i === props.selectedPile) {
                    newPile = new Pile(
                        i,
                        piles.piles.piles[i].length,
                        piles.piles.piles[i].diameter,
                        piles.piles.piles[i].batterAngle,
                        null,
                        piles.piles.piles[i].x,
                        piles.piles.piles[i].y,
                        piles.piles.piles[i].z,
                        newRotation,
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

    const getPileRotation = (selectedPile: number) => {
        let rotation: number = 0;
        if (selectedPile !== undefined && piles?.piles) {
            rotation = piles?.piles.piles[selectedPile].rotation;
            rotation *= (180 / Math.PI);
            rotation = parseFloat(rotation.toFixed(2));
        }
        return rotation;
    }

    return (
        <Paper square={true}
            sx={{
                background: 'rgba(255,255,255,0.0)',
                width: '100%',
            }}>
            <Typography>Rotation</Typography>
            <Stack direction='row'>
                <Typography sx={{ paddingRight: '16px' }}>Angle (deg)</Typography>
                <TextField
                    type='number'
                    variant="standard"
                    value={getPileRotation(props.selectedPile)}
                    onChange={handleChange} />
            </Stack>
        </Paper>
    )
}

export default PileRotationConfigurator