import { useEffect, useRef } from 'react';
import { Mesh } from 'three';
import { useFrame, useThree } from '@react-three/fiber';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

type CubeProps = {
    selectedItemId: number;
    onClick: () => void;
}

/**
 * Component representing a spinning cube.
 * 
 * @param {CubeProps} props - The props for the cube.
 * @param {number} props.selectedItemId - The index of the currently selected item.
 * @param {() => void} props.onClick - The callback function when the cube is clicked.
 * @returns {JSX.Element} The rendered cube.
 */
export default function Cube({ selectedItemId, onClick }: CubeProps): JSX.Element {
    // Reference to the cube mesh.
    const cubeRef = useRef<Mesh>(null);
    // Reference to the previous selected item ID.
    const previousSelectedItemId = useRef(selectedItemId);
    // Reference to the spin direction. Positive value spins clockwise, negative value spins counter-clockwise.
    const spinDirection = useRef(1);

    // Hook for GSAP.
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
                y: `${spinDirection.current < 0 ? '-=' : '+='}${3.14 * (n > 7 ? n / 2 : n)}`, // Add the specified number of full rotations to the current rotation
                duration: 1 + n * 0.1, // Duration of 1 + n * 0.1 second
                ease: 'sin.inOut', // Smooth sine wave motion
            });
        }
    });

    // Effect hook to handle spin animation when the selected item ID changes.
    useEffect(() => {
        if (previousSelectedItemId.current !== selectedItemId) {
            // Calculate the difference between the previous and current selected item IDs.
            let difference = Math.abs(previousSelectedItemId.current - selectedItemId);
            // Limit the difference to a minimum of 1 and a maximum of 30.
            difference = Math.min(difference, 30 - difference);
            // Set the spin direction based on the difference.
            spinDirection.current = Math.sign(previousSelectedItemId.current - selectedItemId);

            // Spin the cube by the calculated difference.
            spin(difference);
            // Update the previous selected item ID.
            previousSelectedItemId.current = selectedItemId;
        }
    }, [selectedItemId, spin]);

    // useFrame hook to continuously rotate the cube.
    useFrame(() => {
        if (cubeRef.current) {
            cubeRef.current.rotation.x += 0.001;
            cubeRef.current.rotation.y += 0.005 * spinDirection.current;
        }
    });

    // Hook to get the viewport size.
    const viewport = useThree(state => state.viewport);
    // Calculate the scale of the cube based on the viewport size.
    const scale = Math.min(viewport.width, viewport.height) / 2.7;

    // Render the cube with a spot light and a cube mesh.
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

            <mesh ref={cubeRef} receiveShadow castShadow onClick={onClick} scale={scale}>
                <boxGeometry />
                <meshStandardMaterial color={'#fff'} />
            </mesh>
        </>
    )
}