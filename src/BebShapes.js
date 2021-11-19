import * as THREE from "three";
import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";

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
