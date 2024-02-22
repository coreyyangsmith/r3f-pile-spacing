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
                background: 'rgba(255, 255, 255, .1)',
                marginLeft: "16px",
                marginRight: "16px",
                width: "calc(100% - 32px)",
            }}>
            <Stack direction="row" sx={{ display: 'flex', width: 'calc(100%-32px)', justifyContent: 'space-between', marginLeft: '16px', marginRight: '16px' }}>
                <Typography variant='body1' sx={{ marginRight: '8px', marginLeft: '4px', display: 'flex', alignItems: 'center' }}>Show Axes Helper?</Typography>
                <Checkbox
                    checked={useAxesHelper}
                    onChange={handleChange} />
            </Stack>
        </Paper>
    )
}

export default ToggleAxesHelper