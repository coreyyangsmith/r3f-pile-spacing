/*
Date: 2024-02-21
Author: Corey Yang-Smith
File: PileConfig.tsx
Type: Layout Component

Description:
This is a layout component for the Individual Pile Configuration,
This is the parent component for all the individual pile configuration
components. It is a paper for the user to input general information that affects
and generates all related piles in the visualization.
*/

// Import
import { Paper, Typography } from '@mui/material'

// TODO Extract Common MUI Components to a separate file
const PileConfig = () => {
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
            <Typography variant='h6' sx={{
                marginLeft: '16px',
                padding: '8px',
                textAlign: 'left',
                color: 'white'
            }}>
                Individual Pile
            </Typography>
        </Paper>
    )
}

export default PileConfig