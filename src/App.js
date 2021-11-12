import "./App.css";
import { Canvas, useThree } from "@react-three/fiber";
import { Stars, OrbitControls } from "@react-three/drei";
import { Ground, Cylinder, Circle, Ball, Cube } from "./shapes.js";
import { Columns, Planes, CubeWall } from "./generators.js";

function Scene() {
    const {
        camera,
        gl: { domElement },
    } = useThree();
    return (
        <>
            <OrbitControls />
            <ambientLight />
            <pointLight position={[-1, 2, 4]} />
            <Stars />
            <Ground></Ground>
            <Cube
                size={[1, 1, 1]}
                pos={[20, 5, 0]}
                color1="lime"
                color2="black"
            />
            <Ball
                radius={2}
                ws={10}
                hs={3}
                pos={[10, 3, 0]}
                color1="lime"
                color2="black"
            />
            <Circle
                pos={[0, 0.1, 0]}
                r={10}
                segments={7}
                rotation={[-Math.PI / 2, 0, 0]}
                color1={"midnightblue"}
            />
            <Cylinder
                pos={[0, 5, 0]}
                rTop={4}
                rBottom={1}
                h={10}
                rSegments={7}
                hSegments={7}
                isOpen={false}
                rotation={[0, 0, 0]}
                color1={"grey"}
            />
            <Columns amount={20} />
            <CubeWall width={20} height={10} />
        </>
    );
}

function App() {
    return (
        <Canvas>
            <Scene />
        </Canvas>
    );
}

export default App;
