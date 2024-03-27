import { useTexture } from "@react-three/drei";
import * as THREE from 'three'

type MeshGalvanizedMetalMaterialProps = {
    wireframe: boolean
}


const MeshGalvanizedMetalMaterial = (props: MeshGalvanizedMetalMaterialProps) => {
    const colorMap = useTexture('/materials/galvanizedSteel/GalvanizedSteel01_1K_BaseColor.png')
    const normalMap = useTexture('/materials/galvanizedSteel/GalvanizedSteel01_1K_Normal.png')
    const roughnessMap = useTexture('/materials/galvanizedSteel/GalvanizedSteel01_1K_Roughness.png')
    const aoMap = useTexture('/materials/galvanizedSteel/GalvanizedSteel01_1K_AO.png')

    const repeatAmount = 0.2;

    colorMap.repeat.set(repeatAmount, repeatAmount);
    normalMap.repeat.set(repeatAmount, repeatAmount);
    roughnessMap.repeat.set(repeatAmount, repeatAmount);
    aoMap.repeat.set(repeatAmount, repeatAmount);

    colorMap.wrapS = colorMap.wrapT = THREE.RepeatWrapping;
    normalMap.wrapS = normalMap.wrapT = THREE.RepeatWrapping;
    roughnessMap.wrapS = roughnessMap.wrapT = THREE.RepeatWrapping;
    aoMap.wrapS = aoMap.wrapT = THREE.RepeatWrapping;

    return (
        <meshStandardMaterial
            map={colorMap}
            normalMap={normalMap}
            roughnessMap={roughnessMap}
            aoMap={aoMap}
            wireframe={props.wireframe}
        />
    )
}

export default MeshGalvanizedMetalMaterial

