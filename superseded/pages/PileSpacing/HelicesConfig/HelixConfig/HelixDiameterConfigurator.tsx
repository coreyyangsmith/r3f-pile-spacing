/*
Date: 2024-03-10
Author: Corey Yang-Smith
File: HelixDiameterConfigurator.tsx
Type: Data Component

Description:
This is a Data Component for individual Helix Object.
This component configures the diameter for a specific Helix.
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


const HelixDiameterConfigurator = () => {

    const settings = useSettings()
    const selection = useSelection();
    const helices = useHelices();

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newDiameter = parseFloat(event.target.value);
        if (newDiameter !== undefined &&
            selection?.state.selection.selectedHelix?.id !== undefined
            && newDiameter > 0) {
            if (settings?.state.settings?.lockPiles) return

            // Get Reference
            const selectedHelixGroup: Helices = getHelixGroupFromPileId(
                helices?.state.helices as Helices[],
                selection.state.selection.selectedPile?.id as number
            )

            // Update Helices
            const newHelixArray: Helix[] = [...selectedHelixGroup.helices];
            newHelixArray[selection.state.selection.selectedHelix?.id as number].diameter = newDiameter;

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

    const getHelixDiameter = () => {
        if (selection?.state.selection.selectedHelix?.diameter) return selection?.state.selection.selectedHelix?.diameter;
        else return ''
    }

    return (
        <Paper square={true}
            sx={{
                background: 'rgba(255,255,255,0.0)',
                width: '100%',
            }}>
            <Typography>Diameter</Typography>
            <Stack direction='row'>
                <Typography sx={{ paddingRight: '16px' }}>(m)</Typography>
                <TextField
                    type='number'
                    variant="standard"
                    value={getHelixDiameter()}
                    onChange={handleChange} />
            </Stack>
        </Paper>
    )
}

export default HelixDiameterConfigurator