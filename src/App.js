import "./App.css";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import { Stars, Box, Plane, OrbitControls } from "@react-three/drei";
import { useSpring, animated as a, config } from "@react-spring/three";
import { useState, useRef } from "react";

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
            <CubeWall width={20} height={10} />
            {/* <Cube
                size={[1, 8, 1]}
                pos={[0, 5, 5]}
                rotation={[Math.PI / 3, 0, 0]}
                color="black"
            /> */}
        </>
    );
}

// wall out of cubes
function CubeWall({ width, height }) {
    let cubeArr = [];

    for (let row = 0; row < height; row++) {
        // const element = height[row];
        for (let col = 0; col < width; col++) {
            // const element = width[col];
            if (
                (row % 2 === 0 && col % 2 === 0) ||
                (row % 2 === 1 && col % 2 === 1)
            ) {
                const interPolNum =
                    (cubeArr.length * 256) / ((width / 2) * height);
                const hex = d => Number(d).toString(16).padStart(2, "0");
                const currentColor = `#ff${hex(Math.floor(interPolNum))}ff`;
                cubeArr.push(
                    <Cube
                        key={cubeArr.length}
                        size={[1, 1, 1]}
                        pos={[col - 10, row + 0.5, -width / 2]}
                        color1={currentColor}
                        color2="black"
                        rotationSpeed={(row * col) / 1000 + 0.002}
                    ></Cube>
                );
            }
        }
    }
    return <>{cubeArr && cubeArr.map(cube => cube)}</>;
}

//#TODO Why are props not working?
// function Cube(size, pos, color) {
function Cube({ size, pos, color1, color2, rotationSpeed = 0.01 }) {
    const [isBig, setIsBig] = useState(false);
    const [active, setActive] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    // const { spring, scale } = useSpring({
    //     spring: active,

    //     scale: isBig ? 3 : 1,
    //     config: config.wobbly,
    // });
    const { spring, position } = useSpring({
        spring: active,
        config: { mass: 3, tension: 600, friction: 50, precision: 0.0001 },
        position: active ? [0, 0, 0] : pos,
    });
    const scale = spring.to([0, 1], [1, 5]);
    // const position = spring.to([0, 1], [pos, [0, 0, 0]]);
    const rotation = spring.to([0, 1], [0, Math.PI]);
    // Can I have this and also change the color when I'm hovering?
    const color = spring.to([0, 1], [color1, color2]);

    const ref = useRef();

    useFrame(() => {
        ref.current.rotation.y += rotationSpeed;
    });

    return (
        // Taken from https://gracious-keller-98ef35.netlify.app/docs/recipes/animating-with-react-spring/
        <a.group position={position}>
            <a.mesh
                ref={ref}
                scale-x={scale}
                rotation-y={rotation}
                onClick={() => {
                    setIsBig(!isBig);
                    setActive(Number(!active));
                }}
            >
                <boxBufferGeometry args={size} />
                <a.meshStandardMaterial
                    roughness={0.5}
                    attach="material"
                    color={color}
                />
            </a.mesh>
        </a.group>
    );
}

// Tried to make spring work with drei directly.
function CubeDrei({ size, pos, color }) {
    const [isBig, setIsBig] = useState(false);
    const { scale } = useSpring({
        scale: isBig ? 3 : 1,
        config: config.wobbly,
    });

    return (
        <Box
            args={size}
            position={pos}
            rotation={[Math.PI / 3, 0, 0]}
            scale={scale}
        >
            <a.meshPhongMaterial
                onClick={() => setIsBig(!isBig)}
                color={color}
            ></a.meshPhongMaterial>
        </Box>
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
