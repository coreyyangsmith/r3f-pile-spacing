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

// Components
import Pile from '../../../components/Pile';

// Context
import { usePiles } from '../../../hooks/usePiles';
import { ChangeEvent } from 'react';
import { IPile, IPiles } from '../../../types/Pile';

const NumOfPilesConfigurator = () => {
    const piles = usePiles();

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const newNumber = parseInt(event.target.value);
        piles?.piles.setNumber(newNumber); // set Number of Piles for Configurator

        if (newNumber !== undefined && newNumber > 0) {
            const newPileArray: IPile[] = [];

            for (let i = 0; i < newNumber; i++) {
                const newPile = new Pile(
                    id = i,
                    length = 0,
                    diameter = 0,
                    radius = 0,
                    batterAngle = 0,
                    helices = null,
                    setId = () => { },
                    setLength = () => { },
                    setDiameter = () => { },
                    setRadius = () => { },
                    setBatterAngle = () => { },
                    setHelices = () => { }
                );
                newPileArray.push(newPile);
            }
            const newPiles: IPiles = {
                piles: newPileArray,
                number: parseInt(event.target.value),
                setPiles: () => { },
                setNumber: () => { }
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