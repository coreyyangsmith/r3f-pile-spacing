/*
Date: 2024-02-21
Author: Corey Yang-Smith
File: GroupLengthConfigurator.ts
Type: Data Component

Description:
This is a Data Component for the Pile object.
It configures the length of all Pile objects.
*/

// Imports
import { Paper, Stack, TextField, Typography } from '@mui/material'
import { ChangeEvent } from 'react';

// Hooks
import { usePiles } from '../../../hooks/usePiles';

const GroupLengthConfigurator = () => {
    const piles = usePiles();

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const newLength = parseFloat(event.target.value);

        if (piles?.piles) {
            for (let i = 0; i < piles?.piles.number; i++) {
                piles?.piles.piles[i].setLength(newLength);
            }
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
                <Typography variant="body1" color='white' sx={{ paddingLeft: "16px" }}>Length</Typography>
                <TextField size='small'
                    type='number'
                    variant='standard'
                    color='primary'
                    onChange={handleChange}
                    value={length} // to change?
                    sx={{ input: { color: 'white', textAlign: 'right', paddingRight: '16px' }, width: "150px" }} />
            </Stack>
        </Paper>
    )
}

export default GroupLengthConfigurator