import { Paper, Stack, TextField, Typography } from '@mui/material'
import { useCustomization } from '../../../context/Customization';


const HelixSpacingConfigurator = () => {
    const { helixSpacing, setHelixSpacing } = useCustomization();

    const handleChange = (event) => {
        setHelixSpacing(event.target.value);
    }
    return (
        <Paper
            square={true}
            variant='outlined'
            sx={{
                zIndex: 1,
                background: 'rgba(255, 255, 255, .1)',
                marginLeft: "16px",
                marginRight: "16px",
                width: "calc(100% - 32px)",
            }}>
            <Stack direction="row" sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="body1" color='white' sx={{ paddingLeft: "16px" }}>Spacing</Typography>
                <TextField size='small'
                    type='number'
                    variant='standard'
                    color='primary'
                    onChange={handleChange}
                    value={helixSpacing}
                    sx={{ input: { color: 'white', textAlign: 'right', paddingRight: '16px' }, width: "150px" }} />
            </Stack>
        </Paper>
    )
}

export default HelixSpacingConfigurator