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

function Planes({ amount }) {}

// wall out of cubes
function CubeWall({ width, height }) {
    let cubeArr = [];

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

                const currentColor = `#00${hex(Math.floor(interPolNum))}00`;
                cubeArr.push(
                    <Cube
                        key={cubeArr.length}
                        size={[1, 1, 1]}
                        pos={[col - 10, row + 0.5, -width / 2]}
                        color1={currentColor}
                        color2="black"
                        rotationSpeed={(row * col) / 2000 + 0.002}
                    ></Cube>
                );
            }
        }
    }
    return <>{cubeArr && cubeArr.map(cube => cube)}</>;
}

export { Columns, Planes, CubeWall };
