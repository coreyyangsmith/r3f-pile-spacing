// R3F
import { Canvas } from '@react-three/fiber'

// My Components
import PileSpacingExperience from "./PileSpacingExperience"
import Configurator from '../../components/Configurator'

const PileSpacing = () => {
    return <>
        <Canvas>
            <PileSpacingExperience />
        </Canvas>

        <Configurator />
    </>

}

export default PileSpacing