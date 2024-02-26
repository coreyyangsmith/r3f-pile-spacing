/*
Date: 2024-02-21
Author: Corey Yang-Smith
File: NumOfPilesConfigurator.tsx
Type: Data Component

Description:
This is a data component that affects the total number of piles
in a the group configuration. It is a paper component with a
title, and a text field for the user to input the number of piles.
*/

// Imports
import { Paper, Stack, TextField, Typography } from '@mui/material'
import { ChangeEvent } from 'react';

// Components
import { Pile, Piles } from '../../../components/Pile';

// Context
import { usePiles } from '../../../hooks/usePiles';

const NumOfPilesConfigurator = () => {
    const piles = usePiles();

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const newNumber = parseInt(event.target.value);
        piles?.piles.setNumber(newNumber); // set Number of Piles for Configurator

        if (newNumber !== undefined
            && newNumber > 0
            && piles?.piles.spacingRadius !== undefined && piles?.piles.piles) {
            const newPileArray: Pile[] = [];

            // Previous Piles
            for (let i = 0; i < newNumber - 1; i++) {
                console.log(piles?.piles.piles[i])
                // Sets to zero-index values
                const newPile = new Pile(
                    i,
                    piles?.piles.piles[i].length,
                    piles?.piles.piles[i].diameter,
                    piles?.piles.piles[i].batterAngle,
                    null,
                    piles?.piles.piles[i].x,
                    piles?.piles.piles[i].y,
                    piles?.piles.piles[i].z,
                    piles?.piles.piles[i].rotation
                );
                newPileArray.push(newPile);
            }

            // New Piles
            const newPile = new Pile(
                newNumber,
                piles?.piles.piles[newNumber - 2].length,
                piles?.piles.piles[newNumber - 2].diameter,
                piles?.piles.piles[newNumber - 2].batterAngle,
                null,
                0,
                0,
                0,
                0,
            )
            newPileArray.push(newPile);

            const newPiles: Piles = {
                piles: newPileArray,
                number: parseInt(event.target.value),
                spacingRadius: piles?.piles.spacingRadius,

                setPiles: () => { },
                setNumber: () => { },
                setSpacingRadius: () => { }
            }
            piles?.setPiles(newPiles)
        }
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
                <Typography variant="body1" color='white' sx={{ paddingLeft: "16px" }}>Count</Typography>
                <TextField size='small'
                    type='number'
                    variant='standard'
                    color='primary'
                    onChange={handleChange}
                    value={piles?.piles.number}
                    sx={{ input: { color: 'white', textAlign: 'right', paddingRight: '16px' }, width: "150px" }} />
            </Stack>
        </Paper>
    )
}

export default NumOfPilesConfigurator