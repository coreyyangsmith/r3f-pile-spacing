/*
Date: 2024-03-10
Author: Corey Yang-Smith
File: HelixRotationsConfigurator.tsx
Type: Data Component

Description:
This is a Data Component for individual Helix Object.
This component configures the rotations for a specific Helix.
*/

// Import
import { Paper, Stack, TextField, Typography } from '@mui/material'

// Context
import { useSettings } from '../../../../hooks/useSettings';
import { useSelection } from '../../../../hooks/useSelection';
import { useHelices } from '../../../../hooks/useHelices';
import { HelixContextState } from '../../../../types/Helix';

// Objects
import { Helices, Helix } from '../../../../components/Helix';

// Utils
import { getHelixGroupFromPileId } from '../../../../utils/PileUtils';


const HelixRotationsConfigurator = () => {

    const settings = useSettings()
    const selection = useSelection();
    const helices = useHelices();

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newRotations = parseFloat(event.target.value);
        if (newRotations !== undefined &&
            selection?.state.selection.selectedHelix?.id !== undefined
            && newRotations > 0) {
            if (settings?.state.settings?.lockPiles) return

            // Get Reference
            const selectedHelixGroup: Helices = getHelixGroupFromPileId(
                helices?.state.helices as Helices[],
                selection.state.selection.selectedPile?.id as number
            )

            // Update Helices
            const newHelixArray: Helix[] = [...selectedHelixGroup.helices];
            newHelixArray[selection.state.selection.selectedHelix?.id as number].rotations = newRotations;

            const newHelices: Helices = {
                helices: newHelixArray,
                distanceFromBottom: selectedHelixGroup.distanceFromBottom,
                spacing: selectedHelixGroup.spacing,
                pileRef: selectedHelixGroup.pileRef,

                addNewHelix: () => { },
            }

            const newHelicesArray: Helices[] = [...helices?.state.helices as Helices[]]
            const matchingHelicesGroupId = helices?.state.helices.findIndex((helices) => helices.pileRef === selectedHelixGroup.pileRef) as number
            if (matchingHelicesGroupId != -1) newHelicesArray[matchingHelicesGroupId] = newHelices;
            newHelicesArray[selection.state.selection.selectedPile?.id as number] = newHelices;

            helices?.setState({ helices: newHelicesArray } as HelixContextState)
        }

    }

    const getHelixRotations = () => {
        if (selection?.state.selection.selectedHelix?.rotations) return selection?.state.selection.selectedHelix?.rotations;
        else return ''
    }

    return (
        <Paper square={true}
            sx={{
                background: 'rgba(255,255,255,0.0)',
                width: '100%',
            }}>
            <Typography>Rotations</Typography>
            <Stack direction='row'>
                <Typography sx={{ paddingRight: '16px' }}>(ea)</Typography>
                <TextField
                    type='number'
                    variant="standard"
                    value={getHelixRotations()}
                    onChange={handleChange} />
            </Stack>
        </Paper>
    )
}

export default HelixRotationsConfigurator