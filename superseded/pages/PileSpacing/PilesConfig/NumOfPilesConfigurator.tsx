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
import { Pile, Piles } from '../../../../src/components/Pile';

// Context
import { usePiles } from '../../../../src/hooks/usePiles';
import { PileContextState } from '../../../../src/types/Pile';

const NumOfPilesConfigurator = () => {
    const piles = usePiles();

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const newNumber = parseInt(event.target.value);

        if (newNumber !== undefined
            && newNumber > 0
            && piles?.state.piles.spacingRadius !== undefined
            && piles?.state.piles.piles) {



            const newPileArray: Pile[] = [];

            if (newNumber > piles?.state.piles.number) {
                // Incrementing Pile Counts
                // Copy Old Piles & Initialize
                for (let i = 0; i < newNumber - 1; i++) {
                    newPileArray.push(new Pile(
                        i,
                        piles?.state.piles.piles[i].length,
                        piles?.state.piles.piles[i].diameter,
                        piles?.state.piles.piles[i].batterAngle,
                        null,
                        piles?.state.piles.piles[i].x,
                        piles?.state.piles.piles[i].y,
                        piles?.state.piles.piles[i].z,
                        piles?.state.piles.piles[i].rotation
                    ));
                    newPileArray.push(new Pile(
                        newNumber - 1,
                        piles?.state.piles.piles[0].length,
                        piles?.state.piles.piles[0].diameter,
                        piles?.state.piles.piles[0].batterAngle,
                        null,
                        0,
                        0,
                        0,
                        0));
                }
            } else {
                // Decreasing Pile Counts
                // Copy Old Piles
                for (let i = 0; i < newNumber; i++) {
                    newPileArray.push(new Pile(
                        i,
                        piles?.state.piles.piles[i].length,
                        piles?.state.piles.piles[i].diameter,
                        piles?.state.piles.piles[i].batterAngle,
                        null,
                        piles?.state.piles.piles[i].x,
                        piles?.state.piles.piles[i].y,
                        piles?.state.piles.piles[i].z,
                        piles?.state.piles.piles[i].rotation
                    ));
                }
            }
            const newPiles: Piles = {
                piles: newPileArray,
                number: parseInt(event.target.value),
                spacingRadius: piles?.state.piles.spacingRadius as number,

                addPile: () => { },
                removePile: () => { }
            }
            piles?.setState({ piles: newPiles } as PileContextState)
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
                    value={piles?.state.piles.number}
                    sx={{ input: { color: 'white', textAlign: 'right', paddingRight: '16px' }, width: "150px" }} />
            </Stack>
        </Paper>
    )
}

export default NumOfPilesConfigurator