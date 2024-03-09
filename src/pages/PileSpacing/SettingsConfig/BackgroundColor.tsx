/*
Date: 2024-02-22
Author: Corey Yang-Smith
File: BackgroundColor.tsx
Type: Data Component

Description:
This is a Data Component for the Pile Visualization.
It sets the background color of the Three.js scene.
*/

// Imports
import { Paper, Stack, Typography } from '@mui/material'
import { ColorResult, GithubPicker } from 'react-color'
import { colors } from '../../../utils/parameters'

// Hooks
import { useSettings } from '../../../hooks/useSettings'
import { SettingsContextState } from '../../../types/Settings'
import Settings from '../../../components/Settings'

const BackgroundColor = () => {
    const settings = useSettings()

    const handleColorChange = (event: ColorResult) => {
        if (settings?.state.settings && event.hex) {
            const newSettings: Settings = {
                backgroundColor: event.hex,
                axesHelper: settings?.state.settings.axesHelper,
                lockPiles: settings?.state.settings.lockPiles,
                showFloor: settings?.state.settings.showFloor,
                floorColor: settings?.state.settings.floorColor,
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
                width: "calc(100% - 32px)",
                background: 'rgba(255, 255, 255, .1)',
                marginLeft: "16px",
                marginRight: "16px",
            }}>
            <Stack direction="row" sx={{ display: 'flex', width: 'calc(100%-32px)', justifyContent: 'space-between', marginLeft: '16px', marginRight: '16px' }}>
                <Typography variant='body1' sx={{ marginRight: '8px', marginLeft: '4px', display: 'flex', alignItems: 'center' }}>Background Color</Typography>
                <GithubPicker
                    width="250px"
                    triangle="hide"
                    colors={colors}
                    color={settings?.state.settings?.backgroundColor}
                    onChangeComplete={handleColorChange} />
            </Stack>
        </Paper>
    )
}

export default BackgroundColor