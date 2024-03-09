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

// Components
import { Pile, Piles } from '../../../components/Pile';
import { PileContextState } from '../../../types/Pile';

const GroupRadialConfigurator = () => {
    const piles = usePiles();

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const newRadius = parseFloat(event.target.value);

        if (newRadius !== undefined && newRadius > 0 && piles?.state.piles) {
            const newPileArray: Pile[] = [];

            for (let i = 0; i < piles?.state.piles.number; i++) {
                const newPile = new Pile(
                    i,
                    piles?.state.piles.piles[i].length,
                    piles?.state.piles.piles[i].diameter,
                    piles?.state.piles.piles[i].batterAngle,
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
                number: piles?.state.piles.number,
                spacingRadius: newRadius,

                addPile: () => { },
                removePile: () => { }
            }

            piles.setState({ piles: newPiles } as PileContextState)
        }
    }

    const getRadius = () => {
        if (piles?.state.piles) {
            const radius: number | string = piles?.state.piles.spacingRadius;
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
                    value={getRadius()}
                    sx={{ input: { color: 'white', textAlign: 'right', paddingRight: '16px' }, width: "150px" }} />
            </Stack>
        </Paper>
    )
}

export default GroupRadialConfigurator