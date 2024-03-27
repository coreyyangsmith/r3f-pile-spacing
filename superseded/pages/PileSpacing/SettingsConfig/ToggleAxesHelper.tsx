/*
Date: 2024-02-22
Author: Corey Yang-Smith
File: ToggleAxesHelper.tsx
Type: Data Component

Description:
This is a Data Component for the Pile Visualization.
It toggles the visibility of the Axes Helper in the Three.js scene.
*/

// Imports
import { Checkbox, Paper, Stack, Typography } from '@mui/material'
import { ChangeEvent } from 'react'

// Hooks
import { useSettings } from '../../../hooks/useSettings'

// Components
import { SettingsContextState } from '../../../types/Settings'
import Settings from '../../../components/Settings'

const ToggleAxesHelper = () => {
    const settings = useSettings()

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target) {
            let newAxesSettings: boolean;
            (settings?.state.settings.axesHelper ? newAxesSettings = false : newAxesSettings = true)
            if (settings?.state.settings) {
                const newSettings: Settings = {
                    backgroundColor: settings?.state.settings.backgroundColor,
                    axesHelper: newAxesSettings,
                    lockPiles: settings?.state.settings.lockPiles,
                    showFloor: settings?.state.settings.showFloor,
                    floorColor: settings?.state.settings.floorColor,
                    floorWireframe: settings?.state.settings.floorWireframe,
                }
                settings.setState({ settings: newSettings } as SettingsContextState)
            }
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
                <Typography variant='body1' sx={{ marginRight: '8px', marginLeft: '4px', display: 'flex', alignItems: 'center' }}>Show Axes Helper?</Typography>
                <Checkbox
                    checked={settings?.state.settings.axesHelper}
                    onChange={handleChange} />
            </Stack>
        </Paper>
    )
}

export default ToggleAxesHelper