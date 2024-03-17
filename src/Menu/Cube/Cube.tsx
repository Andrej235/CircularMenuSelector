import { useEffect, useRef } from 'react';
import { Mesh } from 'three';
import { useFrame, useLoader, useThree } from '@react-three/fiber';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

type CubeProps = {
    selectedItemId: number;
    onClick: () => void;
}

export default function Cube({ selectedItemId, onClick }: CubeProps): JSX.Element {
    const gltf = useLoader(GLTFLoader, '/3DModels/monkey.glb');

    const cubeRef = useRef<Mesh>(null);
    const previousSelectedItemId = useRef(selectedItemId);
    const spinDirection = useRef(1);

    const { contextSafe } = useGSAP();

    const spin = contextSafe((n: number) => {
        if (cubeRef.current) {
            gsap.to(cubeRef.current.rotation, {
                y: `${spinDirection.current < 0 ? '-=' : '+='}${3.14 * (n > 7 ? n / 2 : n)}`,
                duration: 1 + n * 0.1,
                ease: 'sin.inOut',
            });
        }
    });

    useEffect(() => {
        if (previousSelectedItemId.current !== selectedItemId) {
            let difference = Math.abs(previousSelectedItemId.current - selectedItemId);
            difference = Math.min(difference, 30 - difference);
            spinDirection.current = Math.sign(previousSelectedItemId.current - selectedItemId);

            spin(difference);
            previousSelectedItemId.current = selectedItemId;
        }
    }, [selectedItemId, spin]);

    useFrame(() => {
        if (cubeRef.current) {
            cubeRef.current.rotation.x += 0.001;
            cubeRef.current.rotation.y += 0.005 * spinDirection.current;
        }
    });

    const viewport = useThree(state => state.viewport);
    const scale = Math.min(viewport.width, viewport.height) / 2.7;

    return (
        <>
            <spotLight
                intensity={10.}
                castShadow
                shadow-mapSize-height={512}
                shadow-mapSize-width={512}
                position={[.5, 2, 5]}
                color={'#ffd'}
                target={cubeRef.current ?? undefined} />

            <mesh ref={cubeRef} receiveShadow castShadow onClick={onClick} geometry={
                //@ts-expect-error
                gltf.scene.children[0].geometry
            } scale={scale / 1.5}>

                {/* <boxGeometry /> */}
                <meshStandardMaterial color={'#fff'} />
            </mesh>
        </>
    )
}
