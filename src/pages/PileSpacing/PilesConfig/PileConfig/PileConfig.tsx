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

// Hooks
import { usePiles } from '../../../../hooks/usePiles';
import PileConfigContainer from './PileConfigContainer';
import { useSelection } from '../../../../hooks/useSelection';
import { ISelection, SelectionContextState } from '../../../../types/Selection';
import { getPileObjectFromPileId } from '../../../../utils/PileUtils';
import { Piles } from '../../../../components/Pile';

const PileConfig = () => {
    // State

    // Context
    const selection = useSelection();
    const piles = usePiles();

    const handlePileSelection = (pileId: number) => {
        const currentPileId = selection?.state.selection.selectedPile?.id;

        // If select currently selected, then deselect, else select pile
        if (currentPileId === pileId) {
            const newSelection: ISelection = {
                selectedPile: null,
                selectedHelix: null,
            }
            if (selection) selection.setState({ selection: newSelection } as SelectionContextState);
        }
        else {
            const pile = getPileObjectFromPileId(piles?.state.piles as Piles, pileId);
            const newSelection: ISelection = {
                selectedPile: pile,
                selectedHelix: null,
            }
            if (selection) selection.setState({ selection: newSelection } as SelectionContextState);
        }

    }

    const generateIndividualPileSelection = () => {
        if (!piles) return (<>Error</>)

        return piles.state.piles.piles.map((pile, i) => {
            return (
                <Button className={i == selection?.state.selection.selectedPile?.id && 'active' || ''} key={i} onClick={() => { handlePileSelection(i) }}> Pile {i + 1}</Button >
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
                <PileConfigContainer />
            </Stack>
        </Paper>
    )
}

export default PileConfig