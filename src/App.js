import "./App.css";
import { Canvas, useThree } from "@react-three/fiber";
import { Stars, OrbitControls } from "@react-three/drei";
import { Ground, Cylinder, Circle, Ball, Cube } from "./shapes.js";
import { Columns, Planes, CubeWall, OscillatingShape } from "./generators.js";

function Scene() {
    return (
        <>
            <OrbitControls target={[5, 3, -10]} />
            <ambientLight />
            <pointLight position={[-1, 2, 4]} />
            <Stars />
            <Ground></Ground>
            <Cube
                size={[3, 6, 2]}
                pos={[10, 3.1, 2]}
                color1="lime"
                color2="black"
            />
            <group position={[10, 0.1, 5]}>
                <Ball
                    radius={2}
                    ws={10}
                    hs={5}
                    pos={[0, 11, 0]}
                    color1="blueviolet"
                    color2="blanchedalmond"
                />
                <Circle
                    pos={[0, 0.1, 0]}
                    r={5}
                    segments={17}
                    rotation={[-Math.PI / 2, 0, 0]}
                    color1={"hotpink"}
                />
                <Cylinder
                    pos={[0, 5, 0]}
                    rTop={1}
                    rBottom={0.5}
                    h={10}
                    rSegments={7}
                    hSegments={7}
                    isOpen={false}
                    rotation={[0, 0, 0]}
                    color1={"crimson"}
                />
            </group>
            {/* <Columns amount={20} /> */}
            <CubeWall width={20} height={20} />
            {/* <OscillatingShape num={30} /> */}
        </>
    );
}

function App() {
    return (
        <Canvas camera={{ fov: 75, position: [-10, 5, -5] }}>
            <Scene />
        </Canvas>
    );
}

export default App;
