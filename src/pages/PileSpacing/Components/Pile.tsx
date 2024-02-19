import MeshGalvanizedMetalMaterial from '../../../utils/MeshGalvanizedMetalMaterial.jsx'
import Helices from './Helices.jsx'

const Pile = (props) => {

    return <group position={[props.position[0], 0, props.position[2]]}
        rotation={[props.rotation[0], props.rotation[1], props.rotation[2]]}>
        <axesHelper />

        {/* Main Pipe */}
        <mesh position={[0, props.position[1], 0]}
            rotation={[0, 0, 0]}>
            <cylinderGeometry args={[props.diameter / 2, props.diameter / 2, props.length, 16, 1]} />
            <MeshGalvanizedMetalMaterial />
        </mesh>

        {/* Bottom Cone */}
        <mesh position={[0, props.position[1] + -props.length / 2 - props.diameter / 4, 0]} rotation={[0, 0, Math.PI]}>
            <coneGeometry args={[props.diameter / 2, props.diameter / 2, 16, 1, false, 0, Math.PI * 2]} />
            <MeshGalvanizedMetalMaterial />
        </mesh>

        {/* Helices */}
        <Helices
            position={props.position}
            diameter={props.diameter}
            length={props.length}
            numHelices={props.numHelices}
            firstHelixDistFromBottom={props.firstHelixDistFromBottom}
            helixSpacing={props.helixSpacing}
            helixDiameter={props.helixDiameter} />
    </group>
}

export default Pile