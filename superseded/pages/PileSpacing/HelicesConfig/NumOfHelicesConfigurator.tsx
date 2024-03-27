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
import React from 'react';
import { HelixContextState } from '../../../types/Helix';
import { Pile } from '../../../components/Pile';
import { Helices, Helix } from '../../../components/Helix';


const NumOfHelicesConfigurator = () => {

    const piles = usePiles();
    const helices = useHelices();
    const selection = useSelection();

    let selectedHelixGroup = useHelicesFromPileId(selection?.state.selection.selectedPile.id);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newHelixCount = parseInt(event.target.value);

        // Valid Input
        if (newHelixCount !== undefined &&
            newHelixCount > -1) {

            const updatedHelices: Helices[] = [...helices?.state.helices as Helices[]]

            // Originally Zero, Create new group
            if (selectedHelixGroup === null) {
                selectedHelixGroup = new Helices(
                    [
                        new Helix(
                            0,
                            0,
                            1,
                            0.1,
                            0.5,
                            1,
                            64,
                            0.5,
                            0,
                            0,
                            0,
                            0,
                        )
                    ],
                    1,
                    1,
                    selection?.state.selection.selectedPile as Pile,
                )
                updatedHelices.push(selectedHelixGroup)
            }
            // Increasing
            else if (newHelixCount > selectedHelixGroup?.helices.length) {
                // Update Helix Group
                selectedHelixGroup?.addNewHelix();
            }
            // Decreasing
            else {
                selectedHelixGroup?.removeLastHelix();
            }

            // Set Helices
            helices?.setState({ helices: updatedHelices } as HelixContextState)


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
                    value={selectedHelixGroup?.helices.length as number || 0}
                    sx={{ input: { color: 'white', textAlign: 'right', paddingRight: '16px' }, width: "150px" }} />
            </Stack>
        </Paper>
    )
}

export default NumOfHelicesConfigurator