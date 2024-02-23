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

// Types
import { IPiles } from '../../../types/Pile';

// Hooks
import { usePiles } from '../../../hooks/usePiles';

// Components
import Pile from '../../../components/Pile';

const GroupBatterConfigurator = () => {
    const piles = usePiles()

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const newBatterAngle = parseFloat(event.target.value);

        if (newBatterAngle !== undefined && newBatterAngle > 0 && piles?.piles) {
            const newPileArray: Pile[] = [];

            for (let i = 0; i < piles.piles.number; i++) {
                const newPile = new Pile(
                    i,
                    piles.piles.piles[i].length,
                    piles.piles.piles[i].diameter,
                    piles.piles.piles[i].radius,
                    newBatterAngle,
                    null,
                );
                newPileArray.push(newPile);
            }

            const newPiles: IPiles = {
                piles: newPileArray,
                number: piles.piles.number,
                setPiles: () => { },
                setNumber: () => { }
            }

            piles.setPiles(newPiles)
        }
    }


    const getBatterAngle = () => {
        if (piles?.piles) {
            let batterAngle: number | string;
            batterAngle = piles?.piles.piles[0].batterAngle;

            for (let i = 1; i < piles?.piles.number; i++) {
                if (batterAngle === piles?.piles.piles[i].batterAngle) {
                    batterAngle = piles?.piles.piles[i].batterAngle;
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