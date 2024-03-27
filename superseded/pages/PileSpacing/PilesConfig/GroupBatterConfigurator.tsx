/*
Date: 2024-02-21
Author: Corey Yang-Smith
File: GroupBatterConfigurator.ts
Type: Data Component

Description:
This is a Data Component for the Pile object.
It configures the batter angle for all Pile objects.
*/

// Imports
import { Paper, Stack, TextField, Typography } from '@mui/material'
import { ChangeEvent } from 'react';

// Hooks
import { usePiles } from '../../../../src/hooks/usePiles';

// Components
import { Pile, Piles } from '../../../../src/components/Pile';
import { PileContextState } from '../../../../src/types/Pile';

const GroupBatterConfigurator = () => {
    const piles = usePiles()

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const newBatterAngle = parseFloat(event.target.value);

        if (newBatterAngle !== undefined && newBatterAngle >= 0 && piles?.state.piles) {
            const newPileArray: Pile[] = [];

            for (let i = 0; i < piles.state.piles.number; i++) {
                const newPile = new Pile(
                    i,
                    piles?.state.piles.piles[i].length,
                    piles?.state.piles.piles[i].diameter,
                    newBatterAngle,
                    null,
                    piles?.state.piles.piles[i].x,
                    piles?.state.piles.piles[i].y,
                    piles?.state.piles.piles[i].z,
                    piles?.state.piles.piles[i].rotation
                );
                newPileArray.push(newPile);
            }

            const newPiles: Piles = {
                piles: newPileArray,
                number: piles.state.piles.number,
                spacingRadius: piles.state.piles.spacingRadius,

                addPile: () => { },
                removePile: () => { }
            }

            piles.setState({ piles: newPiles } as PileContextState)
        }
    }


    const getBatterAngle = () => {
        if (piles?.state.piles) {
            let batterAngle: number | string;
            batterAngle = piles?.state.piles.piles[0].batterAngle;

            for (let i = 1; i < piles?.state.piles.number - 1; i++) {
                if (batterAngle === piles?.state.piles.piles[i].batterAngle) {
                    batterAngle = piles?.state.piles.piles[i].batterAngle;
                } else {
                    batterAngle = 'varies';
                    break;
                }
            }
            return batterAngle;
        }
        return -1;
    }

    return (
        <Paper
            square={true}
            variant='outlined'
            sx={{
                zIndex: 1,
                background: 'rgba(255, 255, 255, .1)',
                marginLeft: "16px",
                marginRight: "16px",
                width: "calc(100% - 32px)",
            }}>
            <Stack direction="row" sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="body1" color='white' sx={{ paddingLeft: "16px" }}>Batter Angle</Typography>
                <TextField size='small'
                    type='number'
                    variant='standard'
                    color='primary'
                    onChange={handleChange}
                    value={getBatterAngle()}
                    sx={{ input: { color: 'white', textAlign: 'right', paddingRight: '16px' }, width: "150px" }} />
            </Stack>
        </Paper>
    )
}

export default GroupBatterConfigurator