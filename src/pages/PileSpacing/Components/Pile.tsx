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
import { useHelicesFromPileId } from "../../../hooks/useHelicesFromPileId";
import MeshGalvanizedMetalMaterial from "../../../utils/MeshGalvanizedMetalMaterial";
import Helix from "./Helix";

// Types
type PileProps = {
    key: number;
    id: number;
    diameter: number;
    length: number;
    helices: Helices | null;
    position: [number, number, number];
    rotation: [number, number, number];
}

const Pile = (props: PileProps) => {
    const helices = useHelicesFromPileId(props.id)

    const generateHelices = (helices: Helices) => {
        if (!helices) return (<>Error</>);

        return helices.helices.map((helix, i) => {
            return <Helix

                key={i}
                id={helix.id}
                diameter={helix.diameter}
                thickness={helix.thickness}
                rise={helix.rise}
                rotations={helix.rotations}
                segsPerStep={helix.segsPerStep}
                radius={helix.radius}
                position={[helix.x, helix.y, helix.z]}
                rotation={helix.rotation}
                distanceFromBottom={helices.distanceFromBottom}
                spacing={helices.spacing}
                pileRef={helices.pileRef}
            />
        })
    }

    return <group
        position={[
            props.position[0],
            0,
            props.position[2]
        ]}
        rotation={[props.rotation[0], props.rotation[1], props.rotation[2]]}>
        <axesHelper />

        {/* Main Pipe */}
        <mesh position={[
            0,
            -props.length / 2 + props.position[1],
            0
        ]}
            rotation={[
                0,
                0,
                0
            ]}>
            <cylinderGeometry args={[props.diameter / 2, props.diameter / 2, props.length, 16, 1]} />
            <MeshGalvanizedMetalMaterial />
        </mesh>

        {/* Bottom Cone */}
        <mesh position={[
            0,
            props.position[1] + -props.length - props.diameter / 4,
            0
        ]}
            rotation={[
                0,
                0,
                Math.PI
            ]}>
            <coneGeometry args={[props.diameter / 2, props.diameter / 2, 16, 1, false, 0, Math.PI * 2]} />
            <MeshGalvanizedMetalMaterial />
        </mesh>

        {helices && generateHelices(helices)}
    </group>
}

export default Pile