import "./App.css";
import { CubeTextureLoader } from "three";
import { useEffect, useCallback, useLayoutEffect, useRef } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import {
    useTexture,
    GizmoHelper,
    GizmoViewcube,
    GizmoViewport,
    DeviceOrientationControls,
    OrbitControls,
    PerspectiveCamera,
    Environment,
    Stars,
    Box,
    Loader,
} from "@react-three/drei";
import {
    Ground,
    Cylinder,
    Circle,
    Ball,
    Cube,
    CubeTextured,
} from "./shapes.js";
import { CubeWall, OscillatingShape, Spiral } from "./generators.js";
import { Suspense } from "react/cjs/react.production.min";

import Dat from "dat.gui";
import init from "three-dat.gui";
init(Dat);

var gui = new Dat.GUI();

function Skybox() {
    const { scene } = useThree();
    const loader = new CubeTextureLoader();
    // The CubeTextureLoader load method takes an array of urls representing all 6 sides of the cube.
    // const path = "assets/envmaps/";
    // const filenames = [
    //     "px.png",
    //     "nx.png",
    //     "py.png",
    //     "ny.png",
    //     "pz.png",
    //     "nz.png",
    // ];
    // const filepaths = filenames.map(filename => path + filename);
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

    const orbitcontrols = useCallback(node => {
        if (node !== null) {
            const orbitcontrolsFolder = gui.addFolder("OrbitControls");
            orbitcontrolsFolder.add(node.target, "x", 0, Math.PI * 2);
            orbitcontrolsFolder.add(node.target, "y", 0, Math.PI * 2);
            orbitcontrolsFolder.add(node.target, "z", 0, Math.PI * 2);
        }
    }, []);

    useLayoutEffect(() => {
        const perspectiveCameraFolder = gui.addFolder("Perspective Camera");
        perspectiveCameraFolder.add(
            perspectiveCamera.position,
            "x",
            0,
            Math.PI * 2
        );
        perspectiveCameraFolder.add(
            perspectiveCamera.position,
            "y",
            0,
            Math.PI * 2
        );
        perspectiveCameraFolder.add(
            perspectiveCamera.position,
            "z",
            0,
            Math.PI * 2
        );
        perspectiveCameraFolder.open();

        const cubeFolder = gui.addFolder("Cube");
        cubeFolder.add(cube.current.rotation, "x", 0, Math.PI * 2);
        cubeFolder.add(cube.current.rotation, "y", 0, Math.PI * 2);
        cubeFolder.add(cube.current.rotation, "z", 0, Math.PI * 2);
    }, []);

    return (
        <>
            <GizmoHelper alignment="bottom-right" margin={[80, 80]}>
                {/* <GizmoViewcube /> */}
                <GizmoViewport
                    axisColors={["red", "green", "blue"]}
                    labelColor="black"
                />
            </GizmoHelper>
            {/* <DeviceOrientationControls
                position={[0, 15, 0]}
                target={[0, -2, 0]}
            > */}
            <OrbitControls ref={orbitcontrols} target={[5, 0, 0]} />

            <ambientLight />
            <pointLight position={[-1, 2, 4]} />

            <Skybox />

            {/* <Environment
                background={false} // Whether to affect scene.background
                files={[
                    "px.png",
                    "nx.png",
                    "py.png",
                    "ny.png",
                    "pz.png",
                    "nz.png",
                ]} // Array of cubemap files OR single equirectangular file
                path={"assets/envmaps/gamrig_2k/"} // Path to the above file(s)
            /> */}

            <Ground></Ground>
            {/* <Stars /> */}

            <group position={[1, 1, 1]}>
                <pointLight position={[0, 0, 0]} />
                <Box ref={cube} position={[2, 1, 2]}>
                    <meshStandardMaterial />
                </Box>
            </group>
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
            {/* <Spiral position={[0, -10, 5]} /> */}
            {/* <CubeTextured /> */}
            {/* <Columns amount={20} /> */}
            {/* <CubeWall width={20} height={20} /> */}
            {/* <OscillatingShape num={30} /> */}
        </>
    );
}

function App() {
    return (
        <>
            <Canvas camera={{ fov: 90, position: [0, 0.4, 6.2] }}>
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
