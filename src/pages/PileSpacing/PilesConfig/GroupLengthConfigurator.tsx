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

// Context
import { usePiles } from '../../../hooks/usePiles';

// Components
import { Pile, Piles } from '../../../components/Pile';
import { PileContextState } from '../../../types/Pile';



const GroupLengthConfigurator = () => {
    const piles = usePiles();

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const newLength = parseFloat(event.target.value);

        if (newLength !== undefined
            && newLength > 0
            && piles?.state.piles.spacingRadius !== undefined) {
            const newPileArray: Pile[] = [];

            for (let i = 0; i < piles.state.piles.number; i++) {
                const newPile = new Pile(
                    i,
                    newLength,
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
                number: piles.state.piles.number,
                spacingRadius: piles.state.piles.spacingRadius,

                addPile: () => { },
                removePile: () => { }
            }

            piles.setState({ piles: newPiles } as PileContextState)
        }
    }

    const getLength = () => {
        if (piles?.state.piles) {
            let length: number | string;
            length = piles?.state.piles.piles[0].length;

            for (let i = 1; i < piles.state.piles.number - 1; i++) {
                if (length === piles.state.piles.piles[i].length) {
                    length = piles.state.piles.piles[i].length;
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
                    value={getLength()}
                    sx={{ input: { color: 'white', textAlign: 'right', paddingRight: '16px' }, width: "150px" }} />
            </Stack>
        </Paper>
    )
}

export default GroupLengthConfigurator