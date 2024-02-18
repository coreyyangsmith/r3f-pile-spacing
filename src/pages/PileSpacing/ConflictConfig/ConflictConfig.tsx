import { Paper, Typography } from '@mui/material'
import React from 'react'

const ConflictConfig = () => {
    return (
        <Paper elevation={4}
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
            <Typography>Hello</Typography>
        </Paper>
    )
}

export default ConflictConfig