import { useLoaderData, useParams } from "react-router-dom"

export default function ItemDisplay() {
    const { itemId } = useParams();
    const a = useLoaderData();
    console.log(a);

    return (
        <div>Hello! {itemId}</div>
    )
}
