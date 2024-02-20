import { Paper, Stack, Typography } from '@mui/material'
import { GithubPicker } from 'react-color'
import { useSettings } from '../../../context/Settings'


const BackgroundColor = () => {
    const { backgroundColor, setBackgroundColor } = useSettings()

    const handleChange = (event) => {
        console.log(event)
        setBackgroundColor(event.hex)
    }
    return (
        <Paper
            square={true}
            variant='outlined'
            sx={{
                width: '100%',
                background: 'rgba(150,150,150,0.2)'
            }}>
            <Stack direction="row" sx={{ display: 'flex', width: '100%', justifyContent: 'space-between' }}>
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