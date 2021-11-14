import { useRef, useMemo } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { Ground, Cylinder, Circle, Ball, Cube } from "./shapes.js";
import { getRandomInRange, hex, lerp, clamp, invlerp, range } from "./utils.js";

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
    let ref = useRef();
    const size = [1, 1, 1];
    let y = 0;
    let yV = 0;
    let blue = 0;

    const vec = new THREE.Vector3();

    useFrame(() => {
        // for (let i = 0; i < refArr.length; i++) {
        //     const shape = refArr[i];

        //     shape.position.lerp(vec.set(0, Math.sin(yV), 0), 0.1);
        //     yV += 0.1;
        // }
        for (let i = 0; i < ref.current.children.length; i++) {
            const shape = ref.current.children[i];
            // modifyng position of mesh within group
            // why does this give a different result?
            // shape.children[0].position.lerp(
            //     vec.set(0, Math.sin(yV + i), 0),
            //     0.1
            // );
            // modifyng position of group
            shape.position.lerp(
                vec.set(
                    shape.position.x,
                    Math.sin(yV + i),
                    0.5 * Math.sin(yV + i)
                ),
                1
            );
            // crazy wavez
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
            blue = range(-1, 1, 0, 10, !vec.y || Math.sin(shape.position.y));
            // blue = vec.y;

            shape.material.color = new THREE.Color(0, 0, blue);

            yV += 0.004;
        }
    });

    useMemo(() => {
        for (let i = 0; i < num; i++) {
            // const element = num[i];

            shapes.push(
                // <group position={[i, y, 0]} key={i}>
                <mesh position={[i, y, 0]} key={i}>
                    <boxBufferGeometry args={size} />
                    <meshStandardMaterial
                        roughness={0.5}
                        attach="material"
                        color={"aquamarine"}
                    />
                </mesh>
            );
            // shapes.push(
            //     <group position={[i, y, 0]} key={i}>
            //         <mesh>
            //             <boxBufferGeometry args={size} />
            //             <meshStandardMaterial
            //                 roughness={0.5}
            //                 attach="material"
            //                 color={"aquamarine"}
            //             />
            //         </mesh>
            //     </group>
            // );
        }
    }, [num, y, shapes]);

    return (
        <group ref={ref} position={[(-size[0] * num) / 2, 3, 0]}>
            {shapes.map(shape => shape)}
        </group>
    );
}

function Planes({ amount }) {}

// wall out of cubes
function CubeWall({ width, height }) {
    let cubeArr = [];
    let colorMod;

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
                const _colorMod = invlerp(0, width + height, row + col) * 256;
                colorMod = range(-1, 1, 0, 256, Math.sin(col + row));
                const currentColor = `#00${hex(Math.round(colorMod))}00`;
                cubeArr.push(
                    <Cube
                        key={cubeArr.length}
                        size={[1, 1, 1]}
                        pos={[col - 10, row + 0.5, -width / 2]}
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
    return <>{cubeArr && cubeArr.map(cube => cube)}</>;
}

export { Columns, Planes, CubeWall, OscillatingShape };
