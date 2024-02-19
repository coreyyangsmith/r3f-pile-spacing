import { Paper, Typography } from '@mui/material'

// Pile Config
// "Main Config Page"
// --> To set general pile layout; able to dive deeper and adjust each pile as desired as well
// General Pile Settings
// - Number of Piles
// - Radius of Piles
// - Length of Piles

const PilesConfig = () => {
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
                    xs: 'calc(68% - 24px)', // 0 - 600px
                    sm: 'calc(68% - 24px)', // 600 - 900px
                    md: 'calc(68% - 24px)', // 900 - 1200px
                    lg: 'calc(68% - 24px)', // 1200 - 1536px
                    xl: 'calc(68% - 24px)', // 1536px and up
                },
            }}
        >
            {/* Title */}
            <Typography variant="h6" // TODO, implement theme to make text size responsive
                sx={{ padding: '8px', textAlign: 'center', color: 'white' }}>Pile Configuration</Typography>

            {/* Tab & Box */}
            <Paper>

            </Paper>

        </Paper >
    )
}

export default PilesConfig