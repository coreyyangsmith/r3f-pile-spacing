/*
Date: 2024-02-21
Author: Corey Yang-Smith
File: PileConfig.tsx
Type: Layout Component

Description:
This is a layout component for the Individual Pile Configuration,
This is the parent component for all the individual pile configuration
components. It is a paper for the user to input general information that affects
and generates all related piles in the visualization.
*/

// Import
import { Button, Paper, Stack, Typography } from '@mui/material'
import { useState } from 'react';

// Hooks
import { usePiles } from '../../../../hooks/usePiles';
import PileConfigContainer from './PileConfigContainer';
import { useSelection } from '../../../../hooks/useSelection';
import { ISelection } from '../../../../types/Selection';

// TODO Extract Common MUI Components to a separate file
const PileConfig = () => {
    const selection = useSelection();
    const [selectedPile, setSelectedPile] = useState<number>(0);
    const piles = usePiles();

    const handlePileSelection = (pileId: number) => {
        setSelectedPile(pileId);

        if (selection?.selection) {

            const newSelection: ISelection = {
                selectedPile: pileId,
                selectedHelix: selection.selection.selectedHelix,

                setSelectedPile: selection.selection.setSelectedPile,
                setSelectedHelix: selection.selection.setSelectedHelix
            }
            selection.setSelection(newSelection);
        }

    }

    const generateIndividualPileSelection = () => {
        if (!piles) return (<>Error</>)

        return piles.piles.piles.map((pile, i) => {
            return (
                <Button className={i == selectedPile && 'active' || ''} key={i} onClick={() => { handlePileSelection(i) }}> Pile {i + 1}</Button >
            )
        })
    }

    return (
        <Paper
            square={true}
            variant='outlined'
            sx={{
                position: 'absolute',
                top: 'calc(75%)',
                zIndex: 10,
                background: 'rgba(255, 255, 255, 0.1)',
                margin: '16px',
                width: 'calc(100% - 32px)',
                height: 'calc(25% - 32px)',
            }}
        >
            <Typography variant='h6' sx={{
                marginLeft: '16px',
                padding: '8px',
                textAlign: 'left',
                color: 'white'
            }}>
                Individual Piles
            </Typography>

            {/* Container */}
            <Stack direction='row' sx={{ border: '1px solid green', width: '100%', height: 'calc(100% - 48px)' }}>
                {/* Pile Selection */}
                <Stack direction='column' sx={{ overflowY: 'scroll', border: '1px solid red', height: '100%' }}>
                    {generateIndividualPileSelection()}
                </Stack>

                {/* Inidivual Pile Settings */}
                <PileConfigContainer selectedPile={selectedPile} />
            </Stack>
        </Paper>
    )
}

export default PileConfig