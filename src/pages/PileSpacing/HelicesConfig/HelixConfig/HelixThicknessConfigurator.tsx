/*
Date: 2024-03-10
Author: Corey Yang-Smith
File: HelixThicknessConfigurator.tsx
Type: Data Component

Description:
This is a Data Component for individual Helix Object.
This component configures the thicknes for a specific Helix.
*/

// Import
import { Paper, Stack, TextField, Typography } from '@mui/material'
import { Helices, Helix } from '../../../../components/Helix';

// Context
import { useSettings } from '../../../../hooks/useSettings';
import { useSelection } from '../../../../hooks/useSelection';
import { useHelices } from '../../../../hooks/useHelices';
import { HelixContextState } from '../../../../types/Helix';

// Utils
import { getHelixGroupFromPileId } from '../../../../utils/PileUtils';

const HelixThicknessConfigurator = () => {

    const settings = useSettings()
    const selection = useSelection();
    const helices = useHelices();

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newThickness = parseFloat(event.target.value);
        if (newThickness !== undefined &&
            selection?.state.selection.selectedHelix?.id !== undefined
            && newThickness > 0) {
            if (settings?.state.settings?.lockPiles) return

            // Get Reference
            const selectedHelixGroup: Helices = getHelixGroupFromPileId(
                helices?.state.helices as Helices[],
                selection.state.selection.selectedPile?.id as number
            )

            // Update Helices
            const newHelixArray: Helix[] = [...selectedHelixGroup.helices];
            newHelixArray[selection.state.selection.selectedHelix?.id as number].thickness = newThickness;

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

    const getHelixThickness = () => {
        if (selection?.state.selection.selectedHelix?.thickness) return selection?.state.selection.selectedHelix?.thickness;
        else return ''
    }

    return (
        <Paper square={true}
            sx={{
                background: 'rgba(255,255,255,0.0)',
                width: '100%',
            }}>
            <Typography>Thickness</Typography>
            <Stack direction='row'>
                <Typography sx={{ paddingRight: '16px' }}> (m)</Typography>
                <TextField
                    type='number'
                    variant="standard"
                    value={getHelixThickness()}
                    onChange={handleChange} />
            </Stack>
        </Paper>
    )
}

export default HelixThicknessConfigurator