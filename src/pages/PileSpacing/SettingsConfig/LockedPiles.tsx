/*
Date: 2024-02-24
Author: Corey Yang-Smith
File: LockedPileLocation.tsx
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

// Components
import Settings from '../../../components/Settings'

const LockedPiles = () => {
    const settings = useSettings()

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target) {
            let newPileSettings: boolean;
            (settings?.settings.lockPiles ? newPileSettings = false : newPileSettings = true)

            const newSettings = new Settings(
                settings?.settings.backgroundColor,
                settings?.settings.axesHelper,
                newPileSettings,
            )
            settings?.setSettings(newSettings)
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
                    checked={settings?.settings.lockPiles}
                    onChange={handleChange} />
            </Stack>
        </Paper>
    )
}

export default LockedPiles