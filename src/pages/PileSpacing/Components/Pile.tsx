/*
Date: 2024-02-26
Author: Corey Yang-Smith
File: Pile.tsx
Type: Three.js Component

Description:
This is the tsx component for the Three.js implementation of the Pile object.
Given props from the PileSpacingExperience.tsx, this component will generate the Pile object(s).
*/





// Components
import { Helices } from "../../../components/Helix"
import MeshGalvanizedMetalMaterial from "../../../utils/MeshGalvanizedMetalMaterial";

// Types
type PileProps = {
    key: number;
    position: [number, number, number];
    rotation: [number, number, number];
    diameter: number;
    length: number;
    helices: Helices | null;
}

const Pile = (props: PileProps) => {
    return <group
        position={[props.position[0], 0, props.position[2]]}
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
        {/* <Helices
            position={props.position}
            diameter={props.diameter}
            length={props.length}
            numHelices={props.numHelices}
            firstHelixDistFromBottom={props.firstHelixDistFromBottom}
            helixSpacing={props.helixSpacing}
            helixDiameter={props.helixDiameter} /> */}
    </group>
}

export default Pile