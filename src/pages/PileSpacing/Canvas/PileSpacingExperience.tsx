/*
Date: 2024-02-21
Author: Corey Yang-Smith
File: PileSpacingExperience.ts
Type: Three.js Component

Description:
This is the main scene for the Pile Spacing Experience.
It uses the Pile component to generate the piles
and generates the scene using the usePiles hook.
*/

// Imports
import { OrbitControls } from "@react-three/drei";

// Types
import { IPiles } from "../../../types/Pile";

// Hooks
import { useSettings } from "../../../hooks/useSettings";
import { usePiles } from "../../../hooks/usePiles";

// Components
import Pile from "../Components/Pile";

const PileSpacingExperience = () => {

    const settings = useSettings()
    const piles = usePiles();

    const generatePiles = (piles: IPiles) => {
        if (!piles) return (<>Error</>);

        return piles.piles.map((pile, i) => {
            if (piles.number < 1) return null;

            let angle;
            let x;
            let z;

            if (piles.number === 1) {
                angle = 0;
                x = 0;
                z = 0;
            } else {
                angle = (i / piles.number) * Math.PI * 2;
                x = Math.cos(angle) * pile.radius;
                z = Math.sin(angle) * pile.radius;
            }

            return <Pile
                key={i}
                position={[
                    x,
                    -pile.length / 2,
                    z]}
                rotation={[
                    0,
                    -angle,
                    Math.PI / 180 * pile.batterAngle]}
                diameter={pile.diameter}
                length={pile.length}
                helices={pile.helices}
            />;
        })
    };


    return <>
        {/* Controls */}
        <OrbitControls />

        {/* Background */}
        <color args={[settings?.settings.backgroundColor || 'black']} attach="background" />

        {/* Lighting */}
        <ambientLight intensity={1} />
        <directionalLight intensity={2} position={[-10, 10, -10]} />
        <pointLight position={[10, 10, 10]} />

        {/* Floor */}
        <mesh rotation={[-Math.PI / 2, 0, Math.PI]}>
            {settings?.settings.axesHelper && <axesHelper scale={[10, 10, 10]} />}
            <planeGeometry args={[10, 10, 10]} />
            <meshBasicMaterial color='green' wireframe />
        </mesh>

        {/* Generate Piles */}
        {piles && generatePiles(piles?.piles)}
    </>
}

export default PileSpacingExperience