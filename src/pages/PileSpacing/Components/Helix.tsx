/*
Date: 2024-02-26
Author: Corey Yang-Smith
File: Helix.tsx
Type: Three.js Component

Description:
This is the tsx component for the Three.js implementation of the Helix object.
Given props from the Pile.tsx, this component will generate the related Helices.
*/

// Impirts
import { useRef, useEffect } from "react";
import * as THREE from 'three'

// Materials
import MeshGalvanizedMetalMaterial from '../../../utils/MeshGalvanizedMetalMaterial.jsx'

type HelixProps = {
    key: number,
    id: number,
    diameter: number,
    thickness: number,
    rise: number,
    rotations: number,
    segsPerStep: number,
    radius: number,
    position: [number, number, number];
    rotation: 0;

}

const Helix = (props) => {
    let helixWidth = 1;
    let helixSize = props.helixDiameter;
    let helixRotations = 1;
    let helixClimbLength = 1;
    let helixSegsPerStep = 128;
    let helixRadius = 1;

    const ref = useRef();

    useEffect(() => {
        const geometry = new THREE.BoxGeometry(
            helixRotations * Math.PI * 2,
            helixWidth,
            helixSize,
            helixRotations * helixSegsPerStep,
            1,
            1
        );

        geometry.attributes.position.array.forEach((_, index, arr) => {
            if (index % 3 === 0) {
                const x = arr[index];
                const z = arr[index + 2];
                const angle = -x; // Spin
                const radius = helixRadius + z; // radius
                const shift = (x / (Math.PI * 2)) * helixClimbLength; // vertical shift

                arr[index] = Math.cos(angle) * radius;
                arr[index + 1] = shift;
                arr[index + 2] = Math.sin(angle) * radius;
            }
        });

        geometry.computeVertexNormals();

        // Update the geometry attributes
        geometry.attributes.position.needsUpdate = true;

        // Assign the geometry to the mesh
        ref.current.geometry = geometry;
    }, [props]);


    return (
        <mesh ref={ref} position={props.position}>
            <axesHelper />
            <MeshGalvanizedMetalMaterial />
        </mesh>
    )
}

export default Helix