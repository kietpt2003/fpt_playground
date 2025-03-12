import { ImageURISource } from "react-native";

export interface IntroduceFunctionProps {
    backgroundImgSrc: ImageURISource,
    contentImageSrc: ImageURISource,
    contentTxt: string,
    linearColors: readonly [string, string, ...string[]]
}