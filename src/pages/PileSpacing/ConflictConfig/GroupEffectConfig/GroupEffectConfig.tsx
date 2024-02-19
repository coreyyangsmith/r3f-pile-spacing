import { Paper, Typography } from '@mui/material'
import React from 'react'

const GroupEffectConfig = () => {
    return (
        <Paper
            square={true}
            variant='outlined'
            sx={{
                position: 'absolute',
                top: 'calc(75%)',
                zIndex: 10,
                background: 'rgba(255, 255, 255, 0.1)',
                margin: '16px',
                width: 'calc(100% - 32px)',
                height: 'calc(25% - 32px)',
            }}
        >
            <Typography variant='h6' sx={{ padding: '8px', textAlign: 'center', color: 'white' }}>Group Effect</Typography>
        </Paper>
    )
}

export default GroupEffectConfig