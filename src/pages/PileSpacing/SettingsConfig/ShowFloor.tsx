/*
Date: 2024-02-28
Author: Corey Yang-Smith
File: ShowFloor.tsx
Type: Data Component

Description:
This is a Data Component for the Pile Visualization.
It toggles the visibility of the floor.
*/

// Imports
import { Checkbox, Paper, Stack, Typography } from '@mui/material'
import { ChangeEvent } from 'react'

// Hooks
import { useSettings } from '../../../hooks/useSettings'

// Types
import { ISettings } from '../../../types/Settings'

const ShowFloor = () => {
    const settings = useSettings()

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target) {
            let newFloorSettings: boolean;
            (settings?.settings.showFloor ? newFloorSettings = false : newFloorSettings = true)

            if (settings?.settings) {
                const newSettings: ISettings = {
                    backgroundColor: settings?.settings.backgroundColor,
                    axesHelper: settings?.settings.axesHelper,
                    lockPiles: settings?.settings.lockPiles,
                    showFloor: newFloorSettings,
                    floorColor: settings?.settings.floorColor,
                    floorWireframe: settings?.settings.floorWireframe,

                    setAxesHelper: settings?.settings.setAxesHelper,
                    setBackgroundColor: settings?.settings.setBackgroundColor,
                    setLockPiles: settings?.settings.setLockPiles,
                    setShowFloor: settings?.settings.setShowFloor,
                    setFloorColor: settings?.settings.setFloorColor,
                    setFloorWireframe: settings?.settings.setFloorWireframe
                }
                settings.setSettings(newSettings)
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
                <Typography variant='body1' sx={{ marginRight: '8px', marginLeft: '4px', display: 'flex', alignItems: 'center' }}>Show Floor?</Typography>
                <Checkbox
                    checked={settings?.settings.showFloor}
                    onChange={handleChange} />
            </Stack>
        </Paper>
    )
}

export default ShowFloor