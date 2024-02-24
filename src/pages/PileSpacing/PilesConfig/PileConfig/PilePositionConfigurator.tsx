import { Paper, Stack, Typography } from "@mui/material"
import CardinalPositionConfig from "./CardinalPositionConfig"

type props = {
    selectedPile: number
}

const PilePositionConfigurator = (props: props) => {
    return (
        <Paper sx={{
            background: 'rgba(255,255,255,0.1)',
            width: '100%',
        }}>
            <Typography>Position</Typography>
            <Stack direction='column'>
                <CardinalPositionConfig text={'X'} selectedPile={props.selectedPile} />
                <CardinalPositionConfig text={'Y'} selectedPile={props.selectedPile} />
                <CardinalPositionConfig text={'Z'} selectedPile={props.selectedPile} />

            </Stack>
        </Paper>
    )
}

export default PilePositionConfigurator