import { useEffect, useRef } from 'react';
import { Mesh } from 'three';
import { useFrame } from '@react-three/fiber';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

type CubeProps = {
    selectedItemId: number;
}

export default function Cube({ selectedItemId }: CubeProps) {
    const cubeRef = useRef<Mesh>(null);
    const previousSelectedItemId = useRef(selectedItemId);

    const { contextSafe } = useGSAP();
    /**
     * Spins the cube by the specified number of full rotations.
     * 
     * @param {number} n - The number of full rotations to spin. Positive values spin clockwise, negative values spin counter-clockwise.
     */
    const spin = contextSafe((n: number) => {
        // The spin function is responsible for rotating the cube's Y-axis by the specified number of full rotations.
        // This is done using GSAP for smooth animations.

        // If the cubeRef is not null, meaning the cube has been rendered, we animate its rotation using gsap.to.
        // The target of the animation is the cube's rotation, and we animate the Y-axis rotation by adding the specified number of full rotations.
        // The duration of the animation is 1 + n * 0.1 second, and the ease is set to 'sin.inOut' for a smooth sine wave motion.
        if (cubeRef.current) {
            gsap.to(cubeRef.current.rotation, {
                y: `+=${3.14 * (n > 7 ? n / 2 : n)}`, // Add the specified number of full rotations to the current rotation
                duration: 1 + n * 0.1, // Duration of 1 + n * 0.1 second
                ease: 'sin.inOut', // Smooth sine wave motion
            });
        }
    });


    useEffect(() => {
        if (previousSelectedItemId.current !== selectedItemId) {

            let difference = Math.abs(previousSelectedItemId.current - selectedItemId);
            difference = Math.min(difference, 30 - difference); 
            // difference *= Math.sign(previousSelectedItemId.current - selectedItemId); //? Uncomment to invert the direction of the spin based on the difference between the previous and current selected item IDs

            spin(difference);
            console.log(difference);

            previousSelectedItemId.current = selectedItemId;
        }
    }, [selectedItemId, spin]);

    useFrame(() => {
        if (cubeRef.current) {
            cubeRef.current.rotation.x += 0.001;
            cubeRef.current.rotation.y += 0.005;
        }
    });

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



            <mesh ref={cubeRef} receiveShadow castShadow>
                <boxGeometry />
                <meshStandardMaterial color={'#fff'} />
            </mesh>
        </>
    )
}