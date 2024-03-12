import { Button, Paper, Stack, Typography } from '@mui/material'
import { usePiles } from '../../../../hooks/usePiles';
import { useHelices } from '../../../../hooks/useHelices';
import { useSelection } from '../../../../hooks/useSelection';
import { ISelection, SelectionContextState } from '../../../../types/Selection';
import { getHelixObjectFromPileAndHelixId, getPileObjectFromPileId } from '../../../../utils/PileUtils';
import { Piles } from '../../../../components/Pile';
import { Helices } from '../../../../components/Helix';
import HelixConfigContainer from './HelixConfigContainer';

const HelixConfig = () => {

    const piles = usePiles();
    const helices = useHelices()
    const selection = useSelection()

    const handlePileSelection = (pileId: number) => {
        const currentPileId = selection?.state.selection.selectedPile?.id;

        // If select currently selected, then deselect, else select Pile
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

    const handleHelixSelection = (helixId: number) => {
        const currentHelixId = selection?.state.selection.selectedHelix?.id;

        // If select currently selected, then deselect, else select Helix
        if (currentHelixId === helixId) {
            const newSelection: ISelection = {
                selectedPile: selection!.state.selection.selectedPile,
                selectedHelix: null,
            }
            if (selection) selection.setState({ selection: newSelection } as SelectionContextState);
        }
        else {
            const helix = getHelixObjectFromPileAndHelixId(
                helices?.state.helices as Helices[],
                selection?.state.selection.selectedPile?.id as number,
                helixId);

            const newSelection: ISelection = {
                selectedPile: selection!.state.selection.selectedPile,
                selectedHelix: helix,
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

    const generateIndividualHelixSelection = () => {
        if (!piles) return (<>Error</>)
        if (!helices) return (<>Error</>)
        if (selection?.state.selection.selectedPile === null) return (<>No Pile Selected</>)

        const matchingHelices = helices.state.helices.filter(helices => (helices.pileRef && selection) && helices.pileRef.id === selection?.state.selection.selectedPile?.id)

        if (matchingHelices.length <= 0) return (<></>)

        return matchingHelices[0].helices.map((helix, i) => {
            return (
                <Button className={i == selection?.state.selection.selectedHelix?.id && 'active' || ''} key={i} onClick={() => { handleHelixSelection(i) }}> Helix {i + 1}</Button >
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

                <Stack direction='column' sx={{ overflowY: 'scroll', border: '1px solid red', height: '100%' }}>
                    {generateIndividualHelixSelection()}
                </Stack>

                {/* Inidivual Helix Settings */}
                <HelixConfigContainer />

            </Stack>
        </Paper>
    )
}

export default HelixConfig