import { ActionFunctionArgs, ParamParseKey, Params } from "react-router-dom";

export const pathName = {
    item: '/item/:itemId'
} as const;

export interface Args extends ActionFunctionArgs {
    params: Params<ParamParseKey<typeof pathName.item>>;
}

export interface ItemLoaderResult {
    imageBase64: string
}

export async function itemLoader({ params }: Args): Promise<ItemLoaderResult> {

    const request = fetch('https://picsum.photos/id/' + params.itemId + '/1920/1080');
    const response = await request;
    const blob = await response.blob();
    const imageBase64 = await blobToBase64(blob);

    return {
        imageBase64: imageBase64
    };
}

export function blobToBase64(blob: Blob): Promise<string> {
    return new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
    });
}