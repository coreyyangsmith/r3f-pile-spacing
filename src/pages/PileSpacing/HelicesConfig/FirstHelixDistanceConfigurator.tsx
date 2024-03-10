import { Paper, Stack, TextField, Typography } from '@mui/material'


const FirstHelixDistanceConfigurator = () => {

    const handleChange = (event) => {
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
                <Typography variant="body1" color='white' sx={{ paddingLeft: "16px" }}>First Helix Distance from Bottom</Typography>
                <TextField size='small'
                    type='number'
                    variant='standard'
                    color='primary'
                    onChange={handleChange}
                    value={0}
                    sx={{ input: { color: 'white', textAlign: 'right', paddingRight: '16px' }, width: "150px" }} />
            </Stack>
        </Paper>
    )
}

export default FirstHelixDistanceConfigurator