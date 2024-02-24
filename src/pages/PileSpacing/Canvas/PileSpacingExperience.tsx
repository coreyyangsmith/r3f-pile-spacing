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

            if (settings?.settings.lockPiles) {
                if (piles.number === 1) {
                    piles.piles[i].rotation = 0;
                    piles.piles[i].position[0] = 0; //x
                    piles.piles[i].position[1] = 0; //y
                    piles.piles[i].position[2] = 0; //z
                } else {
                    piles.piles[i].rotation = (i / piles.number) * Math.PI * 2;
                    piles.piles[i].position[0] = Math.cos(piles.piles[i].rotation) * pile.radius; // x
                    piles.piles[i].position[1] = 0; // y
                    piles.piles[i].position[2] = Math.sin(piles.piles[i].rotation) * pile.radius; // z
                }
            }



            return <Pile
                key={i}
                position={[
                    piles.piles[i].position[0],
                    -pile.length / 2,
                    piles.piles[i].position[2]]}
                rotation={[
                    0,
                    -piles.piles[i].rotation,
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