import "./App.css";
import { CubeTextureLoader } from "three";
import { useEffect, useCallback, useLayoutEffect, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
    useTexture,
    GizmoHelper,
    GizmoViewport,
    DeviceOrientationControls,
    OrbitControls,
    PerspectiveCamera,
    Box,
    Loader,
    Text,
} from "@react-three/drei";

import { CubeWall, OscillatingShape, Spiral } from "./generators.js";
import { BebDice, BebPillar, BebsLooking } from "./BebShapes";
import { Suspense } from "react/cjs/react.production.min";

import Dat from "dat.gui";
import init from "three-dat.gui";
import { TextAnimFlying } from "./Texts.js";
init(Dat);

var gui = new Dat.GUI();

function Skybox() {
    const { scene } = useThree();
    const loader = new CubeTextureLoader();

    const texture = loader
        .setPath("textures/beach_4k/")
        .load(["px.png", "nx.png", "py.png", "ny.png", "pz.png", "nz.png"]);
    // Set the scene background property to the resulting texture.
    scene.background = texture;
    return null;
}

function Scene() {
    let cube = useRef(null);
    const { camera: perspectiveCamera } = useThree();

    // const butt = useTexture("assets/normal_butt.png");

    // const orbitcontrols = useCallback(node => {
    //     if (node !== null) {
    //         const orbitcontrolsFolder = gui.addFolder("OrbitControls");
    //         orbitcontrolsFolder.add(node.target, "x", 0, Math.PI * 2);
    //         orbitcontrolsFolder.add(node.target, "y", 0, Math.PI * 2);
    //         orbitcontrolsFolder.add(node.target, "z", 0, Math.PI * 2);
    //     }
    // }, []);
    const devicecontrols = useCallback(node => {
        if (node !== null) {
            const Folder = gui.addFolder("DeviceControls");
            Folder.add(node.deviceOrientation, "alpha", 0, 360);
            Folder.add(node.deviceOrientation, "beta", 0, 360);
            Folder.add(node.deviceOrientation, "gamma", 0, 360);

            // target: Array;
            // deviceOrientation: alpha beta gamma
        }
    }, []);
    const textRefCallback = useCallback(node => {
        if (node !== null) {
            const Folder = gui.addFolder("Text");
            Folder.add(node.position, "x", -500, 500);
            Folder.add(node.position, "y", -500, 500);
            Folder.add(node.position, "z", -500, 500);
            Folder.add(node.rotation, "x", 0, 2 * Math.PI);
            Folder.add(node.rotation, "y", 0, 2 * Math.PI);
            Folder.add(node.rotation, "z", 0, 2 * Math.PI);
            Folder.add(node, "curveRadius", 0, 1000);
            Folder.add(node, "anchorX", -300, 300);
            Folder.add(node, "anchorY", -300, 300);
            Folder.open();

            // target: Array;
            // deviceOrientation: alpha beta gamma
        }
    }, []);
    const bebDiceRef = useCallback(node => {
        if (node !== null) {
            const Folder = gui.addFolder("BebDice");
            Folder.add(node.position, "x", -200, 200);
            Folder.add(node.position, "y", -200, 200);
            Folder.add(node.position, "z", -200, 200);
            Folder.add(node.rotation, "x", -2 * Math.PI, 2 * Math.PI);
            Folder.add(node.rotation, "y", -2 * Math.PI, 2 * Math.PI);
            Folder.add(node.rotation, "z", -2 * Math.PI, 2 * Math.PI);

            // Folder.open();

            // target: Array;
            // deviceOrientation: alpha beta gamma
        }
    }, []);
    const allPurposeRef = useCallback(node => {
        if (node !== null) {
            const Folder = gui.addFolder("BebShape");
            Folder.add(node.position, "x", -400, 400);
            Folder.add(node.position, "y", -400, 400);
            Folder.add(node.position, "z", -400, 400);
            Folder.add(node.rotation, "x", -2 * Math.PI, 2 * Math.PI);
            Folder.add(node.rotation, "y", -2 * Math.PI, 2 * Math.PI);
            Folder.add(node.rotation, "z", -2 * Math.PI, 2 * Math.PI);

            Folder.open();

            // target: Array;
            // deviceOrientation: alpha beta gamma
        }
    }, []);

    // useLayoutEffect(() => {
    //     const perspectiveCameraFolder = gui.addFolder("Perspective Camera");
    //     perspectiveCameraFolder.add(
    //         perspectiveCamera.position,
    //         "x",
    //         0,
    //         Math.PI * 2
    //     );
    //     perspectiveCameraFolder.add(
    //         perspectiveCamera.position,
    //         "y",
    //         0,
    //         Math.PI * 2
    //     );
    //     perspectiveCameraFolder.add(
    //         perspectiveCamera.position,
    //         "z",
    //         0,
    //         Math.PI * 2
    //     );

    //     const cubeFolder = gui.addFolder("Cube");
    //     cubeFolder.add(cube.current.rotation, "x", 0, Math.PI * 2);
    //     cubeFolder.add(cube.current.rotation, "y", 0, Math.PI * 2);
    //     cubeFolder.add(cube.current.rotation, "z", 0, Math.PI * 2);
    // }, []);

    return (
        <>
            <GizmoHelper alignment="bottom-right" margin={[80, 80]}>
                <GizmoViewport
                    axisColors={["red", "green", "blue"]}
                    labelColor="black"
                />
            </GizmoHelper>
            <DeviceOrientationControls
                ref={devicecontrols}
                deviceOrientation-alpha={164}
                deviceOrientation-beta={121}
            />
            {/* <OrbitControls target={[5, 0, 0]} /> */}

            <ambientLight intensity={0.1} />
            <pointLight position={[-1, 2, 4]} intensity={0.3} />

            <Skybox />
            <TextAnimFlying textRef={textRefCallback} />

            {/* <BebDice bebDiceRef={bebDiceRef}></BebDice> */}
            <BebPillar></BebPillar>
            <BebsLooking></BebsLooking>

            {/* <group position={[1, 1, 1]}>
                <pointLight position={[0, 0, 0]} />
                <Box ref={cube} position={[2, 1, 2]}>
                    <meshStandardMaterial />
                </Box>
            </group> */}
            {/* <Cube size={[5, 1, 2]} pos={[0, 2, -6]} color2="black" /> */}
            {/* <group position={[5, 0.1, 0]}>
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
            </group> */}
            <group position={[-123, 18.3, 27]} rotation={[0.01, -2.9, 0.7]}>
                <Spiral position={[0, -10, 5]} />
            </group>
            {/* <CubeTextured /> */}
            {/* <Columns amount={20} /> */}
            <group position={[-458, 0, 800]} rotation={[0.009, -0.41, 0.009]}>
                <CubeWall width={20} height={30} />
            </group>
            <group
                ref={allPurposeRef}
                position={[53, 44.7, 9]}
                rotation={[-4.84, -1.4, 0.29]}
            >
                <OscillatingShape num={30} />
            </group>
        </>
    );
}

