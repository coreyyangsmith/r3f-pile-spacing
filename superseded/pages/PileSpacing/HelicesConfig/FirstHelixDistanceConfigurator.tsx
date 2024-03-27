import { Paper, Stack, TextField, Typography } from '@mui/material'
import { useHelices } from '../../../hooks/useHelices';
import { useSelection } from '../../../hooks/useSelection';
import { useHelicesFromPileId } from '../../../hooks/useHelicesFromPileId';
import React from 'react';
import { Helices } from '../../../components/Helix';
import { HelixContextState } from '../../../types/Helix';


const FirstHelixDistanceConfigurator = () => {

    const helices = useHelices();
    const selection = useSelection();

    const selectedHelixGroup = useHelicesFromPileId(selection?.state.selection.selectedPile.id);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newFirstHelixDistance = parseFloat(event.target.value);

        // Valid Input
        if (selectedHelixGroup === null) return;

        const updatedHelices: Helices[] = [...helices?.state.helices as Helices[]]

        selectedHelixGroup.distanceFromBottom = newFirstHelixDistance;

        // Set Helices
        helices?.setState({ helices: updatedHelices } as HelixContextState)
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
                <Typography variant="body1" color='white' sx={{ paddingLeft: "16px" }}>First Helix Distance from Bottom</Typography>
                <TextField size='small'
                    type='number'
                    variant='standard'
                    color='primary'
                    onChange={handleChange}
                    value={selectedHelixGroup?.distanceFromBottom as number || 0}
                    sx={{ input: { color: 'white', textAlign: 'right', paddingRight: '16px' }, width: "150px" }} />
            </Stack>
        </Paper>
    )
}

export default FirstHelixDistanceConfigurator