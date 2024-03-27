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
import { PileContextState } from "../../../types/Pile";

// Hooks
import { useSettings } from "../../../hooks/useSettings";
import { usePiles } from "../../../hooks/usePiles";

// Components
import Pile from "../Components/Pile";

const PileSpacingExperience = () => {

    const settings = useSettings()
    const piles = usePiles();

    const generateFloor = () => {
        if (settings?.state.settings?.showFloor) {
            return (
                <mesh rotation={[-Math.PI / 2, 0, Math.PI]}>
                    {settings?.state.settings.floorAxesHelper && <axesHelper scale={[10, 10, 10]} />}
                    <planeGeometry args={[10, 10, 10]} />
                    <meshBasicMaterial color={settings?.state.settings.floorColor} wireframe={settings?.state.settings.floorWireframe} />
                </mesh>
            )
        }
    }

    const generatePiles = (piles: PileContextState) => {
        if (!piles) return (<>Error</>);

        return piles.piles.piles.map((pile, i) => {
            // If no piles, return null
            if (piles.piles.number < 1) return null;

            // Check if piles are locked, if so, set position and rotation at what's calculated
            // For number == 0, set at default [0, 0, 0]
            // Else calculate
            if (settings?.state.settings.lockPiles) {
                if (piles.piles.number === 1) {
                    pile.rotation = 0;
                    pile.x = 0;
                    pile.y = 0
                    pile.z = 0;
                } else {
                    pile.rotation = (i / piles.piles.number) * Math.PI * 2;
                    pile.x = Math.cos(pile.rotation) * piles.piles.spacingRadius; // x
                    pile.y = 0; // y
                    pile.z = Math.sin(pile.rotation) * piles.piles.spacingRadius; // z
                }
            }

            return <Pile
                id={i}
                key={i}
                position={[
                    pile.x,
                    pile.y,
                    pile.z]}
                rotation={[
                    0,
                    -pile.rotation,
                    Math.PI / 180 * pile.batterAngle]}
                diameter={pile.diameter}
                length={pile.length}
                helices={null}
            />;
        })
    };

    return <>
        {/* Controls */}
        <OrbitControls />

        {/* Background */}
        <color args={[settings?.state?.settings?.backgroundColor || 'black']} attach="background" />

        {/* Lighting */}
        <ambientLight intensity={1} />
        <directionalLight intensity={2} position={[-10, 10, -10]} />
        <pointLight position={[10, 10, 10]} />

        {/* Floor */}
        {generateFloor()}


        {/* Generate Piles */}
        {piles && generatePiles(piles.state)}
    </>
}

export default PileSpacingExperience