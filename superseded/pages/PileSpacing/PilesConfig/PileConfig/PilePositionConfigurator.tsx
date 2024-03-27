import { Paper, Stack, Typography } from "@mui/material"
import CardinalPositionConfig from "./CardinalPositionConfig"

const PilePositionConfigurator = () => {
    return (
        <Paper square={true}
            sx={{
                background: 'rgba(255,255,255,0.0)',
                width: '100%',
            }}>
            <Typography>Position</Typography>
            <Stack direction='column' spacing={0.5}>
                <CardinalPositionConfig text={'X'} />
                <CardinalPositionConfig text={'Y'} />
                <CardinalPositionConfig text={'Z'} />

            </Stack>
        </Paper>
    )
}

export default PilePositionConfigurator