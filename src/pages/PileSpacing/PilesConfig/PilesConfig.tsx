/*
Date: 2024-02-21
Author: Corey Yang-Smith
File: PilesConfig.tsx
Type: Layout Component

Description:
This is a layout component for the Piles Configuration,
it is a paper component with a stack of configurators
for the user to input general information that affects
and generates all related piles in the visualization.
*/

// Imports
import { Paper, Stack, Typography } from '@mui/material'

// Components
import NumOfPilesConfigurator from './NumOfPilesConfigurator'
import GroupLengthConfigurator from './GroupLengthConfigurator'
import GroupRadialConfigurator from './GroupRadialConfigurator'
import GroupBatterConfigurator from './GroupBatterConfigurator'

const PilesConfig = () => {
    return (
        <Paper
            square={true}
            variant='outlined'
            sx={{
                position: 'absolute',
                zIndex: 10,
                background: 'rgba(255, 255, 255, 0.1)',
                top: "calc(7% + 8px)",
                margin: '16px',
                width: {
                    xs: 'calc(33% - 32px)', // 0 - 600px
                    sm: 'calc(33% - 32px)', // 600 - 900px
                    md: 'calc(33% - 32px)', // 900 - 1200px
                    lg: 'calc(25% - 32px)', // 1200 - 1536px
                    xl: 'calc(25% - 32px)', // 1536px and up
                },
                height: {
                    xs: 'calc(68% - 24px)', // 0 - 600px
                    sm: 'calc(68% - 24px)', // 600 - 900px
                    md: 'calc(68% - 24px)', // 900 - 1200px
                    lg: 'calc(68% - 24px)', // 1200 - 1536px
                    xl: 'calc(68% - 24px)', // 1536px and up
                },
            }}
        >

            <Stack direction="column" spacing={1} sx={{ display: 'flex', alignItems: 'center' }}>
                {/* Title */}
                <Typography variant="h6" // TODO, implement theme to make text size responsive
                    sx={{ padding: '8px', textAlign: 'center', color: 'white' }}>Pile Configuration</Typography>

                {/* Tab & Box */}
                <NumOfPilesConfigurator />
                <GroupLengthConfigurator />
                <GroupRadialConfigurator />
                <GroupBatterConfigurator />
            </Stack>

        </Paper >
    )
}

export default PilesConfig