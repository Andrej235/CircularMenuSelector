precision mediump float;

uniform vec2 u_resolution;
uniform float u_time;
uniform sampler2D u_tex0;

void main(){
    vec2 pixelPos = gl_FragCoord.xy / u_resolution.xy;

    pixelPos *= 3.;
    pixelPos = fract(pixelPos);

    vec3 color = texture2D(u_tex0, pixelPos).rgb;
    float gray = dot(color, vec3(0.299, 0.587, 0.114));
    color = vec3(gray);

    gl_FragColor = vec4(color, 1.0);
}