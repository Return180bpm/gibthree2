import * as THREE from "three";
import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";

export const BebDice = ({}) => {
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
            bebDiceRef.current.rotation.x -= 0.01;
            const currentRotation = Number.parseFloat(
                Math.abs(Math.sin(bebDiceRef.current.rotation.x))
            ).toFixed(2);
            if (currentRotation < 0.1) {
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
