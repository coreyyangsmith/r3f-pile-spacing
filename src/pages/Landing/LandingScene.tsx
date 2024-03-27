import { OrbitControls, PerspectiveCamera } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { dark2 } from '../../themes/Color'
import Pile from '../PileSpacing/Components/Pile'

const LandingScene = () => {
    return (
        <div
            style={{
                zIndex: 0,
                width: '100%',
                height: '100%',
                position: 'absolute',
                top: 0,
                left: 0,
            }}>
            <Canvas>
                <PerspectiveCamera
                    makeDefault
                    position={[-10, 15, 0]}
                    fov={40}
                    zoom={0.9}
                />
                {/* Controls */}
                <OrbitControls
                    minZoom={0.1}
                    autoRotate
                    autoRotateSpeed={9}
                    enablePan={false}
                    enableZoom={false}
                    enableRotate={true} />

                {/* Background */}
                <color args={[dark2]} attach="background" />

                {/* Lighting */}
                <ambientLight intensity={1} />
                <directionalLight intensity={2} position={[-10, 10, -10]} />
                <pointLight position={[10, 10, 10]} />

                {/* Mesh */}
                <Pile
                    key={-1}
                    id={-1}
                    diameter={1}
                    length={20}
                    position={[0, 6.6, 0]}
                    rotation={[0.2, 0, 0]}
                    helices={
                        {
                            distanceFromBottom: 0,
                            spacing: 0,
                            pileRef: null,
                            helices: [],
                            addNewHelix: () => { },
                            removeLastHelix: () => { },
                        }

                    }
                />
            </Canvas>
        </div>
    )
}

export default LandingScene