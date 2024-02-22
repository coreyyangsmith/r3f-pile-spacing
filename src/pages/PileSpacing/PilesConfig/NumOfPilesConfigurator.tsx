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
import { useCustomization } from '../../../context/Customization';
import { usePiles } from '../../../context/PileContext';

const NumOfPilesConfigurator = () => {
    const {
        number,
        setNumber,
        length,
        diameter,
        radius,
        batterAngle
    } = useCustomization();
    const { setPiles } = usePiles();

    const handleChange = (event) => {
        setNumber(event.target.value); // set Number of Piles for Configurator
        //


        const newPiles = {}
        for (let i = 0; i < number; i++) {
            newPiles[i] = new Pile(length, diameter, radius, batterAngle);
        }
        setPiles(newPiles)
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
                    value={number}
                    sx={{ input: { color: 'white', textAlign: 'right', paddingRight: '16px' }, width: "150px" }} />
            </Stack>
        </Paper>
    )
}

export default NumOfPilesConfigurator