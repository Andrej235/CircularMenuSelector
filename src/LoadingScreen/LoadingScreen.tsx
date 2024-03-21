import { Canvas, extend, useThree } from '@react-three/fiber'
import { LoadingScreenMaterial } from './LoadingScreenMaterial';
import { useEffect, useRef } from 'react';
import './LoadingScreen.scss';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

extend({ LoadingScreenMaterial })

type LoadingScreenProps = {
    hidden: boolean,
}

export default function LoadingScreen({ hidden }: LoadingScreenProps) {
    return (
        <div id="loading-screen">
            <Canvas>
                <LoadingScreenCanvasElements hidden={hidden} />
            </Canvas>
        </div>
    )
}

function LoadingScreenCanvasElements({ hidden }: LoadingScreenProps) {
    const { width, height } = useThree(state => state.viewport)
    const loadingScreenMaterialRef = useRef<LoadingScreenMaterial>(null);

    const { contextSafe } = useGSAP(() => { }, [loadingScreenMaterialRef]);
    const show = contextSafe(() => {
        gsap.fromTo(loadingScreenMaterialRef.current!.uniforms.uTime,
            {
                value: 3.14,
            },
            {
                value: -1,
                duration: 1,
            });
    })

    const hide = contextSafe(() => {
        gsap.to(loadingScreenMaterialRef.current!.uniforms.uTime,
            {
                value: 3.14,
                duration: 1,
            }
        );
    })

    useEffect(() => {
        console.log(hidden ? 'Playing hide animation' : 'Playing show animation');
        hidden ? hide() : show();
    }, [hidden])

    return (
        <mesh>
            <planeGeometry args={[width, height]} />
            <loadingScreenMaterial ref={loadingScreenMaterialRef} />
        </mesh>
    );
}
