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
import { Paper, Stack } from "@mui/material"
import PilePositionConfigurator from "./PilePositionConfigurator"
import PileRotationConfigurator from "./PileRotationConfigurator"
import PileLengthConfigurator from "./PileLengthConfigurator"
import PileDiameterConfigurator from "./PileDiameterConfigurator"
import PileBatterConfigurator from "./PileBatterConfigurator"

// Types
type props = {
    selectedPile: number
}

const PileConfigContainer = (props: props) => {
    return (
        <Paper sx={{
            height: '100%',
            width: '100%',
            background: 'rgba(255,255,255,0.2)',
            display: 'flex',
            alignItems: 'center',
        }}>
            <Stack direction="row" sx={{ marginLeft: "16px", marginRight: '16px', marginTop: '8px', marginBottom: '4px' }}>
                <PilePositionConfigurator selectedPile={props.selectedPile} />
                <PileRotationConfigurator selectedPile={props.selectedPile} />
                <PileLengthConfigurator selectedPile={props.selectedPile} />
                <PileDiameterConfigurator selectedPile={props.selectedPile} />
                <PileBatterConfigurator selectedPile={props.selectedPile} />
            </Stack>
        </Paper>
    )
}

export default PileConfigContainer