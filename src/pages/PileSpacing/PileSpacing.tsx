// R3F
import { Canvas } from '@react-three/fiber'

// My Components
import PileSpacingExperience from "./Canvas/PileSpacingExperience"
import Configurator from '../../components/Configurator'
import PileConfig from './PileConfig/PileConfig'
import ConflictConfig from './ConflictConfig/ConflictConfig'
import { Paper, Typography } from '@mui/material'

const PileSpacing = () => {
    return <>
        <PileConfig />
        <ConflictConfig />

        <Paper
            square={true}
            elevation={4}
            sx={{
                width: {
                    xs: "calc(67% - 16px)",
                    sm: "calc(67% - 16px)",
                    md: "calc(67% - 16px)",
                    lg: "calc(75% - 16px)",
                    xl: "calc(75% - 16px)",
                },
                height: "calc(75% - 16px)",
                position: "absolute",
                zIndex: 10,
                top: "16px",
                left: {
                    xs: "calc(33%)",
                    sm: "calc(33%)",
                    md: "calc(33%)",
                    lg: "calc(25%)",
                    xl: "calc(25%)",
                },
            }}>
            <Canvas>
                <PileSpacingExperience />
            </Canvas >
        </Paper >


        <Configurator />
    </>

}

export default PileSpacing