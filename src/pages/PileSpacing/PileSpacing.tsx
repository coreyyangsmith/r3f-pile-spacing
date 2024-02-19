// R3F
import { Canvas } from '@react-three/fiber'

// My Components
import PileSpacingExperience from "./Canvas/PileSpacingExperience"
import Configurator from '../../components/Configurator'
import ConflictConfig from './ConflictConfig/ConflictConfig'
import { Paper } from '@mui/material'
import ChipConfig from './ChipConfig/ChipConfig'
import { useState } from 'react'
import HelicesConfig from './HelicesConfig/HelicesConfig'
import SettingsConfig from './SettingsConfig/SettingsConfig'
import GroupEffectConfig from './ConflictConfig/GroupEffectConfig/GroupEffectConfig'
import HelixConfig from './HelicesConfig/HelixConfig/HelixConfig'
import PilesConfig from './PilesConfig/PilesConfig'
import PileConfig from './PilesConfig/PileConfig/PileConfig'

const PileSpacing = () => {

    const [chipState, setChipState] = useState('conflict')
    let defThreeCanvas = 'calc(75% - 16px)';

    return <>
        <ChipConfig chipState={chipState} setChipState={setChipState} />


        ${chipState === 'conflict' && <ConflictConfig />}
        ${chipState === 'pile' && <PilesConfig />}
        ${chipState === 'helix' && <HelicesConfig />}
        ${chipState === 'settings' && <SettingsConfig />}

        ${chipState === 'conflict' && <GroupEffectConfig />}
        ${chipState === 'pile' && <PileConfig />}
        ${chipState === 'helix' && <HelixConfig />}
        ${chipState === 'settings' && (defThreeCanvas = 'calc(100% - 32px)')}

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
                height: `${defThreeCanvas}`,
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