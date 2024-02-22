import { Paper, Stack, Typography } from '@mui/material'
import { GithubPicker } from 'react-color'
import { useSettings } from '../../../context/Settings'


const BackgroundColor = () => {
    const { backgroundColor, setBackgroundColor } = useSettings()

    const handleChange = (event) => {
        setBackgroundColor(event.hex)
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
                    color={backgroundColor}
                    onChangeComplete={handleChange} />
            </Stack>
        </Paper>
    )
}

export default BackgroundColor