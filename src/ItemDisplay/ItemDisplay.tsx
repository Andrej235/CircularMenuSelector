import { Await, useLoaderData } from "react-router-dom"
import { ItemLoaderResult } from "./ItemLoader";
import './ItemDisplay.scss'
import { Suspense } from "react";

export default function ItemDisplay() {
    const data = useLoaderData(); //Promise / async
    
    // const [isLoading, setIsLoading] = useState<boolean>(true);
    // useEffect(() => setIsLoading(false), [])

    return (
        <>
            <Suspense fallback={<p>Loading image...</p>}>
                <Await
                    resolve={
                        (data as ItemLoaderResult).imageBase64
                    }
                    errorElement={
                        <p>Error loading image</p>
                    }
                >
                    {(imageBase64) => (
                        //Use shaders to turn these images into grayscale and apply some more cool effects to them
                        <img className="picsum" src={imageBase64} alt="Taken from Picsum" />
                    )}
                </Await>
            </Suspense>

            {/* <LoadingScreen hidden={!isLoading} /> */}
        </>
    )
}
