import { Dispatch, SetStateAction } from "react"

export type PictureEditorProps = {
    imageUri: string;
    setImage: Dispatch<SetStateAction<string | undefined>>;
}