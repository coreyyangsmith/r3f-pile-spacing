import { useSettings } from '../../../context/Settings'
import { Checkbox, Paper, Stack, Typography } from '@mui/material'

const ToggleAxesHelper = () => {
    const { useAxesHelper, setUseAxesHelper } = useSettings()

    const handleChange = (event) => {
        if (event.target) {
            if (useAxesHelper) {
                setUseAxesHelper(false)
            } else {
                setUseAxesHelper(true)
            }
        }
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
                <Typography variant='body' sx={{ marginRight: '8px', marginLeft: '4px', display: 'flex', alignItems: 'center' }}>Show Axes Helper?</Typography>
                <Checkbox
                    checked={useAxesHelper}
                    onChange={handleChange} />
            </Stack>
        </Paper>
    )
}

export default ToggleAxesHelper