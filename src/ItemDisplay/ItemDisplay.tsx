import { Await, useLoaderData } from "react-router-dom";
import { ItemLoaderResult } from "./ItemLoader";
import "./ItemDisplay.scss";
import { Suspense, useCallback, useState } from "react";
// import { useGSAP } from "@gsap/react";
// import gsap from "gsap";
import { Canvas, extend, useFrame, useThree } from "@react-three/fiber";
import { ItemDisplayImageMaterial } from "./ItemDisplayImageMaterial";
import { Texture, Vector2 } from "three";
import useMousePosition from "../Hooks/UseMousePosition";

export default function ItemDisplay() {
  const data = useLoaderData(); //Promise / async

  /*   const { contextSafe } = useGSAP();
  const playAnimation = useCallback(
    (node: HTMLImageElement) =>
      contextSafe((node: HTMLImageElement) => {
        gsap.to(node, {
          opacity: 1,
          duration: 1,
        });
      })(node),
    [contextSafe]
  ); */

  return (
    <div id="item-display">
      <Suspense fallback={null}>
        <Await
          resolve={(data as ItemLoaderResult).imageBase64}
          errorElement={<p>Error loading image</p>}
        >
          {(imageBase64) => {
            //TODO: Use shaders to turn these images into grayscale and apply some more cool effects to them
            /*             return (
              <img
                className="picsum"
                src={imageBase64}
                alt="Taken from Picsum"
                ref={playAnimation}
                style={{ opacity: 0 }}
              />
            ); */
            return (
              <Canvas>
                <ItemDisplayCanvasElements imageBase64={imageBase64} />
              </Canvas>
            );
          }}
        </Await>
      </Suspense>
    </div>
  );
}

extend({ ItemDisplayImageMaterial });
function ItemDisplayCanvasElements({ imageBase64 }: { imageBase64: string }) {
  const { width, height } = useThree((state) => state.viewport);
  const [time, setTime] = useState<number>(0);
  const mousePosition = useMousePosition();

  useFrame(({ clock }) => setTime(clock.elapsedTime));

  const playAnimation = useCallback(
    (node: ItemDisplayImageMaterial) => {
      if (!node) return;

      const texture = new Texture();
      texture.image = new Image();
      texture.image.src = imageBase64;
      texture.needsUpdate = true;
      node.uniforms.u_tex0.value = texture;
    },
    [imageBase64]
  );

  return (
    <>
      <mesh scale={[width, height, 1]}>
        <planeGeometry />
        <itemDisplayImageMaterial
          ref={playAnimation}
          uniforms-u_time-value={time}
          uniforms-u_mouse-value={mousePosition}
          uniforms-u_resolution-value={
            new Vector2(window.innerWidth, window.innerHeight)
          }
        />
      </mesh>
    </>
  );
}
