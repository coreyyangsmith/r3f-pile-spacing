/*
Date: 2024-02-28
Author: Corey Yang-Smith
File: ToggleFloorWireframe.tsx
Type: Data Component

Description:
This is a Data Component for the Pile Visualization.
It toggles the visibility of the wireframe for the floor.
*/

// Imports
import { Checkbox, Paper, Stack, Typography } from '@mui/material'
import { ChangeEvent } from 'react'

// Hooks
import { useSettings } from '../../../hooks/useSettings'

// Types
import { SettingsContextState } from '../../../types/Settings'
import Settings from '../../../components/Settings'

const ToggleFloorWireframe = () => {
    const settings = useSettings()

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target) {
            let newFloorSettings: boolean;
            (settings?.state.settings.floorWireframe ? newFloorSettings = false : newFloorSettings = true)

            if (settings?.state.settings) {
                const newSettings: Settings = {
                    backgroundColor: settings?.state.settings.backgroundColor,
                    axesHelper: settings?.state.settings.axesHelper,
                    lockPiles: settings?.state.settings.lockPiles,
                    showFloor: settings?.state.settings.showFloor,
                    floorColor: settings?.state.settings.floorColor,
                    floorWireframe: newFloorSettings,
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
                <Typography variant='body1' sx={{ marginRight: '8px', marginLeft: '4px', display: 'flex', alignItems: 'center' }}>Show Floor Wireframe?</Typography>
                <Checkbox
                    checked={settings?.state.settings.floorWireframe}
                    onChange={handleChange} />
            </Stack>
        </Paper>
    )
}

export default ToggleFloorWireframe