import React from 'react'
import { metalMaterial } from '../../utils/parameters.js'
import Helix from './Helix'

const Pile = (props) => {

    return <group position={props.position}>
        <axesHelper />
        <mesh>
            <cylinderGeometry args={[props.diameter / 2, props.diameter / 2, props.length, 16, 1]} />
            <meshStandardMaterial
                metalness={metalMaterial.metalness}
                roughness={metalMaterial.roughness}
                color={metalMaterial.color} />
        </mesh>

        <mesh position={[0, -props.length / 2 - props.diameter / 4, 0]} rotation={[0, 0, Math.PI]}>
            <coneGeometry args={[props.diameter / 2, props.diameter / 2, 16, 1, false, 0, Math.PI * 2]} />
            <meshStandardMaterial
                metalness={metalMaterial.metalness}
                roughness={metalMaterial.roughness}
                color={metalMaterial.color} />
        </mesh>

        {/* Helices */}
        <Helix props={props} />
    </group>
}

export default Pile