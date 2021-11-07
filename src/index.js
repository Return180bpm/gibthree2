import ReactDOM from "react-dom";
import { Canvas } from "@react-three/fiber";
import { BoxGeometry, MeshStandardMaterial } from "three";

function App() {
    return (
        <div id="canvas-container">
            <Canvas>
                <mesh>
                    <ambientLight intensity={0.1} />
                    <directionalLight color="red" position={[0, 0, 5]} />
                    <boxGeometry />
                    <meshStandardMaterial />
                </mesh>
            </Canvas>
        </div>
    );
}

ReactDOM.render(<App />, document.getElementById("root"));
