import React from 'react'

const Pile = (props) => {

    return <group position={props.position}>
        <mesh>
            <cylinderGeometry args={[props.diameter / 2, props.diameter / 2, props.length, 16, 1]} />
            <meshStandardMaterial color='#F6B17A' />
        </mesh>

        <mesh position={[0, -props.length / 2 - props.diameter / 4, 0]} rotation={[0, 0, Math.PI]}>
            <coneGeometry args={[props.diameter / 2, props.diameter / 2, 16, 1, false, 0, Math.PI * 2]} />
            <meshStandardMaterial color='#F6B17A' />
        </mesh>
    </group>
}

export default Pile