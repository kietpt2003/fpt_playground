import { CameraType, FlashMode } from "expo-camera";

export type CameraScreenProps = {
    zoom: number,
    facing: CameraType,
    flash: FlashMode,
    animateShutter: boolean,
    enableTorch: boolean,
}