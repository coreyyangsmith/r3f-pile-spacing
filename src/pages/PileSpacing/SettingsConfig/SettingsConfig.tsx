import { Paper, Typography } from '@mui/material'

const SettingsConfig = () => {
    return (
        <Paper
            square={true}
            variant='outlined'
            sx={{
                position: 'absolute',
                zIndex: 10,
                background: 'rgba(255, 255, 255, 0.1)',
                top: "calc(7% + 8px)",
                margin: '16px',
                width: {
                    xs: 'calc(33% - 32px)', // 0 - 600px
                    sm: 'calc(33% - 32px)', // 600 - 900px
                    md: 'calc(33% - 32px)', // 900 - 1200px
                    lg: 'calc(25% - 32px)', // 1200 - 1536px
                    xl: 'calc(25% - 32px)', // 1536px and up
                },
                height: {
                    xs: 'calc(92% - 32px)', // 0 - 600px
                    sm: 'calc(92% - 32px)', // 600 - 900px
                    md: 'calc(92% - 32px)', // 900 - 1200px
                    lg: 'calc(92% - 32px)', // 1200 - 1536px
                    xl: 'calc(92% - 32px)', // 1536px and up
                },
            }}
        >
            {/* Title */}
            <Typography variant="h6" // TODO, implement theme to make text size responsive
                sx={{ padding: '8px', textAlign: 'center', color: 'white' }}>Settings</Typography>

            {/* Tab & Box */}
            <Paper>

            </Paper>

        </Paper >
    )
}

export default SettingsConfig