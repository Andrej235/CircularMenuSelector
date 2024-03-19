import { useLoaderData } from "react-router-dom"
import { ItemLoaderResult } from "./ItemLoader";
import './ItemDisplay.scss'

export default function ItemDisplay() {
    const { imageBase64 } = useLoaderData() as ItemLoaderResult;

    //Use shaders to turn these images into grayscale and apply some more cool effects to them
    return (
        <img className="picsum" src={imageBase64} alt="Random img taken from Picsum"/>
    )
}
