import { Dispatch, SetStateAction } from "react";

export type CameraZoomProps = {
    zoomValue: number;
    setZoomValue: Dispatch<SetStateAction<number>>;
}