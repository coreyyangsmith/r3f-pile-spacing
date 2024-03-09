/*
Date: 2024-03-09
Author: Corey Yang-Smith
File: HelixConfigContainer.tsx
Type: Layout Component

Description:
This is a layout component for the Individual Helix Configuration, it is the inside component
that holds the data components for the individual helix configuration.
*/


// Imports
import { Paper, Stack } from "@mui/material"
import HelixDiameterConfigurator from "./HelixDiameterConfigurator"


const HelixConfigContainer = () => {
    return (
        <Paper sx={{
            height: '100%',
            width: '100%',
            background: 'rgba(255,255,255,0.2)',
            display: 'flex',
            alignItems: 'center',
        }}>
            <Stack direction="row" sx={{ marginLeft: "16px", marginRight: '16px', marginTop: '8px', marginBottom: '4px' }}>
                {/* Data Components */}
                <HelixDiameterConfigurator />
            </Stack>
        </Paper>
    )
}

export default HelixConfigContainer