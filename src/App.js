import "./App.css";
import * as THREE from "three";
import { useEffect } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import {
    PerspectiveCamera,
    Stars,
    OrbitControls,
    DeviceOrientationControls,
} from "@react-three/drei";
import {
    Ground,
    Cylinder,
    Circle,
    Ball,
    Cube,
    CubeTextured,
} from "./shapes.js";
import { Columns, Planes, CubeWall, OscillatingShape } from "./generators.js";
import { Suspense } from "react/cjs/react.production.min";

// TODO maybe import OrbitCOntrols manually from three/examples/jsm/etc...
function Controls() {
    let { gl, camera } = useThree();

    camera = new THREE.PerspectiveCamera(
        60,
        window.innerWidth / window.innerHeight,
        0.1,
        1000.0
    );
    camera.position.set(-5, 10, -10);

    const controls = new THREE.OrbitControls(camera, gl.domElement);

    const updateCameraOrbit = () => {
        const forward = new THREE.Vector3();
        camera.getWorldDirection(forward);

        controls.target.copy(camera.position).add(forward);
    };

    controls.addEventListener("end", () => {
        updateCameraOrbit();
    });

    updateCameraOrbit();

    // useEffect(() => {
    //     camera.fov = 75;
    //     camera.near = 1;
    //     camera.far = 1000;
    //     camera.position.set([0, 5, -20]);
    //     // camera.rotateY(60);
    //     camera.updateProjectionMatrix();
    // }, []);
    return <PerspectiveCamera makeDefault></PerspectiveCamera>;
}
function Scene() {
    return (
        <>
            <DeviceOrientationControls makeDefault />

            {/* <OrbitControls target={[5, 3, -10]} /> */}
            {/* <OrbitControls /> */}
            {/* <Controls /> */}
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
            <CubeTextured />
            {/* <Columns amount={20} /> */}
            <CubeWall width={20} height={20} />
            {/* <OscillatingShape num={30} /> */}
        </>
    );
}

function App() {
    return (
        <Suspense fallback={null}>
            <Canvas camera={{ fov: 75, position: [-10, 5, -5] }}>
                <Scene />
            </Canvas>
        </Suspense>
    );
}

export default App;
