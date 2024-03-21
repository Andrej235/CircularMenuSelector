import { Canvas, extend, useThree } from '@react-three/fiber'
import { FadeoutScreenMaterial } from './FadeoutScreenMaterial';
import { useCallback } from 'react';
import './FadeoutScreen.scss';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

extend({ FadeoutScreenMaterial })

type FadeOutScreenProps = {
    onAnimationCompleted?: () => void
}

export function FadeOutScreen({ onAnimationCompleted }: FadeOutScreenProps) {
    return (
        <div className='fade-screen'>
            <Canvas>
                <FadeoutScreenCanvasElements onAnimationCompleted={onAnimationCompleted} />
            </Canvas>
        </div>
    )
}

function FadeoutScreenCanvasElements({ onAnimationCompleted }: FadeOutScreenProps) {
    const { width, height } = useThree(state => state.viewport)

    const { contextSafe } = useGSAP();
    const playAnimation = useCallback((node: FadeoutScreenMaterial) => contextSafe((node: FadeoutScreenMaterial) => {
        if (!node)
            return;

        gsap.fromTo(node.uniforms.uTime,
            {
                value: 3.14,
            },
            {
                value: -1.7,
                duration: 1.5,
                onComplete: onAnimationCompleted,
            });
    })(node), [contextSafe, onAnimationCompleted]);

    return (
        <mesh>
            <planeGeometry args={[width, height]} />
            <fadeoutScreenMaterial ref={playAnimation} />
        </mesh>
    )
}