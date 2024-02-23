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

// Types
import { IPiles } from '../../../types/Pile';

// Hooks
import { usePiles } from '../../../hooks/usePiles';

// Components
import Pile from '../../../components/Pile';



const GroupLengthConfigurator = () => {
    const piles = usePiles();

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const newLength = parseFloat(event.target.value);

        if (newLength !== undefined && newLength > 0 && piles?.piles) {
            const newPileArray: Pile[] = [];

            for (let i = 0; i < piles.piles.number; i++) {
                const newPile = new Pile(
                    i,
                    newLength,
                    piles.piles.piles[i].diameter,
                    piles.piles.piles[i].radius,
                    piles.piles.piles[i].batterAngle,
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

    const getLength = () => {
        if (piles?.piles) {
            let length: number | string;
            length = piles?.piles.piles[0].length;

            for (let i = 1; i < piles.piles.number; i++) {
                if (length === piles.piles.piles[i].length) {
                    length = piles.piles.piles[i].length;
                } else {
                    length = 'varies';
                    break;
                }
            }
            return length;
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
                <Typography variant="body1" color='white' sx={{ paddingLeft: "16px" }}>Length</Typography>
                <TextField size='small'
                    type='number'
                    variant='standard'
                    color='primary'
                    onChange={handleChange}
                    value={getLength()} // to change?
                    sx={{ input: { color: 'white', textAlign: 'right', paddingRight: '16px' }, width: "150px" }} />
            </Stack>
        </Paper>
    )
}

export default GroupLengthConfigurator