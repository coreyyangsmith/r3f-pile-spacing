import { useRef, useEffect } from "react";
import * as THREE from 'three'
import { metalMaterial } from "../../../utils/parameters.js";
import MeshGalvanizedMetalMaterial from '../../../utils/MeshGalvanizedMetalMaterial.jsx'

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