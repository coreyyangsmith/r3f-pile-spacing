/*
Date: 2024-02-21
Author: Corey Yang-Smith
File: GroupRadialConfigurator.ts
Type: Data Component

Description:
This is a Data Component for the Pile object.
It configures the radial spacing of all Piles objects.
*/

// Imports
import { Paper, Stack, TextField, Typography } from '@mui/material'
import { ChangeEvent } from 'react';

// Hooks
import { usePiles } from '../../../hooks/usePiles';

const GroupRadialConfigurator = () => {
    const piles = usePiles();

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const newRadius = parseFloat(event.target.value);

        if (piles?.piles) {
            for (let i = 0; i < piles?.piles.number; i++) {
                piles?.piles.piles[i].setRadius(newRadius);
            }
        }
    }

    const getRadius = () => {
        if (piles?.piles) {
            let radius: number | string;
            radius = piles?.piles.piles[0].radius;

            for (let i = 1; i < piles?.piles.number; i++) {
                if (radius === piles?.piles.piles[i].radius) {
                    radius = piles?.piles.piles[i].radius;
                } else {
                    radius = 'varies';
                    break;
                }
            }
            return radius;
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
                <Typography variant="body1" color='white' sx={{ paddingLeft: "16px" }}>Radius</Typography>
                <TextField size='small'
                    type='number'
                    variant='standard'
                    color='primary'
                    onChange={handleChange}
                    value={getRadius}
                    sx={{ input: { color: 'white', textAlign: 'right', paddingRight: '16px' }, width: "150px" }} />
            </Stack>
        </Paper>
    )
}

export default GroupRadialConfigurator