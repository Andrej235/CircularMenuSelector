import { useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import gsap from "gsap";
import { Observer } from "gsap/Observer";
import CircularMenu from "./CircularMenu/CircularMenu";
import Cube from "./Cube/Cube";
import { useNavigate } from "react-router-dom";

type MenuProps = {
    onStartLoadingItem: () => void,
    onFinishLoadingItem: () => void
}

export default function Menu({ onStartLoadingItem, onFinishLoadingItem }: MenuProps) {
    gsap.registerPlugin(Observer);

    const canvasRef = useRef<HTMLCanvasElement>(null)

    const [menuScale, setMenuScale] = useState<number>(1.0)
    const [selectedItemId, setSelectedItemId] = useState<number>(0);
    const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30];

    const [isWaitingForNavigation, setIsWaitingForNavigation] = useState<boolean>(false)
    const navigate = useNavigate();

    if (isWaitingForNavigation)
        return (
            //Put the weird loading thing I made here (shader)
            // <div>Loading</div>
            <></>
        );

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
        type: "touch",
        wheelSpeed: 0,
        tolerance: 10,
        dragMinimum: 75,
        preventDefault: true,
        lockAxis: true,
        onUp: () => setMenuScale(0.5),
        onDown: () => setMenuScale(1.0)
    });

    Observer.create({
        type: "touch,pointer",
        wheelSpeed: 0,
        tolerance: 10,
        dragMinimum: 25,
        preventDefault: true,
        onRight: incrementSelectedId,
        onLeft: decrementSelectedId,
    });

    const onCubeClick = () => {
        onStartLoadingItem();
        setIsWaitingForNavigation(true);
        navigate(`/item/${selectedItemId}`);
    };

    return (
        <>
            <CircularMenu onItemSelected={setSelectedItemId} selectedItemId={selectedItemId} items={items} scale={menuScale} />

            <Canvas style={{ width: "33svw", height: "33svh", zIndex: 10 }} shadows ref={canvasRef}>
                <Cube selectedItemId={selectedItemId} onClick={onCubeClick} />
            </Canvas>
        </>
    );
}
