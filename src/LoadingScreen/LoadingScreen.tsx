import { Canvas, extend, useFrame, useThree } from '@react-three/fiber'
import { LoadingScreenMaterial } from './LoadingScreenMaterial';
import { useRef, useState } from 'react';
import './LoadingScreen.scss';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

extend({ LoadingScreenMaterial })

export default function LoadingScreen() {
    const { contextSafe } = useGSAP();
    const h1Ref = useRef<HTMLHeadingElement>(null);

    return (
        <div id="loading-screen">
            <Canvas>
                <LoadingScreenCanvasElements hidden={false} />
            </Canvas>

            <h1 ref={h1Ref}>Loading...</h1>
        </div>
    )
}

function LoadingScreenCanvasElements({ hidden }: { hidden: boolean }) {
    const { width, height } = useThree(state => state.viewport)
    const loadingScreenMaterialRef = useRef<LoadingScreenMaterial>(null);

    useGSAP(() => {
        gsap.fromTo(loadingScreenMaterialRef.current!.uniforms.uTime,
            {
                value: 3.14,
            },
            {
                value: -1,
                duration: 3,
                onComplete: () => {

                },
            });
    }, [loadingScreenMaterialRef]);


    return (
        <mesh>
            <planeGeometry args={[width, height]} />
            <loadingScreenMaterial ref={loadingScreenMaterialRef} />
        </mesh>
    );
}
