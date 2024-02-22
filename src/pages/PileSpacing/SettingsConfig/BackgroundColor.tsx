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

// Hooks
import { useSettings } from '../../../hooks/useSettings'

const BackgroundColor = () => {
    const settings = useSettings()

    const handleColorChange = (event: ColorResult) => {
        settings?.settings.setBackgroundColor(event.hex)
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
                    colors={['#5a5a5a', '#676767', '#737373', '#808080', '#8d8d8d', '#9a9a9a', '#a6a6a6']}
                    color={settings?.settings.backgroundColor}
                    onChangeComplete={handleColorChange} />
            </Stack>
        </Paper>
    )
}

export default BackgroundColor