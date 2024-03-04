import { Paper, Stack, Typography } from "@mui/material"
import CardinalPositionConfig from "./CardinalPositionConfig"

type props = {
    selectedPile: number
}

const PilePositionConfigurator = (props: props) => {
    return (
        <Paper square={true}
            sx={{
                background: 'rgba(255,255,255,0.0)',
                width: '100%',
            }}>
            <Typography>Position</Typography>
            <Stack direction='column' spacing={0.5}>
                <CardinalPositionConfig text={'X'} selectedPile={props.selectedPile} />
                <CardinalPositionConfig text={'Y'} selectedPile={props.selectedPile} />
                <CardinalPositionConfig text={'Z'} selectedPile={props.selectedPile} />

            </Stack>
        </Paper>
    )
}

export default PilePositionConfigurator