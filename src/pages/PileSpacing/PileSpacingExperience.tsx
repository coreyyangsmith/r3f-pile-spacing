import { OrbitControls } from "@react-three/drei";
import { useCustomization } from "../../context/Customization";
import Pile from "./Pile";

const PileSpacingExperience = () => {

    const { length,
        diameter,
        number,
        radius,
        numHelices,
        firstHelixDistFromBottom,
        helixSpacing,
        helixDiameter } = useCustomization();

    const generatePiles = (number: number,
        radius: number,
        diameter: number,
        length: number,
        numHelices: number,
        firstHelixDistFromBottom: number,
        helixSpacing: number,
        helixDiameter: number) => {
        return Array.from({ length: number }).map((_, i) => {
            const angle = (i / number) * Math.PI * 2;
            const x = Math.cos(angle) * radius;
            const z = Math.sin(angle) * radius;

            return <Pile key={i}
                position={[x, 0, z]}
                diameter={diameter}
                length={length}
                numHelices={numHelices}
                firstHelixDistFromBottom={firstHelixDistFromBottom}
                helixSpacing={helixSpacing}
                helixDiameter={helixDiameter} />;
        });
    }


    return <>
        <OrbitControls />
        <color args={['#2D3250']} attach="background" />

        <ambientLight intensity={1} />
        <directionalLight intensity={2} position={[-10, 10, -10]} />
        <pointLight position={[10, 10, 10]} />

        {generatePiles(number, radius, diameter, length, numHelices, firstHelixDistFromBottom, helixSpacing, helixDiameter)}

    </>
}

export default PileSpacingExperience