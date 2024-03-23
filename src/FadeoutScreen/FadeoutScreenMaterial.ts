import { ReactThreeFiber } from "@react-three/fiber";
import { Color, ShaderMaterial } from "three";

export class FadeoutScreenMaterial extends ShaderMaterial {
    constructor() {
        super({
            uniforms: {
                uTime: { value: 3.14 },
                uColor: { value: new Color(0x181818) }
            },
            transparent: true,
            vertexShader: `
                varying vec2 vUv;
                void main() {
                    vUv = uv;
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                }
            `,
            fragmentShader: `
                precision mediump float;

                uniform float uTime;
                uniform vec3 uColor;
                varying vec2 vUv;

                float Random(vec2 pixelCoords) {
                    return fract(sin(dot(pixelCoords, vec2(534.645745, 54.1234))) * 1e4);
                }

                float Noise(vec2 seed) {
                    vec2 i = floor(seed);
                    vec2 f = fract(seed);

                    float a = Random(i);
                    float b = Random(i + vec2(1.0, 0.0));
                    float c = Random(i + vec2(0.0, 1.0));
                    float d = Random(i + vec2(1.0, 1.0));

                    vec2 u = f * f * (3.0 - 2.0 * f);

                    return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
                }

                #define OCTAVES 6
                float FBM(in vec2 seed) {
                    float value = 0.0;
                    float amplitude = .5;

                    for(int i = 0; i < OCTAVES; i++) {
                        value += amplitude * Noise(seed);
                        seed *= 2.;
                        amplitude *= .5;
                    }

                    return value;
                }

                void main() {
                    vec2 pixelPos = vUv;
                    pixelPos *= 15.;
                    float noise = FBM(pixelPos);

                    float sinT = sin(uTime / 1.5);
                    sinT = sinT * .5 + .5;

                    float alpha = 1.0 - smoothstep(0., 1. * (1.0 - sinT), noise * sinT);
                    gl_FragColor = vec4(uColor, alpha);
                }
            `
        })
    }
}

declare global {
    namespace JSX {
        interface IntrinsicElements {
            fadeoutScreenMaterial: ReactThreeFiber.Object3DNode<FadeoutScreenMaterial, typeof FadeoutScreenMaterial>
        }
    }
}
