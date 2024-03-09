/*
Date: 2024-03-05
Author: Corey Yang-Smith
File: NumOfHelicesConfigurator.tsx
Type: Data Component

Description:
This is a Data Component for the Helices Visualization.
It sets the number of helices on a selected pile.
*/

// Imports
import { Paper, Stack, TextField, Typography } from '@mui/material'

// Hooks
import { useSelection } from '../../../hooks/useSelection';
import { usePiles } from '../../../hooks/usePiles';
import { useHelices } from '../../../hooks/useHelices';
import { useHelicesFromPileId } from '../../../hooks/useHelicesFromPileId';


const NumOfHelicesConfigurator = () => {

    const piles = usePiles();
    const helices = useHelices();
    const selection = useSelection();

    const helixGroup = useHelicesFromPileId(selection?.state.selection.selectedPile);

    const handleChange = (event) => {
        helixGroup?.addNewHelix();
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
                    value={helixGroup?.helices.length}
                    sx={{ input: { color: 'white', textAlign: 'right', paddingRight: '16px' }, width: "150px" }} />
            </Stack>
        </Paper>
    )
}

export default NumOfHelicesConfigurator