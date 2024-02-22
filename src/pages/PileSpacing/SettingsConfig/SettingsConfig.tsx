/*
Date: 2024-02-21
Author: Corey Yang-Smith
File: SettingsConfig.tsx
Type: Layout Component

Description:
This is a layout component for the Overall Project Settings.
This is the parent component for all the individual settings configuration
components. It is a paper for the user to input general information that affects
and generates various aspects of the project.
*/

// Imports
import { Paper, Stack, Typography } from '@mui/material'

// Components
import BackgroundColor from './BackgroundColor'
import ToggleAxesHelper from './ToggleAxesHelper'

const SettingsConfig = () => {
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
                    xs: 'calc(92% - 32px)', // 0 - 600px
                    sm: 'calc(92% - 32px)', // 600 - 900px
                    md: 'calc(92% - 32px)', // 900 - 1200px
                    lg: 'calc(92% - 32px)', // 1200 - 1536px
                    xl: 'calc(92% - 32px)', // 1536px and up
                },
            }}
        >

            <Stack direction="column" spacing={1} sx={{ display: 'flex', alignItems: 'center' }}>
                {/* Title */}
                <Typography variant="h3" // TODO, implement theme to make text size responsive
                    sx={{ padding: '8px', textAlign: 'center', color: 'white' }}>Settings</Typography>

                {/* Container */}
                <BackgroundColor />
                <ToggleAxesHelper />
            </Stack>

        </Paper >
    )
}

export default SettingsConfig