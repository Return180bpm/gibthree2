import "./App.css";
import { Canvas } from "@react-three/fiber";
import { Box, Plane, OrbitControls } from "@react-three/drei";

function Scene() {
    return (
        <>
            <OrbitControls />
            <ambientLight />
            <pointLight position={[-1, 2, 4]} />
            <Ground></Ground>
            <Cube size={[1, 1, 1]} pos={[0, 0, 0]} color="pink" />
            <Box args={[2, 2, 1]} position={[0, 5, 0]}>
                <meshPhongMaterial color="black"></meshPhongMaterial>
            </Box>
        </>
    );
}

//#TODO Why are props not working?
function Cube(size, pos, color) {
    return (
        <mesh position={[1, 1, 1]}>
            <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
            <meshStandardMaterial attach="material" color={"pink"} />
        </mesh>
    );
}

function Ground(size, rotation, color) {
    return <Plane args={[20, 20]} rotation={[-Math.PI / 2, 0, 0]} />;
}

function App() {
    return (
        <Canvas>
            <Scene />
        </Canvas>
    );
}

export default App;
