/*
Date: 2024-02-28
Author: Corey Yang-Smith
File: FloorColor.tsx
Type: Data Component

Description:
This is a Data Component for the Pile Visualization.
It changes the floor color
*/

// Imports
import { Paper, Stack, Typography } from '@mui/material'
import { GithubPicker, ColorResult } from 'react-color'

// Parameters
import { colors } from '../../../utils/parameters.ts'

// Hooks
import { useSettings } from '../../../hooks/useSettings'

// Types
import { SettingsContextState } from '../../../types/Settings'
import Settings from '../../../components/Settings.ts'

const FloorColor = () => {
    const settings = useSettings()

    const handleColorChange = (event: ColorResult) => {
        if (settings?.state.settings && event.hex) {
            const newSettings: Settings = {
                backgroundColor: settings?.state.settings.backgroundColor,
                axesHelper: settings?.state.settings.axesHelper,
                lockPiles: settings?.state.settings.lockPiles,
                showFloor: settings?.state.settings.showFloor,
                floorColor: event.hex,
                floorWireframe: settings?.state.settings.floorWireframe,
            }

            settings.setState({ settings: newSettings } as SettingsContextState)
        }
    }

    return (
        <Paper
            square={true}
            variant='outlined'
            sx={{
                background: 'rgba(255, 255, 255, .1)',
                marginLeft: "16px",
                marginRight: "16px",
                width: "calc(100% - 32px)",
            }}>
            <Stack direction="row" sx={{ display: 'flex', width: 'calc(100%-32px)', justifyContent: 'space-between', marginLeft: '16px', marginRight: '16px' }}>
                <Typography variant='body1' sx={{ marginRight: '8px', marginLeft: '4px', display: 'flex', alignItems: 'center' }}>Floor Color</Typography>
                <GithubPicker
                    width="250px"
                    triangle="hide"
                    colors={colors}
                    color={settings!.state.settings!.backgroundColor}
                    onChangeComplete={handleColorChange} />
            </Stack>
        </Paper>
    )
}

export default FloorColor