/*
Date: 2024-02-23
Author: Corey Yang-Smith
File: PileConfigContainer.tsx
Type: Layout Component

Description:
This is a layout component for the Individual Pile Configuration, it is the inside component
that holds the data components for the individual pile configuration.,
*/

// Individual Pile Controls May Include:
// - Position Controls (X, Y, Z)
// - Rotation Control (X, Y, Z)
// - Batter Angle Control
// - Pile Length Control
// - Pile Radius Control
// - Material?
// - Any more...?

// Imports
import { Paper, Typography } from "@mui/material"
import PilePositionConfigurator from "./PilePositionConfigurator"

// Types
type props = {
    selectedPile: number
}

const PileConfigContainer = (props: props) => {
    return (
        <Paper sx={{
            height: '100%',
            width: '100%',
            background: 'rgba(255,255,255,0.1)'
        }}>
            <Typography>Pile {props.selectedPile + 1}</Typography>
            <PilePositionConfigurator selectedPile={props.selectedPile} />
        </Paper>
    )
}

export default PileConfigContainer