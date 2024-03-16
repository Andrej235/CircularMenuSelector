import { useState } from "react";
import CircularMenu from "./CircularMenu/CircularMenu";
import Cube from "./Cube/Cube";
import { Canvas } from "@react-three/fiber";

function App() {
  const [selectedItemId, setSelectedItemId] = useState(0);

  return (
    <>
      <CircularMenu onItemSelected={setSelectedItemId} selectedItemId={selectedItemId} items={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30]} />

      <Canvas style={{ width: "100vw", height: "100vh" }} shadows>
        <Cube selectedItemId={selectedItemId} />
      </Canvas>
    </>
  );
}

export default App;