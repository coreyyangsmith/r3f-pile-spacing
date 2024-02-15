import { useTexture } from "@react-three/drei";

const MeshGalvanizedMetalMaterial = () => {
    const colorMap = useTexture('/materials/galvanizedSteel/GalvanizedSteel01_1K_BaseColor.png')
    const normalMap = useTexture('/materials/galvanizedSteel/GalvanizedSteel01_1K_Normal.png')
    const roughnessMap = useTexture('/materials/galvanizedSteel/GalvanizedSteel01_1K_Roughness.png')
    const aoMap = useTexture('/materials/galvanizedSteel/GalvanizedSteel01_1K_AO.png')
    const heightMap = useTexture('/materials/galvanizedSteel/GalvanizedSteel01_1K_Height.png')

    return (
        <meshStandardMaterial
            map={colorMap}
            normalMap={normalMap}
            roughnessMap={roughnessMap}
            aoMap={aoMap}
            heightMap={heightMap}
        />
    )
}

export default MeshGalvanizedMetalMaterial

