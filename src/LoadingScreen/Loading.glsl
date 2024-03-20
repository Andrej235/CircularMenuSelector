precision mediump float;

uniform vec2 u_resolution;
uniform float u_time;
// varying vec2 v_uv;

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
    vec2 pixelPos = gl_FragCoord.xy / u_resolution;
    pixelPos *= 15.;
    float noise = FBM(pixelPos);

    float sinT = sin(u_time / 1.);
    sinT = sinT * .5 + .5;

    float alpha = 1.0 - smoothstep(0., 1. * (1.0 - sinT), noise * sinT);
    vec3 color = vec3(1.0);
    gl_FragColor = vec4(color, alpha);
}