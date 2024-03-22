precision mediump float;

uniform vec2 u_resolution;
uniform float u_time;
uniform sampler2D u_tex0;
varying vec2 v_uv;

float Random(vec2 pixelCoords) {
    return fract(sin(dot(pixelCoords, vec2(534.645745, 54.1234))) * 1e4);
}

float Random(float seed) {
    return fract(sin(seed) * 43758.5453123);
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
    seed *= 200.0;
    float value = 0.0;
    float amplitude = .5;

    for(int i = 0; i < OCTAVES; i++) {
        value += amplitude * Noise(seed);
        seed *= 2.;
        amplitude *= .5;
    }

    return value;
}

void main(){
    vec2 pixelPos = gl_FragCoord.xy / u_resolution.xy;

    vec3 color = texture2D(u_tex0, pixelPos).rgb;
    float dynamicNoise = FBM(pixelPos + Random(floor(u_time * 15.))) * .5 + .5;
    float staticNoise = FBM(pixelPos);
    float blackStaticNoise = step(.65, FBM(pixelPos - .523778));

    float gray = dot(color, vec3(.299, .587, .114));
    color = vec3(gray); //? Grayscale
    color *= gray * staticNoise + .3; //? Old / grainy effect
    color += dynamicNoise * .3; //? Glitchy effect
    color -= gray * blackStaticNoise * .7; //? Black hole-like effect
    
    color -= (1. - step(.5, gray)) * .2; //? Dark highlights
    float lighHighlights = step(.85, gray);
    color += lighHighlights * .2 + (gray * blackStaticNoise * lighHighlights * .45); //? Light highlights

    color = clamp(color, 0.0, 1.0);

    gl_FragColor = vec4(color, 1.0);
}