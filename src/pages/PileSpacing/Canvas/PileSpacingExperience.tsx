import { OrbitControls } from "@react-three/drei";
import { useCustomization } from "../../../context/Customization";
import Pile from "../Components/Pile";

const PileSpacingExperience = () => {

    interface Pile {
        number: number, // number of piles (count)
        length: number,
        diameter: number,
        radius: number, // spacing radius
        batterAngle: number,
        numHelices: number,
        firstHelixDistFromBottom: number,
        helixSpacing: number,
        helixDiameter: number,
    }

    const { length,
        diameter,
        number,
        radius,
        batterAngle,
        numHelices,
        firstHelixDistFromBottom,
        helixSpacing,
        helixDiameter } = useCustomization();


    // TODO CY
    // If number == 0, centre pipe, no offset
    const generatePiles = (number: number,
        radius: number,
        diameter: number,
        length: number,
        batterAngle: number,
        numHelices: number,
        firstHelixDistFromBottom: number,
        helixSpacing: number,
        helixDiameter: number) => {
        return Array.from({ length: number } as Array<number>).map((_, i) => {
            if (number < 1) return null;


            let angle;
            let x;
            let z;
            if (number === 1) {
                angle = 0;
                x = 0;
                z = 0;
            } else {
                angle = (i / number) * Math.PI * 2;
                x = Math.cos(angle) * radius;
                z = Math.sin(angle) * radius;
            }

            return <Pile key={i}
                position={[x, -length / 2, z]}
                rotation={[
                    0,
                    -angle,
                    Math.PI / 180 * batterAngle]}
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
        <color args={['#0A2647']} attach="background" />

        <ambientLight intensity={1} />
        <directionalLight intensity={2} position={[-10, 10, -10]} />
        <pointLight position={[10, 10, 10]} />

        {/* Floor */}
        <mesh rotation={[-Math.PI / 2, 0, Math.PI]}>
            <axesHelper scale={[10, 10, 10]} />
            <planeGeometry args={[10, 10, 10]} />
            <meshBasicMaterial color='green' wireframe />
        </mesh>

        {generatePiles(number, radius, diameter, length, batterAngle, numHelices, firstHelixDistFromBottom, helixSpacing, helixDiameter)}

    </>
}

export default PileSpacingExperience