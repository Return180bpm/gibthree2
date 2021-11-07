import "./App.css";
import { Canvas } from "@react-three/fiber";
import { Box, Plane, PerspectiveCamera } from "@react-three/drei";

function App() {
    return (
        <div id="canvas-container">
            <Canvas>
                {/* <PerspectiveCamera
                    makeDefault
                    position={[0, 5, -15]}
                    fov={45}
                    aspect={window.innerWidth / window.innerHeight}
                    near={1}
                    far={1000}
                /> */}
                <ambientLight intensity={0.1} />
                <directionalLight color="red" position={[0, 0, 5]} />
                <Plane args={[20, 20]} />
                <Box args={[5, 5, 5]}>
                    <meshPhongMaterial attach="material" color="#f3f3f3" />
                </Box>
            </Canvas>
        </div>
    );
}

export default App;
