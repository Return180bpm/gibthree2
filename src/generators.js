// CONTAINING ARRANGEMENTS of basic shapes
//
import { useRef, useMemo } from "react";
import PropTypes from "prop-types";

import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { Ground, Cylinder, Circle, Ball, Cube } from "./shapes.js";
import {
    getRandomInRange,
    hex,
    lerp,
    clamp,
    invlerp,
    range,
    randomProperty,
} from "./utils.js";

const possibleShapes = {
    cube: Cube,
    ball: Ball,
};
const propTypes = {
    atomShape: PropTypes.oneOf(Object.keys(possibleShapes)),
};
function Spiral({
    position = [0, 0, 0],
    atomShape = "cube",
    numOfAtoms = 10,
    separation = 3,
    angle = 5,
}) {
    const spiralArr = [];
    let groupRef = useRef(null);

    useMemo(() => {
        for (let i = 0; i < numOfAtoms; i++) {
            const AtomShape = randomProperty(possibleShapes);
            spiralArr[i] = (
                <AtomShape position={[separation * i, 0, 0]} key={i} />
            );
            // spiralArr.push(<AtomShape position={[i, 0, 0]} key={i} />);
        }
    }, [numOfAtoms]);

    // return a group representing the whole oscillation. position it around 0 on the x-axis
    // TODO: use boundingrect for position?
    return (
        <group ref={groupRef} position={[(-numOfAtoms * separation) / 2, 2, 0]}>
            {spiralArr.length && spiralArr.map(atomShape => atomShape)}
        </group>
    );
}
Spiral.propTypes = propTypes;

function Columns({ amount }) {
    const colArr = [];
    for (let col = 0; col < amount; col++) {
        // const element = amount[col];
        const x = getRandomInRange(-100, 100);
        const y = getRandomInRange(-200, -20);
        const z = getRandomInRange(-100, 100);
        const h = getRandomInRange(80, 300);
        const colorInterpol = hex(Math.round(range(-200, -20, 0, 256, y)));
        colArr.push(
            <Cylinder
                pos={[x, y, z]}
                rTop={getRandomInRange(1, 20)}
                rBottom={getRandomInRange(1, 20)}
                h={h}
                rSegments={getRandomInRange(3, 20)}
                hSegments={7}
                isOpen={false}
                rotation={[0, 0, 0]}
                color1={`#${colorInterpol}${colorInterpol}${colorInterpol}`}
            />
        );
    }
    return <>{colArr.map(col => col)}</>;
}

function OscillatingShape({ num = 10 }) {
    const shapes = [];
    let ref = useRef(null);
    const sizeOfPoint = [1, 1, 1];
    let yV = 0;
    let blue = 0;

    const vec = new THREE.Vector3();

    useFrame(() => {
        for (let i = 0; i < ref.current.children.length; i++) {
            const shape = ref.current.children[i];

            // WAVES
            // simple sine wave
            shape.position.lerp(
                vec.set(shape.position.x, Math.sin(yV + i), shape.position.z),
                1
            );
            // sine wave with a little wobble on the z-axis
            // shape.position.lerp(
            //     vec.set(
            //         shape.position.x,
            //         Math.sin(yV + i),
            //         0.5 * Math.sin(yV + i)
            //     ),
            //     1
            // );
            // crazy irregular wavez in all idrections
            // shape.position.lerp(
            //     vec.set(
            //         shape.position.x,
            //         Math.sin(yV + i),
            //         Math.sin(
            //             yV **
            //                 (i /
            //                     range(
            //                         -1,
            //                         1,
            //                         60,
            //                         80,
            //                         Math.sin(shape.position.y)
            //                     ))
            //         )
            //     ),
            //     1
            // );

            // CHANGE COLOR based on coordinates. different effects
            blue = range(-1, 1, 0, 10, !vec.y || Math.sin(shape.position.y));
            // blue = vec.y;
            // SET the new color. 2 ways
            // shape.material.color = new THREE.Color(0, 0, blue);
            shape.material.color.b = blue;

            //DEFORM
            shape.scale.y = range(
                -1,
                1,
                0.8,
                1.2,
                Math.sin(shape.position.y * 5)
            );

            // Y VELOCITY. how fast it's going
            yV += 0.004;
        }
    });

    useMemo(() => {
        for (let i = 0; i < num; i++) {
            shapes.push(
                <mesh position={[i, 0, 0]} key={i}>
                    <boxBufferGeometry args={sizeOfPoint} />
                    <meshStandardMaterial
                        roughness={0.5}
                        attach="material"
                        color={"black"}
                    />
                </mesh>
            );
        }
    }, [num, shapes]);

    // return a group representing the whole oscillation. position it around 0 on the x-axis
    return (
        <group ref={ref} position={[(-sizeOfPoint[0] * num) / 2, 3, 0]}>
            {shapes.length && shapes.map(shape => shape)}
        </group>
    );
}

// TODO
function Planes({ amount }) {}

// wall out of cubes
function CubeWall({ width, height }) {
    let cubeArr = [];
    let colorMod;
    let v = 0;
    const sizeOfCube = [0.5, 0.5, 0.5];
    // const separation = 1;
    let group = useRef();

    // CREATE initial wall
    for (let row = 0; row < height; row++) {
        for (let col = 0; col < width; col++) {
            //only put in every other cube
            if (
                (row % 2 === 0 && col % 2 === 0) ||
                (row % 2 === 1 && col % 2 === 1)
            ) {
                const interPolNum =
                    (cubeArr.length * 256) / ((width / 2) * height);
                const _colorMod = invlerp(0, width + height, row + col) * 256;
                colorMod = range(-1, 1, 0, 256, Math.sin(col + row));
                const currentColor = `#00${hex(Math.round(colorMod))}00`;
                cubeArr.push(
                    <Cube
                        key={cubeArr.length}
                        size={sizeOfCube}
                        pos={[
                            col * sizeOfCube[0],
                            row * sizeOfCube[1] + sizeOfCube[1] * 0.5,
                            0,
                        ]}
                        posXY={{ x: col, y: row }}
                        color1={currentColor}
                        color2="black"
                        rotV={(row + col) / 2000 + 0.001}
                        rotA={(row + col) * 0.001}
                    ></Cube>
                );
            }
        }
    }

    // ANIMATE wall
    useFrame(() => {
        // could this be faster?
        //  for (let row = 0; row < height; row++) {
        // for (let col = 0; col < width; col++) {

        // }}
        for (let i = 0; i < group.current.children.length; i++) {
            const cube = group.current.children[i];

            cube.scale.z = range(-1, 1, 0.8, 2, Math.sin(i + v));
            cube.children[0].material.color.g = range(
                -1,
                1,
                0.2,
                1,
                Math.sin(i + v * 5)
            );
        }
        v += 0.01;
    });
    return (
        <group ref={group} position={[(-sizeOfCube[0] * width) / 2, 0, -10]}>
            {cubeArr.length && cubeArr.map(cube => cube)}
        </group>
    );
}

export { Columns, Planes, CubeWall, OscillatingShape, Spiral };
