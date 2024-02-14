import { OrbitControls } from "@react-three/drei";
import { useCustomization } from "../../context/Customization";

const PileSpacingExperience = () => {

    const { length, diameter } = useCustomization();

    return <>
        <OrbitControls />
        <color args={['#2D3250']} attach="background" />

        <mesh>
            <cylinderGeometry args={[diameter / 2, diameter / 2, length, 16, 1]} />
            <meshBasicMaterial color='#F6B17A' />
        </mesh>
    </>
}

export default PileSpacingExperience