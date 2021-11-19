import * as THREE from "three";
import React, { useRef, useMemo, useEffect } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { TextureLoader } from "three/src/loaders/TextureLoader";

export const BebPillar = ({ bebRefCallback }) => {
    useEffect(() => {
        THREE.Object3D.prototype.rotateAroundWorldAxis = (function () {
            // rotate object around axis in world space (the axis passes through point)
            // axis is assumed to be normalized
            // assumes object does not have a rotated parent

            var q = new THREE.Quaternion();

            return function rotateAroundWorldAxis(point, axis, angle) {
                q.setFromAxisAngle(axis, angle);

                this.applyQuaternion(q);

                this.position.sub(point);
                this.position.applyQuaternion(q);
                this.position.add(point);

                return this;
            };
        })();
    }, []);
    return (
        <group>
            <BebFoods></BebFoods>
        </group>
    );
};
const BebFoods = () => {
    return (
        <>
            {bebFoodPoints().map((bebFoodPoint, i) => {
                return (
                    <BebFood
                        pos={bebFoodPoint}
                        textureFileName={`${i + 1}.jpeg`}
                        key={i}
                    ></BebFood>
                );
            })}
        </>
    );
};

const bebFoodPoints = () => {
    const resultArr = [];
    const num = 5;
    const r = 100;
    const first = [77, 36, 66];
    for (let i = 0; i < num; i++) {
        // const element = array[i];
        const x = first[0] + r * Math.cos(((Math.PI * 2) / num) * i);
        const z = first[2] + r * Math.sin(((Math.PI * 2) / num) * i);
        const y = first[1];
        resultArr[i] = [x, y, z];
    }
    return resultArr;
};

const BebFood = ({ pos, textureFileName }) => {
    const bebRef = useRef(null);
    const p = new THREE.Vector3(0, 0, 50);
    const ax = new THREE.Vector3(0, 10, 0);
    let v = 0;

    // const foodTexture = useMemo(() => {
    const path = "/assets/foods/";
    //     return new THREE.MeshLambertMaterial({
    //         map: new THREE.TextureLoader().load(path+textureFileName),
    //     });

    // }, []);
    const foodTexture = useLoader(TextureLoader, path + textureFileName);

    useFrame(() => {
        if (bebRef.current) {
            bebRef.current.rotateAroundWorldAxis(p, ax, 0.001);
        }
    });
    return (
        <mesh ref={bebRef} position={pos} rotation={[0, 0, 0]}>
            <boxGeometry args={[40, 40, 40, 1, 1, 1]} />
            <meshLambertMaterial map={foodTexture} />
        </mesh>
    );
};

export const BebDice = ({}) => {
    let v = 0;
    const bebFaces = useMemo(() => {
        const resultArr = [];
        for (let fileIndex = 0; fileIndex < 7; fileIndex++) {
            const filename = `assets/gi/${fileIndex}.jpeg`;
            resultArr[fileIndex] = new THREE.TextureLoader().load(filename);
        }
        return resultArr;
    }, []);
    const bebFaceFirst = new THREE.MeshLambertMaterial({
        map: bebFaces[Math.floor(Math.random() * bebFaces.length)],
    });

    const bebFacesIndex = useRef(0);
    const blankFaces = [
        new THREE.MeshLambertMaterial({ color: "red" }),
        new THREE.MeshLambertMaterial({ color: "blue" }),
        new THREE.MeshLambertMaterial({ color: "yellow" }),
        new THREE.MeshLambertMaterial({ color: "blue" }),
        new THREE.MeshLambertMaterial({ color: "green" }),
    ];
    const materials = [bebFaceFirst].concat(blankFaces);

    const bebDiceRef = useRef(null);

    useFrame(() => {
        if (bebDiceRef.current) {
            bebDiceRef.current.rotation.x = -Math.PI * 2 * v;
            v += 0.002;
            const currentRotationRoundedOffset = Number.parseFloat(
                Math.abs(bebDiceRef.current.rotation.x + Math.PI * 1.5).toFixed(
                    2
                )
            );

            if (
                Number.parseFloat(currentRotationRoundedOffset % 3.14).toFixed(
                    2
                ) < 0.02
            ) {
                bebFacesIndex.current =
                    (bebFacesIndex.current + 1) % bebFaces.length;
                const currentTexture = bebFaces[bebFacesIndex.current];
                materials[0] = new THREE.MeshLambertMaterial({
                    map: currentTexture,
                });

                bebDiceRef.current.material = materials;
            }
        }
    });

    return (
        <mesh
            ref={bebDiceRef}
            material={materials}
            position={[27, 14, 66]}
            rotation={[0, 2, 0]}
        >
            <boxGeometry args={[40, 40, 40, 1, 1, 1]} />
            {/* <meshLambertMaterial /> */}
        </mesh>
    );
};