function App() {
    return (
        <>
            <Canvas
                colorManagement={true}
                camera={{ fov: 120, position: [0, 0.4, 6.2] }}
            >
                <Suspense fallback={null}>
                    <Scene />
                </Suspense>
            </Canvas>
            <Loader />
        </>
    );
}

export default App;

// TODO: create custom controls so I can still drag and pinch while using <DeviceOrientationControls>
// The below version doesn't work yet.
// function Controls() {
//     let { gl, camera } = useThree();

//     camera = new THREE.PerspectiveCamera(
//         60,
//         window.innerWidth / window.innerHeight,
//         0.1,
//         1000.0
//     );
//     camera.position.set(-5, 10, -10);

//     const controls = new THREE.OrbitControls(camera, gl.domElement);

//     const updateCameraOrbit = () => {
//         const forward = new THREE.Vector3();
//         camera.getWorldDirection(forward);

//         controls.target.copy(camera.position).add(forward);
//     };

//     controls.addEventListener("end", () => {
//         updateCameraOrbit();
//     });

//     updateCameraOrbit();

//     // useEffect(() => {
//     //     camera.fov = 75;
//     //     camera.near = 1;
//     //     camera.far = 1000;
//     //     camera.position.set([0, 5, -20]);
//     //     // camera.rotateY(60);
//     //     camera.updateProjectionMatrix();
//     // }, []);
//     return <PerspectiveCamera makeDefault></PerspectiveCamera>;
// }
