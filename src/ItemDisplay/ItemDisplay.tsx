import { Await, useLoaderData } from "react-router-dom"
import { ItemLoaderResult } from "./ItemLoader";
import './ItemDisplay.scss'
import { Suspense, useCallback } from "react";
import { useGSAP } from "@gsap/react";
import gsap from 'gsap';

export default function ItemDisplay() {
    const data = useLoaderData(); //Promise / async

    const { contextSafe } = useGSAP();
    const playAnimation = useCallback((node: HTMLImageElement) => contextSafe((node: HTMLImageElement) => {
        gsap.to(node, {
            opacity: 1,
            duration: 1
        });
    })(node), [contextSafe]);

    return (
        <Suspense fallback={
            <p>Loading image...</p>
        }>
            <Await resolve={(data as ItemLoaderResult).imageBase64} errorElement={<p>Error loading image</p>}>
                {(imageBase64) => {
                    //TODO: Use shaders to turn these images into grayscale and apply some more cool effects to them
                    return <img className="picsum" src={imageBase64} alt="Taken from Picsum" ref={playAnimation} style={{ opacity: 0 }} />
                }}
            </Await>
        </Suspense >

    )
}
