import "./App.css";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import { Stars, Box, Plane, OrbitControls } from "@react-three/drei";
import { useSpring, animated, config } from "@react-spring/three";
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
            <Cube size={[1, 1, 1]} pos={[0, 1, 0]} color="lime" />
            <Cube
                size={[1, 8, 1]}
                pos={[0, 5, 0]}
                rotation={[Math.PI / 3, 0, 0]}
                color="black"
            />
        </>
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
            <animated.meshPhongMaterial
                onClick={() => setIsBig(!isBig)}
                color={color}
            ></animated.meshPhongMaterial>
        </Box>
    );
}

//#TODO Why are props not working?
// function Cube(size, pos, color) {
function Cube({ size, pos, rotation, color }) {
    const [isBig, setIsBig] = useState(false);
    const { scale } = useSpring({
        scale: isBig ? 3 : 1,
        config: config.wobbly,
    });
    const ref = useRef();

    useFrame(() => {
        ref.current.rotation.x += 0.01;
    });

    return (
        <animated.mesh
            ref={ref}
            position={pos}
            scale={scale}
            rotation={rotation}
            onClick={() => {
                setIsBig(!isBig);
            }}
        >
            <boxBufferGeometry args={size} />
            <meshStandardMaterial color={color} />
        </animated.mesh>
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
