import { useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import gsap from "gsap";
import { Observer } from "gsap/Observer";
import CircularMenu from "./CircularMenu/CircularMenu";
import Cube from "./Cube/Cube";
import { Navigate, useNavigate } from "react-router-dom";

export default function Menu() {
    gsap.registerPlugin(Observer);

    const canvasRef = useRef<HTMLCanvasElement>(null)

    const [selectedItemId, setSelectedItemId] = useState(0);
    const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30];

    const navigate = useNavigate();

    const incrementSelectedId = () => {
        let newSelectedItemId = selectedItemId + 1;
        if (newSelectedItemId >= items.length)
            newSelectedItemId = 0;

        setSelectedItemId(newSelectedItemId);
    }

    const decrementSelectedId = () => {
        let newSelectedItemId = selectedItemId - 1;
        if (newSelectedItemId < 0)
            newSelectedItemId = items.length - 1;

        setSelectedItemId(newSelectedItemId);
    }

    Observer.create({
        type: "wheel",
        wheelSpeed: -1,
        tolerance: 10,
        preventDefault: true,
        onUp: incrementSelectedId,
        onDown: decrementSelectedId
    });

    Observer.create({
        type: "touch,pointer",
        wheelSpeed: 0,
        tolerance: 10,
        dragMinimum: 25,
        preventDefault: true,
        lockAxis: true,
        onRight: incrementSelectedId,
        onLeft: decrementSelectedId,
    });

    const onCubeClick = () => {
        navigate(`/item/${selectedItemId}`);
    };

    return (
        <>
            <CircularMenu onItemSelected={setSelectedItemId} selectedItemId={selectedItemId} items={items} />

            <Canvas style={{ width: "33vw", height: "33vh", zIndex: 10 }} shadows ref={canvasRef}>
                <Cube selectedItemId={selectedItemId} onClick={onCubeClick} />
            </Canvas>
        </>
    );
}
