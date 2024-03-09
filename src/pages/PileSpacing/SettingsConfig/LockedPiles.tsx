/*
Date: 2024-02-24
Author: Corey Yang-Smith
File: LockedPiles.tsx
Type: Data Component

Description:
This is a Data Component for the Pile Visualization.
It toggles the ability to manually control individual pile properties.
*/

// Imports
import { Checkbox, Paper, Stack, Typography } from '@mui/material'
import { ChangeEvent } from 'react'

// Hooks
import { useSettings } from '../../../hooks/useSettings'

// Types
import Settings from '../../../components/Settings'
import { SettingsContextState } from '../../../types/Settings'

const LockedPiles = () => {
    const settings = useSettings()

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target) {
            let newPileSettings: boolean;
            (settings?.state.settings.lockPiles ? newPileSettings = false : newPileSettings = true)

            if (settings?.state.settings) {
                const newSettings: Settings = {
                    backgroundColor: settings?.state.settings.backgroundColor,
                    axesHelper: settings?.state.settings.axesHelper,
                    lockPiles: newPileSettings,
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
                <Typography variant='body1' sx={{ marginRight: '8px', marginLeft: '4px', display: 'flex', alignItems: 'center' }}>Lock Piles?</Typography>
                <Checkbox
                    checked={settings?.state.settings.lockPiles}
                    onChange={handleChange} />
            </Stack>
        </Paper>
    )
}

export default LockedPiles