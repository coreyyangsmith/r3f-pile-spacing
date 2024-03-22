import { OrbitControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { dark1, dark2, mixed2 } from '../../themes/Color'

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
                {/* Controls */}
                <OrbitControls
                    autoRotate
                    autoRotateSpeed={3}
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
                <mesh>
                    <boxGeometry />
                    <meshStandardMaterial color="yellow" />
                </mesh>
            </Canvas>
        </div>
    )
}

export default LandingScene