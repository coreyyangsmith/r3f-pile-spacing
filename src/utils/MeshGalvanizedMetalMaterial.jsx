import { useTexture } from "@react-three/drei";
import * as THREE from 'three'

const MeshGalvanizedMetalMaterial = (props) => {
    const colorMap = useTexture('/materials/galvanizedSteel/GalvanizedSteel01_1K_BaseColor.png')
    const normalMap = useTexture('/materials/galvanizedSteel/GalvanizedSteel01_1K_Normal.png')
    const roughnessMap = useTexture('/materials/galvanizedSteel/GalvanizedSteel01_1K_Roughness.png')
    const aoMap = useTexture('/materials/galvanizedSteel/GalvanizedSteel01_1K_AO.png')
    const heightMap = useTexture('/materials/galvanizedSteel/GalvanizedSteel01_1K_Height.png')

    const repeatAmount = 0.9;

    colorMap.repeat.set(repeatAmount, repeatAmount);
    normalMap.repeat.set(repeatAmount, repeatAmount);
    roughnessMap.repeat.set(repeatAmount, repeatAmount);
    aoMap.repeat.set(repeatAmount, repeatAmount);
    heightMap.repeat.set(repeatAmount, repeatAmount);

    colorMap.wrapS = colorMap.wrapT = THREE.RepeatWrapping;
    normalMap.wrapS = normalMap.wrapT = THREE.RepeatWrapping;
    roughnessMap.wrapS = roughnessMap.wrapT = THREE.RepeatWrapping;
    aoMap.wrapS = aoMap.wrapT = THREE.RepeatWrapping;
    heightMap.wrapS = heightMap.wrapT = THREE.RepeatWrapping;

    return (
        <meshStandardMaterial
            map={colorMap}
            normalMap={normalMap}
            roughnessMap={roughnessMap}
            aoMap={aoMap}
            heightMap={heightMap}
            {...props}
            wireframe={false}
        />
    )
}

export default MeshGalvanizedMetalMaterial

