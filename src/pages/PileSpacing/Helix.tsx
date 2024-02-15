import { useRef, useEffect } from "react";
import * as THREE from 'three'
import { metalMaterial } from "../../utils/parameters";
import MeshGalvanizedMetalMaterial from '../../utils/MeshGalvanizedMetalMaterial.jsx'

const Helix = (props) => {
    let helixWidth = 1;
    let helixSize = props.helixDiameter;
    let helixRotations = 1;
    let helixClimbLength = 1;
    let helixSegsPerStep = 128;
    let helixRadius = 1;

    console.log('helix props: ', props)

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

        // // Calculate the center manually
        // const center = new THREE.Vector3(
        //     helixRotations * Math.PI * 2 / 2,
        //     helixWidth / 2,
        //     helixSize / 2
        // );

        // // Translate vertices to center
        // geometry.attributes.position.array.forEach((value, index) => {
        //     if (index % 3 === 0) {
        //         geometry.attributes.position.array[index] += center.x;
        //     } else if (index % 3 === 1) {
        //         geometry.attributes.position.array[index] += center.y;
        //     } else if (index % 3 === 2) {
        //         geometry.attributes.position.array[index] += center.z;
        //     }
        // });

        // bend it!
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