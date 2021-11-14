import { useFrame } from "@react-three/fiber";
import { Plane } from "@react-three/drei";

import { useSpring, animated as a } from "@react-spring/three";
import { useState, useRef } from "react";

function Ground(size, rotation, color) {
    return <Plane args={[20, 20]} rotation={[-Math.PI / 2, 0, 0]} />;
}

function Cylinder({
    pos,
    rTop,
    rBottom,
    h,
    rSegments,
    hSegments,
    isOpen,
    rotation,
    color1,
}) {
    return (
        <mesh position={pos} rotation={rotation}>
            <cylinderBufferGeometry
                args={[rTop, rBottom, h, rSegments, hSegments, isOpen]}
            />
            <meshStandardMaterial color={color1}></meshStandardMaterial>
        </mesh>
    );
}

function Circle({ pos, r, segments, rotation, color1 }) {
    return (
        <mesh position={pos} rotation={rotation}>
            <circleBufferGeometry args={[r, segments]} />
            <meshStandardMaterial color={color1}></meshStandardMaterial>
        </mesh>
    );
}

function Ball({ pos, r, ws, hs, color1, color2 }) {
    return (
        <mesh position={pos}>
            <sphereBufferGeometry args={[r, ws, hs]} />
            <meshStandardMaterial color={color1} />
        </mesh>
    );
}

function Cube({
    size = [1, 1, 1],
    pos = [0, 0, 0],
    posXY = { x: 1, y: 1 },
    color1 = "white",
    color2 = "aquamarine",
    rotV = 0.01,
    rotA = 0.005,
}) {
    const [isBig, setIsBig] = useState(false);
    const [active, setActive] = useState(0);
    const [isHovered, setIsHovered] = useState(false);

    // following beb's video tutorial
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

    useFrame(({ clock }) => {
        // changing color --- how???
        // wobble + wave, to be used together. Works inside  CubeWall
        // ref.current.rotation.x = Math.sin(ref.current.position.z);
        // ref.current.position.z =
        //     // Math.sin(ref.current.position.x) + clock.getElapsedTime() / 1000;
        //     // Math.sin(posXY.y);
        //     Math.sin(10 * posXY.x * posXY.y + clock.getElapsedTime() * 9) / 10;
        // reversing rotation
        // ref.current.rotation.y += rotV;
        // rotV += rotA;
        // if (rotV > 0.005) {
        //     rotA = -rotA;
        // }
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
// function CubeDrei({ size, pos, color }) {
//     const [isBig, setIsBig] = useState(false);
//     const { scale } = useSpring({
//         scale: isBig ? 3 : 1,
//         config: config.wobbly,
//     });

//     return (
//         <Box
//             args={size}
//             position={pos}
//             rotation={[Math.PI / 3, 0, 0]}
//             scale={scale}
//         >
//             <a.meshPhongMaterial
//                 onClick={() => setIsBig(!isBig)}
//                 color={color}
//             ></a.meshPhongMaterial>
//         </Box>
//     );
// }

export { Ground, Cylinder, Circle, Ball, Cube };
